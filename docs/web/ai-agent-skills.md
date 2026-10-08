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

The skill always uses the latest version of the DOM libraries, and it has the assistant write code against the types you have installed, not from memory. It also knows the library behaviors that are easy to get wrong and catch only at render time, such as how date filters bind to fields and how loaded dashboards differ from new ones.

It also includes ready-to-run TypeScript and .NET projects with examples and tests, a tool that prints the installed API for any class, and a local preview server with sample data. The assistant writes the code, type-checks it and runs it. It then renders the dashboard in a real Reveal server and reads the screenshot and any widget errors before it hands the result back to you. The preview server is anonymous, read-only and listens on localhost only. It's a development tool and should not be deployed.

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

These load `reveal-dashboard-authoring`. The assistant sets up a small workspace in your repository, checks the installed library's API, and writes and runs the code. It then renders the result before it reports back.

:::tip

The skills follow your project's existing conventions, such as dependency injection, configuration and code style. Run your assistant from your application's root folder so it can read your project files.

:::

## What the reveal-embed Skill Buys You

We ran the same embedding task on a variety of apps, both with and without the `reveal-embed` skill. We graded each run on several measures, including a browser check, security probes, a static code check and an LLM judge.

| --- | Without skill | With skill |
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

## Feedback

If a skill gives wrong or outdated guidance, [open an issue](https://github.com/RevealBi/Reveal.Sdk/issues) in the Reveal.Sdk repository and include the skill name and the prompt you used.
