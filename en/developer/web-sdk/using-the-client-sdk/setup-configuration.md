### Setup and Configuration

To set up the Reveal Web Client SDK you need to:

1.  [**Check Dependencies**](#check-dependencies).

2.  [**Reference the Web Client SDK**](#reference-web-client-sdk).

3.  [**Instantiate the Web Client SDK**](#markdown-header-instantiating-the-web-client-sdk).

4.  *(Optional)* [**Configure Support for React /
    Angular**](#web-component-support).

### 1\. Checking Dependencies

The Reveal Web Client SDK has the following 3rd party references:

  - [jQuery](https://jquery.com) 2.2 or greater
  - [Day.js](https://day.js.org) 1.8.15 or greater
  - [Quill RTE](https://quilljs.com/) 1.3.6 or greater


### 2\. Referencing the Web Client SDK

Enabling the __$.ig.RevealView__ component in a web page requires several scripts to be included. These scripts will be provided as part of Reveal Web Client SDK.

``` html
<script src="~/Reveal/infragistics.reveal.js"></script>
```

JavaScript files can be found in
"\<InstallationDirectory\>\\SDK\\Web\\JS\\Client".

### 7. Instantiating the Web Client SDK

Reveal’s Dashboard presentation is handled natively through the Web Client SDK.

To get started, follow these steps:

1.  Define a \<div /\> element with “id” and invoke the
    __$.ig.RevealView__
    constructor.

2.  Create an instance of
    __$.ig.RevealSettings__
    providing the \_dashboardId\</emphasis\> in the constructor.

3.  Call
    __$.ig.RevealUtility.loadDashboard__
    providing the *dashboardId* and success and error handlers.

    1.  In the success handler you should use the retrieved dashboard
        and set it to the dashboard property of the
        __$.ig.RevealSettings__
        object.

4.  Finally, instantiate the
    [$.ig.RevealView\*](api-reference-client-web.html#_revealview) component
    by passing two parameters. One is a selector for the DOM element
    where the dashboard should be rendered into, and the other one is
    the settings object.

#### Sample Code

``` html
<!DOCTYPE html>
<html>
<head>
    ⋮
    <script type="text/javascript">
        var dashboardId = "dashboardId";
        var revealSettings = new $.ig.RevealSettings(dashboardId);

        $.ig.RevealUtility.loadDashboard(dashboardId, function (dashboard) {
            revealSettings.dashboard = dashboard;
            var revealView = new $.ig.RevealView("#revealView", revealSettings);
        }, function (error) {
        //Process any error that might occur here
        });
    </script>
</head>
<body>
    <div id="revealView" style="height:500px;" />
</body>
</html>
```

### 4\. *(Optional)* Configuring Support for React / Angular

On the front end, Reveal provides a Web Component that provides
compatibility with Angular and React.

The following snippet shows what you need to add on the client side:

``` html
<script src="~/Reveal/reveal-webComponent.js"></script>
<section>
    <reveal-view dashboard-name="Sales" can-edit="" editing="" show-menu="" can-add-visualization=""</reveal-view>
</section>
```

Please note that the Web Component also requires other dependencies to
be included (jQuery 2.2+ and Infragistics.reveal.js).

You can find the following two JS files at
"\<InstallationDirectory\>\\Web\\JS":

  - **reveal-webComponent.js**

  - **reveal-WebComponent-ie11.js**

#### IE11 support

Alternatively, you may want to support IE11 users. In that case, the
following snippet should work fine in almost any browser:

``` html
@section Scripts {
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.4.4/polyfill.min.js"></script>
    <script src="https://unpkg.com/@@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
    <script src="~/Reveal/reveal-webComponent-ie11.js"></script>
}
<section>
    <reveal-view dashboard-name="Sales"></reveal-view>
```

However, if you want better front end performance and don’t care about
IE11, you should check the other snippet above and use
**reveal-webComponent.js** instead)
