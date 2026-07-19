# Notifications

**Framework:** CEF · **Specification:** AS-017 (Commerce Platform Engine) · **Version:** 2.0.0 · **Module:** M-COMMERCE

**Purpose:** Define notification across channels — in-app, push, SMS, and the events that drive them. Email is owned by `emails.md`; this file owns the channel-agnostic rules.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `commerce.policy.yaml` (`emails`, `fulfilment`).

---

## Events

- **NOT-01 — Meaningful changes notify.** Payment confirmation, dispatch, delivery, cancellation, refund, renewal, and payment failure MUST notify (`ORD-21`).
- **NOT-02 — Notify once per event, per channel.** An event MUST NOT produce duplicate notifications. Webhook retries and job retries are the usual cause (`EML-28`).
- **NOT-03 — Events are not fabricated.** A notification MUST correspond to something that happened. "Your order has shipped" before dispatch is a false statement (`FUL-10`).
- **NOT-04 — Order matters.** Notifications MUST NOT arrive out of sequence in a way that misleads — a delivery notice before a dispatch notice reads as a system that does not know what it is doing (`PAY-29`).

## Channel

- **NOT-05 — Email is the baseline.** Order-critical notification MUST be available by email. Other channels are additive (`emails.md`).
- **NOT-06 — Channel choice is the customer's.** Where multiple channels exist, the customer MUST be able to choose per category.
- **NOT-07 — Consent per channel.** Consent MUST be per channel and per purpose. Consent to email MUST NOT imply consent to SMS or push (`PRV-18`).
- **NOT-08 — SMS and push for marketing require explicit consent.** These are intrusive channels; marketing over them MUST be separately opted in (`PRV-17`).
- **NOT-09 — Transactional over SMS is narrow.** SMS SHOULD be reserved for genuinely time-critical events. A promotional SMS labelled transactional is a consent violation (`EML-09`).
- **NOT-10 — Withdrawal is symmetric.** (`PRV-19`.)

## Content

- **NOT-11 — Self-contained.** A notification MUST convey its meaning without requiring a click. "Update on your order" tells the customer nothing.
- **NOT-12 — Minimizes personal data.** Push and SMS render on lock screens, visible to anyone holding the device. Order contents MUST NOT be exposed there (`PRV-27`, `DC-08`).
- **NOT-13 — Links are authorized.** (`EML-17`.)
- **NOT-14 — Honest.** (`NOT-03`.)

## In-App

- **NOT-15 — Announced.** In-app status changes MUST be announced to assistive technology via a live region (`E-118`, `D-088`).
- **NOT-16 — Not colour-alone.** (`D-038`.)
- **NOT-17 — Dismissible and non-blocking.** Notifications MUST NOT obstruct the checkout (`D-062`).
- **NOT-18 — Persist where important.** An important notification MUST NOT vanish on a timer as the only delivery. A toast the customer missed did not notify them.

## Timing and Volume

- **NOT-19 — Prompt.** Notification MUST be prompt relative to the event.
- **NOT-20 — Bounded.** Notification volume MUST be bounded. A customer who receives too many mutes the channel, and then misses the one that mattered.
- **NOT-21 — Batched where sensible.** Related events SHOULD batch rather than firing individually.
- **NOT-22 — Quiet hours respected for intrusive channels.** SMS and push SHOULD respect local time.

## Reliability

- **NOT-23 — Failure does not break the transaction.** (`EML-26`.)
- **NOT-24 — Monitored.** Delivery failures MUST be monitored and alerted (`EML-25`).
- **NOT-25 — Retried idempotently.** (`EML-27`, `NOT-02`.)
- **NOT-26 — Provider behind an interface.** (`COM-07`.)
- **NOT-27 — Never the only record.** A notification MUST NOT be the sole record of a transaction. The order and the account are (`CHK-27`).

## Verification

The commerce gate verifies meaningful events notify exactly once, consent is per channel and purpose, content is self-contained and minimizes personal data on lock screens, in-app changes are announced, volume is bounded, failures are monitored, and notifications are never the sole record.
