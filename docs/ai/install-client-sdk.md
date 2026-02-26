---
sidebar_label: Install Client SDK
---


# Installing the AI Client SDK

The Reveal SDK AI Client is a TypeScript/JavaScript library that provides AI capabilities for your web applications. It works alongside the base Reveal SDK to add intelligent features like insights, dashboard generation, and conversational AI.

## Prerequisites

Before installing the AI Client SDK, ensure you have:

1. The base [Reveal SDK Server](/web/install-server-sdk) installed and configured
2. The [Reveal SDK AI Server](install-server-sdk.md) installed and configured
3. Node.js 18+ and npm 9+ installed (for package-based installation)

## Installation Methods

### Install Using npm (Recommended)

The recommended way to install the AI Client SDK is through npm:

```bash npm2yarn
npm install @revealbi/api
```

### Install Using CDN

For quick prototyping and demos, you can use the unpkg CDN:

```html
<script src="https://unpkg.com/@revealbi/api/dist/index.umd.js"></script>
```

Or using jsDelivr:

```html
<script src="https://cdn.jsdelivr.net/npm/@revealbi/api/dist/index.umd.js"></script>
```

## TypeScript Support

The AI Client SDK is written in TypeScript and includes complete type definitions. No additional `@types` packages are needed.

## Framework-Specific Setup

### Vanilla JavaScript

#### Using ES Modules

```html
<!DOCTYPE html>
<html>
<head>
  <title>Reveal AI</title>
</head>
<body>
  <div id="app"></div>

  <script type="module">
    import { RevealSdkClient } from 'https://unpkg.com/@revealbi/api/dist/index.js';

    RevealSdkClient.initialize({
      hostUrl: 'https://your-server.com'
    });
  </script>
</body>
</html>
```

#### Using UMD Bundle

```html
<!DOCTYPE html>
<html>
<head>
  <title>Reveal AI</title>
  <script src="https://cdn.jsdelivr.net/npm/@revealbi/api/dist/index.umd.min.js"></script>
</head>
<body>
  <div id="app"></div>

  <script type="text/javascript">
    rv.RevealSdkClient.initialize({
      hostUrl: 'https://your-server.com'
    });
  </script>
</body>
</html>
```

### Angular

In your `main.ts` file, initialize before bootstrapping the application:

```typescript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RevealSdkClient } from '@revealbi/api';
import { AppModule } from './app/app.module';

RevealSdkClient.initialize({
  hostUrl: 'https://your-server.com'
});

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
```

### React

In your `index.tsx` or `main.tsx` file, initialize before rendering:

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RevealSdkClient } from '@revealbi/api';
import App from './App';

RevealSdkClient.initialize({
  hostUrl: 'https://your-server.com'
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Vue

In your `main.ts` file, initialize before mounting the application:

```typescript
import { createApp } from 'vue';
import { RevealSdkClient } from '@revealbi/api';
import App from './App.vue';

RevealSdkClient.initialize({
  hostUrl: 'https://your-server.com'
});

createApp(App).mount('#app');
```
