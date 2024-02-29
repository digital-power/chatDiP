# ChatDIP
Welcome to the Digital Power AI chatbot solution based on this [Azure sample repository](https://github.com/Azure-Samples/azure-search-openai-demo).

Since the authors of the Azure sample project have already documented almost all you need to know, this README is meant to quickly navigate to the relevant parts.

## Directory structure
The project constists of the following directories:
- `/app` contains the Python (Quart) backend and the Typescript (React) frontend.
- `/assets` contains images used in the app.
- `/data` contains the files that are used to build the knowledge base. This is the data that the chatbot uses to answer questions!
- `/docs` contains markdown files with documentation.
- `/infra` contains the Bicep files defining the required Azure resources.
- `/scripts` contains Shell & PowerShell scripts for adhoc functionalities.
- `/tests` contains Pytest tests

## Get started
To collaborate on this project in an organised way we follow the [Github flow](https://docs.github.com/en/get-started/using-github/github-flow) principles. This effectively means that all changes require a separate branch and a pull request to the `main` branch **with** reviewers to process them.

### Changing the data
The easiest way to change the underlying data that the chatbot uses, is to replace the files in the `/data` folder. After committing and pushing the code the to remote `main` branch, a "deploy" pipeline will upload the data to the Azure environment.

> Uploading new documents will NOT delete the already existings data. To remove documents contact an owner.

If you are an [owners](/dip-README.md#owners-of-this-project) of this project you can also use the `prepdocs` script to directly parse and upload documents from your local environment. You can add the `--remove` or `--removeall` flag in the shell script to delete data from the index. Check [prepdocs.py](/scripts/prepdocs.py) on how to use them.

### Changing the infrastructure
For the infrastructure you can use the same method as for data by first changing the Bicep files in the `/infra` folder. Secondly, after committing and pushing the code the to remote `main` branch, a "deploy" pipeline will update the infrastructure of the Azure environment.

If you are an [owners](/dip-README.md#owners-of-this-project) of this project you can also the `azd deploy` command to directly update the infrastructure from your local environment. However, it is highly recommended to use the pipeline method as well!

### Changing the app (backend or frontend)
If you want to make changes to the app, you need to test them locally. Therefore, you need to be able to run the app locally which requires the right access and setting up the environment.

#### Getting access
Ask one of the [owners](/dip-README.md#owners-of-this-project) to add you to the [chatdip user group](https://portal.azure.com/#view/Microsoft_AAD_IAM/GroupDetailsMenuBlade/~/Overview/groupId/d00eb3be-cd9c-4a27-be65-5b4fb6918231) and assign you the `Reader` role on the [Digital Power Playground](https://portal.azure.com/#@digital-power.com/resource/subscriptions/ef0661c5-0e9a-4467-ba85-e57a8816570d) subscription.

#### Setting up the environment
To run the app locally:
1. Install the [Azure Developer CLI](https://learn.microsoft.com/en-us/azure/developer/azure-developer-cli/install-azd)
1. Run `azd auth login`
1. Run `azd env refresh -e chat-dip-dev`
    - When prompted, choose the **Digital Power Playground** subscription
    - When prompted, choose **West-Europe** as the region, if it is not an option (for `openAiResourceGroupLocation`) choose **France Central**

#### Running the app
Instructions on running the local environment can be found [here](docs/localdev.md).

### Owners of this project
- Myrthe Lammerse [myrthe.lammerse@digital-power.com](mailto:myrthe.lammerse@digital-power.com)
- Roy Klip [roy.klip@digital-power.com](mailto:myrthe.lammerse@digital-power.com)
