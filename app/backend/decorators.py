import logging
import os
from functools import wraps
from typing import Any, Callable, Dict

import aiohttp
from quart import abort, current_app, request

from approaches.utils import usecase_exists
from config import CONFIG_AUTH_CLIENT, CONFIG_SEARCH_CLIENTS
from core.authentication import AuthError
from error import error_response


def authenticated_path(route_fn: Callable[[str, str, Dict[str, Any]], Any]):
    """
    Decorator for routes that request a specific file that might require access control enforcement
    """

    @wraps(route_fn)
    async def auth_handler(usecase: str, path=""):
        # Check if usecase is valid
        assert usecase_exists(usecase), f"Usecase {usecase} does not exist"

        # If authentication is enabled, validate the user can access the file
        auth_helper = current_app.config[CONFIG_AUTH_CLIENT]
        search_client = current_app.config[CONFIG_SEARCH_CLIENTS][usecase]
        try:
            auth_claims = await auth_helper.get_auth_claims_if_enabled(request.headers)
            authorized = await auth_helper.check_path_auth(path, auth_claims, search_client)
        except AuthError:
            abort(403)
        except Exception as error:
            logging.exception("Problem checking path auth %s", error)
            return error_response(error, route="/content")

        if not authorized:
            abort(403)

        return await route_fn(usecase, path, auth_claims)

    return auth_handler


def authenticated(route_fn: Callable[[Dict[str, Any]], Any]):
    """
    Decorator for routes that might require access control.
    Unpacks Authorization header information into an auth_claims dictionary
    """

    @wraps(route_fn)
    async def auth_handler():
        auth_helper = current_app.config[CONFIG_AUTH_CLIENT]
        try:
            auth_claims = await auth_helper.get_auth_claims_if_enabled(request.headers)
        except AuthError:
            abort(403)

        return await route_fn(auth_claims)

    return auth_handler


def with_access_token(func):
    """
    Decorator for routes that require an OAuth2 access token.
    Obtains an access token from Azure Active Directory using client credentials
    and passes it to the decorated function as an additional argument.

    This decorator is designed to be used with asynchronous route handlers.
    """
    @wraps(func)
    async def wrapper(*args, **kwargs):
        # Define the function to get the access token
        token_url = f"https://login.microsoftonline.com/{os.getenv('AZURE_TENANT_ID')}/oauth2/v2.0/token"
        headers = {"Content-Type": "application/x-www-form-urlencoded"}
        data = {
            "client_id": os.getenv('AZURE_CLIENT_APP_ID'),
            "scope": "https://graph.microsoft.com/.default",
            "client_secret": os.getenv('AZURE_CLIENT_APP_SECRET'),
            "grant_type": "client_credentials"
        }

        async with aiohttp.ClientSession() as session:
            async with session.post(token_url, headers=headers, data=data) as response:
                response_data = await response.json()
                access_token = response_data.get("access_token")

        return await func(*args, access_token=access_token, **kwargs)

    return wrapper
