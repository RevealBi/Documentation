## Running the UpMedia Samples

After getting the [UpMedia samples](https://github.com/RevealBi/sdk-samples-java) from GitHub, below you have detailed information to help you run them.


### UpMedia Sample Application in Tomcat

#### Requirements

- [Java SDK](https://www.oracle.com/java/technologies/javase-downloads.html) 11.0.10 and up recommended.
- [Tomcat](https://tomcat.apache.org/download-90.cgi) 9.0.41 and up recommended.
- [Eclipse for Enterprise Java Developers](https://www.eclipse.org/downloads/packages/) version 2020-12 and up recommended.
- Maven repository and dependency already added. For details, please refer to [Setup and Configuration](setup-configuration.html#maven-dependency).
 
#### Steps

1. **Load the Project**
   1. In Eclipse, go to: *File > Import > Existing Projects into Workspace*.
   2. In *Select root directory*, choose Reveal's SDK path and also select the *UpMedia* Project.
   3. Check the *Copy projects into workspace* option.
   4. Click "Finish".

    The project is now loaded and ready to be inspected.

2. **Run the Project in Tomcat**
   1. In the UpMedia Project, right click *Run on Server*.
   2. Choose Tomcat 9 and configure the root path to Tomcat's installation path.
   3. Go through the default settings and run the Project.  

3. **Visualize the Sample in a Browser**
   - Eclipse's internal browser has known issues with Windows, instead please try Google Chrome or another browser (the default URL will be http://localhost:8080/upmedia).


Alternative steps to work with a WAR file:
1. Go to *Run As -> Maven build*.
2. Use the *package* goal.
3. Take the WAR file created and manually deploy it to Tomcat.


### UpMedia React Sample with Spring Backend

#### Requirements

- [Java SDK](https://www.oracle.com/java/technologies/javase-downloads.html) 11.0.10 and up recommended.
- [NodeJS](https://nodejs.org/en/download/) 14.15.4 and up recommended, NPM version: 6.14.10 and up.
- Maven repository and dependency already added. For details, please refer to [Setup and Configuration](setup-configuration.html#maven-dependency).

#### Steps

1. **Run the Spring Application**
   1. Locate the Spring Boot application in the *upmedia-backend-spring* folder.
   2. Run the sample application by executing the folllowing command:
    ```console
   mvn spring-boot:run
   ```
   3. Verify the server by accessing http://localhost:8080/upmediabackend/reveal-api/DashboardFile/Sales. As a result you'll get the JSON document for the Sales sample dashboard.
   Reveal services can be found under */upmediabackend/reveal-api/*.

2. **Run the React Application**
    1. Locate the React application in the *upmedia-react* folder.
    2. Run the React application as usual:
    ```console
   npm install
   npm start
   ```
   3. Access your React application at http://localhost:3000.

There you can find a few components to try:
- **Filters**: shows how to open an existing dashboard and customize the filtering experience.
- **Linking**: shows how to open an existing dashboard with a link to another dashboard and how to properly configure the linking.
- **CreateDashboard**: shows how to open the dashboard editor to create a new dashboard from scratch. In addition, it also shows how to setup the list of data sources that will be displayed to the user when creating a new visualization.

For details about Reveal's Web client SDK, please refer [here](~/en/developer/web-sdk/overview.md).

### UpMedia React sample with Tomcat backend

#### Requirements

- [Java SDK](https://www.oracle.com/java/technologies/javase-downloads.html) 11.0.10 and up recommended.
- [Tomcat](https://tomcat.apache.org/download-90.cgi) 9.0.41 and up recommended.
- [Eclipse for Enterprise Java Developers](https://www.eclipse.org/downloads/packages/) version 2020-12 and up recommended.
- Maven repository and dependency already added. For details, please refer to [Setup and Configuration](setup-configuration.html#maven-dependency).
 
#### Steps

1. **Load the Project**
   1. In Eclipse, go to: *File > Import > Existing Projects into Workspace*.
   2. In *Select root directory*, choose Reveal's SDK path and also select the *upmedia-backend-tomcat* Project.
   3. Check the *Copy projects into workspace* option.
   4. Click "Finish".

    The project is now loaded and ready to be inspected.

2. **Run the Project in Tomcat**
   1. In the upmedia-backend-tomcat Project, right click *Run on Server*.
   2. Choose Tomcat 9 and configure the root path to Tomcat's installation path.
   3. Go through the default settings and run the Project. 
   4. Verify the server by accessing http://localhost:8080/upmediabackend/reveal-api/DashboardFile/Sales. As a result you'll get the JSON document for the Sales sample dashboard.

3. **Run the React Application**
   1. Locate the React application in the *upmedia-react* folder.
   2. Run the React application as usual:
    ```console
   npm install
   npm start
   ```
   3. Access your React application at http://localhost:3000.

There you can find a few components to try:
- **Filters**: shows how to open an existing dashboard and customize the filtering experience.
- **Linking**: shows how to open an existing dashboard with a link to another dashboard and how to properly configure the linking.
- **CreateDashboard**: shows how to open the dashboard editor to create a new dashboard from scratch. In addition, it also shows how to setup the list of data sources that will be displayed to the user when creating a new visualization.

For details about Reveal's Web client SDK, please refer [here](~/en/developer/web-sdk/overview.md).

