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

### SBOM catalog

The unversioned Trust Center loads its SBOM catalog at runtime. Local builds
use `static/sbom/catalog.json`, which contains the current server and browser
client release entries.

Until public CDN storage is available, the current downloadable documents live
under `static/sbom/files` and the catalog uses relative URLs. Remove those checked-in
documents after copying them to the CDN and setting `SBOM_CATALOG_URL` to the
published catalog location.

Set `SBOM_CATALOG_URL` when building the site to use the production catalog:

```bash
SBOM_CATALOG_URL=https://cdn.example.com/reveal/sbom/catalog.json npm run build
```

The GitHub Actions workflow reads the same value from the
`SBOM_CATALOG_URL` repository variable. An external catalog must allow browser
requests from `https://help.revealbi.io`. Relative SBOM download URLs in the
catalog are resolved against the catalog URL, so the catalog and SBOM files can
move together between staging and production CDN prefixes.

Validate production catalogs against `static/sbom/catalog.schema.json` before
publishing them. Server entries may be `independent` or limited to the supported
production targets `win-x64` and `linux-x64`; Client SDK entries use `javascript`
and `browser`. Use one `independent` entry when the same SBOM applies to both server
operating systems rather than duplicating its download URL. Catalog entries use the
package version as their only product version. Only numeric RTM package versions are
accepted; preview releases and CI builds must not be added to the catalog.
