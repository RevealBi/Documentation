---
sidebar_label: Chat Endpoint
---


# Chat Endpoint

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

## Endpoints

**Send Message**
```
POST /api/reveal/ai/chat
```

**Clear Session**
```
DELETE /api/reveal/ai/chat
```

## Request Format

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

### Request Parameters

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

## Response Format

### Non-Streaming (default)

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

### Streaming

When `stream` is `true`, the endpoint returns Server-Sent Events (SSE) with the following event types:

#### progress Event
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

#### text Event
Contains fragments of the explanation text as it's generated.

```json
event: text
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

## Conversation History

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

## Server-Side Implementation

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

## Metadata Configuration

Chat requires a **metadata catalog** to understand your datasource structure. The `datasourceId` parameter in chat requests must match an `Id` defined in your catalog.

:::info

See the [Metadata Catalog](./metadata-catalog.md) topic for the full catalog schema, configuration options, and examples.

:::
