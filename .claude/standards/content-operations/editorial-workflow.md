# Editorial Workflow

**Framework:** CEF · **Specification:** AS-018 (Content Operations Engine) · **Version:** 2.0.0 · **Module:** M-CONTENTOPS

**Purpose:** Define the deterministic editorial workflow: eight states, their owners, required actions, and exit criteria. Every project uses this workflow in this order.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `editorial.policy.yaml` (`states`, `transitions`, `transition_rules`).

---

## The Workflow

```
Idea → Draft → Internal Review → Revision → Approval → Scheduled → Published → Archived
                     ↑______________|            |
                     |__________________________ |   (rejection returns to Revision)
```

- **EW-01 — Deterministic.** The same content in the same state MUST move the same way, every time (`COP-18`).
- **EW-02 — Only declared transitions.** Any transition not in `editorial.policy.transitions` MUST NOT occur.
- **EW-03 — Review is never skipped.** (`COP-14`.)
- **EW-04 — Every transition is logged and attributed.** (`editorial.policy.audit`.)
- **EW-05 — Server-authoritative.** State MUST be server-side; a client-asserted state MUST NOT be accepted (`COM-02` applies the same logic).
- **EW-06 — Scheduled is skippable; review is not.** Content MAY move from Approval directly to Published. It MUST NOT move from Draft to Published.

## The Eight States

### 1. Idea
- **Owner:** Author.
- **Required actions:** State the purpose, the audience, and the goal it serves.
- **Exit criteria:** The item traces to a stated objective. Content serving no goal MUST NOT be built (`PR-03`).

### 2. Draft
- **Owner:** Author.
- **Required actions:** Author the content against the model; complete required fields; add media with alt text and licence; author metadata.
- **Exit criteria:** Model-complete and self-reviewed. A draft submitted with empty required fields wastes the reviewer.
- **Rules:** Autosaved (`drafts.md`); never public; never indexable (`editorial.policy.drafts`).

### 3. Internal Review
- **Owner:** Reviewer — never the author (`COP-15`).
- **Required actions:** Check accuracy, brand voice, structure, links, media, metadata, accessibility, and legal exposure (`editorial.policy.review_stage`).
- **Exit criteria:** Approved, or rejected with a stated reason.
- **Rules:** Legal content MUST route to legal review (`AS-016` LEG-14). Content quality is judged against `content/review.md` (AS-011).

### 4. Revision
- **Owner:** Author.
- **Required actions:** Address every stated reason.
- **Exit criteria:** Resubmitted to Internal Review.
- **Rules:** Rejection MUST state its reason (`COP-17`). A rejection without one produces the same defect resubmitted.

### 5. Approval
- **Owner:** Reviewer or a designated approver — never the author.
- **Required actions:** Record approval against the specific revision.
- **Exit criteria:** Approval recorded and bound to a version (`COP-16`).
- **Rules:** Approval MUST be invalidated by any subsequent edit (`editorial.policy.approvals`). Approval expires (`approvals.md`).

### 6. Scheduled
- **Owner:** Publisher.
- **Required actions:** Set the publish time with an explicit timezone.
- **Exit criteria:** Publication fires, or the schedule is cancelled.
- **Rules:** Approval MUST be revalidated at fire time. A missed schedule MUST alert (`scheduled-publishing.md`).

### 7. Published
- **Owner:** Publisher, then the content owner.
- **Required actions:** Verify the live render; confirm index update.
- **Exit criteria:** Live and correct.
- **Rules:** Publishing is atomic (`COP-22`). Rollback available to the publisher without engineering (`COP-21`). Editing published content creates a new draft; live stays live (`editorial.policy.transitions`).

### 8. Archived
- **Owner:** Content owner.
- **Required actions:** Decide the URL's fate — redirect, 404, or 410.
- **Exit criteria:** Removed from view and from the index, with its URL answering deliberately.
- **Rules:** Archiving is not deletion (`archiving.md`, `COP-23`). Archived content MAY revive as a new draft.

## Roles

Defined in `editorial.policy.roles`; enforced by the authorization model (AS-016).

- **EW-07 — The author is not the approver.** (`COP-15`.) Self-approval MUST NOT be possible, including for administrators.
- **EW-08 — Publish is a distinct right.** The right to publish MUST be separate from the right to edit (`editorial.policy.permissions`).
- **EW-09 — Roles are least privilege.** (`AZ-02`.)

## Proportionality

- **EW-10 — Every state is served; some are brief.** On a small team a state may take a minute. It MUST NOT be removed. A one-person project still separates authoring from approving in time, even if not in person — and MUST record that as a scoped decision (`PR-10`).
- **EW-11 — Emergency changes are still reviewed.** A correction under time pressure MUST still be attributed and logged. Where review is genuinely deferred, it MUST be recorded and completed after (`ME-07`). "Urgent" MUST NOT become the default path.

## Verification

The content-operations gate verifies only declared transitions occur, review is never skipped, the author is never the approver, approval binds to a revision and is invalidated by edits, rejection states a reason, every transition is logged and attributed, and publish is a distinct right.
