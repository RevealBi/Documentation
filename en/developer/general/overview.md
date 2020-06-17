## Reveal SDK Overview

When installing Reveal's SDK, you install the Web SDK and Desktop SDK at the same time.

- **Desktop SDK** - Reveal Desktop SDK allows you to embed Reveal inside an external (host) Windows application (WPF or WinForms).

- **Web SDK** - Reveal Web SDK allows you to embed Reveal inside an external (host) web application.
The SDK for embedding the Reveal web viewer includes two components:
  * Reveal Web Client SDK,
  * Reveal Web Server SDK.

### Main Features
With Reveal SDK, developers can embed Reveal into their applications. And dashboards
can be displayed and even modified by end users.

Reveal SDK can be used to integrate Reveal into applications developed in multiple platforms
and technologies: Web, Windows WPF, and Windows Forms.

The containing app can use Reveal SDK to:

- Provide in-memory data to dashboards. If data is already loaded in the containing app
there’s no need to store it before opening the dashboard, Reveal can use the built-in InMemory data provider to use that data as the input for the dashboard.
- Configure the dashboard before it gets rendered, for example changing the name of the
database or table to use to get the data based on the current user.
- Change dashboard filters before the dashboard gets rendered or even while it’s visible.
The containing app can use this feature to synchronize filters or selections in the app
with the data visualized in the dashboard.
- Get notified when a data point is selected in the dashboard (like a bar in a chart is
clicked), for example to display additional information or trigger an action in the app like
navigating to a page with more details.
- And many other features...
