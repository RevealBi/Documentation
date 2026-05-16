# Locked-down Export Menu

## Goal

Selectively hide export formats from the dashboard's **Export** menu. Common when compliance, product policy, or licensing means certain formats shouldn't be available — e.g., "Excel only, no PDF or PowerPoint" for a regulated environment, or "no image export" for a customer-portal embed.

## Result

![](../images/editing-showExportToPDF.jpg)

The export submenu shows only the formats you allow.

## Properties used

Each export format has its own visibility toggle:

- [`showExportToCSV`](https://help.revealbi.io/api/javascript/latest/classes/RevealView.html#showExportToCSV)
- [`showExportToExcel`](https://help.revealbi.io/api/javascript/latest/classes/RevealView.html#showExportToExcel)
- [`showExportImage`](https://help.revealbi.io/api/javascript/latest/classes/RevealView.html#showExportImage)
- [`showExportToPDF`](https://help.revealbi.io/api/javascript/latest/classes/RevealView.html#showExportToPDF)
- [`showExportToPowerPoint`](https://help.revealbi.io/api/javascript/latest/classes/RevealView.html#showExportToPowerPoint)

Set any to `false` to remove the corresponding menu entry.

## Code

### Excel only (compliance scenario)

```js
const revealView = new RevealView("#revealView");
revealView.showExportToPDF = false;
revealView.showExportToPowerPoint = false;
revealView.showExportImage = false;
revealView.showExportToCSV = false;
// Excel stays visible (default)
```

### No file exports — image only (customer portal)

```js
revealView.showExportToCSV = false;
revealView.showExportToExcel = false;
revealView.showExportToPDF = false;
revealView.showExportToPowerPoint = false;
// Image stays visible
```

### Hide the entire Export menu

If no formats are allowed at all, hide the menu entry by disabling all five — the parent menu is removed automatically when empty.

## Variations

- **Allow exports but route through your server** — leave the toggles on and use [Server-Side Export](../server-export.md) for audit logging and centralized formatting.
- **Customize the export-to-image flow** — keep `showExportImage = true` and hook [`onImageExported`](https://help.revealbi.io/api/javascript/latest/classes/RevealView.html#onImageExported) to redirect the output. See [End-User Export](../exporting-dashboards.md#custom-image-export).

## See also

- [End-User Export](../exporting-dashboards.md) — the export menu and per-format options end-users see.
- [Server-Side Export](../server-export.md) — headless export from the server, useful for scheduled reports.
