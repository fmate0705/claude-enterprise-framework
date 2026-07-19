# Future Compatibility

**Framework:** CEF · **Specification:** AS-006 (Platform Engine) · **Version:** 0.1.0

**Purpose:** Define how the platform evolves without destabilizing higher-level standards. A platform module MUST be able to adopt new technology versions while the Constitution, Rule Engine, Workflow Engine, and design standards remain unchanged. This file fixes the versioning, deprecation, and migration policy.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Isolation Principle

- **FC-01 — Platform is a replaceable layer.** Higher-level standards depend on platform *capabilities*, not specific versions. A platform upgrade MUST NOT require editing the Constitution or the design/SEO/architecture engines.
- **FC-02 — Capability contracts.** Platform standards expose stable capabilities (server rendering, typed config, containerization); the underlying technology MAY change as long as the capability holds.

## Versioning Strategy

- **FC-03 — Semantic versioning.** The framework follows SemVer. A change that removes or alters an approved technology's required behavior is a MAJOR change; adding a Supported Alternative is MINOR; clarifications are PATCH.
- **FC-04 — Platform versions are pinned per project.** Each project records its platform versions in `memory/architecture.md`; upgrades are deliberate (`package-manager.md` PM-09/10).
- **FC-05 — Independent module evolution.** A platform module (e.g., `nextjs.md`) MAY advance its version guidance without forcing unrelated modules to change.

## Deprecation Policy

- **FC-06 — Announce before removal.** A technology or API moving to Discouraged or Forbidden MUST be announced in `CHANGELOG.md` with the reason and the replacement.
- **FC-07 — Grace window.** A deprecated technology MUST retain a documented grace window during which existing projects remain valid; it MUST NOT be removed without a migration path.
- **FC-08 — Removal is recorded.** Final removal is a MAJOR change recorded in the changelog and the affected standard file.

## Migration Philosophy

- **FC-09 — Incremental over big-bang.** Migrations MUST be incremental where possible; a whole-platform rewrite MUST NOT be the default migration.
- **FC-10 — Automated where possible.** A migration SHOULD provide a codemod or scripted path when the change is mechanical.
- **FC-11 — Backward-compatible defaults.** A new default MUST preserve existing behavior unless the change is a recorded MAJOR; silent behavior changes MUST NOT ship.
- **FC-12 — Record every migration.** Every platform migration is recorded in `memory/decisions.md` and the changelog with its rationale and steps.

## Future-Compatibility Guarantees

- **FC-G1** — Higher standards are insulated from platform version churn.
- **FC-G2** — Deprecations are announced, graced, and migratable.
- **FC-G3** — Every platform change is versioned and recorded.
