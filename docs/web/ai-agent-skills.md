import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# AI Agent Skills

The Reveal SDK ships [Agent Skills](https://agentskills.io) that teach AI coding assistants such as Claude Code, GitHub Copilot and Cursor how to build with Reveal. A skill is a folder of instructions, reference pages and starter code that the assistant loads only when your request needs it. With the skill installed, the assistant works from curated Reveal guidance instead of searching the web and guessing at APIs.

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

## Installing the Skill

<Tabs groupId="skill-install" queryString>
  <TabItem value="gh" label="GitHub CLI" default>

Requires GitHub CLI 2.90 or later.

```bash
gh skill install RevealBi/Reveal.Sdk reveal-embed
```

  </TabItem>
  <TabItem value="npx" label="skills CLI">

```bash
npx skills add RevealBi/Reveal.Sdk --skill reveal-embed
```

  </TabItem>
  <TabItem value="claude" label="Claude Code plugin">

Run these commands inside Claude Code:

```bash
/plugin marketplace add RevealBi/Reveal.Sdk
/plugin install reveal-sdk@reveal-sdk
```

  </TabItem>
</Tabs>

## Using the Skill

You don't have to call the skill by name. Ask your assistant about Reveal in your project and it loads the skill on its own. For example:

- *"Add a Reveal dashboard to this ASP.NET Core app and a React page that shows it."*
- *"Connect Reveal to our SQL Server database without exposing the connection string to the browser."*
- *"Each tenant should see only its own orders in Reveal dashboards."*
- *"My RevealView is blank and the console shows a CORS error. What's wrong?"*

The assistant first works out your server and client stack and gets one dashboard rendering. Then it adds data, security and polish in that order. It finishes with a checklist: the dashboard renders in a browser, credentials stay on the server, CORS is restricted and the license key is kept out of source control.

:::tip

The skill follows your project's existing conventions, such as dependency injection, configuration and code style. Run your assistant from your application's root folder so it can read your project files.

:::

## What the Skill Buys You

We ran the same embedding task on a variety of apps, both with and without the skill. We graded each run on several measures, including a browser check, security probes, a static code check and an LLM judge.

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

If the skill gives wrong or outdated guidance, [open an issue](https://github.com/RevealBi/Reveal.Sdk/issues) in the Reveal.Sdk repository and include the prompt you used.
