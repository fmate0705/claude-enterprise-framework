# Versioning

**Framework:** CEF · **Specification:** AS-014 (Delivery & Operations Engine) · **Version:** 0.1.0

**Purpose:** Fix how versions are assigned so releases are predictable and traceable.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Semantic Versioning

`MAJOR.MINOR.PATCH`

| Increment | When |
|---|---|
| **MAJOR** | A breaking change to a public interface, contract, or behavior |
| **MINOR** | Backward-compatible functionality added |
| **PATCH** | Backward-compatible fixes and corrections |

## Versioning Rules

- **VER-01 — SemVer.** Versions MUST follow Semantic Versioning; ad-hoc version schemes MUST NOT be used.
- **VER-02 — Breaking = MAJOR.** A breaking change MUST bump MAJOR and MUST ship migration notes (`release-management.md`).
- **VER-03 — Tagged releases.** Every production release MUST be tagged `v<version>` and the tag MUST be immutable (`git-workflow.md` GIT-06).
- **VER-04 — Version in the artifact.** The version MUST be embedded in the built image/artifact and exposed at runtime (e.g., via the health endpoint) for traceability.
- **VER-05 — Release candidates.** Pre-release versions MUST use a pre-release identifier (`v1.4.0-rc.1`); a release candidate MUST NOT be published as a stable version.
- **VER-06 — Changelog per version.** Every version MUST have a `CHANGELOG.md` entry describing the change.
- **VER-07 — No silent behavior change.** A behavior change MUST be reflected in the version and the changelog; a silent change MUST NOT ship (`platform/future-compatibility.md` FC-11).
- **VER-08 — Deprecation before removal.** A public interface MUST be deprecated with a grace window before removal (FC-06/07).
- **VER-09 — Dependencies pinned.** Application dependency versions MUST be pinned and locked (`platform/package-manager.md`).
- **VER-10 — One source of truth.** The version MUST be defined once (e.g., `package.json`) and derived everywhere else; divergent version strings MUST NOT exist.

## Versioning Guarantees

- **VER-G1** — SemVer with immutable tags and a changelog entry per version.
- **VER-G2** — Breaking changes bump MAJOR with migration notes; no silent changes.
- **VER-G3** — Version embedded in the artifact and traceable at runtime.
