## Creating Custom Themes

### Overview

When embedding analytics into your existing applications it is key that those dashboards match your app's look and feel. That's why you have full control over the Reveal dashboards through our SDK.

Key customizations you can achieve with custom themes:

- **Color palettes**: The colors used to show the series in your visualizations. You can add an unlimited number of colors. Once all colors are used in a visualization, Reveal will autogenerate new shades of these colors. This way your colors won’t repeat and each value will have its own color.
- **Accent color**: The default accent color in Reveal is a shade of Blue that you can find in the **+ Dashboard** button and other interactive actions. You can change the color to match the same accent color you use in your applications.
- **Conditional formatting colors**: Change the default colors of the bounds you can set when using conditional formatting.
- **Font**: Reveal uses three types of text in the application: regular, medium and bold. You can specify the font uses for each of these text groups.
- **Visualization and dashboard background colors**: You can configure separately the background color of your dashboard and the background color of the visualizations.

### Common Use Case: A New Custom Theme
Creating your own theme in Reveal is as easy as creating an instance of the new __$.ig.RevealTheme()__ class. This class contains all the customizable settings listed in the overview.

When creating a new __$.ig.RevealTheme__ instance, you will get the default values for each setting and you can modify them as needed.

Then, pass the theme instance to the __updateRevealTheme(theme)__ method. If you have a dashboard or another Reveal component already displayed on your screen, you will need to render it again in order to see the applied changes.

### Common Use Case: Modifying a Custom Theme

You may have already applied your own theme but want to modify some of the settings without losing the changes you made to the others.

In this case, you need to call the __getCurrentTheme()__ method. This method enables you to get the last values you have set for your RevealTheme settings. Unlike the case when you create a new instance of the RevealTheme from scratch, after applying your changes and updating your theme again, you will get the current values for each setting you didn’t modify instead of the default values.

Both the __getCurrentTheme()__ and the __updateRevealTheme(theme)__ methods are accessible through the __$.ig.RevealView__ class.

### Code Example

First, here's a sample dashboard before we make any changes:

![Image showing a Reveal dashboard before any theme changes](images/custom-theme-sample-before.png)

In the following code snippet you can see how to create a new instance of the _revealTheme_ class, apply the changes to the settings you want and update the theme in Reveal Web.

``` js

var revealTheme = new $.ig.RevealTheme();
revealTheme.chartColors = ["rgb(192, 80, 77)", "rgb(101, 197, 235)", "rgb(232, 77, 137)"];

revealTheme.mediumFont = "Gabriola";
revealTheme.boldFont = "Comic Sans MS";
revealTheme.fontColor = "rgb(31, 59, 84)";
revealTheme.accentColor = "rgb(192, 80, 77)";
revealTheme.dashboardBackgroundColor = "rgb(232, 235, 252)";

$.ig.RevealView.updateRevealTheme(revealTheme);

```

> [!NOTE]
> When defining the boldFont, regularFont or mediumFont settings of a reveal theme you need to pass the exact font family name. The weight is defined by the definition of the font itself and not in the name. You might need to use @font-face (CSS property) to make sure the font-face name specified in the $.ig.RevealTheme font settings are available.

In addition, for the fonts customization you need to add these lines to the CSS of the page:

``` CSS

<link href="https://fonts.googleapis.com/css?family=Righteous" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Domine" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Caveat" rel="stylesheet">

```

After implementing the theme changes, below you can see the results for both the Dashboard and Visualization Editors.

![Image showing a Reveal dashboard after theme changes](images/custom-theme-sample-after-dashboard.png)

![Image showing a Reveal visualization after theme changes](images/custom-theme-sample-after-visualization.png)

### Using Color Types

You can use either RGB (red, green, blue) or HEX colors to specify the color settings.

``` js

revealTheme.dashboardBackgroundColor = "rgb(232, 235, 252)";
revealTheme.dashboardBackgroundColor = "#E8EBFC";

```
