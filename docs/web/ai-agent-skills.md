import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# AI Agent Skills

The Reveal SDK ships [Agent Skills](https://agentskills.io) that teach AI coding assistants such as Claude Code, GitHub Copilot and Cursor how to build with Reveal. A skill is a folder of instructions, reference pages and starter code that the assistant loads only when your request needs it. With the skill installed, the assistant works from curated Reveal guidance instead of searching the web and guessing at APIs.

There are two skills:

- **`reveal-embed`** helps you embed Reveal dashboards in your own application.
- **`reveal-dashboard-authoring`** creates, edits and inspects `.rdash` dashboard files in code with the Reveal DOM.

The skills live in the [`skills/`](https://github.com/RevealBi/Reveal.Sdk/tree/main/skills) folder of the Reveal.Sdk GitHub repository.

## The reveal-embed Skill

`reveal-embed` helps you embed Reveal dashboards in your own application. It covers:

- **Server setup** for ASP.NET Core, Node.js (Express, NestJS, CommonJS or ES modules) and Java (Spring Boot, Jakarta EE 9 containers)
- **Client setup** for plain HTML/JavaScript, Angular, React, Vue and the web component wrappers
- **Data sources** such as SQL Server, PostgreSQL, Snowflake, REST, Excel/CSV and in-memory data, with connection details kept on the server
- **User context and security**: passing the signed-in user to the server, multi-tenancy and per-user credentials.
- **Dashboards**: loading, saving, creating and storing dashboards outside the file system.
- **Theming and data export**
- **Troubleshooting** for the most common setup problems: a blank or unstyled view, CORS errors, empty widgets and failed exports.

It also includes minimal ASP.NET Core and Node.js projects that the assistant adapts into your app. They let you view, create and save dashboards, and each user's saved dashboards are kept separate. They reject unauthenticated requests until you connect your app's sign-in. For a quick local run, start them with `--anonymous-demo`, which allows anonymous access on localhost only.

## The reveal-dashboard-authoring Skill

`reveal-dashboard-authoring` works with dashboards as code. It uses the Reveal DOM, an object model for `.rdash` files, available as [`@revealbi/dom`](https://github.com/RevealBi/revealbi-dom) for TypeScript and JavaScript (Node.js or the browser) and [`Reveal.Sdk.Dom`](https://github.com/RevealBi/Reveal.Sdk.Dom) for .NET. It covers:

- **Creating dashboards** from code, a template, a spec or AI output: data sources, charts, KPIs, grids, pivots, maps, dashboard filters, formatting and linking.
- **Editing dashboards**: renaming, removing, reordering and adding visualizations, redirecting data sources, and copying visualizations between dashboards.
- **Inspecting dashboards**: listing the data sources, fields, filters and visualizations in any `.rdash` file.
- **Delivering dashboards** as files, from your server's dashboard provider at request time, straight into a `RevealView`, or as JSON in a database.
- **Bulk migrations** across many stored dashboards.

The skill always uses the latest version of the DOM libraries, and it has the assistant write code against the types you have installed, not from memory. It also knows the library behaviors that are easy to get wrong and catch only at render time, such as how date filters bind to fields, what a new date filter shows by default, and how loaded dashboards differ from new ones.

It also includes ready-to-run TypeScript and .NET projects with examples and tests, a tool that prints the installed API for any class, a tool that lists what a dashboard contains, and a local preview server with sample data. The assistant writes the code, type-checks it and runs it. It then renders the dashboard in a real Reveal server and reads the screenshot and any widget errors, including visualizations that crash, come back empty or never finish drawing, before it hands the result back to you. The preview server is anonymous, read-only and listens on localhost only. It's a development tool and should not be deployed: the assistant runs it outside your repository and stops it when it's done.

### The skill works only through the DOM

The assistant never writes or patches a dashboard's `Dashboard.json` itself. When the Reveal DOM can't do what you asked, or saving through it would drop something the dashboard has, the assistant stops before it writes anything. It tells you what's missing and what it would cost, offers a draft issue for the library's GitHub repository, and asks you how to proceed: skip that part, make the change in the Reveal editor, or edit the JSON by hand as a one-off. It edits the JSON only if you say so.

For example, before it changes a dashboard built in the Reveal editor, the assistant runs a check that lists the settings a round trip through the DOM would lose, such as custom date formats, hidden fields, or the sort order of a field. If the check finds any, you decide what happens next. It does the same for requests the DOM doesn't support yet, such as a chart of the top N categories by an aggregated value, a time series visualization (it doesn't render yet), or several date filters on one dashboard in TypeScript. Where the DOM offers a substitute that shows the same live data, such as a line chart by day, the assistant uses it and says so.

The skill keeps a list of these known limitations, each linked to its issue in the library's GitHub repository, and its tests flag when a library release fixes some of them. If you hit a limitation that isn't tracked yet, open an issue in the repository of the library you use, [revealbi-dom](https://github.com/RevealBi/revealbi-dom/issues) for TypeScript and JavaScript or [Reveal.Sdk.Dom](https://github.com/RevealBi/Reveal.Sdk.Dom/issues) for .NET. The assistant can draft it for you.

:::note

Connection details and credentials don't belong in a dashboard file. Dashboards the skill creates contain only placeholders for host, database and URL, and your server's data source provider supplies the real values at runtime, as the `reveal-embed` skill sets up.

:::

## Installing the Skills

Install one skill or both. The Claude Code plugin installs both.

<Tabs groupId="skill-install" queryString>
  <TabItem value="gh" label="GitHub CLI" default>

Requires GitHub CLI 2.90 or later.

```bash
gh skill install RevealBi/Reveal.Sdk reveal-embed
gh skill install RevealBi/Reveal.Sdk reveal-dashboard-authoring
```

  </TabItem>
  <TabItem value="npx" label="skills CLI">

```bash
npx skills add RevealBi/Reveal.Sdk --skill reveal-embed
npx skills add RevealBi/Reveal.Sdk --skill reveal-dashboard-authoring
```

  </TabItem>
  <TabItem value="claude" label="Claude Code plugin">

Run these commands inside Claude Code:

```bash
/plugin marketplace add RevealBi/Reveal.Sdk
/plugin install reveal-sdk@reveal-sdk
```

  </TabItem>
  <TabItem value="manual" label="Manual">

Copy the skill folders from the [`skills/`](https://github.com/RevealBi/Reveal.Sdk/tree/main/skills) folder into your project:

| Folder | Read by |
| --- | --- |
| `.claude/skills/<skill-name>/` | Claude Code, GitHub Copilot and Cursor |
| `.github/skills/<skill-name>/` | GitHub Copilot |
| `.agents/skills/<skill-name>/` | GitHub Copilot and Cursor |

Commit the folder so everyone working on the project gets the skills.

  </TabItem>
</Tabs>

## Using the Skills

You don't have to call a skill by name. Ask your assistant about Reveal in your project and it loads the right skill on its own. For example:

- *"Add a Reveal dashboard to this ASP.NET Core app and a React page that shows it."*
- *"Connect Reveal to our SQL Server database without exposing the connection string to the browser."*
- *"Each tenant should see only its own orders in Reveal dashboards."*
- *"My RevealView is blank and the console shows a CORS error. What's wrong?"*

These load `reveal-embed`. The assistant first works out your server and client stack and gets one dashboard rendering. Then it adds data, security and polish in that order. It finishes with a checklist: the dashboard renders in a browser, credentials stay on the server, CORS is restricted and the license key is kept out of source control.

- *"Write a script that generates a Reveal dashboard with revenue by region from our orders table."*
- *"Add a pie chart of revenue by category to dashboards/Sales.rdash and remove the Orders grid."*
- *"What's inside Sales.rdash? List the charts and the fields they use."*
- *"Using @revealbi/dom, how do I connect a date filter to a column chart?"*
- *"Add a bar chart of revenue by product to dashboards/Sales.rdash. The sales team built it in the Reveal editor."*

These load `reveal-dashboard-authoring`. The assistant sets up a small workspace in your repository, checks the installed library's API, and writes and runs the code. It then renders the result before it reports back. For the last prompt it first checks what saving the editor-made dashboard through the DOM would lose, and asks you before it goes on if the answer is "something".

:::tip

The skills follow your project's existing conventions, such as dependency injection, configuration and code style. Run your assistant from your application's root folder so it can read your project files.

:::

## What the reveal-embed Skill Buys You

We ran the same embedding task on a variety of apps, both with and without the `reveal-embed` skill. We graded each run on several measures, including a browser check, security probes, a static code check and an LLM judge.

| | Without skill | With skill |
| --- | --- | --- |
| **Quality** | | |
| Judge score | 21/30 (70%) | **28/30 (93%)** |
| **Effort and cost** | | |
| Wall-clock time | 72 min | **36 min** |
| Agent turns | 439 | **275** |
| Tool calls | 465 | **270** |
| Tokens processed (including cache reads) | 76.9M | **30.4M** |
| Tokens generated (including thinking) | 281k | **150k** |
| API-equivalent cost | $31.27 | **$13.71** |
| **Where Reveal knowledge came from** | | |
| Web searches and doc fetches | 23 | **0** |
| Source | help.revealbi.io, GitHub samples, search results | The skill's reference pages |

In this test, the agent with the skill was correct more often on the things that matter most. It finished in about half the time and at less than half the cost, and it used curated guidance instead of web searches.

:::note

These figures come from internal tests and are shown for illustration only. They are not a guarantee or a benchmark. Your results will vary depending on the AI model and version, the coding assistant and its settings, your prompt, your project's stack and existing code, and current model pricing. AI agents are also non-deterministic, so the same task can produce different results from run to run.

:::

## What the reveal-dashboard-authoring Skill Buys You

We gave five dashboard tasks to Claude Code (Claude Sonnet 5) in a small Node.js project, with and without the `reveal-dashboard-authoring` skill, two runs each. Each result was rendered in a Reveal server, checked against what the task asked for, and scored by an LLM judge from 0 to 10. The table shows the average of the two runs.

| Task | Without skill | With skill |
| --- | --- | --- |
| Generate a dashboard from a sales API, with a date filter and a region filter | $1.86, 7.2 min, judge 7.0. One run delivered a chart with no data and reported success. | **$0.90, 3.1 min, judge 8.5.** Both runs rendered with data. |
| Generate a .NET dashboard over SQL Server, with no credentials in the file | $2.15, 10.5 min, judge 6.5. One run left generated ids a server can't allow-list. | **$0.85, 7.3 min, judge 9.0** |
| List what's inside an existing dashboard | $0.34, 1.6 min, judge 9.0 | $0.29, 1.0 min, judge 9.0 |
| Build a dashboard from an untrusted AI-generated spec | $1.48, 7.5 min, judge 9.0 | $1.51, 8.8 min, judge 9.0 |
| Edit a dashboard built in the Reveal editor | **$0.71, 2.7 min, judge 9.0.** Edited the dashboard's JSON directly, which kept every setting. | $1.49, 4.6 min, judge 7.0. Saving through the DOM dropped custom date formats without a warning. |
| **All five tasks** | $1.31 and 5.9 min per run, judge 8.1 | **$1.01 and 5.0 min per run, judge 8.5** |

The skill helped most when the assistant generates a dashboard, where it was about twice as fast and cost about half as much. It made no difference for reading a dashboard or for building one from an untrusted spec, which the assistant handles well on its own. The editing result is why the skill now checks for losses before it edits an editor-made dashboard and asks you first, instead of editing silently or editing the JSON itself.

We then repeated the tests that went wrong or hit a library limitation with the updated skill:

| Request | Without skill | With the updated skill |
| --- | --- | --- |
| Edit an editor-made dashboard | Edited the JSON directly, without asking (2 of 2 runs) | Listed what would be lost and asked how to proceed (4 of 4 runs) |
| A time series chart of daily revenue | A chart that never drew, reported as done (2 of 2 runs) | A line chart by day that renders, with a note on why (2 of 2 runs) |
| A chart of the top 3 products by revenue | A wrong or empty chart, reported as done (2 of 2 runs) | Explained that the DOM can't express it and offered options (3 of 3 runs) |

We adjusted the skill's wording for the last row while running these same tasks, so treat that row as an indication of the intended behavior, not as a measured rate.

:::note

These figures come from internal tests on one project and one model, two runs per task, with an earlier version of the skill for the first table. They are shown for illustration only. They are not a guarantee or a benchmark. Your results will vary depending on the AI model and version, the coding assistant and its settings, your prompt, your project's stack and existing code, and current model pricing. AI agents are also non-deterministic, so the same task can produce different results from run to run. Cost is API-equivalent.

:::

## Feedback

If a skill gives wrong or outdated guidance, [open an issue](https://github.com/RevealBi/Reveal.Sdk/issues) in the Reveal.Sdk repository and include the skill name and the prompt you used. For a limitation of the DOM libraries themselves, use the [revealbi-dom](https://github.com/RevealBi/revealbi-dom/issues) or [Reveal.Sdk.Dom](https://github.com/RevealBi/Reveal.Sdk.Dom/issues) repository.
