# Session Memory

**Purpose:** Hold the short-term working state of the current session — what's in progress, what's next, and where things were left off.

**Description:** This is the scratchpad that lets work resume cleanly across sessions. It records the current focus, the last action taken, and the immediate next step, so a new session can pick up without re-deriving context. It is updated continuously during implementation and cleared or archived when a phase completes. It is the most volatile memory file by design.

## Schema

- **Active workflow / phase:** _current phase_
- **Current focus:** _what is being worked on right now_
- **Last action taken:** _where work paused_
- **Immediate next step:** _what to do first on resume_
- **Open questions / blockers:** _anything waiting on input_

## Status

Template (AS-000). No active session. Updated continuously during implementation.

## TODO

- [ ] Begin recording once an engagement starts.
