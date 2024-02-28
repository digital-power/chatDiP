# ChatDIP
Welcome to the Digital Power AI chatbot solution based on this [Azure sample repository](https://github.com/Azure-Samples/azure-search-openai-demo).

Since the authors of the Azure sample project have already documented almost all you need to know, this README is meant to navigate quickly to the relevant parts.

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

If you are an **owner** of this project you can also use the `prepdocs` script to directly parse and upload documents from your local environment.

### Changing the infrastructure
For the infrastructure you can use the same method as for data by first changing the Bicep files in the `/infra` folder. Secondly, after committing and pushing the code the to remote `main` branch, a "deploy" pipeline will update the infrastructure of the Azure environment.

If you are an **owner** of this project you can also the `azd deploy` command to directly update the infrastructure from your local environment. However, it is highly recommended to use the pipeline method as well!

### Changing the app (backend or frontend)
Follow step 1 to 3 from the instructions [here](README.md#sharing-environments). For step 4 and 5 you need to either be an owner of the project or ask one the owners to provide you with the necessary roles.

Further instructions for local development can be found [here](docs/localdev.md).

### Owners of this project
- Myrthe Lammerse [myrthe.lammerse@digital-power.com](mailto:myrthe.lammerse@digital-power.com)
- Roy Klip [roy.klip@digital-power.com](mailto:myrthe.lammerse@digital-power.com)
