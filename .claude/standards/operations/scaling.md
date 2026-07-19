# Scaling

**Framework:** CEF · **Specification:** AS-014 (Delivery & Operations Engine) · **Version:** 0.1.0

**Purpose:** Fix how a system grows under load. Scale by evidence, not anticipation; keep services stateless so scaling is a configuration change.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Scaling Rules

- **SCL-01 — Stateless services.** Application containers MUST be stateless; session and durable state MUST live in a datastore or cache, never on the instance's filesystem or memory.
- **SCL-02 — Horizontal first.** Scaling MUST prefer horizontal (more instances) over vertical (a bigger box) once statelessness allows it; a single unscalable instance MUST NOT be the long-term plan.
- **SCL-03 — Vertical where simpler.** Vertical scaling MAY be used for datastores or where horizontal adds no value; the choice MUST be deliberate and recorded.
- **SCL-04 — Load balancing.** Multiple instances MUST sit behind a load balancer routing on readiness (`health-checks.md` HLT-03); sticky sessions MUST NOT be required by the application.
- **SCL-05 — Caching.** Caching MUST be applied deliberately at the layers that need it (HTTP, data, computed); cache invalidation MUST accompany the mutation that changes the data (`platform/nextjs.md` NX-21).
- **SCL-06 — CDN.** Static and hashed assets MUST be served via a CDN/edge cache with long-lived headers; origin-serving all assets MUST NOT be the production model (`assets/image-optimization.md` IMO-10).
- **SCL-07 — Image optimization.** Images MUST be optimized and responsively delivered; unoptimized media MUST NOT be a scaling problem (`images.policy.yaml`).
- **SCL-08 — Bounded work.** Queries and lists MUST be bounded (pagination/virtualization); unbounded work MUST NOT scale with data size (`architecture/scalability.md`).
- **SCL-09 — Scale on evidence.** Scaling changes MUST be driven by measured saturation (`monitoring.md`); speculative scaling MUST NOT be performed.
- **SCL-10 — Graceful shutdown.** Instances MUST drain connections and shut down cleanly so scale-in does not drop requests (`platform/runtime.md` RUN-07).
- **SCL-11 — Resource limits.** Every container MUST declare limits so one instance cannot starve the host (`docker.md` ODK-12).
- **SCL-12 — Background work isolated.** Long-running or scheduled work SHOULD run in a separate worker rather than the request path.
- **SCL-13 — Microservice extraction is last.** A service MUST be extracted Only on a real independence signal (scaling, deploy cadence, ownership, data store); premature extraction MUST NOT occur (`architecture/scalability.md` SC-07, `AA-17`).
- **SCL-14 — Test before you need it.** Capacity assumptions SHOULD be validated with a load test before a known traffic event.

## Scaling Guarantees

- **SCL-G1** — Stateless, horizontally scalable services behind readiness-aware load balancing.
- **SCL-G2** — Deliberate caching, CDN delivery, bounded work, resource limits.
- **SCL-G3** — Scale on measured evidence; extract services only on a real signal.
