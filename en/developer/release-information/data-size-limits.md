#Data Limits

There are size limits server-side when using Reveal Web regarding the size of files downloaded, the number of cells in a result set (after aggregation), size of pivot tables and grids (given as a number of cells).
The objective of these limits is to prevent the server to run out of resources (memory and disk space).

Default limit Values:

-	200mb when downloading csv/json/excel
-	10 million cells
-	64 million characters (adding all the strings in all cells).

##Modifying Default Values

###Source 
[**InitializeParameterBuilder**](https://help.revealbi.io/api/java/latest/com/infragistics/reveal/engine/init/InitializeParameterBuilder.html).


| Property  |   Type| Description  |  
|---|---|---|
|  setMaxInMemoryCells | Long  |  Set this property to the expected maximum size of pivot tables or grids, given as a number of cells |
|  setMaxStorageCells | Long  | Set this property to the expected maximum size of cells to be processed from any data source  |
|  setMaxStringCellSize | Integer  |  Sets a limit on the number of characters any string in a dataset column may have |
|  SsetMaxTotalStringsSize | Long  | Set this property to the expected maximum size of pivot tables or grids, given as the total number of characters in all of its cells. |
