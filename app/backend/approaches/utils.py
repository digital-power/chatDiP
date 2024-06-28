import json
from pathlib import Path


def load_approach_configs() -> list[dict]:
    """Load the configuration file for the approaches

    Returns:
        dict[str, Any]: Approach configuration file
    """
    return json.load(open(Path(__file__).parent / "config" / "config_approaches.json"))


def usecase_exists(usecase: str) -> bool:
    """Check if a usecase exists in the configuration file

    Args:
        usecase (str): Usecase to check

    Returns:
        bool: True if the usecase exists, False otherwise
    """
    return any(case["id"] == usecase for case in load_approach_configs())
