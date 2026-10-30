---
sidebar_label: Metering and Billing
---

# Metering and Billing

Every AI call Reveal makes spends tokens on the developer's provider account. Reveal gives the developer two hooks to track and control that spend. Both see AI calls from every feature and provider. Usage tracking records every call, including background work Reveal performs on its own; the quota gate skips that background work by default.

| &nbsp; | [Usage tracking](usage-tracking.md) | [Quotas and billing](quota-gate.md) |
|---|---|---|
| **Purpose** | Observability: record what each call used. | Policy: decide whether a call may run, and charge for it. |
| **Hook** | Usage sink (`IAIUsageSink`, or the `usageSink` callback) | Quota gate (`IAIQuotaGate`, or the `quotaGate` and `quotaSettle` callbacks) |
| **Runs** | After each call, outside the request | Before each call, and after it inside the request |
| **Delivery** | Best effort | Every call that passed the check |
| **User data** | The user's ID | The full user context, including per-request claims |
| **Can block calls** | No | Yes, with a structured error for the client |
| **Without setup** | Usage is [logged and counted in metrics](observability.md) | No gate: every call is allowed |

Use usage tracking to see where tokens go: per user, feature, profile, or model. Use the quota gate to enforce plans and budgets and to debit actual usage against a balance. The developer can use either one or both.
