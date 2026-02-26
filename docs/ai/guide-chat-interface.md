---
sidebar_label: Building a Chat Interface
---


# Building a Chat Interface

This guide shows how to build a complete chat UI with message history and streaming responses using the Reveal SDK AI Chat API.

## Complete Chat Implementation

```typescript
const client = RevealSdkClient.getInstance();
const messages: Array<{role: 'user' | 'assistant', content: string}> = [];

async function sendChatMessage(userInput: string) {
  // Add user message to UI
  messages.push({ role: 'user', content: userInput });
  renderMessages();

  let currentMessage = '';

  const stream = await client.ai.chat.sendMessage({
    message: userInput,
    datasourceId: 'my-datasource',
    stream: true,
  });

  stream.on('progress', (message) => {
    showProgressIndicator(message);
  });

  stream.on('text', (content) => {
    currentMessage += content;
    // Update streaming message in UI
    updateStreamingMessage(currentMessage);
    scrollToBottom();
  });

  stream.on('error', (error) => {
    showError(error);
  });

  const result = await stream.finalResponse();

  // Finalize message
  messages.push({ role: 'assistant', content: currentMessage });
  renderMessages();

  if (result.dashboard) {
    loadDashboard(result.dashboard);
  }

  hideProgressIndicator();
}

// Clear conversation
async function resetConversation() {
  await client.ai.chat.resetContext();
  messages.length = 0;
  renderMessages();
}
```

## Key Concepts

### Message History

The `messages` array tracks the local UI state. The server maintains its own conversation history automatically — you don't need to send previous messages with each request.

### Dashboard Handling

Chat responses may include a `dashboard` field containing generated or modified dashboard JSON. Check for it after each response and load it into your RevealView:

```typescript
const result = await stream.finalResponse();

if (result.dashboard) {
  // Load the new or modified dashboard
  revealView.dashboard = await RVDashboard.loadFromJson(result.dashboard);
}
```

### Editing Existing Dashboards

To let users edit an existing dashboard through chat, include it in the request:

```typescript
const stream = await client.ai.chat.sendMessage({
  message: 'Add a date filter to this dashboard',
  datasourceId: 'my-datasource',
  dashboard: revealView.dashboard,  // Pass the current dashboard
  stream: true,
});
```

### Resetting Context

Call `resetContext()` when starting a new topic or switching datasources. This clears the server-side conversation history so previous messages don't influence new responses.
