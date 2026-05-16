# Common Patterns

The `RevealView` exposes a large surface of properties for controlling what end-users see and what actions they can take. Rather than enumerate each property in isolation (the [API reference](https://help.revealbi.io/api/javascript/latest/classes/RevealView.html) already does that), the topics in this section show **common compositions** — properties wired together to solve a real customer-shaped problem.

Each pattern follows the same shape:

- **Goal** — the customer-shaped problem the pattern solves
- **Result** — screenshot of the resulting UI
- **Properties used** — short list, each linked to the API reference
- **Code** — copy-pasteable composition
- **Variations** — small tweaks for related needs

## Patterns

| Pattern | Use when |
|---|---|
| [View-only Embed](view-only-embed.md) | You want to embed a dashboard for users who view, refresh, and filter — but never edit. |
| [Custom Save Workflow](custom-save-workflow.md) | You need to route saves through your own REST endpoint instead of the built-in `IRVDashboardProvider`. |
| [Locked-down Export Menu](locked-down-export.md) | Compliance or product policy requires only certain export formats (e.g., Excel only, no PDF/PowerPoint). |
| [Editor-on-Load Kiosk](editor-on-load-kiosk.md) | You want users to land directly in the editor with the new-visualization dialog open — kiosk-style authoring apps. |

## See also

- [Editor Events](../editor-events.md) — lifecycle events for code that runs before/after the visualization editor opens or closes.
- [`RevealView` API reference](https://help.revealbi.io/api/javascript/latest/classes/RevealView.html) — full property and event signatures.
