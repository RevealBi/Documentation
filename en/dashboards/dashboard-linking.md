## Linking Dashboards

Reveal supports dashboard linking, which allows you to connect the visualizations in a dashbord with other dashboards, or URLs. Imagine you want to provide more details on the information displayed in a visualization - you can use a whole new dashboard to do so. This can be very useful in Company 360 dashboards, for example, where you will be able to establish top-down analysis paths, where you go from a high level overview of the reality of a business to more detailed views with the specifics. 

Let's take a Company 360 dashboard (see below), which provides key performance indicators for each area of interest in the company. Once you open the dashboard, you will notice the **link symbol** on one or more visualizations. 

By clicking/tapping the link symbol, you can open: 

* **another dashboard** (shown in the screenshot below), which gives more specific information related to the visualization or a value in it;
* **a URL**, which will enable extensibility scenarios such as interacting with third-party web applications as part of the dashboard navigation. 

<img src="images/dashboard-linking-sample.png" alt="Dashboard linking sample" class="responsive-img"/>

### Adding a Link 

To configure a link, go to the **Settings** section of the *Visualizations Editor*, and click/tap the _+_ in **Links**.

<img src="images/pivot-editor-linking2.png" alt="Adding a link in Settings" width="80%"/>

The added link will appear as a symbol on the visualization it is configured for, when the dashboard is in *View Mode*.  

#### Linking to Another Dashboard

Linking to another dashboard gives you the ability to jump from a specific point in one dashboard to another dashboard. This point can be a visualization or a specific value in a visualization, depending on the link trigger you chose (see more [below](#trigger)).

To link your dashboard to another dashboard you need to perform the steps below.  

1. **Prepare** the dashboard you are linking to. Carefully consider the relation between the two dashboards. 

  **Adding filters** in advance to the dashboard you are linking to will allow you to connect the two dashboards by a common field. This field will play a role as a filter in the second dashboard and a measured category in the first dashboard. 

2. After preparing the dashboard you are linking to, open the main dashboard where you want to add the link. Select the visualization, on which you want the link symbol to appear and open it in the _Visualization Editor_. 

3. Go to *Settings* and select the _+_ in _Links_ to open the _New Link_ dialog: 

  <img src="images/new-link-dialog.png" alt="Dashboard linking sample" width="80%"/>

  Here you will need to configure two parameters:

  * The **Dashboard** that will be opened when the link symbol is clicked.

  * The **Link Name**, which is the title the users will see if they select the grid row or chart element.

  If you have added **dashboard filters** to the target dashboard, then you will also need to connect the dashboard filters to their corresponding fields in the dataset of the visualization you are adding a link to (see below). 

  <img src="images/filter-configure-linking-dashboards.png" alt="Dashboard linking sample" width="80%"/>

  Click _Done_ and go back. 

4. Select the *Create Link* blue button. 

The link to the dashboard will appear under _Links_ in the *Visualization Editor*. You will notice that the _Trigger_ setting has also appeared. See below for more information on [choosing your trigger](#trigger).  

#### Adding a URL 

Adding a URL is another option in the _New Link_ dialog. It enables you to open the configured URL in your device’s browser. 

There are two parameters that you need to define:

  - The **URL** the visualization will point to. You will be redirected to it once the lynk symbol is selected.
  
  - The **Link Name**, which is the title the users will see if they select the grid row or chart element.

<a name='variables'></a>
For URLs, you can also include **Variables**, which will dynamically
construct the URL the user will be linked to based on the values in your
visualization fields. For example, let’s take a look at the following
visualization link:

  <img src="images/adding-url-linking.png" alt="Dashboard linking sample" width="80%"/>

The URL has been set to <http://www.en.wikipedia.org/wiki>, and the selected *variable* will be **CampaignID**. Therefore, users who select
the **Navigate to Wiki** link in the visualization will be redirected to:

    http://www.en.wikipedia.org/wiki/[CampaignID].htm

Where `[CampaignID]` will vary depending on the values in the **CampaignID** field.

>[!NOTE] **Testing the Example.**
> To test how adding variables work, use the **Marketing Dashboard**. Choose a _Conversions by Campaign_ visualization in it, which contains the _CampaignID_ data field and add the URL as shown in the screenshot. Save the visualization and in _Dashboard Edit_ mode click on different parts of the funnel visualization to see how the url you are redirected to changes. 

<a name= 'trigger'></a>
### Choosing a Trigger

After adding your first link to the visualization, the *Trigger* appears under *Links* in _Settings_. Here you can choose between _Value is Selected_ and _Visualization is Maximized_ as trigger options. 
You can add as many links to a visualization as you want, but they will all have the same trigger enabled. 

#### Value is Selected Trigger

If you choose this option a tooltip with the link symbol appears whenever a data item of a chart, such as columns, bar, pie slices, etc. is clicked/tapped. In the grid chart the link symbol appears in the last column on the right (see below).

  <img src="images/links-to-grid-view.png" alt="A grid with link symbols and an arrow pointing to the row of the Amethyst value for CampaignID" class="responsive-img"/>

If you have added a data filter with the _CampaignID_ to the target dashboard, then clicking the link symbol in the grid, as shown in the screenshot above, will open another dashboard filtered by the _CampaignID_ field, with the _Amethyst_ value pre-selected. This way, in the target dashboard you will see only the analysis for the value you selected.

If a URL is linked to the selected value, then clicking/tapping the link symbol will open the URL you have added. To take the best advantage of this feature, you can also add the field to the URL as a [variable](#variable). 

#### Visualization is Maximized Trigger 

If you choose this option a link symbol will appear in the upper right corner of the visualization in _Dashboard View_ mode. So instead of maximizing the visualization, selecting the link symbol in the upper right corner will open another dashboard, or the URL you have linked to.

