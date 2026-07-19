# Motion Philosophy

**Framework:** CEF · **Specification:** AS-009 (Motion Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Establish the beliefs that govern every motion decision. Motion makes interfaces feel alive without distracting users. Each principle states its Purpose, Reasoning, an Example, and a Failure case.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

### MPH-01 — Motion Communicates
- **Purpose:** Motion carries meaning, not decoration. **Reasoning:** A change shown in motion is understood faster than one that appears instantly.
- **Example:** A dropdown scales from its trigger, showing origin. **Failure:** A background loop that communicates nothing.

### MPH-02 — Motion Reduces Cognitive Load
- **Purpose:** Motion helps users understand change without re-scanning. **Reasoning:** Continuity between states saves the user from re-orienting.
- **Example:** A list item slides out, making its removal obvious. **Failure:** An item vanishing instantly, forcing the user to notice what changed.

### MPH-03 — Motion Provides Continuity
- **Purpose:** Preserve context across state changes. **Reasoning:** Shared, connected motion keeps the user oriented.
- **Example:** A card expands into a detail view from its position. **Failure:** A hard cut that loses spatial relationship.

### MPH-04 — Motion Supports Orientation
- **Purpose:** Show where things come from and go. **Reasoning:** Directional motion builds a mental model of the interface's space.
- **Example:** A drawer slides in from the edge it lives on. **Failure:** A panel appearing from a random direction.

### MPH-05 — Motion Confirms Actions
- **Purpose:** Acknowledge user input immediately. **Reasoning:** Feedback confirms the system received the action and builds trust.
- **Example:** A button depresses on press. **Failure:** A tap with no response, leaving the user unsure.

### MPH-06 — Motion Reinforces Hierarchy
- **Purpose:** Direct attention to what matters. **Reasoning:** Motion draws the eye; it MUST be spent on the most important change.
- **Example:** A newly arrived toast animates in briefly. **Failure:** Many elements animating at once, flattening hierarchy.

### MPH-07 — Motion Is Invisible Until Needed
- **Purpose:** Motion serves quietly. **Reasoning:** The best motion is felt, not noticed; it supports the task, not itself.
- **Example:** A subtle 150ms transition the user never consciously registers. **Failure:** Flashy motion that announces itself.

### MPH-08 — Motion Feels Intentional
- **Purpose:** Every animation is deliberate and consistent. **Reasoning:** Consistent timing and easing read as craft; random motion reads as carelessness.
- **Example:** All panels use the same duration and easing. **Failure:** Each element with a different, arbitrary duration.

### MPH-09 — Motion Respects User Preferences
- **Purpose:** Honor reduced-motion and sensitivity. **Reasoning:** Motion can harm users with vestibular disorders; respecting preference is a floor.
- **Example:** Non-essential motion removed under `prefers-reduced-motion`. **Failure:** Forced parallax on a user who opted out.

### MPH-10 — Motion Never Delays User Goals
- **Purpose:** Motion accelerates, never blocks. **Reasoning:** An animation that gates interaction costs the user time.
- **Example:** Content is interactive immediately; motion decorates the arrival. **Failure:** A 1s intro animation before the user can act.

## Philosophy Guarantees

- **MPH-G1** — Every animation communicates meaning; none is decorative-only.
- **MPH-G2** — Motion is consistent, intentional, and invisible until needed.
- **MPH-G3** — Motion respects user preference and never delays the goal.
