## How to prepare Your Data for a Choropleth Map. Location Data Requirements

*Location names* column in your data set has to match the actual geographic units on the selected map. If for example, the column contains name of countries, but you want to use the USA states map, you will see the "_There is no data to display_" error on the screen. Find more about this error in [Troubleshooting Errors](#troubleshooting-choropleth-map) below.

<a name='location-formats'></a>
### Location Formats
To have your location column recognized by Reveal, provide one of the following formats:

 - *names* of countries and their subdivisions (provinces, states, departments, regions, etc.) - comply with the official spelling in English or another supported language. Find more information about supported languages in [My Data Source Is Not in English](#data-not-in-english) below.
 - *three-letter country codes* defined by [ISO 3166-1 alpha-3](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) standard; 
 - [*two-letter US state abbreviations*](https://pe.usps.com/text/pub28/28apb.htm) established by USPS;
 - *[county name, state name] format* e.g., _Seneca, New York_. You can use this format for USA maps, which include counties.
 - *[county name, state abbreviation] format* e.g., _Seneca, NY_. This is another format recognized for USA maps, which include counties.

Be consistent with the format you provide. Do not mix full names and codes in the same column. However, there is an exception for some ***very commonly used country abbreviations***. Below, you will find a list of abbreviated country names that you can mix with countries' full names in your location column and still have them recognized by Reveal.

| Country Full Name        | Accepted Abbreviation |
|--------------------------|-----------------------|
| United States            | USA                   |
| United Kingdom           | UK                    |
| United Arab Emirates     | UAE                   |
| South Korea              | S. Korea              |
| South Africa             | S. Africa             |
| North Korea              | N. Korea              |
| North Macedonia          | N. Macedonia          |
| Northern Cyprus          | N. Cyprus             |
| Central African Republic | Central African Rep.  |
| N. Mariana Island        | N. Mariana Is.        |
| U.S. Virgin Island       | U.S. Virgin Is.       |
| South Sandwich Islands   | South Sandwich Is.    |
| British Indian Teritory  | British Indian Ter.   |
| Falkland Island          | Falkland Is.          |
| British Virgin Island    | BVI                   |
| Trinidad and Tobago      | Trin./Tob             |
| Solomon Islands          | Solomon Is.           |
| St. Pierre and Miquelon  | St. Pierre            |
| Fr. S. Antarctic Lands   | Fr. S. Antarctic      |
| Equatorial Guinea        | Eq. Guinea            |

<a name='troubleshooting-choropleth-map'></a>
### Troubleshooting Errors

The Choropleth map was designed to find any match that is available. This way, you'll see a map with partial results doesn't look right, but it will be working regardless.
For example, when using the US States map, Reveal will show the states that match the map and the other states will be greyed out.

#### Troubleshooting the Choropleth Map

If you are getting the *"There is no data to display"* error, this means the predefined map wasn't matched to any of your information. Try the  suggestions below to troubleshoot this issue.

1. *Check the Visualization Editor*
   
    - You might have assigned the wrong fields in the *_Location_* placeholder. Check if the _Location_ field contains geographic units - continents, countries, states, etc.  
  
    - Your field in the  *_Value_* placeholder may not contain information for the selected locations. If you have added an additional category in the *_Map Color_* placeholder (see link:choropleth-map#map-color[this example]), then your _Value_ field must contain information for this category. For example, there must be information about votes for each candidate, if you compare candidate votes by state.
  
    - Also, please confirm that you selected the right *_MAP_* in the map selector.
  
    - If you receive the error when *drilling down*, make sure the _MAP_ selector contains the map for the level you want to drill down to. For example, currently Swiss cantons are not available in the maps selector and this means you can't drill down into Switzerland even if you have the necessary information in your data source.

2. *Check your Data Source*. Your data source might be empty or with no location data at all. If not empty, try searching for misspellings or odd punctuation. Check whether you are using the right [location format](#location-formats). If your data source contents are not written in the English language, please go to the [My data source is not in English](#data-not-in-english) section.

If you are getting an outcome, but it's not exactly what you were expecting, please go through the entire Choropleth map documentation, including this topic, the [Choropleth Maps](choropleth-map.md), and [Working with the Choropleth Map Settings](settings-choropleth-map.md) topic.

#### General Troubleshooting Tips

- *Isolate the issue.* If possible, try to isolate your problem. For example, if you can’t use a specific location, try with another different location or even a different data source. When trying to isolate your issue, make only small changes at a time.

- *Remember/write down the steps you made.* Once you start troubleshooting, it is really helpful to remember what you have already done. When asking for support, things get much easier if you know exactly which steps you made in the past.

<a name='data-not-in-english'></a>
### My Data Source Is Not In English

Reveal doesn't recognize the language of your data source automatically.
If your data source information is written in another language, you need to specify it by going to:

*Visualization editor* > *Settings* > *Data is written in*, and selecting a language from the dropdown.

Currently, the Choropleth Map in Reveal supports:

    * English, and
    * Japanese.

If location information in your data source is written in a different language, you have to translate it outside of Reveal.

>[!NOTE]
>**Using a Japanese Data Source with the Japan Map.**
>If you want to use a data source in Japanese to display the Japan map and have all Japanese prefectures mapped, you need to provide the location data in the format shown in [this table](https://ja.wikipedia.org/wiki/%E9%83%BD%E9%81%93%E5%BA%9C%E7%9C%8C#%E4%BA%94%E5%8D%81%E9%9F%B3%E9%A0%86%E3%83%BB%E5%9F%BA%E7%A4%8E%E3%83%87%E3%83%BC%E3%82%BF).

