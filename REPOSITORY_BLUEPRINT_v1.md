# Green Industry Academy Repository Blueprint v1.1

## Current Implementation: v2.2a

Core objects now map to separate static data files:

- `/data/courses.js`
- `/data/modules.js`
- `/data/questions.js`
- `/data/scenarios.js`
- `/data/diagnostics.js`

## Course Object
Fields: id, title, version, state, track, passingScore, readinessTarget, status.

## Module Object
Fields: id, title, objective, lessons.

## Question Object
Fields: id, module, category, subcategory, q, choices, answer, explain, memory, tags.

## Scenario Object
Fields: id, category, title, prompt, choices, answer, explain.

## Diagnostic Object Prototype
Fields: id, course, title, status, root, steps.

## Platform Engines Already Present
- Readiness Score™
- Missed Question Vault™
- Weak Area Analyzer™
- Practice Session Engine
- Exam Simulator
- Scenario Trainer
- Dashboard
- Local progress tracking

## Future JSON Direction
The current `.js` data files are GitHub/Netlify-safe static files. Later versions may convert these to `.json` plus fetch loading when we are ready for a more advanced data loader.

## Launch Compliance Reminder
Before monetization or public launch: independent-study disclaimer, terms of use, privacy notice if accounts/progress sync are added, Florida rule/source verification, copyright review, and no state endorsement claim unless formally authorized.
