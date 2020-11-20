## Creating a Custom Visualization Step By Step

This section shows how to use the Custom Visualization feature to create your own view of your data.

It illustrates the following tasks:

-	Creating an HTML file and adding the necessary script references.

-	Adding JavaScript code in order to handle the visualization data sent to Reveal (the host application) and also signal events.

-	Reading incoming data and creating a custom representation of it.

### Create the HTML file
Create an empty html file with references to jQuery and Reveal bridge utils.

``` js
<html>
   <head>
      <script type="text/javascript" src="https://download.infragistics.com/reveal/custom-visualization/rplus_bridge_utils.js">
      </script>
      <script src="https://code.jquery.com/jquery-1.11.0.min.js"></script>
   </head>
   <body>
   </body>
</html>
```

-	The first reference (rplus_bridge_utils.js) helps Reveal to manipulate the DOM.

-	jquery-1.11.0.min.js connects the visualization with the host.

If you want, you can also [**download the rplus_bridge_utils.js file**](https://download.infragistics.com/reveal/custom-visualization/rplus_bridge_utils.js?_ga=2.147590512.61211504.1605548193-106870904.1601302445) and reference it locally.

### Notify the host the readiness to receive the data
As a second step, add the necessary javascript code in order to:

-	Notify the host that the view is ready to receive the data. We do this by calling RPBridgeUtils.notifyExtensionIsReady.

-	Register a “dataReady” event handler, which will be called by the host after the data is ready to be consumed.

After this step the code should look similar to:

``` js
<html>
   <head>
      <script type="text/javascript" src="rplus_bridge_utils.js"></script>
      <script src="https://code.jquery.com/jquery-1.11.0.min.js"></script>
      <script type="text/javascript">
         window.RPBridgeListener = {
         dataReady: function (tabularData) {
      // Render the view
         }
         };
      $(function () {
         RPBridgeUtils.notifyExtensionIsReady();
      });
      </script>
   </head>
   <body>
   </body>
</html>
```

### Create the HTML elements that will render the custom view
Finally, we process the data sent to the dataReady function, and we dynamically generate the html tags used to render the data.

In this case we iterate over the tabularData.data array creating table rows and then we add it inside "myTable" div in the HTML DOM.

``` js
dataReady: function (tabularData) {
   var tableView = $("<table></table>");
      var headerRow = $("<tr></tr>").appendTo(tableView);
      for (var c = 0; c < tabularData.metadata.columns.length; c++) {
         var column = tabularData.metadata.columns[c];
         var headerCell = $("<th></th>").append(column.name + ":" +
         getColumnTypeName(column.type));
      headerRow.append(headerCell);
   }
   for (var i = 0; i < tabularData.data.length; i++) {
      var rowData = tabularData.data[i];
      var rowView = $("<tr></tr>");
      for (var j = 0; j < rowData.length; j++) {
         var cellValue = rowData[j];
         var cellView = $("<td></td>").append(cellValue);
         rowView.append(cellView);
      }
      tableView.append(rowView);
   }
   $("#myTable").append(tableView); }
   };
```

### Complete Sample Code

``` js
<html>
   <head>
      <script type="text/javascript" src="rplus_bridge_utils.js"></script>
      <script src="https://code.jquery.com/jquery-1.11.0.min.js"></script>
      <script type="text/javascript">
         var helpLink = "https://help.revealbi.io/en/data-visualizations/visualization-types/diy-visualizations.html";
         function getColumnTypeName(type) {
         	switch (type) {
         	case 0:
         		return "String";
         	case 1:
         		return "Number";
         	case 2:
         		return "Date";
         	case 3:
         		return "DateTime";
         	case 4:
         		return "Time"
         	default:
         		return "Unknown";
         	}
         }
         function openHelpLink() {
         	RPBridgeUtils.openUrl(helpLink);
         }
         window.RPBridgeListener = {
         dataReady: function (tabularData) {
         	var tableView = $("<table></table>");
         	var headerRow = $("<tr></tr>").appendTo(tableView);
         	for (var c = 0; c < tabularData.metadata.columns.length; c++) {
         		var column = tabularData.metadata.columns[c];
         		var headerCell = $("<th></th>").append(column.name + ":" + getColumnTypeName(column.type));
         		headerRow.append(headerCell);
         	}
         	for (var i = 0; i < tabularData.data.length; i++) {
         		var rowData = tabularData.data[i];
         		var rowView = $("<tr></tr>");
         		for (var j = 0; j < rowData.length; j++) {
         			var cellValue = rowData[j];
         			var cellView = $("<td></td>").append(cellValue);
         			rowView.append(cellView);
         		}
         		tableView.append(rowView);
         	}
         	$("#myTable").append(tableView);
         }
         };
         $(function () {
         RPBridgeUtils.notifyExtensionIsReady();
         });
      </script>
   </head>
   <body>
      <div>Follow <a href="#" onclick="openHelpLink();">this link</a> for this visualization's implementation.
      </div>
      <br />
      <div id="myTable" style="height:100%"></div>
   </body>
</html>
```
