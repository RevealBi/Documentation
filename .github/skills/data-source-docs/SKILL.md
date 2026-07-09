---
name: data-source-docs
description: Create or update Reveal data-source documentation in this repository. Use this whenever the user asks to add a new data source topic, document a new connector based on existing topics, localize a data-source doc to Japanese, or keep data-source companion files in sync after adding a connector. This skill is especially relevant when requests mention files under docs/web/adding-data-sources, i18n/ja data-source pages, sidebars, custom-queries, or the supported data-sources table, even if the user does not explicitly ask for a “skill” or “workflow.”
---

# Reveal data-source docs

Create data-source documentation by following the repository patterns already used for Reveal connector topics. Prefer consistency with nearby topics over inventing a new structure.

## What this skill covers

Use this skill for work such as:

- adding a new page under `docs\web\adding-data-sources\`
- choosing the closest existing connector page as a template
- updating companion files that must stay in sync
- creating the Japanese localized topic under `i18n\ja\...`
- mirroring screenshot assets into the Japanese `images` folder
- fixing broken doc links or locale-specific anchors found during the build

## Default workflow

Follow this sequence unless the user explicitly narrows the scope.

1. Inspect the nearest matching English topics first.
2. Draft the new English topic.
3. Update required companion files.
4. Create the Japanese localized page and sidebar-label updates.
5. Mirror screenshots into the Japanese tree when needed.
6. Build the docs and fix any broken links or anchors.

The point of this workflow is to keep the documentation set coherent. A new connector page is rarely complete in isolation.

## Step 1: choose the right templates

Before editing, identify the closest reference pages under `docs\web\adding-data-sources\`.

Typical patterns:

- `sqlite.md` for lightweight/file-based connectors
- `databricks.md` for analytics platforms, richer server configuration, and token-based auth
- `clickhouse.md`, `snowflake.md`, `mariadb.md`, `azure-cosmos-db.md`, etc. for other connector-specific shapes

Pick one primary template and one secondary template when needed:

- **primary template** = structure, section order, general tone
- **secondary template** = special capabilities such as auth, prerequisites, custom queries, or screenshots

Do not mix patterns casually. Use the minimum set of examples needed to keep the result consistent.

## Step 2: draft the English topic

Create or update the English page at:

- `docs\web\adding-data-sources\<data-source>.md`

For current data-source topics, prefer this structure unless the nearest existing topic clearly uses an older format:

1. Title
2. Introduction
3. Server Configuration
4. Installation
5. Connection Configuration
6. Authentication
7. Client-Side Implementation
8. Creating Data Sources
9. Creating Data Source Items
10. Additional Resources
11. API Reference

### English topic rules

- Keep code blocks, API names, package names, and example identifiers intact.
- Preserve the Docusaurus imports and frontmatter/pagination markers used by neighboring pages.
- Reuse the repository’s section names and callout styles.
- Only document capabilities the connector actually supports.
- If the connector supports custom queries or stored-procedure-like features, mention that in the topic and update the shared reference pages that enumerate those capabilities.
- If screenshots are available, reference them from `images\...`. If screenshots are not available yet, use the standard placeholder-image workflow described below instead of omitting the files silently.

## Step 3: update companion files

Check which of these files need changes:

- `sidebars.ts`
- `src\components\DataSourcesTable\data-sources.ts`
- `docs\web\custom-queries.md`
- other current English cross-reference pages only when the new connector changes a shared list or capability matrix

### Companion-file decision rules

- Update `sidebars.ts` when the new topic should appear in the current docs navigation.
- Update `data-sources.ts` when the connector should appear in the supported data-sources table.
- Update `custom-queries.md` only if the connector genuinely supports custom queries.
- Keep explicit connector lists in alphabetical order when inserting the new data source. This matters most in `sidebars.ts`, `data-sources.ts`, and shared connector lists such as `custom-queries.md`.
- Avoid unrelated cleanup. Stay narrowly aligned to the connector being added.

## Step 4: create the Japanese localization

Japanese localization is part of the standard workflow for this skill.

Create or update:

- `i18n\ja\docusaurus-plugin-content-docs\current\web\adding-data-sources\<data-source>.md`
- `i18n\ja\docusaurus-plugin-content-docs\current.json` for the sidebar label when needed

### Japanese localization rules

- Translate headings, prose, callouts, and resource labels.
- Preserve code blocks, identifiers, package names, API names, URLs, and example values unless nearby Japanese pages localize explanatory comments in that same pattern.
- Match the tone and structure used in nearby Japanese topics such as `duckdb.md`, `sqlite.md`, and `databricks.md`.
- If the English page references screenshots and the Japanese tree mirrors those screenshots, keep the same image references.

## Step 5: mirror screenshot assets

Use the standard screenshot pair for each connector:

- `<data-source>-data-source.jpg`
- `<data-source>-data-source-item.jpg`

When real screenshots are not available yet, create empty placeholder files with those names in the English images folder, mirror them into the Japanese images folder, and clearly tell the user that they need to replace those placeholders with real screenshots.

Ensure the Japanese tree has matching files under:

- `i18n\ja\docusaurus-plugin-content-docs\current\web\adding-data-sources\images\`

Mirror the English asset names exactly. The Japanese localized topic should not point at missing image files.

## Step 6: validate with the docs build

Run the existing docs build after making the edits.

Why this matters:

- locale-specific broken links are easy to miss
- anchor names can differ between English and Japanese pages
- MDX or Docusaurus link resolution can fail even when the prose looks correct

If the build reports a broken link or broken anchor:

1. fix the actual target or link path
2. prefer repo-consistent links over ad hoc workarounds
3. do not suppress warnings instead of fixing the root cause

## Versioning rules

- Default to **current docs only** unless the user explicitly asks to update versioned docs too.
- Do not backport to `version-1.8.4` just because a current-doc page exists.
- If the user asks for versioned parity, evaluate it explicitly and treat it as separate scope.

## Output expectations

When done, report:

1. the main English topic file created or updated
2. which companion files were updated
3. which Japanese files were updated
4. any notable validation fixes, such as repaired broken links or anchors
5. whether placeholder screenshot files were created and still need user follow-up

Keep the response concise and repository-specific.

## Example prompts this skill should handle

**Example 1**

User request:
"Based on SQLite and Databricks, create documentation for a new DuckDB data source and localize it to Japanese."

Expected behavior:

- inspect `sqlite.md` and `databricks.md`
- add `duckdb.md` in English
- update sidebar and supported-data-source references
- update `custom-queries.md` if supported
- create the Japanese localized page and sidebar label
- keep connector lists alphabetically ordered
- create placeholder screenshot files if real screenshots do not exist yet
- run the docs build and fix link issues

**Example 2**

User request:
"Add a new ClickHouse-like connector page and make sure the Japanese docs stay in sync."

Expected behavior:

- use the closest analytics connector pages as templates
- update both English and Japanese docs in the same pass
- keep navigation and shared connector lists coherent
- preserve alphabetical ordering in the connector lists

## Boundaries

- Do not update unrelated docs just because they are nearby.
- Do not assume screenshots, versioned-doc updates, or localization are out of scope unless the user says so; for this repository, current Japanese localization is part of the normal path.
- Do not silently skip shared reference pages if the connector’s capabilities require them.
