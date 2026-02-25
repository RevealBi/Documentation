---
sidebar_label: System Requirements
---

import BetaWarning from './_beta-message.md'

<BetaWarning />

# System Requirements

To use the Reveal SDK AI features, you'll need the following prerequisites:

## Client SDK Requirements

### Web Browsers

The Reveal SDK AI Client runs in modern web browsers that support:

- ES2020 JavaScript features
- Async/Await
- Fetch API
- Server-Sent Events (SSE)

**Supported Browsers:**
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

### JavaScript Frameworks (Optional)

While the client SDK works with vanilla JavaScript, it integrates seamlessly with:

- Angular 15+
- React 18+
- Vue 3+
- Or any modern JavaScript framework

## Server SDK Requirements

### ASP.NET Core

- ASP.NET 8.0 or higher

## Reveal SDK Base Requirements

Reveal SDK AI extends the base Reveal SDK, so you must also meet the standard Reveal SDK requirements:

- Valid Reveal SDK license
- Reveal SDK Web (JavaScript) package
- Reveal.Sdk.AspNetCore package (compatible version)

### TypeScript Support

- TypeScript 5.0+ (for full type safety)
- The SDK is written in TypeScript and provides complete type definitions

## Next Steps

Once you've verified your environment meets these requirements:

1. [Install the Server SDK](install-server-sdk.md) - Set up the backend components
2. [Install the Client SDK](install-client-sdk.md) - Add the JavaScript package to your application

