# Formatting Standard

**Framework:** CEF · **Specification:** AS-006 (Platform Engine) · **Version:** 0.1.0

**Purpose:** Fix the formatting policy. Prettier is the formatter and the single source of truth for code style. Formatting is deterministic and non-negotiable; it MUST NOT be debated per file.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Formatting Rules

- **FMT-01 — Prettier required.** Prettier MUST format all supported files; formatting MUST be checked in CI and MUST pass.
- **FMT-02 — Single config.** One shared Prettier configuration MUST govern the project; per-file style variation MUST NOT be introduced by hand.
- **FMT-03 — No ESLint/Prettier conflict.** `eslint-config-prettier` MUST disable formatting rules in ESLint so the two never conflict (`linting.md` LNT-10).
- **FMT-04 — Format on save/commit.** Formatting SHOULD run on save and MUST run before commit (pre-commit hook) so the tree stays formatted.
- **FMT-05 — No manual formatting.** Hand-formatting against the formatter's output MUST NOT be done; the formatter is authoritative.
- **FMT-06 — Deterministic output.** The formatter version MUST be pinned so output is identical across machines (PL-P05).

## Formatting Guarantees

- **FMT-G1** — One pinned formatter, one config, checked in CI.
- **FMT-G2** — ESLint and Prettier never conflict.
- **FMT-G3** — The committed tree is always formatted.
