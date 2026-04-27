---
sidebar_label: Streaming Markdown Display
---


# Streaming Markdown Display

This guide shows how to display streaming AI responses with real-time markdown rendering. As text chunks arrive from the stream, they are accumulated and rendered as formatted HTML using a markdown library.

## Using marked.js

The [marked](https://www.npmjs.com/package/marked) library converts markdown to HTML and works well with streaming text:

```typescript
import { marked } from 'marked';

let buffer = '';

const stream = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  type: 'summary',
  stream: true,
});

stream.on('text', (content) => {
  buffer += content;
  // Re-render the full buffer as markdown on each chunk
  document.getElementById('output').innerHTML = marked.parse(buffer);
});

const result = await stream.finalResponse();
console.log('Streaming complete:', result.explanation);
```

## Combining with Progress Messages

Show progress status before the main content begins streaming:

```typescript
let buffer = '';
const output = document.getElementById('output');

const stream = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  type: 'analysis',
  stream: true,
});

stream.on('progress', (message) => {
  buffer += `*${message}*\n\n`;
  output.innerHTML = marked.parse(buffer);
});

stream.on('text', (content) => {
  buffer += content;
  output.innerHTML = marked.parse(buffer);
  output.scrollTop = output.scrollHeight; // Auto-scroll
});

await stream.finalResponse();
```

## Tips

- **Re-render the full buffer** on each chunk rather than appending HTML fragments. Partial markdown (e.g., an unclosed `**bold**`) won't render correctly until more text arrives.
- **Auto-scroll** the container to keep the latest text visible as it streams in.
- **Clear the buffer** before starting a new request to avoid mixing content from previous responses.
