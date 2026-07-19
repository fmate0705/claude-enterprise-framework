# Release Management

**Framework:** CEF · **Specification:** AS-014 (Delivery & Operations Engine) · **Version:** 0.1.0

**Purpose:** Fix how releases are planned, published, and communicated. The **decision** to release is owned by the QA Engine (`release.policy.yaml`); this file governs the mechanics.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Release Rules

- **RLM-01 — QA decides.** A release MUST NOT proceed without an Approve or Approve-with-conditions recommendation (`quality/release-checklist.md`, `release.policy.yaml`).
- **RLM-02 — SemVer.** Every release MUST carry a SemVer version and an immutable tag (`versioning.md`).
- **RLM-03 — Release candidates.** Significant releases SHOULD publish a release candidate to Staging for verification before the stable release.
- **RLM-04 — Build once, promote.** The artifact promoted to production MUST be the artifact verified in Staging (`ci-cd.md` CICD-04).
- **RLM-05 — Release notes.** Every release MUST publish release notes stating what changed, what to do, and any breaking change; an empty or generic note MUST NOT be published.
- **RLM-06 — Migration documentation.** A breaking change or data migration MUST ship migration documentation and a tested procedure.
- **RLM-07 — Reversible.** A release MUST have a tested rollback before it goes live (`rollback.md`, OPP-10).
- **RLM-08 — Rollback triggers defined.** The conditions that trigger a rollback MUST be defined **before** the release (`rollback.md` RBK-02).
- **RLM-09 — Scheduled sensibly.** Risky releases SHOULD NOT be shipped when the team cannot respond; releases MUST NOT be timed to avoid scrutiny.
- **RLM-10 — Post-release verification.** Health, key flows, and error rates MUST be verified after release (`monitoring.md`); an unverified release MUST NOT be considered complete.
- **RLM-11 — Communicate.** Stakeholders MUST be informed of the release and any action required.
- **RLM-12 — Record the release.** The release MUST be recorded in `memory/deployment.md` and `CHANGELOG.md` (version, date, target, notes).
- **RLM-13 — Database migrations.** Schema migrations MUST be backward-compatible where possible and MUST be reversible or have a documented recovery path (`restore.md`).
- **RLM-14 — Feature flags for risk.** Risky changes SHOULD ship behind a flag so exposure can be controlled without a redeploy.

## Release Guarantees

- **RLM-G1** — Versioned, QA-approved, promote-the-verified-artifact releases.
- **RLM-G2** — Release notes, migration docs, defined rollback triggers, tested rollback.
- **RLM-G3** — Post-release verification, communication, and recorded history.
