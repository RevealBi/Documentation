---
sidebar_label: Chat
---

import BetaWarning from './_beta-message.md'

<BetaWarning />

# AI Chat

AI Chat transforms data analytics into a conversation. Instead of manually building dashboards or writing queries, users simply describe what they want to see or understand. The AI interprets the request, processes the data, and responds with insights, explanations, or generates/modifies dashboards automatically (based both on the current user message and the conversation history).

### Key Capabilities

**Natural Language Dashboard Generation**
Create dashboards by describing what you want: "Show me sales by region for Q4" or "Create a chart comparing product categories by revenue."

**Dashboard Editing**
Modify existing dashboards conversationally: "Add a filter for date range" or "Change the pie chart to a bar chart."

**Data Analysis**
Ask questions about your data: "What are the top 5 customers by revenue?" or "Show me trends in customer satisfaction scores."

**Conversational Context**
The AI maintains conversation history, allowing follow-up questions and refinements: "Now break that down by month" or "Filter to just the Technology category."

---

## Server API

The Chat API provides endpoints for sending messages and managing conversation sessions. It supports two response modes: a plain JSON response for simple request/response workflows, and a streaming SSE response for real-time progress and text updates.

### Endpoints

**Send Message**
```
POST /api/reveal/ai/chat
```

**Clear Session**
```
DELETE /api/reveal/ai/chat
```

### Request Format

```typescript
{
  // Required
  datasourceId: string,          // Datasource identifier for context

  // Message (one required)
  message?: string,               // Natural language message/request

  // Optional context
  dashboard?: string,             // Dashboard JSON for editing/analysis
  visualizationId?: string,       // Visualization ID for visualization-specific operations

  // Optional configuration
  model?: string,                 // LLM model override
  stream?: boolean                // Return SSE stream instead of JSON (default: false)
}
```

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `datasourceId` | string | Yes | Identifier of the datasource to query |
| `message` | string | Conditional* | User's natural language message or request |
| `dashboard` | string | No | Dashboard JSON (RDash format) for editing or analysis context |
| `visualizationId` | string | No | Visualization identifier for visualization-specific operations |
| `model` | string | No | Name of specific LLM model to use for this request |
| `stream` | boolean | No | When `true`, returns a `text/event-stream` (SSE) response with progress events, text chunks, and a final complete event. When `false` (default), returns a plain `application/json` response. |

\* Either `message` or `intent` must be provided

**Parameter Details:**

- **`datasourceId`**: Required for all requests. Provides context about available data structures.
- **`dashboard`**: Provide when editing existing dashboards or analyzing dashboard content.

### Response Format

#### Non-Streaming (default)

When `stream` is `false` or omitted, the endpoint returns a plain JSON response:

```json
{
  "explanation": "Based on your data, I've created a dashboard showing sales by region...",
  "dashboard": "{...rdash JSON...}"
}
```

On error, the response includes an error message with the appropriate HTTP status code (400 or 500):

```json
{
  "error": "Error message"
}
```

#### Streaming

When `stream` is `true`, the endpoint returns Server-Sent Events (SSE) with the following event types:

##### progress Event
Sent during processing to indicate current status.

```json
event: progress
data: {"message": "Creating a new dashboard"}
```

Common progress messages:
- "Creating a new dashboard"
- "Analyzing the current dashboard"
- "Adding filters to visualizations"
- "Modifying visualization"

##### textchunk Event
Contains fragments of the explanation text as it's generated.

```json
event: textchunk
data: {"content": "Based on your data, I've created"}
```

Text chunks are delivered in ~8 word segments with 20ms delays for natural, ChatGPT-like streaming.

##### complete Event
Sent when processing finishes successfully. Always contains the full result.

```json
event: complete
data: {
  "message": "Chat processed successfully",
  "result": {
    "explanation": "Based on your data, I've created a dashboard showing sales by region...",
    "dashboard": "{...rdash JSON...}"
  }
}
```

**Result Structure:**
- `explanation`: Natural language explanation of what was done
- `dashboard`: Generated or modified dashboard JSON (when applicable)

##### error Event
Sent if processing fails.

```json
event: error
data: {"error": "Datasource not found"}
```

### Conversation History

Chat maintains server-side conversation history per user and datasource. This enables contextual follow-up questions and iterative refinements.

**How History Works:**

1. **Per-User Sessions**: Each user gets a separate conversation session per datasource
2. **Automatic Context**: Previous questions and answers are automatically included in context for new requests
3. **Persistent State**: History persists across multiple requests until explicitly cleared
4. **Context in Prompts**: Full conversation history is provided to the LLM:
   ```
   Conversation history:
   - User: Show me sales by region
   - Agent: I've created a dashboard with a map visualization...
   - User: Now filter to Q4 only
   ```

**Managing History:**

- **Clear history**: Send `DELETE /api/reveal/ai/chat` to reset the session

### Server-Side Implementation

The Chat endpoint is automatically registered when you configure Reveal AI in your ASP.NET Core application:

```csharp title="Program.cs"
using Reveal.Sdk;
using Reveal.Sdk.AI;

var builder = WebApplication.CreateBuilder(args);

// Add Reveal SDK
builder.Services.AddControllers().AddReveal(revealBuilder =>
{
    // Configure datasource provider
    revealBuilder.AddDataSourceProvider<DataSourceProvider>();
});

// Add Reveal AI - automatically registers /api/reveal/ai/chat endpoint
builder.Services.AddRevealAI()
    .AddOpenAI(options =>
    {
        options.ApiKey = builder.Configuration["OpenAI:ApiKey"];
        options.ModelId = "gpt-4.1";
    });

var app = builder.Build();

app.MapControllers();
app.Run();
```

No additional controller or routing configuration is needed. Both POST and DELETE endpoints are ready to use once you call `AddRevealAI()`.

### Metadata Configuration

Chat requires metadata configuration to understand your datasource structure. Configure datasources in `appsettings.json`:

```json title="appsettings.json"
{
  "RevealAI": {
    "OpenAI": {
      "ApiKey": "sk-your-api-key-here"
    },
    "MetadataManager": {
      "Datasources": [
        {
          "Id": "SampleExcel",
          "Provider": "WebService"
        },
        {
          "Id": "SqlServerData",
          "Provider": "SqlServer"
        }
      ]
    }
  }
}
```

**MetadataManager Configuration:**

| Property | Type | Description |
|----------|------|-------------|
| `Datasources` | array | List of datasource definitions available to the AI |
| `Datasources[].Id` | string | Unique identifier for the datasource (used in `datasourceId` parameter) |
| `Datasources[].Provider` | string | Provider type: `WebService`, `SQLServer`, `PostgreSQL`, `MySQL`, etc. |

**Provider Types:**

Common provider values:
- `AmazonAthena`
- `MySQL`
- `Oracle`
- `OracleSID`
- `PostgreSQL`
- `SSAS`
- `SSASHTTP`
- `Snowflake`
- `SQLServer`
- `WebService`

The AI uses this metadata to understand what data is available and generate appropriate queries or visualizations.

**Clearing Session Example:**

```csharp
// Client makes DELETE request to clear conversation
// DELETE /api/reveal/ai/chat
// Response: 204 No Content
```

---

## Client API

The Reveal SDK AI Client provides a TypeScript API for conversational interactions from your web application. The `client.ai.chat.sendMessage()` method uses a single request object for all parameters and supports both non-streaming and streaming modes.

### Non-Streaming (Default)

Wait for the complete result before displaying. Returns `Promise<ChatResponse>`.

```typescript
import { RevealSdkClient } from '@revealbi/api';

const client = RevealSdkClient.getInstance();

// Send a message and get the complete response
const response = await client.ai.chat.sendMessage({
  message: 'Show me sales trends for the last quarter',
  datasourceId: 'my-datasource',
});

console.log(response.explanation);
// "I've analyzed your sales data for Q4 2024..."

if (response.dashboard) {
  // Load the generated dashboard
  loadDashboard(response.dashboard);
}
```

### Streaming

Add `stream: true` to the request to get an `AIStream` that yields events as they arrive. The stream supports three consumption patterns.

#### Pattern 1: for-await (Full Control)

```typescript
const stream = await client.ai.chat.sendMessage({
  message: 'Create a dashboard showing customer distribution by region',
  datasourceId: 'my-datasource',
  stream: true,
});

for await (const event of stream) {
  switch (event.type) {
    case 'progress': console.log('Status:', event.message); break;
    case 'text':     document.getElementById('chat-message').textContent += event.content; break;
    case 'error':    console.error('Error:', event.error); break;
  }
}
```

#### Pattern 2: Event Listeners (Simple UI Wiring)

```typescript
const stream = await client.ai.chat.sendMessage({
  message: 'Create a dashboard showing customer distribution by region',
  datasourceId: 'my-datasource',
  stream: true,
});

stream.on('progress', (message) => console.log('Status:', message));
stream.on('text', (content) => {
  document.getElementById('chat-message').textContent += content;
});
stream.on('error', (error) => console.error('Error:', error));

const result = await stream.finalResponse();
console.log('Complete:', result.explanation);

if (result.dashboard) {
  loadDashboard(result.dashboard);
}
```

#### Pattern 3: Aggregated Result from Stream

```typescript
const stream = await client.ai.chat.sendMessage({
  message: 'Create a dashboard showing customer distribution by region',
  datasourceId: 'my-datasource',
  stream: true,
});

// Wait for completion, returns ChatResponse
const result = await stream.finalResponse();
console.log(result.explanation);

if (result.dashboard) {
  loadDashboard(result.dashboard);
}
```

### Managing Conversation

Clear the conversation history to start fresh:

```typescript
// Reset the conversation context
await client.ai.chat.resetContext();

console.log('Conversation history cleared');
```

Use this when:
- Starting a new topic
- Switching datasources
- User explicitly requests to "start over"

### Dashboard Context

Provide an existing dashboard for editing or analysis:

```typescript
// Edit an existing dashboard
const response = await client.ai.chat.sendMessage({
  message: 'Add a date filter to this dashboard',
  datasourceId: 'my-datasource',
  dashboard: existingDashboardJson,  // Provide current dashboard JSON
});

if (response.dashboard) {
  // Load the modified dashboard
  loadDashboard(response.dashboard);
}
```

**Using RVDashboard Objects:**

```typescript
// From RevealView
const currentDashboard = revealView.dashboard;

const response = await client.ai.chat.sendMessage({
  message: 'Explain what this dashboard shows',
  datasourceId: 'my-datasource',
  dashboard: currentDashboard,  // Accepts RVDashboard object
});

console.log(response.explanation);
```

### Request Parameters

All parameters are passed in a single request object:

```typescript
// Non-streaming request
interface ChatRequest {
  message: string;                    // User's natural language input (required)
  datasourceId?: string;              // Datasource identifier
  dashboard?: string | RVDashboard;   // Dashboard JSON or RVDashboard object
  visualizationId?: string;           // Visualization ID for visualization-specific context
  intent?: string;                    // Intent for freeform LLM queries
  updateChatState?: boolean;          // Whether to update chat state
  model?: string;                      // Override LLM model
  signal?: AbortSignal;               // For request cancellation
  stream?: false;                      // Non-streaming (default)
}

// Streaming request
interface ChatStreamRequest {
  // ...same fields as above, plus:
  stream: true;                        // Enable streaming
}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `message` | `string` | Yes | User's natural language message or request |
| `datasourceId` | `string` | No | Datasource identifier for context |
| `dashboard` | `string \| RVDashboard` | No | Dashboard JSON or RVDashboard object for editing/analysis |
| `visualizationId` | `string` | No | Visualization ID for visualization-specific context |
| `intent` | `string` | No | Intent for freeform LLM queries |
| `updateChatState` | `boolean` | No | Whether to update the chat state after this query |
| `model` | `string` | No | Name of specific LLM model to use |
| `signal` | `AbortSignal` | No | AbortSignal for cancelling the request |
| `stream` | `boolean` | No | Enable streaming mode (default: `false`) |

### Response Types

#### ChatResponse

```typescript
interface ChatResponse {
  explanation?: string;   // AI-generated explanation
  dashboard?: string;     // Generated/modified dashboard JSON
  error?: string;         // Error message if request failed
}
```

The response contains an `explanation` field with the AI's natural language response. The `dashboard` field is populated when dashboards are generated or modified.

#### AIStream (Streaming)

When `stream: true`, the return type is `AIStream<ChatResponse>`, which provides:

| Method / Pattern | Description |
|---------|-------------|
| `for await (const event of stream)` | Iterate over events as they arrive |
| `.on(event, handler)` | Register event-specific listeners |
| `.finalResponse()` | Returns a promise that resolves with the complete `ChatResponse` |
| `.abort()` | Cancel the stream |

#### Stream Events

```typescript
type AIStreamEvent =
  | { type: 'progress'; message: string }
  | { type: 'text'; content: string }
  | { type: 'error'; error: string; details?: unknown };
```

| Event Type | Description |
|------------|-------------|
| `progress` | Status messages during processing (e.g., "Creating a new dashboard") |
| `text` | Text fragments of the explanation as they are generated |
| `error` | Error information if processing fails |

---

## Common Patterns

### Building a Chat Interface

Create a complete chat UI with message history and streaming:

```typescript
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

### Error Handling

Handle errors gracefully in both non-streaming and streaming modes:

```typescript
// Non-streaming error handling
try {
  const response = await client.ai.chat.sendMessage({
    message: 'Show me sales trends',
    datasourceId: 'my-datasource',
  });
  displayResponse(response.explanation);

  if (response.dashboard) {
    loadDashboard(response.dashboard);
  }
} catch (error) {
  console.error('Chat request failed:', error);
  showErrorMessage(error.message);
}

// Streaming error handling
const stream = await client.ai.chat.sendMessage({
  message: 'Show me sales trends',
  datasourceId: 'my-datasource',
  stream: true,
});

stream.on('text', (content) => appendToUI(content));
stream.on('error', (error, details) => {
  console.error('Chat error:', error);
  showErrorMessage(error);
});

const result = await stream.finalResponse();

if (result.dashboard) {
  loadDashboard(result.dashboard);
}
```

### Request Cancellation

Cancel an in-progress request using `AbortSignal`:

```typescript
const controller = new AbortController();

// Non-streaming
const promise = client.ai.chat.sendMessage({
  message: 'Analyze my data',
  datasourceId: 'my-datasource',
  signal: controller.signal,
});

// Cancel after 5 seconds
setTimeout(() => controller.abort(), 5000);

// Streaming
const stream = await client.ai.chat.sendMessage({
  message: 'Analyze my data',
  datasourceId: 'my-datasource',
  stream: true,
  signal: controller.signal,
});

// Or abort the stream directly
stream.abort();
```
