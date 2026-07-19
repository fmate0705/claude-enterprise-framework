# Handover Memory

**Purpose:** Carry a session's state to the next one so work resumes without rediscovery.

**Description:** This file is written at the end of every work session by the Runtime Engine's Memory Manager (`runtime/memory-manager.md`, MEM-08). It states where the project stands, what happens next, and what is blocking. It complements `session.md` (the live scratchpad) by capturing the deliberate handover: the context a fresh session needs before it does anything else.

**Read it first.** At session start, read `project.md` → `handover.md` → `session.md` (ME-01).

## Schema

- **Project & state:** _the project, its classification, and its current state (`runtime/state-machine.md`)_
- **Phase:** _the current phase and how far through it (`runtime/task-planner.md`)_
- **Last action:** _what was just completed_
- **Next step:** _the single next action on resume_
- **Blockers:** _anything waiting on the user or an external input_
- **Open decisions:** _decisions deliberately deferred, and by when they are needed_
- **Context notes:** _anything non-obvious a new session would otherwise rediscover_

## Status

Template (AS-015). No active handover. Written at the end of every work session.

## TODO

- [ ] Populate at the end of the next work session.
