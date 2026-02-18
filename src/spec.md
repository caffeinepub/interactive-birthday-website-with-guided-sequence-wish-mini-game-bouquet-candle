# Specification

## Summary
**Goal:** Publish/go-live the current birthday experience with a deployment-safe domain/slug and verify the live step flow works end-to-end.

**Planned changes:**
- Create a production deployment of the current app build and ensure it loads Step 1 without blank screen or fatal console errors.
- Ensure the go-live domain/slug is always platform-compliant by validating and sanitizing (or falling back to a safe slug) using existing slug utilities where applicable.
- Perform a live smoke test of Steps 1→6 to confirm Step 6 auto-opens the Birthday Note modal, it stays open until closed, and it can be re-opened after closing (plus restart still works from Step 6).

**User-visible outcome:** A live published URL that reliably loads the birthday experience and allows users to complete Steps 1–6, including a stable Birthday Note modal on Step 6 that can be reopened without restarting.
