---
on:
  push:
    branches: [master]
    paths:
      - "docs/**/*.md"
      - "docs/**/*.mdx"
      - "versioned_docs/**/*.md"
      - "versioned_docs/**/*.mdx"
  workflow_dispatch:
    inputs:
      full_resync:
        description: "Re-translate every source file, ignoring diff. Use sparingly."
        type: boolean
        default: false

permissions:
  contents: read

engine: copilot

concurrency:
  group: "i18n-ja-${{ github.ref }}"
  cancel-in-progress: true

network:
  allowed:
    - threat-detection
    - github

safe-outputs:
  create-pull-request:
    title-prefix: "[i18n-ja] "
    labels: [i18n, ja, automated]
    draft: false

tools:
  bash:
    - "git diff *"
    - "git diff-tree *"
    - "git log *"
    - "git show *"
    - "git ls-files *"
    - "ls *"
    - "wc *"
    - "mkdir *"
    - "rm *"
  edit:
---

# Translate Docs to Japanese

Translate changed English documentation into Japanese under the Docusaurus
`i18n/ja/docusaurus-plugin-content-docs/` tree, then open a pull request with
the result. The English markdown is the only editable source — the Japanese
files in `i18n/ja/**` are generated output and must only be modified by this
workflow (or a follow-up PR review).

## Path mapping (must be exact)

| English source (editable)                          | Japanese output (generated)                                                       |
| -------------------------------------------------- | --------------------------------------------------------------------------------- |
| `docs/<path>.md(x)`                                 | `i18n/ja/docusaurus-plugin-content-docs/current/<path>.md(x)`                     |
| `versioned_docs/version-<V>/<path>.md(x)`           | `i18n/ja/docusaurus-plugin-content-docs/version-<V>/<path>.md(x)`                 |

The set of versions is authoritative in [`versions.json`](../../versions.json)
(currently `1.8.4`). Mirror the directory structure exactly — never flatten,
rename, or reorganize files.

## What to do on each run

1. **Determine the change set**
   - If `inputs.full_resync` is `true`, treat every file under `docs/**` and
     `versioned_docs/**` as the change set.
   - Otherwise, diff `${{ github.event.before }}..${{ github.event.after }}` (fall back
     to `HEAD~1..HEAD` when `before` is the zero SHA, i.e. first push to a
     branch) and collect all added, modified, renamed, and deleted `.md` /
     `.mdx` files inside `docs/**` or `versioned_docs/**`.
   - If the change set is empty after filtering, exit cleanly without opening
     a PR.

2. **For each added or modified source file**
   - Compute the target path using the mapping table above.
   - Read the English file. If its YAML front-matter contains
     `translate: false`, skip it.
   - Translate the body prose into natural, technical Japanese suitable for
     end-user product documentation. Preserve **byte-for-byte**:

     - YAML front-matter keys and values for `id`, `slug`, `sidebar_position`,
       `sidebar_label` keys whose values look like identifiers, and any
       `custom_*` keys. Translate only human-readable values such as `title`
       and `description`.
     - Fenced code blocks (```` ``` ````), inline code (`` ` ``), and HTML/MDX
       component tags and their attribute names.
     - Relative links, anchor IDs, image paths, and admonition syntax
       (`:::note`, `:::tip`, etc.).
     - Heading levels and list structure.
   - Write the translated content to the target path, creating parent
     directories as needed.

3. **For each deleted or renamed source file**
   - Remove the corresponding Japanese mirror file. For renames, also create
     the new translated file at the new target path.

4. **Idempotency check** — after writing all files, run
   `git status --porcelain i18n/ja` and `git diff --stat i18n/ja`. If there
   are no changes, exit without opening a PR.

5. **Open the pull request** via the `create-pull-request` safe output:
   - Title: `Translate <N> docs to Japanese (<short-sha>)` where `N` is the
     number of files written.
   - Body: a short summary table listing each changed source file and its
     Japanese target, plus a "Do not edit generated files directly" note that
     points reviewers at this workflow.
   - Base: `master`.

## Hard rules

- **Never edit anything outside `i18n/ja/docusaurus-plugin-content-docs/`.**
  Source markdown under `docs/` and `versioned_docs/` is read-only for this
  workflow.
- **Never edit `i18n/ja/code.json`** or any file under
  `i18n/ja/docusaurus-theme-classic/` — those are theme strings managed
  separately.
- **Never hand-edit `.lock.yml`** or any other generated YAML.
- **One source file → one Japanese file.** Do not split or merge files.
- **Re-running on the same commit must produce no diff.** If the model
  produces gratuitously reworded output for an unchanged English source,
  prefer the existing Japanese file.
- **Skip binary, non-doc, and non-`.md(x)` files** even if they appear in the
  diff.

## Usage

- Triggers automatically on every push to `master` that touches markdown
  under `docs/**` or `versioned_docs/**`.
- Manual run for a full re-translation:
  `gh aw run translate-docs-ja --ref master -F full_resync=true`
- Inspect a run: `gh aw logs translate-docs-ja`
- Audit a specific run: `gh aw audit <run-id>`
