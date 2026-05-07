# Accessibility

## Keyboard Accessibility

The Reveal SDK supports keyboard navigation in View Mode, allowing users to interact with dashboards without a mouse. All interactive elements have visible focus indicators and follow a logical tab order.

### Navigating the Dashboard

Use the following keyboard shortcuts to navigate and interact with a dashboard:

| Key | Action |
|-----|--------|
| **Tab** | Move focus to the next interactive element |
| **Shift + Tab** | Move focus to the previous interactive element |
| **Arrow Keys** | Navigate between visualizations on the dashboard, and within lists, grids, and menus |
| **Enter** | Activate the focused control (e.g., maximize a visualization, confirm a selection, open a menu) |
| **Space** | Toggle the checkbox of the focused element |
| **Escape** | Close an open dialog, menu, or popup |

### Dashboard View Navigation

When a dashboard is in View Mode:

- Use **Arrow Keys** to move focus between visualizations on the dashboard.
- Press **Enter** on a focused visualization to move focus to the maximize button

### Lists and Grid Components

When focus is inside a list, dropdown, or grid-based component, use the **Arrow Keys** to navigate between items. Press **Enter** to select the focused item.

### Focus Behavior

- Focus is always visibly indicated as it moves through the interface.
- The keyboard navigation order follows a logical, intuitive sequence.

### Limitations

Keyboard navigation within visualization components is only supported for **Scatter Maps**, **Grid**, and **Sparkline**. For all other visualization types, only the visualization header is reachable via keyboard. Support for **Pivot** is planned for a future release.
