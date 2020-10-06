## Connecting a Dashboard to Its Data Source

In Reveal, you can connect to a data source [before](overview.md) or after a dashboard is created. Connecting to a data source is part of the dashboard creation process. However, you can have a dashboard, which is already created, but still not connected to a data source. There are two scenarios where this can happen: this dashboard is [shared](~/en/dashboards/sharing-dashboards/share-a-dashboard.md) with you, or you have [uploaded](uploading-dashboards.md) it to Reveal. 

A dashboard created with data sources you have not yet added into your application will look like shown below, when you open it for the first time: 

<img src="images/dashboard-own-data-sources.png" alt="A dashboard not connected to its data source" width="100%"/>

Each visualization has a *Log into* button on it enabling you to **connect to the data source** used. To do this: 

1. Click/tap the **Log into** button.
2. In the _Connect Data Source_ dialog, click/tap the **+ Credentials** button in the top right corner.
3. Fill in the account credentials - *username*, *password* and *domain* (optional). 
4. Select **Create and Use**.

The complete dashboard will be displayed in *Dashboard View* mode. 

<img src="images/final-dashboard-own-data-source.png" alt="Final look of the dashboard after connecting to its data source" width="100%"/>

>[!NOTE]
> In the _Connect Data Source_ dialog, you may have a list of data source credentials (see screenshot below). These are credentials you have used to log into other source accounts, or that you have added in advance in the [Manage Reveal Credentials](~/en/datasources/managing-data-source-credentials.md) menu.
<img src="images/credentials-list-connect.png" alt="A list of ready credentials in the Connect Data Source dialog" width="100%"/>

If there are visualizations in the dashboard, which are created with another data source, you will still need to connect them to their data source to view them.

### Related Topics 

* **Editing your dashboard**. Now after connecting the dashboard to its data source and being able to view it, you may want to edit it, as well. You can do so by accessing the *Dashboard Edit* mode from the overflow menu. Learn more in the [Interacting with Your Dashboards](~/en/dashboards/dashboards-interactions.md) topic. 

* **Access permissions to a shared dashboard**. The dashboard you just connected to its data source was most probably shared with you in Reveal. Did you know that there are three types of access permissions that determine the operations you are allowed to do with the dashboard? Learn about this and other specifics in the [Sharing a Dashboard](~/en/dashboards/sharing-dashboards/share-a-dashboard.md) topic.