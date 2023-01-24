# Setting up the Reveal SDK Server with Node.js

:::caution

Node server support is currently available as a **Beta** versioned product. Some features may not work, or be missing completely. The API will experience breaking changes before the RTM release.

:::

## Step 1 - Create the Node.js Project

1 - Open a command line and create a directory named **reveal-server-node**

```bash
mkdir reveal-server-node
```

2 - Change the command line path to the newly created directory

```bash
cd reveal-server-node
```

3 - Initialize **npm** in the directory

```bash npm2yarn
npm init -y
```

4 - Install the **express** framework

```bash npm2yarn
npm install express
```

5 - Open the project in **VS Code**

```bash
code .
```

6 - Create a new file named **main.js**, and add the following code

```js title="main.js"
var express = require('express');

const app = express();

app.listen(8080, () => {
	console.log(`Reveal server accepting http requests`);
});
```

## Step 2 - Add Reveal SDK

1 - Install the **Reveal SDK** for Node.js

```bash npm2yarn
npm install reveal-sdk-node
```

2 - Modify the `main.js` file to add Reveal

```js
var express = require('express');
// highlight-next-line
var reveal = require('reveal-sdk-node');

const app = express();

// highlight-next-line
app.use('/', reveal());

app.listen(8080, () => {
	console.log(`Reveal server accepting http requests`);
});
```

## Step 3 - Create the Dashboards Folder

1 - In Visual Studio Code, click the **New Folder** button in the Explorer and name it **dashboards**. The folder MUST be named **dashboards**

![](images/getting-started-server-node-create-dashboards-folder.jpg)

By default, the Reveal SDK uses a convention that will load all dashboards from the **dashboards** folder. You can change this convention by creating a custom `IRVDashboardProvider`.

## Step 4 - Setup CORS Policy (Debugging)

While developing and debugging your application, it is common to host the server and client app on different URLs. For example; your Server my be running on `https://localhost:24519`, while your Angular app may be running on `https://localhost:4200`. If you were to try and load a dashboard from the client application, it would fail because of a Cross-Origin Resource Sharing (CORS) policy. To enable this scenario, you must create a CORS policy and enable it in the server project.

1 - Install **cors** package

```bash npm2yarn
npm install cors
```

2 - Modify the `main.js` file to enable **cors**

```js title="main.js"
var express = require('express');
var cors = require('cors');
var reveal = require('reveal-sdk-node');

const app = express();

//highlight-next-line
app.use(cors()); // DEVELOPMENT only! In production, configure appropriately.

app.use('/', reveal());

app.listen(8080, () => {
	console.log(`Reveal server accepting http requests`);
});
```

## Step 5 - Start the Node.js Server

The final step is to start the Node.js server by runnning the following command:

```bash
node main.js
```

:::info Get the Code

The source code to this sample can be found on [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/01-GettingStarted/server/nodejs).

:::