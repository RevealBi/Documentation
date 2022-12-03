# Setting up the Reveal SDK Server with Node.js and TypeScript

> [!WARNING]
> Node server support is currently available as a **Beta** versioned product. Some features may not work, or be missing completely. The API will experience breaking changes before the RTM release.

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

5 - Install **TypeScript** and other package types.
<pre style="background:#141414;color:white;display:inline-block;padding:16x;margin-top:10px;font-family:'Consolas';border-radius:5px;width:100%">
> npm install typescript @types/node @types/express @types/cors --save-dev
</pre>

6 - Install **Nodemon** and **ts-node** packages.
<pre style="background:#141414;color:white;display:inline-block;padding:16x;margin-top:10px;font-family:'Consolas';border-radius:5px;width:100%">
> npm install nodemon ts-node --save-dev
</pre>

7 - Configure **TypeScript**. In this example, we are setting the root directory to "src" and the output directory to "dist".
<pre style="background:#141414;color:white;display:inline-block;padding:16x;margin-top:10px;font-family:'Consolas';border-radius:5px;width:100%">
> npx tsc --init --rootDir src --outDir dist
</pre>

8 - Open the project in **VS Code**
<pre style="background:#141414;color:white;display:inline-block;padding:16x;margin-top:10px;font-family:'Consolas';border-radius:5px;width:100%">
> code .
</pre>

9 - Create a new file named **app.ts** in a directory called **src**

![](images/getting-started-server-node-typescript-create-app-file.jpg)

Add the following code:

```javascript
import express, { Application } from 'express';

const app: Application = express();

app.listen(5111, () => {
	console.log(`Reveal server accepting http requests`);
});
```

## Step 2 - Add Reveal SDK

1 - Install the **Reveal SDK** for Node.js
<pre style="background:#141414;color:white;display:inline-block;padding:16x;margin-top:10px;font-family:'Consolas';border-radius:5px;width:100%">
> npm install reveal-sdk-node
</pre>

2 - Modify the `app.ts` file to add Reveal

```javascript
import express, { Application } from 'express';
import reveal from 'reveal-sdk-node';

const app: Application = express();

app.use("/", reveal());

app.listen(5111, () => {
	console.log(`Reveal server accepting http requests`);
});
```

## Step 3 - Create the Dashboards Folder

1 - In Visual Studio Code, click the **New Folder** button in the Explorer and name it **dashboards**. The folder MUST be named **dashboards** and created in the working directory of the application.

![](images/getting-started-server-node-typescript-create-dashboards-folder.jpg)

By default, the Reveal SDK uses a convention that will load all dashboards from the **dashboards** folder. You can change this convention by creating a custom `IRVDashboardProvider`.

## Step 4 - Setup CORS Policy (Debugging)

While developing and debugging your application, it is common to host the server and client app on different URLs. For example; your Server my be running on `https://localhost:24519`, while your Angular app may be running on `https://localhost:4200`. If you were to try and load a dashboard from the client application, it would fail because of a Cross-Origin Resource Sharing (CORS) policy. To enable this scenario, you must create a CORS policy and enable it in the server project.

1 - Install **cors** package and the TypeScript types.
<pre style="background:#141414;color:white;display:inline-block;padding:16x;margin-top:10px;font-family:'Consolas';border-radius:5px;width:100%">
> npm install cors
> npm install @types/cors --save-dev
</pre>

2 - Modify the `app.ts` file to enable **cors**

```javascript
import express, { Application } from 'express';
import reveal from 'reveal-sdk-node';
import cors from "cors";

const app: Application = express();

app.use(cors());

app.use("/", reveal());

app.listen(5111, () => {
	console.log(`Reveal server accepting http requests`);
});
```

## Step 5 - Start the Node.js Server

The final step is to start the Node.js server by runnning the following command:

<pre style="background:#141414;color:white;display:inline-block;padding:16x;margin-top:10px;font-family:'Consolas';border-radius:5px;width:100%">
> npx nodemon src/app.ts
</pre>

Optionally you can add the following scripts to the `package.json` file.

```json
  "scripts": {
    "start": "node dist/app.js", //runs the app.js file in the dist folder that was generated from the build script
    "dev": "npx nodemon src/app.ts", //runs the server and watches for changes during development
    "build": "tsc -p .", //builds the app and generates javascript files in the dist folder
  },
```

Then execute the **dev** script during development.

<pre style="background:#141414;color:white;display:inline-block;padding:16x;margin-top:10px;font-family:'Consolas';border-radius:5px;width:100%">
> npm run dev
</pre>

Next Steps:
- [Create an Angular Client App](getting-started-angular.md)
- [Create an Html/JS Client App](getting-started-javascript.md)
- [Create a React Client App](getting-started-react.md)

> [!NOTE]
> The source code to this sample can be found on [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/01-GettingStarted/server/nodejs-typescript).