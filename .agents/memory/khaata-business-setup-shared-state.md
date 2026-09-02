---
name: Khaata business setup shared state
description: Why schedule/fee configuration data for schedule-based business types (Gym, Yoga) must live in AppContext, not local component state.
---

In the Khaata prototype, "configure once in a setup page, then consume dynamically elsewhere" flows (e.g. Business Setup page defining batches/fee plans, consumed by the Add Member wizard) require the configured data to live in shared React context (`AppContext`), not local `useState` inside the setup page component.

**Why:** Initially the setup page seeded its own local state from the static mock data constant, while the consuming page (Add Member) read directly from the same static mock data constant. Edits made in the setup page never reached the consumer, since they only updated local component state. This is easy to miss because both pages render fine independently and only breaks on the actual "edit then verify elsewhere" path — caught via e2e testing, not by inspection.

**How to apply:** For any prototype feature where one screen configures data that another screen must consume live (no backend/DB), lift the editable data into the shared app-level context (with an updater function), and have both the editor and consumer read from that same context state. Only use the static mock data module as the initial seed value inside the context provider.
