# Password Policy

**Framework:** CEF · **Specification:** AS-016 (Security & Compliance Engine) · **Version:** 2.0.0 · **Module:** M-SEC

**Purpose:** Define credential requirements where passwords are used. CEF follows current industry guidance, which inverts several long-standing conventions: length beats composition, and forced rotation harms security.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `authentication.policy.yaml` (`password`).

---

## Strength

- **PW-01 — Length is the requirement.** A minimum length MUST be enforced (`authentication.policy.password.min_length`). Length is the dominant contributor to resistance against guessing.
- **PW-02 — No composition rules.** Forced character-class mixes (upper, lower, digit, symbol) MUST NOT be imposed. They drive predictable transformations — `Password1!` — that add little entropy while measurably harming usability. A long passphrase beats a short mangled word.
- **PW-03 — Generous maximum.** Passwords MUST be accepted up to at least the supported maximum (`max_length_min_supported`). Silent truncation MUST NOT occur; truncating to a short limit is a defect that invisibly weakens every credential.
- **PW-04 — Accept all characters.** All Unicode characters and spaces MUST be accepted. Restricting the character set only shrinks the search space.
- **PW-05 — Check against breach corpora.** Candidate passwords MUST be checked against a corpus of known-breached credentials and rejected on match. This is the single highest-value check available, because credential stuffing uses real passwords, not random ones.
- **PW-06 — Contextual denylist.** Passwords matching the service name, the user's email, or other contextual terms MUST be rejected.
- **PW-07 — Show strength honestly.** A strength meter SHOULD reflect real guessing resistance. It MUST NOT reward composition tricks that do not increase entropy.

## Rotation

- **PW-08 — No arbitrary expiry.** Periodic forced rotation MUST NOT be imposed without evidence of compromise. Forced rotation produces incremental, predictable passwords and drives reuse; it degrades security while appearing to improve it.
- **PW-09 — Rotate on compromise.** A password MUST be rotated immediately on evidence or suspicion of compromise, and all sessions MUST be invalidated (`SM-09`).

## Storage

- **PW-10 — Memory-hard hashing.** Passwords MUST be stored using a memory-hard adaptive hash (Argon2id preferred; bcrypt or scrypt acceptable) with parameters tuned to current hardware.
- **PW-11 — Per-password salt.** A unique salt per password MUST be used. Salting is the hash function's responsibility in every algorithm named above.
- **PW-12 — Never plaintext, never reversible.** Passwords MUST NOT be stored in plaintext or under reversible encryption. A system able to email a user their existing password is broken by construction.
- **PW-13 — No fast hashes.** General-purpose hashes (MD5, SHA-1, SHA-256 alone) MUST NOT be used for passwords. They are designed to be fast, which is precisely the wrong property.
- **PW-14 — Constant-time comparison.** Credential verification MUST use constant-time comparison and MUST NOT leak validity through response timing (`AUTH-07`).
- **PW-15 — Pepper is optional.** A pepper held outside the database MAY be added. It MUST NOT be treated as a substitute for a memory-hard hash.

## Handling

- **PW-16 — Never logged.** Passwords MUST NOT appear in logs, analytics, error reports, or crash dumps (`logging.md` LOG-04).
- **PW-17 — Never in URLs.** Passwords MUST NOT traverse URLs or query strings.
- **PW-18 — Never emailed.** A password MUST NOT be transmitted to the user. Recovery issues a single-use reset token (`AUTH-17`).
- **PW-19 — Password managers work.** Paste and autofill MUST function; both MUST NOT be blocked (`AUTH-24`).
- **PW-20 — Reveal toggle.** A show/hide control SHOULD be offered; it reduces error and supports longer passwords.

## Verification

The security gate verifies the hash algorithm and parameters, the absence of composition rules and forced rotation, breach checking, and that no credential appears in any log or URL.
