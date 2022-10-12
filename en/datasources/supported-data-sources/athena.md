---
title: How to configure an Amazon Athena data source in Slingshot
_description: Configuring an Amazon Athena data source to use unstructured data stored in Amazon S3 easy and fast.
---

# Amazon Athena 

The Amazon Athena data source in Reveal allows you to access and query unstructured data stored in [Amazon S3](amazon-s3.md), and use it for your visualizations.  
## Connecting to Amazon Athena

To configure an Amazon Athena data source, you will need to enter the following information:

<img src="images/amazon-athena-configuration-dialog.png" alt="Configure Amazon Athena dialog" class="responsive-img" width="50%"/>
   
1. **Region**: Amazon regions are listed with their names and codes in the dropdown. Choose the one where the data you need is located. 

3. **Credentials**: here you will be asked to provide the root or IAM user credentials: 
   
   * *Access Key*
   * *Secret Key*
   * *Alias (optional)* 

   Add your credentials and click/tap  on the *Add* blue button. Upon successful connection, you will be returned to the previous dialog where *Workgroup* and *Query result location* become available to configure too. 

   For more information about the AWS credentials, please take a look at this [Amazon article](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html).
   
4. *(Optional)* **Workgroup**: choosing one of your workgroups from the dropdown is *optional*. If you don't specify a workgroup, then the *primary* workgroup (which is the default workgroup in your Athena account) will be automatically selected. 
5. *(Optional)* **Query result location**: this is the directory in *Amazon S3* where the results of your query will be stored. You need to provide a valid *S3* path, e.g.: *s3://query-results-bucket/folder/*. If you don't explicitly specify the path in this dialog, the results will be stored in the output location specified in the selected/default workgroup. If there is no output location created in the workgroup, your Athena query will fail.

   >[!NOTE]
   > If you have specified your Query result location (QRL) in Reveal, but you can't find your output in this location, please check  your workgroup configuration in Athena for settings that prevent you from using custom QRLs. For more information, take a look at [Specifying a Query Result Location](https://docs.aws.amazon.com/athena/latest/ug/querying.html#query-results-specify-location) in Athena's documentation. 

6. **Athena Data Source**: also known as *Data Catalog* containing databases. You can choose it from the list that will appear after you connect to your Athena account (see steps 1-3). 

## Setting Up Your Data

After configuring your Athena data source connection, you will be prompted to choose a database from the *Data Source (Catalog)* you selected in the previous dialog. 

<img src="images/amazon-athena-views.png" alt="Configure Amazon Athena dialog" class="responsive-img" width="55%"/>

After selecting a database, you can choose from the *tables* or [*views*](https://docs.aws.amazon.com/athena/latest/ug/views.html) inside it. 

In the screenshot above, the **motor_vehicle_collisions_full_view** view contains a modified version of the data in the **motor_vehicle_collisions_full** table in Athena. 
In the screenshot below, the visualization on the left is built with the data in the view, and the one on the right uses the data contained in the table.  

<img src="images/amazon-athena-sample.png" alt="Sample dashboard using Amazon Athena table and view data" class="responsive-img" width="85%"/>


