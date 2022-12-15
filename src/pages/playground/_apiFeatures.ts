import { translate } from '@docusaurus/Translate';

export const ApiFeatures = [
  {
    type: "html",
    value: translate({ id: "playground.sidebar.header.general", message: "General", }),
    className: "sidebar__header"
  },
  {
    label: translate({ id: "playground.sidebar.createDashboard", message: "Create Dashboard", }),
    code: `
//create reveal view instance
let revealView = new $.ig.RevealView("#revealView");

//create and assign new dashboard
revealView.dashboard = new $.ig.RVDashboard();
      `
  },
  {
    label: translate({ id: "playground.sidebar.loadDashboard", message: "Load Dashboard", }),
    code: `
//load dashboard from server
var dashboard = await $.ig.RVDashboard.loadDashboard("Sales");
  
//create reveal view
let revealView = new $.ig.RevealView("#revealView");

//assign dashboard
revealView.dashboard = dashboard;
      `
  },
  {
    type: "html",
    value: translate({ id: "playground.sidebar.header.DataSources", message: "Data Sources", }),
    className: "sidebar__header"
  },
  {
    label: translate({ id: "playground.sidebar.excelFile", message: "Excel File", }),
    code: `
let revealView = new $.ig.RevealView("#revealView");
revealView.startInEditMode = true;

//handle onDataSourcesRequested event
revealView.onDataSourcesRequested = (callback) => {
  //create local file data source item
  var localFileItem = new $.ig.RVLocalFileDataSourceItem();
  localFileItem.uri = "local:/Samples.xlsx";

  //create excel data source item
  var excelDataSourceItem  = new $.ig.RVExcelDataSourceItem(localFileItem);
  excelDataSourceItem .title = "Local Excel File";

  //pass data source item in callback
  callback(new $.ig.RevealDataSources([], [excelDataSourceItem], true));
};
    `
  },
  {
    label: translate({ id: "playground.sidebar.msSqlServer", message: "MS Sql Server", }),
    code: `
let revealView = new $.ig.RevealView("#revealView");
revealView.startInEditMode = true;

//handle onDataSourcesRequested event
revealView.onDataSourcesRequested = (callback) => {
  
  //add data source
  var sqlDataSource = new $.ig.RVSqlServerDataSource();
  sqlDataSource.host = "your-db-host";
  sqlDataSource.database = "your-db-name";
  sqlDataSource.port = 1234;
  sqlDataSource.title = "My SQL Server";

  //pass data source in callback
  callback(new $.ig.RevealDataSources([sqlDataSource], [], true));
};
    `
  },
  {
    type: "html",
    value: translate({ id: "playground.sidebar.header.exporting", message: "Exporting", }),
    className: "sidebar__header"
  },
  {
    label: translate({ id: "playground.sidebar.showHideExportOptions", message: "Show/Hide Export Options", }),
    code: `
var dashboard = await $.ig.RVDashboard.loadDashboard("Sales");
let revealView = new $.ig.RevealView("#revealView");
revealView.dashboard = dashboard;

//show/hide export menu items
revealView.showExportToExcel = false;
revealView.showExportImage = false;
revealView.showExportToPDF = false;
revealView.showExportToPowerPoint = false;
    `
  },
  {
    label: translate({ id: "playground.sidebar.customImageExport", message: "Custom Image Export", }),
    code: `
var dashboard = await $.ig.RVDashboard.loadDashboard("Sales");
let revealView = new $.ig.RevealView("#revealView");
revealView.dashboard = dashboard;

//intercept image export logic and implement your own
revealView.onImageExported = (image) => {
  var body = window.open("about:blank").document.body;
  body.appendChild(image);
};
    `
  },
  {
    type: "html",
    value: translate({ id: "playground.sidebar.header.filters", message: "Filters", }),
    className: "sidebar__header"
  },
  {
    label: translate({ id: "playground.sidebar.getAllFilters", message: "Get All Filters", }),
    code: `
var dashboard = await $.ig.RVDashboard.loadDashboard("Sales");
let revealView = new $.ig.RevealView("#revealView");
revealView.dashboard = dashboard;

//get all filters
var allDashboardFilters = revealView.dashboard.filters;
console.log(allDashboardFilters);
    `
  },
  {
    label: translate({ id: "playground.sidebar.getSpecificFilter", message: "Get a Specific Filter", }),
    code: `
var dashboard = await $.ig.RVDashboard.loadDashboard("Sales");
let revealView = new $.ig.RevealView("#revealView");
revealView.dashboard = dashboard;

//get specific filter by title
var territoryFilter = revealView.dashboard.filters.getByTitle("Territory");
console.log(territoryFilter);
    `
  },
  {
    label: translate({ id: "playground.sidebar.getAvailableFilterValues", message: "Get Available Filter Values", }),
    code: `
var dashboard = await $.ig.RVDashboard.loadDashboard("Sales");
let revealView = new $.ig.RevealView("#revealView");
revealView.dashboard = dashboard;

//get available filter values
var territoryFilter = revealView.dashboard.filters.getByTitle("Territory");
territoryFilter.GetFilterValues( filterValues => {
console.log(filterValues);
});
    `
  },
  {
    label: translate({ id: "playground.sidebar.setSelectedFilterValues", message: "Set Selected Filter Values", }),
    code: `
var dashboard = await $.ig.RVDashboard.loadDashboard("Sales");
let revealView = new $.ig.RevealView("#revealView");
revealView.dashboard = dashboard;

//set selected filter values
var territoryFilter = revealView.dashboard.filters.getByTitle("Territory");
territoryFilter.selectedValues = [ "Japan", "India" ];
    `
  },
  {
    label: translate({ id: "playground.sidebar.getSelectedFilterValues", message: "Get Selected Filter Values", }),
    code: `
var dashboard = await $.ig.RVDashboard.loadDashboard("Sales");
let revealView = new $.ig.RevealView("#revealView");
revealView.dashboard = dashboard;

//get selected filter values
var territoryFilter = revealView.dashboard.filters.getByTitle("Territory");
var selectedFilterValues = territoryFilter.selectedValues;
console.log(selectedFilterValues);
    `
  },
  {
    label: translate({ id: "playground.sidebar.clearSelectedFilters", message: "Clear Selected Filters", }),
    code: `
var dashboard = await $.ig.RVDashboard.loadDashboard("Sales");
let revealView = new $.ig.RevealView("#revealView");
revealView.dashboard = dashboard;

//get specific filter by title
var territoryFilter = revealView.dashboard.filters.getByTitle("Territory");

//clear filter values
territoryFilter.selectedValues = [];
    `
  },
  {
    label: translate({ id: "playground.sidebar.hideFilters", message: "Hide Filters", }),
    code: `
var dashboard = await $.ig.RVDashboard.loadDashboard("Sales");
let revealView = new $.ig.RevealView("#revealView");
revealView.dashboard = dashboard;

//hide filters
revealView.showFilters = false;
    `
  },
  {
    label: translate({ id: "playground.sidebar.usingDateInterval", message: "Using a Date Interval", }),
    code: `
var dashboard = await $.ig.RVDashboard.loadDashboard("Sales");
let revealView = new $.ig.RevealView("#revealView");
revealView.dashboard = dashboard;

//use the YearToDate filter
revealView.dashboard.dateFilter = new $.ig.RVDateDashboardFilter($.ig.RVDateFilterType.YearToDate);
    `
  },
  {
    label: translate({ id: "playground.sidebar.usingCustomDateRange", message: "Using a Custom Date Range", }),
    code: `
var dashboard = await $.ig.RVDashboard.loadDashboard("Sales");
let revealView = new $.ig.RevealView("#revealView");
revealView.dashboard = dashboard;

//use a custom date range filter
var fromDate = new Date();
fromDate.setDate(fromDate.getDate() - 75);
var toDate = new Date();  
var dateRange = new $.ig.RVDateRange(fromDate, toDate);

revealView.dashboard.dateFilter = new $.ig.RVDateDashboardFilter($.ig.RVDateFilterType.CustomRange, dateRange); 
    `
  },
  {
    type: "html",
    value: translate({ id: "playground.sidebar.header.themes", message: "Themes", }),
    className: "sidebar__header"
  },
  {
    label: translate({ id: "playground.sidebar.setTheme", message: "Set Theme", }),
    code:
      `
//set theme before reveal view is loaded
$.ig.RevealSdkSettings.theme = new $.ig.MountainDarkTheme();

var dashboard = await $.ig.RVDashboard.loadDashboard("Sales");
let revealView = new $.ig.RevealView("#revealView");
revealView.dashboard = dashboard;
      `
  },
  {
    label: translate({ id: "playground.sidebar.refreshTheme", message: "Refresh Theme", }),
    code:
      `
var dashboard = await $.ig.RVDashboard.loadDashboard("Sales");
let revealView = new $.ig.RevealView("#revealView");
revealView.dashboard = dashboard;

//set theme after reveal view has been loaded
$.ig.RevealSdkSettings.theme = new $.ig.MountainDarkTheme();

//refresh reveal view theme
revealView.refreshTheme();
      `
  },
  {
    label: translate({ id: "playground.sidebar.cloneExistingTheme", message: "Clone Existing Theme", }),
    code:
      `
//set theme before reveal view is loaded
$.ig.RevealSdkSettings.theme = cloneCurrentTheme();

var dashboard = await $.ig.RVDashboard.loadDashboard("Sales");
let revealView = new $.ig.RevealView("#revealView");
revealView.dashboard = dashboard;

//clone existing theme
function cloneCurrentTheme() {
  var theme = $.ig.RevealSdkSettings.theme.clone();

  theme.fontColor = "#0000cc";
  theme.accentColor = "#009900";
  theme.dashboardBackgroundColor = "#ffff66";
  theme.visualizationBackgroundColor = "#cccccc";

  theme.chartColors = ["rgb(192, 80, 77)", "rgb(101, 197, 235)", "rgb(232, 77, 137)"];

  return theme;
}
      `
  },
  {
    label: translate({ id: "playground.sidebar.createCustomTheme", message: "Create Custom Theme", }),
    code: `
//set theme before reveal view is loaded
$.ig.RevealSdkSettings.theme = createCustomTheme();

var dashboard = await $.ig.RVDashboard.loadDashboard("Sales");
let revealView = new $.ig.RevealView("#revealView");
revealView.dashboard = dashboard;

//create the custom theme
function createCustomTheme() {
    var theme = new $.ig.RevealTheme();
    theme.fontColor = "#ff0000";
    theme.accentColor = "rgb(192, 80, 77)";
    theme.dashboardBackgroundColor = "#000000";
    theme.visualizationBackgroundColor = "rgb(153, 255, 255)";

    theme.chartColors = ["rgb(192, 80, 77)", "rgb(101, 197, 235)", "rgb(232, 77, 137)"];

    theme.mediumFont = "Gabriola";
    theme.boldFont = "Wingdings";

    return theme;
};
      `
  },
];