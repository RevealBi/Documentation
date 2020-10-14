## Amazon S3

Amazon Simple Storage Service (S3) is a highly scalable and fast data storage service. Adding Amazon S3 to your data sources allows you to access and analyze your data from S3 directly in Reveal.

To configure an Amazon S3 data source, you will need to enter the following information:

<img src="images/configure-amazon-s3-dialog.png" alt="Configure Amazon Athena dialog" width="100%"/>

1.  **Default name** of the data source: Your data source name will be displayed in the list of accounts in the _Select a Data Source_ dialog. By default, Reveal names it *Amazon S3*. You can change it to your preference.
   
2. **Region**: Amazon regions are listed with their names and codes in the dropdown. Choose the one associated with your Amazon account. 

3. **Credentials**: here you will be asked to provide the two parts of your AWS (Amazon Web Services) access key:
   * *Access Key*
   * *Secret Key* 

   Add your credentials and click/tap the _Create and Use_ blue button.

   For more information about the AWS access key, please take a look at this [Amazon support article](https://aws.amazon.com/premiumsupport/knowledge-center/create-access-key/).

4. Upon successful connection, you will be returned to the previous dialog where the _Continue_ blue button becomes available. After clicking/tapping it, you can start browsing your directories and files in Amazon S3. 