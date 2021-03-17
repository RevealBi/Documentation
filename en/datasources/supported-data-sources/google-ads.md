## [First Draft] Google Ads

Google Ads (formerly Google Adwords) is an online advertising platform that offers to place business ads both in the results of search engines like Google Search and on non-search websites and apps.

The *Google Ads* data source in Reveal allows you to access and analyze the data tables in your Google Ads account. Your Google Ads dashboards will help you get  a high-level understanding of your advertising efforts and Return on investment (ROI).
### Connecting to Google Ads

1. Select *Google Ads* as your data source and you will see Google's login screen.

2. If multiple Google accounts are listed, select the account that contains the Google Ads data you want to access and enter your login credentials, if you are not already signed in. 

3. In the authorization prompt select *Allow*.

4. Choose a *Google Ads* account

    If your Google account is connected to several Google Ads accounts, select the one you want to use in the following dialog.

    <img src="images/choose-google-ads-account.png" alt="A dialog where you need to choose your Google Ads account" width="100%">

### Setting Up Your Data

The dialog showing "Popular Resources" and "All Resources" list will most probably drop out.

### Working in the Visualizations Editor 

When you create a dashboard with information coming from Google Ads, you will see fields in the Visualizations Editor are organized differently (as shown in the screenshot below).

<img src="images/google-ads-visualizations-editor.png" alt="Google Ads data in the Visualizations Editor" width="100%">

You may notice that there is no *Fields* heading on the left in the *Data* pane. Instead, there are two sections in their own query field:

1. **DIMENSIONS AND SEGMENTS**: 

    a. **Dimensions** are depicted by a cube icon with a pink side. Dimensions are attributes of your data. For example, the dimension *Base Campaign* indicates... (complete when new design is ready)
    https://support.google.com/analytics/answer/1033861?hl=en

    more on dimensions: https://support.google.com/searchads/answer/3033845?hl=en&ref_topic=7512955

    b. **Segments** - Segments are depicted by a group icon. The segments you can choose from are predefined and change for each dimension just like in Google Ads. Unlike Google Ads, Reveal allows you to choose more than one segment to filter your data. For example, if you choose *Device* you can compare performance across different devices: mobile, desktop, and tablets. For more information on segments, consult the official 
    [Google Ads](https://support.google.com/google-ads/answer/2454072?hl=en#zippy=) documentation.

    https://support.google.com/google-ads/answer/2454072?hl=en#zippy=%2Cdevice


2. **METRICS** (depicted by *123* icon): Metrics consist of numeric data. For example, the metric *Clicks* measures the number of times ads were clicked.

If you need to learn more, check this Google Ads article: Dimensions and metrics.

#### The Date Range Data Filter

In the *Data Filters* section (see bottom right in the *Data* pane), you will find a date range filter set to *Last 30 days*. This means data will be retrieved for the last 30-day period, including today.

You can't remove the date filter, but you can change the default date range by clicking on the Calendar icon and choose *from* and *to* dates. Or you can select the arrow in the upper right corner (see the screenshot below) and pick a date range from the dropdown options:

> This is the Google Analytics Calendar. Replace with a screenshot showing the Google Ads calendar when available.
<img src="images/google-ads-date-range-filter
.png" alt="Google Ads data in the Visualizations Editor" width="100%">

> [!NOTE] **Data retrieved for *Today*.** If you choose *Today* from the date range options, keep in mind the date range starts at 12:00:00 a.m. and all data will be retrieved up until the current time. This means the results may vary between runs throughout the day as the data in Google Ads is being updated continuously.  
### Performance Considerations

Depending on how much data you are trying to retrieve, loading data from Google Ads in the Visualizations Editor may become a time-consuming task. Certain actions affect waiting time more than others.

#### Selecting a Date Range

When selecting a date range, keep in mind that the bigger the range, the longer the time it takes to load your data. So, at first restrict your range, evaluate the loading time and then expand it appropriately. 

If you are trying to load a dataset that is too large, you may receive an error stating you exceeded the rows/columns limits. If you can't restrict your time range enough to fit your purposes, then [contact support](https://www.infragistics.com/my-account/submit-support-request/reveal) for a limit increase. 

#### Adding Segments

In Reveal, you can combine multiple segments in the Visualizations Editor. As segments are used for more detailed statistics, the more segments you add, the more rows of data you retrieve. This may affect loading time. 