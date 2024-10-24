# Setting up the Reveal SDK Server with NestJS


# Setting up Reveal SDK with NestJS

This guide will walk you through integrating the Reveal SDK into a [**NestJS**](https://nestjs.com/) project. Follow the steps below to add powerful data analytics capabilities to your NestJS server.

## Step 1 - Create a NestJS Project

1. First, install the NestJS CLI globally if you haven't already:

```bash
npm install -g @nestjs/cli
```

2. Create a new project by running the following command:

```bash
nest new reveal-nest-server
```

3. Change the command line path to the newly created project directory:

```bash
cd reveal-nest-server
```

## Step 2 - Install the Reveal SDK

1. Inside the NestJS project directory, install the Reveal SDK for Node.js:

```bash npm2yarn
npm install reveal-sdk-node
```

## Step 3 - Modify the `main.ts` File

To integrate the Reveal SDK, we will modify the `main.ts` file directly, where we will enable CORS and add the Reveal SDK routes.

1. Open the `src/main.ts` file.

2. Update the `bootstrap` function to configure the Reveal SDK:

```ts title="src/main.ts"
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// highlight-next-line
import reveal from 'reveal-sdk-node';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // highlight-next-line
  app.enableCors(); // DEVELOPMENT only! In production, configure appropriately.

  // highlight-next-line
  app.use("/", reveal());

  // Start the server
  await app.listen(process.env.PORT ?? 5111);
  console.log(`Reveal SDK server running on http://localhost:${process.env.PORT ?? 5111}`);
}
bootstrap();
```

This setup will configure the Reveal SDK to handle routes under `/`. The CORS policy is also enabled globally to allow requests from other origins.

:::note

You may need to set `"esModuleInterop": true,` in the tsconfig.json file.

:::

## Step 4 - Create the Dashboards Folder

Reveal SDK expects dashboard files to be stored in a folder named **dashboards** in your working directory.

1. In your project’s root directory, create a folder named `dashboards`.

```bash
mkdir dashboards
```

You can store any Reveal dashboards in this folder, and they will be accessible through the server. If you need to change this behavior, you can create a custom `IRVDashboardProvider`.

## Step 5 - Run the NestJS Server

1. Start the NestJS server by running the following command:

```bash
npm run start
```

Alternatively, if you're in development mode, run the server with live-reload enabled:

```bash
npm run start:dev
```

Now, your NestJS server is running, and the Reveal SDK is ready to handle requests at `http://localhost:5111/`.

:::info Get The Code

The source code to this sample can be found on [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/01-GettingStarted/server/nest).

:::
