## Adding the Other Visualizations 

All the remaining visualizations in the dashboards will use the same
[sample spreadsheet](http://download.infragistics.com/reportplus/help/samples/Reveal_Dashboard_Tutorials.xlsx).

<div class="note">

<div class="title">

NOTE

</div>

If you want to [change your data source](~/en/datasources/changing-data-source-visualization.md), you will need to select the
**overflow button** next to the data source name or [create a new data source](~/en/datasources/creating-new-datasource.md) instead. You can also
[duplicate](~/en/general/overview.html#view-edit-mode) visualizations to speed up the
creation process.

</div>

This section will cover the following visualizations:

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><img src="images/ThumbnailFollowers_All.png" alt="ThumbnailFollowers All" /><br />
</p>
<p><a href="#followers">Followers</a><br />
</p></td>
<td><p><img src="images/ThumbnailYTDFacebookFollowers_All.png" alt="ThumbnailYTDFacebookFollowers All" /><br />
</p>
<p><a href="#ytd-facebook-followers">YTD Facebook Followers</a><br />
</p></td>
<td><p><img src="images/ThumbnailMonthlyFacebookLikes_All.png" alt="ThumbnailMonthlyFacebookLikes All" /><br />
</p>
<p><a href="#monthly-facebook-likes">Monthly Facebook Likes</a><br />
</p></td>
</tr>
<tr class="even">
<td><p><img src="images/ThumbnailRetweetsFavorites_All.png" alt="ThumbnailRetweetsFavorites All" /><br />
</p>
<p><a href="#retweets-favorites">Retweets &amp; Favorites</a><br />
</p></td>
<td><p><img src="images/ThumbnailFacebookReachImpressions_All.png" alt="ThumbnailFacebookReachImpressions All" /><br />
</p>
<p><a href="#facebook-reach-impressions">Facebook Reach vs. Impressions</a><br />
</p></td>
<td><p><img src="images/ThumbnailMonthlyTwitterMentions_All.png" alt="ThumbnailMonthlyTwitterMentions All" /><br />
</p>
<p><a href="#monthly-twitter-mentions">Monthly Twitter Mentions</a><br />
</p></td>
</tr>
</tbody>
</table>

### Followers

The Followers visualization displays the amount of followers broken down
by social media channel in a [column chart](~/en/visualization-tutorials/simple-charts.md). In
order to create it:

1.  Select the + button in the right corner of your dashboard. In the
    New Visualization dialog, select the
    **Reveal\_Dashboard\_Tutorials** spreadsheet in the **Data in
    Dashboard** section. Make sure the **Social Dashboard** option is
    selected, and then press **Load Data**.
    
    ![SelectingSocialSheet\_All](images/SelectingSocialSheet_All.png)



2.  **Open the visualizations picker** by selecting the grid icon in the
    top bar, and select the "Column" chart.
    
    ![SelectColumnChart\_All](images/SelectColumnChart_All.png)



3.  In the Data Editor, drag and drop the **Date** field into Label, and
    the **Facebook Followers by Year** and **Twitter Followers by Year**
    fields into Values.
    
    ![DragDropSocialFollowers\_All](images/DragDropSocialFollowers_All.png)



4.  By default, both the Facebook and Twitter followers will be
    expressed with two fraction digits. In order to change this,
    **select the fields in the data editor**, and, under **Formatting**
    change the **Fraction Digits** to **0** for both fields.
    
    ![SocialFollowersFractionDigits\_All](images/SocialFollowersFractionDigits_All.png)



5.  In the sample Followers visualization, dates are displayed as
    months. Select the **Date** field in Label, and set the **Date
    Aggregation** to **Month**. Then, select **Update Field**.
    
    ![SocialFollowersDateFilter\_All](images/SocialFollowersDateFilter_All.png)



6.  Connect your visualization to the existing dashboard filter by
    selecting **Connect** under **Date Filter**. You can find this menu
    above "Social Dashboard".
    
    ![SocialFollowersConnectDateFilter\_All](images/SocialFollowersConnectDateFilter_All.png)



7.  **Change the title of your visualization** to "Followers" **by
    selecting the pencil icon** next to "Social Dashboard".

Once you are done, go back to the Dashboard Editor by selecting the
**tick icon** in the top right-hand corner.

### YTD Facebook Followers

The YTD Facebook Followers visualization displays the amount of
followers for that social media channel in a [text gauge](~/en/visualization-tutorials/gauge-views.html#createtextgauge). In order to create it:

1.  Select the + button in the right corner of your dashboard. In the
    New Visualization dialog, select the
    **Reveal\_Dashboard\_Tutorials** spreadsheet in the **Data in
    Dashboard** section. Make sure the **Social Dashboard** option is
    selected, and then press **Load Data**.
    
    ![SelectingSocialSheet\_All](images/SelectingSocialSheet_All.png)



2.  **Open the visualizations picker** by selecting the grid icon in the
    top bar, and select the "Text" gauge.
    
    ![SelectTextGauge\_All](images/SelectTextGauge_All.png)



3.  In the Data Editor, drag and drop the **Facebook Followers by Year**
    field into the Value placeholder.
    
    ![DragDropSocialFacebookFollowers\_All](images/DragDropSocialFacebookFollowers_All.png)



4.  Connect your visualization to the existing dashboard filter by
    selecting **Connect** under **Date Filter**. You can find this menu
    above "Social Dashboard".
    
    ![SocialYTDFacebookFollowersConnectDateFilter\_All](images/SocialYTDFacebookFollowersConnectDateFilter_All.png)



5.  **Change the title of your visualization** to "YTD Facebook
    Followers" **by selecting the pencil icon** next to "Social
    Dashboard".

Once you are done, go back to the Dashboard Editor by selecting the
**tick icon** in the top right-hand corner.

### Monthly Facebook Likes

The Monthly Facebook Likes visualization displays the amount of Facebook
likes per month for the company in a [line chart](~/en/visualization-tutorials/simple-charts.md). In order to create it:

1.  Select the + button in the right corner of your dashboard. In the
    New Visualization dialog, select the
    **Reveal\_Dashboard\_Tutorials** spreadsheet in the **Data in
    Dashboard** section. Make sure the **Social Dashboard** option is
    selected, and then press **Load Data**.
    
    ![SelectingSocialSheet\_All](images/SelectingSocialSheet_All.png)



2.  **Open the visualizations picker** by selecting the grid icon in the
    top bar, and select the "Line" chart.
    
    ![SelectLineChart\_All](images/SelectLineChart_All.png)



3.  In the Data Editor, drag and drop the **Date** field into Label and
    **Likes** into the Values placeholder of the data editor.
    
    ![DragDropSocialMonthlyLikes\_All](images/DragDropSocialMonthlyLikes_All.png)



4.  In the sample Monthly Facebook Likes visualization, dates are
    displayed as months. Select the **Date** field in Label, and set the
    **Date Aggregation** to **Month**. Then, select **Update Field**.
    
    ![SocialMonthlyLikesDateFilter\_All](images/SocialMonthlyLikesDateFilter_All.png)



5.  By default, Likes will be expressed with two fraction digits. In
    order to change this, **select the fields in the data editor**, and,
    under **Formatting** change the **Fraction Digits** to **0** for
    both fields.
    
    ![SocialMonthlyFacebookLikes\_All](images/SocialMonthlyFacebookLikes_All.png)



6.  To match the sample visualization's color, change the **Start
    Color** to the fourth one within the same **Settings** screen.
    
    ![SocialMonthlyFacebookLikesStartColor\_All](images/SocialMonthlyFacebookLikesStartColor_All.png)


7.  Connect your visualization to the existing dashboard filter by
    selecting **Connect** under **Date Filter**. You can find this menu
    above "Social Dashboard".
    
    ![SocialMonthlyFacebookLikesConnectDateFilter\_All](images/SocialMonthlyFacebookLikesConnectDateFilter_All.png)


8.  **Change the title of your visualization** to "Monthly Likes" **by
    selecting the pencil icon** next to "Social Dashboard".

Once you are done, go back to the Dashboard Editor by selecting the
**tick icon** in the top right-hand corner.

### Retweets & Favorites

The Retweets & Favorites visualization displays the amount of Twitter
retweets and favorited posts per month for the company in a [column chart](~/en/visualization-tutorials/simple-charts.md). In order to create it:

1.  Select the + button in the right corner of your dashboard. In the
    New Visualization dialog, select the
    **Reveal\_Dashboard\_Tutorials** spreadsheet in the **Data in
    Dashboard** section. Make sure the **Social Dashboard** option is
    selected, and then press **Load Data**.
    
    ![SelectingSocialSheet\_All](images/SelectingSocialSheet_All.png)


2.  **Open the visualizations picker** by selecting the grid icon in the
    top bar, and select the "Column" chart.
    
    ![SelectColumnChart\_All](images/SelectColumnChart_All.png)


3.  In the Data Editor, drag and drop the **Date** field into Label, and
    both **Retweets** and **Favorites** into the Values placeholder of
    the data editor.
    
    ![DragDropRetweetsFavorites\_All](images/DragDropRetweetsFavorites_All.png)


4.  In the sample Retweets & Favorites visualization, dates are
    displayed as months. Select the **Date** field in Label, and set the
    **Date Aggregation** to **Month**. Then, select **Update Field**.
    
    ![SocialRetweetsFavoritesDateFilter\_All](images/SocialRetweetsFavoritesDateFilter_All.png)


5.  By default, Retweets & Favorites will be expressed with two fraction
    digits. In order to change this, **select the fields in the data
    editor**, and, under **Formatting** change the **Fraction Digits**
    to **0** for both fields.
    
    ![SocialRetweetsFavoritesFractionDigits\_All](images/SocialRetweetsFavoritesFractionDigits_All.png)


6.  To match the sample visualization's color, change the **Start
    Color** to the sixth one within the same **Settings** screen.
    
    ![SocialRetweetsFavoritesStartColor\_All](images/SocialRetweetsFavoritesStartColor_All.png)


7.  Connect your visualization to the existing dashboard filter by
    selecting **Connect** under **Date Filter**. You can find this menu
    above "Social Dashboard".
    
    ![SocialRetweetsFavoritesConnectDateFilter\_All](images/SocialRetweetsFavoritesConnectDateFilter_All.png)


8.  **Change the title of your visualization** to "Retweets & Favorites"
    **by selecting the pencil icon** next to "Social Dashboard".

Once you are done, go back to the Dashboard Editor by selecting the
**tick icon** in the top right-hand corner.

### Facebook Reach vs. Impressions

The Facebook Reach vs. Impressions visualization displays the amount of
reaches and impressions through Facebook for the company in an [area chart](~/en/visualization-tutorials/simple-charts.md). In order to create it:

1.  Select the + button in the right corner of your dashboard. In the
    New Visualization dialog, select the
    **Reveal\_Dashboard\_Tutorials** spreadsheet in the **Data in
    Dashboard** section. Make sure the **Social Dashboard** option is
    selected, and then press **Load Data**.
    
    ![SelectingSocialSheet\_All](images/SelectingSocialSheet_All.png)


2.  **Open the visualizations picker** by selecting the grid icon in the
    top bar, and select the "Area" chart.
    
    ![SelectAreaChart\_All](images/SelectAreaChart_All.png)


3.  In the Data Editor, drag and drop the **Date** field into Label, and
    both **Post Reach** and **Impressions** into the Values placeholder
    of the data editor.
    
    ![DragDropReachImpressions\_All](images/DragDropReachImpressions_All.png)


4.  In the sample Facebook Reach vs. Impressions visualization, dates
    are displayed as months. Select the **Date** field in Label, and set
    the **Date Aggregation** to **Month**. Then, select **Update
    Field**.
    
    ![SocialReachVsImpressionsDateFilter\_All](images/SocialReachVsImpressionsDateFilter_All.png)


5.  By default, Post Reach and Impressions will be expressed with two
    fraction digits. In order to change this, **select the fields in the
    data editor**, and, under **Formatting** change the **Fraction
    Digits** to **0** for both fields.
    
    ![SocialPostReachImpressions\_All](images/SocialPostReachImpressions_All.png)


6.  Connect your visualization to the existing dashboard filter by
    selecting **Connect** under **Date Filter**. You can find this menu
    above "Social Dashboard".
    
    ![SocialReachImpressionsConnectDateFilter\_All](images/SocialReachImpressionsConnectDateFilter_All.png)


7.  **Change the title of your visualization** to "Facebook Reach vs.
    Impressions" **by selecting the pencil icon** next to "Social
    Dashboard".

Once you are done, go back to the Dashboard Editor by selecting the
**tick icon** in the top right-hand corner.

### Monthly Twitter Mentions

The Monthly Twitter mentions visualization displauys the amount of
mentions through Twitter for the company in a [line chart](~/en/visualization-tutorials/simple-charts.md). In order to create it:

1.  Select the + button in the right corner of your dashboard. In the
    New Visualization dialog, select the
    **Reveal\_Dashboard\_Tutorials** spreadsheet in the **Data in
    Dashboard** section. Make sure the **Social Dashboard** option is
    selected, and then press **Load Data**.
    
    ![SelectingSocialSheet\_All](images/SelectingSocialSheet_All.png)


2.  **Open the visualizations picker** by selecting the grid icon in the
    top bar, and select the "Line" chart.
    
    ![SelectLineChart\_All](images/SelectLineChart_All.png)


3.  In the Data Editor, drag and drop the **Date** field into Label, and
    both **Mentions** into the Values placeholder of the data editor.
    
    ![DragDropMonthlyTwitterMentions\_All](images/DragDropMonthlyTwitterMentions_All.png)


4.  In the sample Monthly Twitter Mentions visualization, dates are
    displayed as months. Select the **Date** field in Label, and set the
    **Date Aggregation** to **Month**. Then, select **Update Field**.
    
    ![SocialMonthlyTwitterMentions\_All](images/SocialMonthlyTwitterMentions_All.png)


5.  By default, Mentions will be expressed with two fraction digits. In
    order to change this, **select the fields in the data editor**, and,
    under **Formatting** change the **Fraction Digits** to **0** for
    both fields.
    
    ![SocialMentionsFractionDigits\_All](images/SocialMentionsFractionDigits_All.png)


6.  Connect your visualization to the existing dashboard filter by
    selecting **Connect** under **Date Filter**. You can find this menu
    above "Social Dashboard".
    
    ![SocialMonthlyTwitterMentionConnectDateFilter\_All](images/SocialMonthlyTwitterMentionConnectDateFilter_All.png)


7.  **Change the title of your visualization** to "Monthly Twitter
    Mentions" **by selecting the pencil icon** next to "Social
    Dashboard".

Once you are done, go back to the Dashboard Editor by selecting the
**tick icon** in the top right-hand corner.

<style>
.previous {
    text-align: left
}

.next {
    float: right
}

</style>

<a href="social-applying-theme.md" class="previous">&laquo; Previous Step</a>
<a href="social-saving-dashboard.md" class="next">Next Step &raquo;</a>