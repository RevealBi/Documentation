# Setting up the Reveal SDK Server with Node.js

## Step 1 - Create the Node.js Project

1 - Open a command line and create a directory named **reveal-server-node**
<pre style="background:#141414;color:white;display:inline-block;padding:16x;margin-top:10px;font-family:'Consolas';border-radius:5px;width:100%">
> mkdir reveal-server-node
</pre>

2 - Change the command line path to the newly created directory
<pre style="background:#141414;color:white;display:inline-block;padding:16x;margin-top:10px;font-family:'Consolas';border-radius:5px;width:100%">
> cd reveal-server-node
</pre>

3 - Initialize **npm** in the directory
<pre style="background:#141414;color:white;display:inline-block;padding:16x;margin-top:10px;font-family:'Consolas';border-radius:5px;width:100%">
> npm init -y
</pre>

4 - Install the **express** framework
<pre style="background:#141414;color:white;display:inline-block;padding:16x;margin-top:10px;font-family:'Consolas';border-radius:5px;width:100%">
> npm install express
</pre>

5 - Open the project in **VS Code**
<pre style="background:#141414;color:white;display:inline-block;padding:16x;margin-top:10px;font-family:'Consolas';border-radius:5px;width:100%">
> code .
</pre>

6 - Create a new file named **main.js**, and intialize add the following code

```javascript
var express = require('express');

const app = express();

app.listen(8080, () => {
	console.log(`Reveal server accepting http requests`);
});
```

## Step 2 - Add Reveal SDK

1 - Install the **Reveal SDK** for Node.js
<pre style="background:#141414;color:white;display:inline-block;padding:16x;margin-top:10px;font-family:'Consolas';border-radius:5px;width:100%">
> npm install reveal-sdk-node
</pre>

2 - Modify the `main.js` file to add Reveal

```javascript
var express = require('express');
var reveal = require('reveal-sdk-node');

const app = express();

//add reveal sdk
app.use('/', reveal());

app.listen(8080, () => {
	console.log(`Reveal server accepting http requests`);
});
```

## Step 3 - Create the Dashboards Folder

1 - In Visual STudio Code, click the **New Folder** button in the Explorer and name it **dashboards**. The folder MUST be named **dashboards**

![](images/getting-started-server-node--create-dashboards-folder.jpg)

By default, the Reveal SDK uses a convention that will load all dashboards from the **dashboards** folder. You can change this convention by creating a custom `IRVDashboardProvider`.

## Step 4 - Setup CORS Policy (Debugging)

While developing and debugging your application, it is common to host the server and client app on different URLs. For example; your Server my be running on `https://localhost:24519`, while your Angular app may be running on `https://localhost:4200`. If you were to try and load a dashboard from the client application, it would fail because of a Cross-Origin Resource Sharing (CORS) policy. To enable this scenario, you must create a CORS policy and enable it in the server project.

1 - Install **cors** package
<pre style="background:#141414;color:white;display:inline-block;padding:16x;margin-top:10px;font-family:'Consolas';border-radius:5px;width:100%">
> npm install cors
</pre>

2 - Modify the `main.js` file to enable **cors**

```javascript
var express = require('express');
var cors = require('cors');
var reveal = require('reveal-sdk-node');

const app = express();

app.use(cors()); // DEVELOPMENT only! In production, configure appropriately.

app.use('/', reveal());

app.listen(8080, () => {
	console.log(`Reveal server accepting http requests`);
});
```

## Step 5 - Start the Node.js Server

The final step is to start the Node.js server by runnning the following command:

<pre style="background:#141414;color:white;display:inline-block;padding:16x;margin-top:10px;font-family:'Consolas';border-radius:5px;width:100%">
> node main.js
</pre>

Next Steps:
- [Create an Angular Client App](getting-started-angular.md)
- [Create an Html/JS Client App](getting-started-javascript.md)
- [Create a React Client App](getting-started-react.md)