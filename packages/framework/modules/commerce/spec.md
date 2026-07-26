# Commerce — Detailed Specification

Price, discount, and stock are computed and validated on the server; client-asserted amounts
and state are never trusted. Stock is guarded against oversell and released on cancellation;
discounts are validated server-side. Checkout mutations are idempotent so a retry cannot
double-charge or double-order. The unhappy paths — declined payment, out-of-stock, expired
cart — are handled explicitly and recoverably. Security defers to the security floor.
Authoritative source: AS-017 (Commerce Platform).
