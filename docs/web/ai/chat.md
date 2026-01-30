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

The Chat API provides endpoints for sending messages and managing conversation sessions.

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
  question?: string,              // Natural language question/request

  // Optional context
  dashboard?: string,             // Dashboard JSON for editing/analysis
  widgetId?: string,              // Widget ID for widget-specific operations

  // Optional configuration
  clientName?: string,            // LLM provider override
  streamExplanation?: boolean     // Stream response text chunks (default: false)
}
```

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `datasourceId` | string | Yes | Identifier of the datasource to query |
| `question` | string | Conditional* | User's natural language question or request |
| `dashboard` | string | No | Dashboard JSON (RDash format) for editing or analysis context |
| `widgetId` | string | No | Widget identifier for widget-specific operations |
| `clientName` | string | No | Name of specific LLM provider to use for this request |
| `streamExplanation` | boolean | No | Enable real-time streaming of explanation text (default: false) |

\* Either `question` or `intent` must be provided

**Parameter Details:**

- **`datasourceId`**: Required for all requests. Provides context about available data structures.
- **`dashboard`**: Provide when editing existing dashboards or analyzing dashboard content.

### Response Format

The endpoint returns Server-Sent Events (SSE) with the following event types:

#### progress Event
Sent during processing to indicate current status.

```json
event: progress
data: {"message": "Creating a new dashboard"}
```

Common progress messages:
- "Creating a new dashboard"
- "Analyzing the current dashboard"
- "Adding filters to widgets"
- "Modifying visualization"

#### textchunk Event
Sent when `streamExplanation: true`. Contains fragments of the explanation text as it's generated.

```json
event: textchunk
data: {"content": "Based on your data, I've created"}
```

Text chunks are delivered in ~8 word segments with 20ms delays for natural, ChatGPT-like streaming.

#### complete Event
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

#### error Event
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
    .ConfigureOpenAI(options =>
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
// Response: 200 OK
```

---

## Client API

The Reveal SDK AI Client provides a simple TypeScript API for conversational interactions from your web application.

### Getting Started

Use the `client.ai.chat.sendMessage()` method to send messages. The method supports both **await** and **streaming** patterns.

#### Basic Usage (Await Pattern)

Wait for the complete result before displaying:

```typescript
import { RevealSdkClient } from '@revealbi/api';

const client = RevealSdkClient.getInstance();

// Ask a question and get the complete response
const response = await client.ai.chat.sendMessage({
  question: 'Show me sales trends for the last quarter',
  datasourceId: 'my-datasource'
});

console.log(response.explanation);
// "I've analyzed your sales data for Q4 2024..."

if (response.dashboard) {
  // Load the generated dashboard
  loadDashboard(response.dashboard);
}
```

### Streaming Responses

Stream the explanation text in real-time for a ChatGPT-like experience:

```typescript
let explanation = '';

const response = await client.ai.chat.sendMessage(
  {
    question: 'Create a dashboard showing customer distribution by region',
    datasourceId: 'my-datasource',
    streamExplanation: true
  },
  {
    onProgress: (message) => {
      console.log('Status:', message);
      // "Creating a new dashboard"
    },
    onTextChunk: (chunk) => {
      explanation += chunk;
      // Display text as it arrives
      document.getElementById('chat-message').textContent = explanation;
    },
    onComplete: (message, result) => {
      console.log('Complete:', message);
      if (result?.dashboard) {
        loadDashboard(result.dashboard);
      }
    },
    onError: (error, details) => {
      console.error('Error:', error, details);
    }
  }
);
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
  question: 'Add a date filter to this dashboard',
  datasourceId: 'my-datasource',
  dashboard: existingDashboardJson  // Provide current dashboard JSON
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
  question: 'Explain what this dashboard shows',
  datasourceId: 'my-datasource',
  dashboard: currentDashboard  // Accepts RVDashboard object
});

console.log(response.explanation);
```

### Request Parameters

```typescript
interface ChatMessageRequest {
  question: string;              // User's natural language input (required)
  datasourceId?: string;         // Datasource identifier
  dashboard?: string;            // Dashboard JSON or RVDashboard object
  clientName?: string;           // LLM provider override
  streamExplanation?: boolean;   // Enable streaming (default: false)
}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `question` | `string` | Yes | User's natural language question or request |
| `datasourceId` | `string` | No | Datasource identifier for context |
| `dashboard` | `string` | No | Dashboard JSON or RVDashboard object for editing/analysis |
| `clientName` | `string` | No | Name of specific LLM provider to use |
| `streamExplanation` | `boolean` | No | Enable real-time text streaming (default: false) |

### Event Handlers

```typescript
interface ChatEventHandlers {
  onProgress?: (message: string) => void;
  onTextChunk?: (content: string) => void;
  onResult?: (result: unknown) => void;
  onError?: (error: string, details?: unknown) => void;
  onComplete?: (message: string, result?: ChatMessageResponse) => void;
}
```

| Handler | Description |
|---------|-------------|
| `onProgress` | Called with status messages during processing (e.g., "Creating a new dashboard") |
| `onTextChunk` | Called with text fragments when streaming is enabled |
| `onResult` | Called when intermediate results are available |
| `onError` | Called if an error occurs during processing |
| `onComplete` | Called when processing finishes, includes full result |

### Options

```typescript
interface ChatOptions {
  signal?: AbortSignal;  // For request cancellation
}
```

| Option | Type | Description |
|--------|------|-------------|
| `signal` | `AbortSignal` | AbortSignal for cancelling the request |

### Result

```typescript
interface ChatMessageResponse {
  explanation?: string;   // AI-generated explanation
  detail?: string;        // Additional details
  debugInfo?: string;     // Debug information
  rawResponse?: string;   // Raw LLM response
  dashboard?: string;     // Generated/modified dashboard JSON
  error?: string;         // Error message if request failed
}
```

The response always contains an `explanation` field with the AI's natural language response. The `dashboard` field is populated when dashboards are generated or modified.

---

## Common Patterns

### Building a Chat Interface

Create a complete chat UI with message history:

```typescript
const messages: Array<{role: 'user' | 'assistant', content: string}> = [];
let currentMessage = '';

async function sendChatMessage(userInput: string) {
  // Add user message to UI
  messages.push({ role: 'user', content: userInput });
  renderMessages();

  currentMessage = '';

  const response = await client.ai.chat.sendMessage(
    {
      question: userInput,
      datasourceId: 'my-datasource',
      streamExplanation: true
    },
    {
      onProgress: (message) => {
        showProgressIndicator(message);
      },
      onTextChunk: (chunk) => {
        currentMessage += chunk;
        // Update streaming message in UI
        updateStreamingMessage(currentMessage);
        scrollToBottom();
      },
      onComplete: (message, result) => {
        // Finalize message
        messages.push({ role: 'assistant', content: currentMessage });
        renderMessages();

        if (result?.dashboard) {
          loadDashboard(result.dashboard);
        }

        hideProgressIndicator();
      },
      onError: (error) => {
        showError(error);
      }
    }
  );
}

// Clear conversation
async function resetConversation() {
  await client.ai.chat.resetContext();
  messages.length = 0;
  renderMessages();
}
```

### Error Handling

Handle errors gracefully with proper user feedback:

```typescript
async function safeChat(question: string) {
  try {
    const response = await client.ai.chat.sendMessage(
      {
        question,
        datasourceId: 'my-datasource'
      },
      {
        onError: (error, details) => {
          // Handle streaming errors
          console.error('Streaming error:', error);
          console.error('Details:', details);

          // Show user-friendly message
          showNotification('An error occurred. Please try again.', 'error');
        },
        onComplete: (message, result) => {
          if (result?.error) {
            // Handle completion with error
            showNotification(result.error, 'error');
          } else if (result) {
            // Success
            displayResponse(result.explanation);

            if (result.dashboard) {
              loadDashboard(result.dashboard);
            }
          }
        }
      }
    );
  } catch (error) {
    // Handle request-level errors
    console.error('Request failed:', error);

    if (error.message.includes('datasource')) {
      showNotification('Datasource not found. Please check your configuration.', 'error');
    } else if (error.message.includes('network')) {
      showNotification('Network error. Please check your connection.', 'error');
    } else {
      showNotification('An unexpected error occurred.', 'error');
    }
  }
}
```
