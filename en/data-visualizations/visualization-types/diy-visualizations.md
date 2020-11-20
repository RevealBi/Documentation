## Custom Visualizations

Reveal offers multiple components for visualizing data, including the grid view, gauge view, map view and several chart types. There are some cases, though, where you would like to have another visualization method, not supported out of the box, that you feel would be a better fit for your scenario. It is for these cases that Reveal introduces the
ability to do your own custom visualization component and display it in a visualization as part of a Reveal dashboard.

### Sample DIY visualizations

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  overflow:hidden;padding:10px 5px;word-break:normal;}
.tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-2ovq{background-color:rgb(255, 255, 255);color:rgb(0, 0, 0);text-align:left;vertical-align:top}
.tg .tg-spkm{background-color:rgb(255, 255, 255);color:rgb(73, 85, 85);text-align:left;vertical-align:top}
.tg .tg-x3gl{background-color:rgb(249, 249, 249);color:rgb(73, 85, 85);text-align:left;vertical-align:top}
</style>
<table class="tg">
<thead>
  <tr>
    <th class="tg-x3gl"><br>Table with custom fonts, titles, and widths<br><img src="images/HRDashboardEmployeesDIY_All.png" alt="Image" width="400" height="291"></th>
    <th class="tg-x3gl"><br>Choropleth map of the population for United States by state<br><img src="images/StatePopulation_all.png" alt="Image" width="400" height="291"></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-spkm"><br>Choropleth map of the population for Brazil by state<br><img src="images/BrazilStatePopulation_all.png" alt="Image" width="400" height="291"></td>
    <td class="tg-2ovq"><br>Choropleth map of worldwide GDP<br><img src="images/WorldPopulationGDP_All.png" alt="Image" width="400" height="291"></td>
  </tr>
</tbody>
</table>

### Using a Custom Visualization

1. **Select Custom Visualization.**  
To find this option open the Visualizations section within the Widget Editor.

<img src="images/custom-visualization-access.png" alt="Selecting the Custom Visualization in Reveal" width="100%"/>

2. **Point to the implementation.**  
Add the URL of the web page that generates the custom visualization you want.

<img src="images/custom-visualization-config.png" alt="Showing the Custom Visualization configuration screen within Reveal" width="100%"/>

When referencing web components from a URL, keep in mind that the URL needs to be of public access. In addition, if the URL Address has an HTTPS:// protocol, every resource referenced in your custom HTML will need to use the same protocol.


### Custom Web Components and Reveal
These custom web components can access the data retrieved by Reveal from any of the supported data sources. Custom components interact with a Javascript API provided for that purpose.

Web components can be referenced either from a public URL address or from an internal shared location in your intranet. However, Reveal web is only able to render custom visualizations that have their web components hosted on a public URL.

[**Here you have a step-by-step tutorial**](diy-visualization-step-by-step.md) about a custom HTML visualization. This basic "Hello World" sample, generates a table with a data set retrieved from Reveal.
