import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  webSidebar: [

    /* -------------------- Get Started -------------------- */
    {
      type: "category", label: "Get Started", collapsed: false, collapsible: false, className: "sidebar__header", items: [
        { type: "doc", label: "Overview", key: "web-overview", id: "web/overview" },
        { type: "doc", label: "Concepts", id: "web/concepts" },
        {
          type: "category", label: "Installation", key: "installation", items: [
            { type: "doc", label: "System Requirements", id: "web/system-requirements" },
            { type: "doc", label: "Install Server SDK", id: "web/install-server-sdk" },
            { type: "doc", label: "Install Client SDK", id: "web/install-client-sdk" },
            { type: "doc", label: "License Key", id: "web/adding-license-key" },
          ]
        },
        {
          type: "category", label: "Quickstart — Server", key: "quickstart-server", items: [
            { type: "doc", label: "ASP.NET Web API", id: "web/getting-started-server" },
            { type: "doc", label: "NestJS", id: "web/getting-started-server-nest" },
            { type: "doc", label: "Node.js", id: "web/getting-started-server-node" },
            { type: "doc", label: "Node.js — TypeScript", id: "web/getting-started-server-node-typescript" },
            { type: "doc", label: "Spring Boot", id: "web/getting-started-spring-boot" },
          ]
        },
        {
          type: "category", label: "Quickstart — Client", key: "quickstart-client", items: [
            { type: "doc", label: "Angular", id: "web/getting-started-angular" },
            { type: "doc", label: "ASP.NET Core Web App", id: "web/getting-started-aspnet" },
            { type: "doc", label: "HTML / JavaScript", id: "web/getting-started-javascript" },
            { type: "doc", label: "React", id: "web/getting-started-react" },
          ]
        },
      ]
    },

    /* -------------------- Embedding --------------------
     * Embed a Dashboard and Embed a Single Visualization are the canonical
     * topics. Loading/Creating/Saving remain as transitional pages for now —
     * they cover server-side IRVDashboardProvider patterns that will move
     * to a dedicated Dashboard Provider topic under Connect Data.
     */
    {
      type: "category", label: "Embedding", collapsed: false, collapsible: false, className: "sidebar__header", items: [
        { type: "doc", label: "Embed a Dashboard", id: "web/embedding/dashboard" },
        { type: "doc", label: "Embed a Single Visualization", id: "web/embedding/single-visualization" },
        { type: "doc", label: "Loading", id: "web/loading-dashboards" },
        { type: "doc", label: "Creating", id: "web/creating-dashboards" },
        { type: "doc", label: "Saving", id: "web/saving-dashboards" },
      ]
    },

    /* -------------------- Common Patterns --------------------
     * Scenario recipes (1-page each). Files under docs/web/scenarios/.
     * Existing feature pages (Click Events, Filtering, Linking, Theming,
     * Localization) live here as transitional placeholders and will be
     * rewritten as scenarios in upcoming sub-PRs.
     */
    {
      type: "category", label: "Common Patterns", collapsed: false, collapsible: false, className: "sidebar__header",
      link: { type: "doc", id: "web/scenarios/index" },
      items: [
        { type: "doc", label: "Read-only Embed", id: "web/scenarios/view-only-embed" },
        { type: "doc", label: "Editor on Load (Kiosk)", id: "web/scenarios/editor-on-load-kiosk" },
        { type: "doc", label: "Custom Save Destination", id: "web/scenarios/custom-save-workflow" },
        { type: "doc", label: "Locked-down Export Menu", id: "web/scenarios/locked-down-export" },
        { type: "doc", label: "Filtering", id: "web/filtering-dashboards" },
        { type: "doc", label: "Linking", id: "web/linking-dashboards" },
        { type: "doc", label: "Click Events", id: "web/click-events" },
        { type: "doc", label: "Theming", id: "web/theming-dashboards" },
        { type: "doc", label: "Localization", id: "web/localizing" },
      ]
    },

    /* -------------------- Connect Data -------------------- */
    {
      type: "category", label: "Connect Data", collapsed: false, collapsible: false, className: "sidebar__header", items: [
        { type: "doc", label: "Overview", key: "data-sources-overview", id: "web/datasources" },
        { type: "doc", label: "Authentication", id: "web/authentication" },
        { type: "doc", label: "User Context", id: "web/user-context" },
        { type: "doc", label: "Custom Queries", id: "web/custom-queries" },
        { type: "doc", label: "Obfuscate Connection Data", id: "web/obfuscate-connection-data" },
        {
          type: "category", label: "Connectors", key: "connectors", items: [
            { type: "doc", label: "Amazon Athena", id: "web/adding-data-sources/amazon-athena" },
            { type: "doc", label: "Amazon S3", id: "web/adding-data-sources/amazon-s3" },
            { type: "doc", label: "ClickHouse", id: "web/adding-data-sources/clickhouse" },
            { type: "doc", label: "Cosmos DB", id: "web/adding-data-sources/azure-cosmos-db" },
            { type: "doc", label: "CSV", id: "web/adding-data-sources/csv" },
            { type: "doc", label: "Databricks", id: "web/adding-data-sources/databricks" },
            { type: "doc", label: "Elasticsearch", id: "web/adding-data-sources/elasticsearch" },
            { type: "doc", label: "Excel File", id: "web/adding-data-sources/excel-file" },
            { type: "doc", label: "Google Big Query", id: "web/adding-data-sources/google-big-query" },
            { type: "doc", label: "Google Sheets", id: "web/adding-data-sources/google-sheets" },
            { type: "doc", label: "In Memory Data", id: "web/adding-data-sources/in-memory-data" },
            { type: "doc", label: "JSON", id: "web/adding-data-sources/json" },
            { type: "doc", label: "MariaDB", id: "web/adding-data-sources/mariadb" },
            { type: "doc", label: "MongoDB", id: "web/adding-data-sources/mongodb" },
            { type: "doc", label: "MS SQL Server", id: "web/adding-data-sources/ms-sql-server" },
            { type: "doc", label: "MySQL", id: "web/adding-data-sources/mysql" },
            { type: "doc", label: "Oracle", id: "web/adding-data-sources/oracle" },
            { type: "doc", label: "PostgreSQL", id: "web/adding-data-sources/postgres" },
            { type: "doc", label: "REST", id: "web/adding-data-sources/rest" },
            { type: "doc", label: "Snowflake", id: "web/adding-data-sources/snowflake" },
          ]
        },
      ]
    },

    /* -------------------- Export and Share -------------------- */
    {
      type: "category", label: "Export and Share", collapsed: false, collapsible: false, className: "sidebar__header", items: [
        { type: "doc", label: "End-User Export", id: "web/exporting-dashboards" },
        { type: "doc", label: "Server-Side Export", id: "web/server-export" },
        { type: "doc", label: "Configure Server Export", id: "web/configure-export" },
      ]
    },

    /* -------------------- Server Configuration -------------------- */
    {
      type: "category", label: "Server Configuration", collapsed: false, collapsible: false, className: "sidebar__header", items: [
        { type: "doc", label: "Caching", id: "web/caching" },
        { type: "doc", label: "Logging", id: "web/logging" },
      ]
    },

    /* -------------------- Reference --------------------
     * Lookup-shaped content. Custom Visualizations, Custom Menu Items,
     * Customizing Map Tiles, Tooltips, Maximizing, Editor Events, and
     * Chart Types all live here as feature topics — the kind of thing
     * a developer comes to look up rather than read end-to-end.
     */
    {
      type: "category", label: "Reference", collapsed: false, collapsible: false, className: "sidebar__header", items: [
        { type: "doc", label: "Editor Events", id: "web/editor-events" },
        { type: "doc", label: "Chart Types", id: "web/chart-types" },
        { type: "doc", label: "Custom Visualizations", id: "web/custom-visualizations" },
        { type: "doc", label: "Custom Menu Items", id: "web/custom-menu-items" },
        { type: "doc", label: "Customizing Map Tiles", id: "web/customizing-map-tiles" },
        { type: "doc", label: "Tooltips", id: "web/tooltips" },
        { type: "doc", label: "Maximizing", id: "web/maximizing-visualizations" },
        { type: "doc", label: "Data Limits", id: "web/data-size-limits" },
        { type: "doc", label: "Beta Features", id: "web/beta-features" },
        { type: "doc", label: "Accessibility", id: "web/accessibility" },
        { type: "doc", label: "Known Issues", id: "web/known-issues" },
        { type: "doc", label: "Third-Party Software", id: "web/third-party-software" },
      ]
    },

    /* -------------------- Releases -------------------- */
    {
      type: "category", label: "Releases", collapsed: false, collapsible: false, className: "sidebar__header", items: [
        { type: "doc", label: "Release Notes", id: "web/release-notes" },
        { type: "doc", label: "2.0.0 Upgrade Guide", id: "web/upgrade-guide-v2.0.0" },
      ]
    },

  ],

  /* ===================================================================
   *  Web Components (Angular / React) — separate experimental sibling
   *  project; not part of the core Web SDK. Surfaced as its own top-level
   *  navbar entry so its status is not conflated with the core jQuery
   *  RevealView product.
   * =================================================================== */
  webComponentsSidebar: [
    {
      type: "category", label: "Web Components", collapsed: false, collapsible: false, className: "sidebar__header", items: [
        { type: "doc", label: "Overview", key: "web-components-overview", id: "web-components/index" },
        {
          type: "category", label: "Installation", key: "web-components-installation", link: { type: "doc", id: "web-components/installation" }, items: [
            { type: "doc", label: "Angular", key: "web-components-installation-angular", id: "web-components/installation-angular" },
            { type: "doc", label: "React", key: "web-components-installation-react", id: "web-components/installation-react" },
          ]
        },
        {
          type: "category", label: "Reveal View", key: "web-components-reveal-view", link: { type: "doc", id: "web-components/reveal-view/index" }, items: [
            { type: "doc", label: "Options", key: "web-components-reveal-view-options", id: "web-components/reveal-view/options" },
            { type: "doc", label: "Loading Dashboards", key: "web-components-reveal-view-loading-dashboards", id: "web-components/reveal-view/loading-dashboards" },
          ]
        },
        {
          type: "category", label: "Visualization Viewer", key: "web-components-visualization-viewer", link: { type: "doc", id: "web-components/visualization-viewer/index" }, items: [
            { type: "doc", label: "Options", key: "web-components-visualization-viewer-options", id: "web-components/visualization-viewer/options" },
          ]
        },
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
        { type: "doc", label: "Overview", key: "user-visualizations-overview", id: "user/visualizations-overview" },
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
        { type: "doc", label: "Overview", key: "user-filters-overview", id: "user/filters-overview" },
        { type: "doc", label: "Dashboard Filters", id: "user/filters-dashboard" },
        { type: "doc", label: "Dashboard Filter Properties", id: "user/filters-dashboard-properties" },
        { type: "doc", label: "Connecting Filters", id: "user/filters-connecting" },
        { type: "doc", label: "Date Range Filter", id: "user/filters-date-range" },
        { type: "doc", label: "Visualization Filters", id: "user/filters-visualization" },
      ]
    },

    {
      type: "category", label: "Tutorials", collapsed: false, collapsible: false, className: "sidebar__header", items: [
        { type: "doc", label: "Overview", key: "user-tutorials-overview", id: "user/tutorials-overview" },
        { type: "doc", label: "Candlestick Charts", id: "user/tutorials-candlestick" },
        { type: "doc", label: "Gauge Charts", id: "user/tutorials-gauge" },
        { type: "doc", label: "Image Charts", id: "user/tutorials-image" },
        { type: "doc", label: "KPI Gauges", id: "user/tutorials-kpi-gauge" },
        { type: "doc", label: "OHLC Charts", id: "user/tutorials-ohlc" },
        { type: "doc", label: "Simple-Series Charts", id: "user/tutorials-simple-charts" },
        { type: "doc", label: "Sparkline Charts", id: "user/tutorials-sparkline-charts" },
        { type: "doc", label: "Stacked Charts", id: "user/tutorials-stacked-charts" },
        { type: "doc", label: "Text View", key: "user-tutorials-text-view", id: "user/tutorials-text-view" },
      ]
    },
  ],

  aiSidebar: [

    /* -------------------- Getting Started -------------------- */
    {
      type: "category", label: "Getting Started", collapsed: false, collapsible: false, className: "sidebar__header", key: "ai-getting-started-header", items: [
        { type: "doc", label: "Overview", id: "ai/overview" },
        {
          type: "category", label: "Installation", items: [
            { type: "doc", label: "System Requirements", id: "ai/system-requirements" },
            { type: "doc", label: "Install Server SDK", id: "ai/install-server-sdk" },
            { type: "doc", label: "Install Client SDK", id: "ai/install-client-sdk" },
          ]
        },
        { type: "doc", label: "Getting Started - HTML/JS", id: "ai/getting-started-html" },
      ]
    },

    /* -------------------- Providers -------------------- */
    {
      type: "category", label: "Providers", collapsed: false, collapsible: false, className: "sidebar__header", items: [
        { type: "doc", label: "Overview", key: "ai-providers-overview", id: "ai/providers-overview" },
        { type: "doc", label: "OpenAI", id: "ai/providers-openai" },
        { type: "doc", label: "Azure OpenAI", id: "ai/providers-azure-openai" },
        { type: "doc", label: "Anthropic", id: "ai/providers-anthropic" },
        { type: "doc", label: "Google Gemini", id: "ai/providers-google-gemini" },
        { type: "doc", label: "Custom Endpoints", id: "ai/providers-custom-endpoints" },
        { type: "doc", label: "Building a Custom Provider", id: "ai/providers-building-custom" },
      ]
    },

    /* -------------------- Metadata -------------------- */
    {
      type: "category", label: "Metadata", collapsed: false, collapsible: false, className: "sidebar__header", items: [
        { type: "doc", label: "Metadata Catalog", id: "ai/metadata-catalog" },
        // { type: "doc", label: "Metadata Service", id: "ai/metadata-service" },
        // { type: "doc", label: "Custom Context Providers", id: "ai/metadata-custom-context-providers" },
      ]
    },

    /* -------------------- Using the SDK -------------------- */
    {
      type: "category", label: "Using the SDK", collapsed: false, collapsible: false, className: "sidebar__header", items: [
        { type: "doc", label: "Overview", key: "ai-sdk-overview", id: "ai/sdk-overview" },
        { type: "doc", label: "Insights", id: "ai/sdk-insights" },
        { type: "doc", label: "Chat", id: "ai/sdk-chat" },
        { type: "doc", label: "Streaming Responses", id: "ai/sdk-streaming" },
        { type: "doc", label: "Error Handling", id: "ai/sdk-error-handling" },
      ]
    },

    /* -------------------- API Reference -------------------- */
    {
      type: "category", label: "API Reference", collapsed: false, collapsible: false, className: "sidebar__header", items: [
        { type: "doc", label: "Insights Endpoint", id: "ai/insights" },
        { type: "doc", label: "Chat Endpoint", id: "ai/chat" },
      ]
    },

    /* -------------------- Guides -------------------- */
    {
      type: "category", label: "Guides", collapsed: false, collapsible: false, className: "sidebar__header", items: [
        { type: "doc", label: "Insights with Context Menus", id: "ai/guide-insights-context-menus" },
        { type: "doc", label: "Building a Chat Interface", id: "ai/guide-chat-interface" },
        { type: "doc", label: "Streaming Markdown Display", id: "ai/guide-streaming-display" },
      ]
    },

    /* -------------------- Release Information -------------------- */
    // Uncomment when release docs are added:
    // {
    //   type: "category", label: "Release Information", collapsed: false, collapsible: false, className: "sidebar__header", items: [
    //     { type: "doc", label: "Release Notes", id: "ai/release-notes" },
    //     { type: "doc", label: "Known Issues", id: "ai/known-issues" },
    //   ]
    // },

  ],
};

export default sidebars;

