---
title: How to Use mage Tiles with Scatter Maps
_description: Learn all about the image tile feature that will allow you to switch to a different map layer upon zooming.
---

# Using Image Tiles with Scatter Maps

The *image tiles* feature allows you to switch from the clear grey background of Reveal to a different map layer upon zooming. The additional detail coming from the map service provider will provide more context to your analysis.

<img src="images/scatter-map-zoomed-tile-providers.png" alt="Scatter map in Dashboard View mode using zoom" class="responsive-img"/>

You can use the *slider* provided in the *Visualization Editor Settings* to specify at which zoom level you want to transition to using image tiles. Sliding left to right changes the moment of transition from minimum to maximum zoom. 
 
<img src="images/tile-source-zoom-slider.png" alt="Zoom level slider in the Visualization Editor Settings" class="responsive-img"/>


<a name='adding-image-tiles'></a>
## Adding Image Tiles to Your Maps

To use image tiles:  

1. In the _Visualization Editor_, go to _Settings_ > _Background_ and make sure _Use Image Tiles_ box is checked.  
2. If no tile provider is configured, click the button in the banner that shows up (see screenshot below). 

    <img src="images/configure-tile-provide-banner-button.png" alt="Yellow banner in settings prompting users to configure a tile provider on member or organization level" class="responsive-img"/>
   
    Here you are presented with three levels to configure a tile provider at: 

    * *Member*
    * *Workspace* - this option only appears when you creatе the dashboard inside a workspace
    * *Organization* - this option will only appear, if you are part of the Organization workspace or you creatе the dashboard inside a workspace, which is part of the Organization.

3. Choose the level you prefer to set up a tile provider. 

    The dialog that opens is similar for all levels. You can also find this dialog anytime in your *personal settings* or your *workspace's/Organization's settings*. 

    <img src="images/tile-provider-settings-personal.png" alt="Map Image Tiles Personal settings" class="responsive-img"/>

    >[!NOTE] **Setting up a tile provider at Organizational/workspace level**. 
    > You can configure a tile provider at the Organizational or workspace level only if you are an *Owner* in the Organization/workspace. This will allow all members of this workspace/Organization use the tile provider you configured. 

4. For _Provider_ choose one of the options in the dropdown: 

    * *Esri*
    * *Bing*
    * *MapBox*
    * If you choose the *None* option you will disable the tile provider at this level, but Reveal will let others know about this (shown in the screenshot below).

        <img src="images/provider-disabled-note.png" alt="A Message stating the following: This map is not displayed as intended. You could turn on image tiles by setting up a tile provider." class="responsive-img"/>
     
    * The *Not Specified* option will also disable using a tile provider at the selected level (personal, workspace or organizational), but without notifying other users. You will only see the following banner if the _Not Specified_ option is selected at all levels: 
    
        <img src="images/not-specified-all-levels-yellow-banner.png" alt="Yellow banner message prompting users to set up a tile provider" class="responsive-img"/>
    
    The _Not Specified_ option, however, makes Reveal ignore this level when determining which tile provider to use. For further details, check [How does Reveal determine which tile source provider to use?](#resolution-process).  
 
5. Add the _Authentication Token_ for the selected provider. The token can be found in your map service account. Once you add it, it will be stored in Reveal for future use. You can use it without adding it again no matter how many times you disable the tile provider in your settings.  

6. For *Personal settings*, just close the dialog and your changes will be automatically updated. For *Organization/Workspace settings*, click/tap *Update* and close the dialog.

<a name='resolution-process'></a>
## How does Reveal determine which file provider to use?

When you open a scatter map where *Use Image Tiles* is enabled, Reveal resolves which tile provider to be used. The tile provider (and its authorization token) can be specified on any of three levels of user settings: Personal, Workspace, Organization (see more in [Adding Image Tiles](#adding-image-tiles) above). 

What if a tile provider is **specified on more than one level**? You will notice that one of the tile providers is being used for the scatter map you opened. How did Reveal choose it? 

The most important factor in determining which level settings take precedence over the others is who owns the dashboard. A dashboard can be owned by a user, the Organization, or a workspace. 

### When the dashboard is owned by a user or by the Organization

When the dashboard is owned by a user (it's created in the _My Stuff_ space), or by the Organization (it's created in the Organization dashboards' space), Reveal checks for a tile provider, as follows: 

1. In the *Organization* workspace settings, if the user is part of an Organization.
2. In *Personal* settings of the user opening the dashboard. 

### When the dashboard is owned by a Workspace 

When the dashboard is owned by a workspace, i.e. it's created in a workspace dashboards' space, Reveal checks for a tile provider: 

1. In this *Workspace*'s settings.
2. In the *Organization* settings when the owning workspace is *part of the Organization*.
3. In *Personal* settings of the user opening the dashboard.

>[!NOTE] **Always use my tile provider**. 
> Marking this checkbox in your personal settings makes Reveal always choose your tile provider when tile providers on multiple levels are configured. This goes for all the scenarios above. 

