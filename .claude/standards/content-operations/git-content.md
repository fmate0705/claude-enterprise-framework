# Git-Based Content

**Framework:** CEF · **Specification:** AS-018 (Content Operations Engine) · **Version:** 2.0.0 · **Module:** M-CONTENTOPS

**Purpose:** Define content stored in the repository. Git supplies versioning, review, and rollback for free — and supplies nothing else. This file defines what must be built around it.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `content-operations.policy.yaml`, `editorial.policy.yaml`.

---

## What Git Gives

Git natively satisfies several requirements this engine would otherwise impose:

| Requirement | Satisfied by |
|---|---|
| Version history (`versioning.md`) | Commit history |
| Author tracking | Commit authorship |
| Change summary | Commit message |
| Diff | `git diff` |
| Rollback | Revert |
| Append-only history | Protected branches |
| Review and approval (`approvals.md`) | Pull request review |

- **GC-01 — Use what Git gives.** Where Git satisfies a requirement natively, it MUST NOT be reimplemented (`E-007`).
- **GC-02 — Protected branches make history append-only.** The publishing branch MUST be protected: no force-push, no history rewrite (`COP-26`, `AL-08`).
- **GC-03 — Pull-request review is the approval.** Where PR review is the approval mechanism, it MUST enforce a reviewer other than the author (`COP-15`, `editorial.policy.approvals`).
- **GC-04 — Commit messages are change summaries.** A commit message MUST state what changed and why (`COP-28`, `versioning.md`).

## What Git Does Not Give

- **GC-05 — No scheduling.** Git has no concept of "publish on Tuesday." Scheduled publication MUST be built explicitly (`scheduled-publishing.md`) — typically a dated front-matter field plus a scheduled build.
- **GC-06 — No media handling.** Git handles binaries badly. Media MUST NOT be committed unbounded; large assets MUST use LFS or external storage (`media-management.md`).
- **GC-07 — No editor UI.** Non-technical authors MUST have a Git-backed editor, or Git-based content MUST NOT be selected (`CMS-06`, `CMS-09`).
- **GC-08 — No structural validation by default.** Content MUST be validated in CI against a schema (`GC-12`).
- **GC-09 — No workflow states.** Draft, review, and approval MUST be mapped explicitly (`GC-13`).

## Structure

- **GC-10 — A defined content directory.** Content MUST live in a defined directory with a documented structure (`architecture/folder-structure.md`).
- **GC-11 — Front matter is typed.** Front matter MUST be schema-validated (`markdown.md`).
- **GC-12 — CI validates content.** CI MUST validate schema conformance, required fields, link integrity, and media references, and MUST fail the build on violation (`SDL-07`). Without this, Git-based content has no validation at all.
- **GC-13 — Workflow maps to branches.** Draft, review, and approval MUST map deterministically: a branch is a draft, a PR is review, an approved merge is approval, and the default branch is published (`editorial.policy.states`).
- **GC-14 — Slugs derive from paths deliberately.** Where the URL derives from the file path, a file move is a URL change and MUST create a redirect (`taxonomy.policy.urls`).

## Constraints

- **GC-15 — Scale is bounded by authors, not files.** Git-based content fails on non-technical authors first (`CMS-09`).
- **GC-16 — Large repositories slow builds.** Content volume MUST be bounded against build time (`PR-07` of `priority-engine`).
- **GC-17 — Binary diffs are useless.** Committing large binaries bloats the repository permanently — history retains every version forever (`GC-06`).
- **GC-18 — No secrets in content.** Content files MUST NOT contain secrets (`SM-01`). Content is frequently public.
- **GC-19 — Content is untrusted at render.** Content authored by anyone with commit access MUST still be validated and encoded on output (`RC-20`).

## Preview and Publishing

- **GC-20 — Preview per branch.** Preview MUST render the branch's content in the real layout (`COP-20`).
- **GC-21 — Preview is not indexable.** (`SE-08`.)
- **GC-22 — Publishing is a merge, and it is deliberate.** A merge to the publishing branch publishes. This MUST be an explicit, approved act — protected branches make it one (`COP-19`).
- **GC-23 — Rollback is a revert.** Rollback MUST be a revert, which creates history rather than erasing it (`COP-27`).

## Hybrid

- **GC-24 — Mixing is a recorded decision.** (`CMS-11`.)
- **GC-25 — One source per type.** (`CMS-12`.)

## Verification

The content-operations gate verifies protected branches with no history rewrite, PR review enforcing a non-author reviewer, CI schema and link validation failing the build, an explicit scheduling mechanism where scheduling is required, bounded media handling, redirects on file moves, and non-indexable branch previews.
