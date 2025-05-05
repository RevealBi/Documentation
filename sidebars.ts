import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  webSidebar: [

    /* -------------------- Getting Started -------------------- */
    {
      type: "category", label: "Getting Started", collapsed: false, collapsible: false, className: "sidebar__header", items: [
        { type: "doc", label: "Overview", id: "web/overview" },
        {
          type: "category", label: "Installation", items: [
            { type: "doc", label: "System Requirements", id: "web/system-requirements" },
            { type: "doc", label: "Install Server SDK", id: "web/install-server-sdk" },
            { type: "doc", label: "Install Client SDK", id: "web/install-client-sdk" },
            { type: "doc", label: "Adding a License Key", id: "web/adding-license-key" },
          ]
        },
        {
          type: "category", label: "Getting Started - Server", items: [
            { type: "doc", label: "ASP.NET Web API", id: "web/getting-started-server" },
            { type: "doc", label: "NestJS", id: "web/getting-started-server-nest" },
            { type: "doc", label: "Node.js", id: "web/getting-started-server-node" },
            { type: "doc", label: "Node.js - TypeScript", id: "web/getting-started-server-node-typescript" },
            { type: "doc", label: "Spring Boot - Jersey", id: "web/getting-started-spring-boot-jersey" },
          ]
        },
        {
          type: "category", label: "Getting Started - Client", items: [
            { type: "doc", label: "Angular", id: "web/getting-started-angular" },
            { type: "doc", label: "ASP.NET Core Web App", id: "web/getting-started-aspnet" },
            { type: "doc", label: "HTML/JavaScript", id: "web/getting-started-javascript" },
            { type: "doc", label: "React", id: "web/getting-started-react" },
          ]
        },
      ]
    },

    /* -------------------- General -------------------- */
    {
      type: "category", label: "General", collapsed: false, collapsible: false, className: "sidebar__header", items: [
        { type: "doc", label: "Beta Features", id: "web/beta-features" },
        { type: "doc", label: "Caching", id: "web/caching" },
        { type: "doc", label: "Logging", id: "web/logging" },
        {
          type: "category", label: "Server Export", link: { type: "doc", id: "web/server-export" }, items: [
            { type: "doc", label: "Configure Export", id: "web/configure-export" },
          ]
        },
        { type: "doc", label: "Theming", id: "web/theming-dashboards" },
      ]
    },

    /* -------------------- Using the Reveal View -------------------- */
    {
      type: "category", label: "Using the Reveal View", collapsed: false, collapsible: false, className: "sidebar__header", items: [
        { type: "doc", label: "Creating", id: "web/creating-dashboards" },
        { type: "doc", label: "Loading", id: "web/loading-dashboards" },
        { type: "doc", label: "Filtering", id: "web/filtering-dashboards" },
        { type: "doc", label: "Editing", id: "web/editing-dashboards" },
        { type: "doc", label: "Saving", id: "web/saving-dashboards" },
        { type: "doc", label: "Linking", id: "web/linking-dashboards" },
        { type: "doc", label: "Localizing", id: "web/localizing" },
        { type: "doc", label: "Exporting", id: "web/exporting-dashboards" },
        {
          type: "category", label: "Visualizations", items: [
            { type: "doc", label: "Chart Types", id: "web/chart-types" },
            { type: "doc", label: "Custom Menu Items", id: "web/custom-menu-items" },
            { type: "doc", label: "Custom Visualizations", id: "web/custom-visualizations" },
            { type: "doc", label: "Customizing Map Tiles", id: "web/customizing-map-tiles" },
            { type: "doc", label: "Maximizing Visualizations", id: "web/maximizing-visualizations" },
            { type: "doc", label: "Responding to Click Events", id: "web/click-events" },
            { type: "doc", label: "Tooltips", id: "web/tooltips" },
          ]
        }
      ]
    },

    /* -------------------- Working with Data Sources -------------------- */
    {
      type: "category", label: "Working with Data Sources", collapsed: false, collapsible: false, className: "sidebar__header", items: [
        {
          type: "category", label: "Data Sources", link: { type: "doc", id: "web/datasources" }, items: [
            { type: "doc", label: "Amazon Athena", id: "web/adding-data-sources/amazon-athena" },
            { type: "doc", label: "Amazon S3", id: "web/adding-data-sources/amazon-s3" },
            { type: "doc", label: "CSV", id: "web/adding-data-sources/csv" },
            { type: "doc", label: "Excel File", id: "web/adding-data-sources/excel-file" },
            { type: "doc", label: "Google Big Query", id: "web/adding-data-sources/google-big-query" },
            { type: "doc", label: "Google Drive", id: "web/adding-data-sources/google-drive" },
            { type: "doc", label: "Google Sheets", id: "web/adding-data-sources/google-sheets" },
            { type: "doc", label: "In Memory Data", id: "web/adding-data-sources/in-memory-data" },
            { type: "doc", label: "JSON", id: "web/adding-data-sources/json" },
            { type: "doc", label: "MongoDB", id: "web/adding-data-sources/mongodb" },
            { type: "doc", label: "MS SQL Server", id: "web/adding-data-sources/ms-sql-server" },
            { type: "doc", label: "MySQL", id: "web/adding-data-sources/mysql" },
            { type: "doc", label: "Oracle", id: "web/adding-data-sources/oracle" },
            { type: "doc", label: "PostgreSQL", id: "web/adding-data-sources/postgres" },
            { type: "doc", label: "REST", id: "web/adding-data-sources/rest" },
            { type: "doc", label: "Snowflake", id: "web/adding-data-sources/snowflake" },
          ]
        },
        { type: "doc", label: "Authentication", id: "web/authentication" },
        { type: "doc", label: "Custom Queries", id: "web/custom-queries" },
        { type: "doc", label: "Obfuscate Connection Data", id: "web/obfuscate-connection-data" },
        { type: "doc", label: "User Context", id: "web/user-context" },
      ]
    },

    /* -------------------- Web Component Wrappers  -------------------- */
    {
      type: "category", label: "Web Component Wrappers", collapsed: false, collapsible: false, className: "sidebar__header", items: [
        { type: "doc", label: "Overview", id: "web/web-component-wrappers/index" },
        {
          type: "category", label: "Installation", link: { type: "doc", id: "web/web-component-wrappers/installation" }, items: [
            { type: "doc", label: "Angular", id: "web/web-component-wrappers/installation-angular" },
            { type: "doc", label: "React", id: "web/web-component-wrappers/installation-react" },
          ]
        },
        {
          type: "category", label: "Reveal View", link: { type: "doc", id: "web/web-component-wrappers/reveal-view/index" }, items: [
            { type: "doc", label: "Options", id: "web/web-component-wrappers/reveal-view/options" },
            { type: "doc", label: "Loading Dashboards", id: "web/web-component-wrappers/reveal-view/loading-dashboards" },
          ]
        },
        {
          type: "category", label: "Vizualization Viewer", link: { type: "doc", id: "web/web-component-wrappers/visualization-viewer/index" }, items: [
            { type: "doc", label: "Options", id: "web/web-component-wrappers/visualization-viewer/options" },
          ]
        },
      ]
    },

    /* -------------------- Release Information -------------------- */
    {
      type: "category", label: "Release Information", collapsed: false, collapsible: false, className: "sidebar__header", items: [
        {
          type: "category", label: "Release Notes", link: { type: "doc", id: "web/release-notes" }, items: [
            { type: "doc", label: "1.6.0 Upgrade Guide", id: "web/upgrade-guide-v1.6.0" },
          ]
        },
        { type: "doc", label: "Known Issues", id: "web/known-issues" },
        { type: "doc", label: "Data Limits", id: "web/data-size-limits" },
        { type: "doc", label: "Third-Party Software", id: "web/third-party-software" },
      ]
    },

  ],

  wpfSidebar: [
    /* -------------------- General -------------------- */
    {
      type: "category", label: "General", collapsed: false, collapsible: false, className: "sidebar__header", items: [
        {
          type: "category", label: "Installation", items: [
            { type: "doc", label: "System Requirements", id: "wpf/system-requirements" },
            { type: "doc", label: "Install the Reveal SDK", id: "wpf/installation" },
            { type: "doc", label: "Adding a License Key", id: "wpf/adding-license-key" }
          ]
        },
        { type: "doc", label: "Getting Started", id: "wpf/getting-started" },
      ]
    },

    /* -------------------- Working with Dashboards -------------------- */
    {
      type: "category", label: "Working with Dashboards", collapsed: false, collapsible: false, className: "sidebar__header", items: [
        { type: "doc", label: "Creating", id: "wpf/creating-dashboards" },
        { type: "doc", label: "Loading", id: "wpf/loading-dashboards" },
        { type: "doc", label: "Filtering", id: "wpf/filtering-dashboards" },
        { type: "doc", label: "Editing", id: "wpf/editing-dashboards" },
        { type: "doc", label: "Saving", id: "wpf/saving-dashboards" },
        { type: "doc", label: "Linking", id: "wpf/linking-dashboards" },
        { type: "doc", label: "Formatting Data", id: "wpf/formatting-data" },
        { type: "doc", label: "Localizing", id: "wpf/localizing-dashboards" },
        { type: "doc", label: "Exporting", id: "wpf/exporting-dashboards" },
        { type: "doc", label: "Theming", id: "wpf/theming-dashboards" },
      ]
    },

    /* -------------------- Working with Data Sources -------------------- */
    {
      type: "category", label: "Working with Data Sources", collapsed: false, collapsible: false, className: "sidebar__header", items: [
        {
          type: "category", label: "Data Sources", link: { type: "doc", id: "wpf/datasources" }, items: [
            { type: "doc", label: "Excel File", id: "wpf/adding-data-sources/excel-file" },
            { type: "doc", label: "In Memory Data", id: "wpf/adding-data-sources/in-memory-data" },
            { type: "doc", label: "MS SQL Server", id: "wpf/adding-data-sources/ms-sql-server" },
          ]
        },
        {
          type: "category", label: "Replacing Data Sources", items: [
            { type: "doc", label: "Excel File", id: "wpf/replacing-data-sources/excel-file" },
            { type: "doc", label: "MS SQL Server", id: "wpf/replacing-data-sources/ms-sql-server" },
          ]
        },
        { type: "doc", label: "Authentication", id: "wpf/authentication" },
      ]
    },

    /* -------------------- Working with Visualizations -------------------- */
    {
      type: "category", label: "Working with Visualizations", collapsed: false, collapsible: false, className: "sidebar__header", items: [
        { type: "doc", label: "Chart Types", id: "wpf/chart-types" },
        { type: "doc", label: "Maximizing Visualizations", id: "wpf/maximizing-visualizations" },
        { type: "doc", label: "Responding to Click Events", id: "wpf/click-events" },
        { type: "doc", label: "Tooltips", id: "wpf/tooltips" },
      ]
    },

    /* -------------------- Release Information -------------------- */
    {
      type: "category", label: "Release Information", collapsed: false, collapsible: false, className: "sidebar__header", items: [
        {
          type: "category", label: "Release Notes", link: { type: "doc", id: "wpf/release-notes" }, items: [
            { type: "doc", label: "1.6.0 Upgrade Guide", id: "wpf/upgrade-guide-v1.6.0" },
          ]
        },
        { type: "doc", label: "Known Issues", id: "wpf/known-issues" },
        { type: "doc", label: "Third-Party Software", id: "wpf/third-party-software" },
      ]
    },
  ],
  
    userSideBar: [
    {
      type: "category", label: "Dashboards", collapsed: false, collapsible: false, className: "sidebar__header", items: [
        {
          type: "category", label: "Exporting", link: { type: "doc", id: "user/dashboard-export" }, items: [
            { type: "doc", label: "Exporting to PDF", id: "user/dashboard-export-pdf" },
            { type: "doc", label: "Exporting to Excel", id: "user/dashboard-export-excel" },
            { type: "doc", label: "Exporting to Image", id: "user/dashboard-export-image" },
            { type: "doc", label: "Exporting to PowerPoint", id: "user/dashboard-export-powerpoint" },
          ],
        },
        { type: "doc", label: "Linking", id: "user/dashboard-linking" }
      ]
    },

    {
      type: "category", label: "Visualizations", collapsed: false, collapsible: false, className: "sidebar__header", items: [
        { type: "doc", label: "Overview", id: "user/visualizations-overview" },
        { type: "doc", label: "Visualization Editor", id: "user/visualization-editor" },
        { type: "category", label: "Chart Types", items: [
          { type: "doc", label: "Category", id: "user/chart-types/category-charts" },
          { type: "category", label: "Choropleth ", link: { type: "doc", id: "user/chart-types/choropleth-map" }, items: [
            { type: "doc", label: "Location Data", id: "user/chart-types/location-data-requirements" },
            { type: "doc", label: "Settings", id: "user/chart-types/settings-choropleth-map" },
          ]},
          { type: "doc", label: "Combo", id: "user/chart-types/combo-charts" },
          { type: "doc", label: "Financial", id: "user/chart-types/financial-charts" },
          { type: "doc", label: "Gauges", id: "user/chart-types/gauge-charts" },
          { type: "doc", label: "Grid", id: "user/chart-types/grid-chart" },
          { type: "doc", label: "Image", id: "user/chart-types/image-chart" },
          { type: "doc", label: "KPI", id: "user/chart-types/kpi-gauge" },
          { type: "doc", label: "Pivot", id: "user/chart-types/pivot-table" },
          { type: "doc", label: "Radial", id: "user/chart-types/radial-charts" },
          { type: "doc", label: "Scatter and Bubble", id: "user/chart-types/scatter-bubble-charts" },
          { type: "doc", label: "Scatter Map", id: "user/chart-types/scatter-map" },
          { type: "doc", label: "Sparkline", id: "user/chart-types/sparkline-charts" },
          { type: "doc", label: "Text Box", id: "user/chart-types/text-box" },
          { type: "doc", label: "Text View", id: "user/chart-types/text-view" },
          { type: "doc", label: "Time Series", id: "user/chart-types/time-series-charts" },
          { type: "doc", label: "Tree Map", id: "user/chart-types/treemap-charts" },
        ]},


        { type: "category", label: "Fields ", link: { type: "doc", id: "user/fields/overview" }, items: [
          { type: "doc", label: "Field Settings", id: "user/fields/field-settings" },
          { type: "doc", label: "Sort by Field", id: "user/fields/sort-by-field" },
          { type: "doc", label: "Ad-Hoc Hierarchies", id: "user/fields/adhoc-hierarchies" },
          { type: "doc", label: "Conditional Formatting", id: "user/fields/conditional-formatting" },
          { type: "doc", label: "Field Filters and Rules", id: "user/fields/field-filters-rules" },
          { type: "category", label: "Calculated Fields ", link: { type: "doc", id: "user/fields/calculated/overview" }, items: [
            { type: "doc", label: "Aggregation", id: "user/fields/calculated/aggregation" },
            { type: "doc", label: "Date", id: "user/fields/calculated/date" },
            { type: "doc", label: "Information", id: "user/fields/calculated/information" },
            { type: "doc", label: "Logic", id: "user/fields/calculated/logic" },
            { type: "doc", label: "Lookup & Reference", id: "user/fields/calculated/lookup-reference" },
            { type: "doc", label: "Math", id: "user/fields/calculated/math" },
            { type: "doc", label: "String", id: "user/fields/calculated/string" },
            { type: "doc", label: "Samples and Tips", id: "user/fields/calculated/samples" },
          ]},
        ]},

        { type: "doc", label: "Reusing Visualizations", id: "user/reusing-visualizations" },
        { type: "doc", label: "Statistical Functions", id: "user/statistical-functions" },
      ]
    },

    {
      type: "category", label: "Filters", collapsed: false, collapsible: false, className: "sidebar__header", items: [
        { type: "doc", label: "Overview", id: "user/filters-overview" },
        { type: "doc", label: "Dashboard Filters", id: "user/filters-dashboard" },
        { type: "doc", label: "Dashboard Filter Properties", id: "user/filters-dashboard-properties" },
        { type: "doc", label: "Connecting Filters", id: "user/filters-connecting" },
        { type: "doc", label: "Date Range Filter", id: "user/filters-date-range" },
        { type: "doc", label: "Visualization Filters", id: "user/filters-visualization" },
      ]
    },

    {
      type: "category", label: "Tutorials", collapsed: false, collapsible: false, className: "sidebar__header", items: [
        { type: "doc", label: "Overview", id: "user/tutorials-overview" },
        { type: "doc", label: "Candlestick Charts", id: "user/tutorials-candlestick" },
        { type: "doc", label: "Gauge Charts", id: "user/tutorials-gauge" },
        { type: "doc", label: "Image Charts", id: "user/tutorials-image" },
        { type: "doc", label: "KPI Gauges", id: "user/tutorials-kpi-gauge" },
        { type: "doc", label: "OHLC Charts", id: "user/tutorials-ohlc" },
        { type: "doc", label: "Simple-Series Charts", id: "user/tutorials-simple-charts" },
        { type: "doc", label: "Sparkline Charts", id: "user/tutorials-sparkline-charts" },
        { type: "doc", label: "Stacked Charts", id: "user/tutorials-stacked-charts" },
        { type: "doc", label: "Text View", id: "user/tutorials-text-view" },
      ]
    },
  ],
};

export default sidebars;

