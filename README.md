# Documentation

### Install the docs

Clone/Fork the repo and run the following command
```bash
npm install
```

> **Note on the AI search plugin**
>
> `@igniteui/reveal-ai-plugin` powers the AI search box. It is published to a private
> GitHub Packages feed under the `@igniteui` scope, so most contributors cannot download
> it - `npm install` will log a `401 Unauthorized` for that one package.
>
> **This is expected and safe to ignore.** The plugin is an *optional* dependency, so the
> install still succeeds, and the site builds and runs normally - only the AI search box
> is missing. The build prints a line confirming it was skipped.
>
> If you need the AI search box locally, you must have read access to the `@igniteui`
> package feed (ask the team that publishes the plugin - being a member of the Reveal
> org is not sufficient on its own). Then export a GitHub PAT with the `read:packages`
> scope before installing:
>
> ```bash
> export PLUGIN_PAT=<your_github_pat>          # macOS/Linux
> $env:PLUGIN_PAT="<your_github_pat>"          # Windows PowerShell
> npm install
> ```

### Run the docs

English
```bash
npm start
```

Japanese
```bash
npm run start:ja
```

### Generate translation strings

English
```bash
npm run write-translations
```

Japanese
```bash
npm run write-translations:ja
```

### Build the docs

```bash
npm run build
```
