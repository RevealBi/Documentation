## Microsoft Azure Analysis Services

Azure Analysis Services is a fully managed platform as a service (PaaS) that provides enterprise-grade data models in the cloud. Now, you can use the Azure Analysis data models in Reveal to create dashboards and perform data analysis.

### Configuring an Azure Analysis Services data source

Unlike other databases used in Reveal (Microsoft Analysis Services, MySQL, Oracle, etc.), MS Azure Analysis Services can be used in Reveal Web.

>[!NOTE]
>L**imitations in Web when first connecting to your Azure Analysis Services.**
>Due to security restrictions, the process of initial configuration and authentication of your Azure Analysis Services cannot be done in Reveal Web. You can initially connect to this data source in the iOS, Android, or Desktop app. Afterward, you can create or edit dashboards using data from this Azure Analysis Services connection with no further limitations.

To configure your Azure Analysis Services data source, you will need to perform the steps below.

1. Provide a _URL_ to your server in the _New Data Source_ dialog:

    <img src="images/configure-azure-analysis-services-data-source.png" alt="Configuring an azure analysis services connection" width="800"/>

    The _URL_ requested is the full name of the server, which contains the database with the data models you want to connect. You can *copy the server name* from the Azure Portal. To do this, go to:

    *Azure portal* > selected server > *Overview* > *Server name*

2. Go back to Reveal and paste the server name in _URL_. Click the _Sign in_ button, which is now enabled.  

3. Provide the credentials to your Microsoft account (the account associated with the Azure Analysis server).  

4. You will be navigated back to the _New Data Source_ dialog (see the screenshot in _Step 1_). Select a _database_ and click/tap _Continue_.

5. In _Set Up the Database_ dialog, you will find a list of all available semantic models in your database. Choose a model and click/tap _Select Data_.

The _Visualization editor_ will open. Here you will see the data from your model presented in two categories: _Dimensions_, and _Measures_.

*Dimensions* contain qualitative data ("Country", "Name", "Product", etc). *Measures* consist of numeric data.
