# Green Industry Academy™ Project History

## Purpose
Maintain a running project record so development can resume without backtracking. This file should be updated with every major build, deployment, bug fix, and design decision.

## Core Platform Direction
Green Industry Academy is being built as a reusable learning platform, not just a single fertilizer course. Florida Fertilizer Certification is the reference implementation. Future tracks include Ornamental & Turf, Irrigation Technician, Backflow Prevention, Irrigation Contractor, HVAC/service technician training, and eventually the Modern Renaissance Project.

## Standing Launch Reminder
Before any public launch or monetization, complete: independent-study disclaimer, terms of use, privacy notice if user accounts/progress tracking exist, source/rule verification, copyright review, and no state-endorsement claim unless formally authorized.

## Version History

### EPA 608 Precedent
- Built earlier interactive study system with course content, testing workflow, scoring/dashboard concepts, browser deployment, GitHub, and Netlify.
- Proved the workflow: content → trainer → GitHub → Netlify → test → revise.

### Florida Fertilizer Trainer v2.0
- First functional static web trainer.
- Included six study modules, practice questions, exam simulator, scenario trainer, dashboard, and local progress tracking.

### Florida Fertilizer Trainer v2.1 Series
- Added readiness scoring framework.
- Added Missed Question Vault™ concept and implementation.
- Added Weak Area Analyzer™ / category tracking.
- Added guided practice session engine.
- Added topic filters.
- Added reset controls.
- Added bottom action bars for long sections.

### v2.1c — Last Known Stable Build
- Stable working release.
- Included bottom action bars and Back to Top controls.
- Issue found: several pages had duplicate bottom controls, especially Exam, where Grade Exam / Back to Top / Cancel Exam appeared twice in different order.

### v2.1d — Broken / Unstable Cleanup Attempt
- Intended to clean redundant bottom controls.
- Resulted in freeze/instability.
- Do not use as base for future work.

### v2.1e — Recovery / Stabilization Release
- Based on v2.1c, not v2.1d.
- Targeted UI cleanup only.
- Removed duplicate static bottom action bars.
- Kept core training logic unchanged.
- Preserved readiness score, practice engine, missed-question tracking, category analytics, scenarios, exams, and dashboard.

## Current Repository Files
- index.html
- styles.css
- data.js
- app.js
- README.md
- NETLIFY_DEPLOY_NOTES.md
- REPOSITORY_BLUEPRINT_v1.md
- PROJECT_HISTORY.md

## Current Architecture State
- Content still lives primarily in data.js.
- App logic lives in app.js.
- Progress is stored in browser localStorage.
- Repository blueprint exists as documentation.

## Next Major Milestone
### v2.2 Repository Externalization
Move embedded data toward external structured files, likely:
- /data/courses.json
- /data/modules.json
- /data/lessons.json
- /data/questions.json
- /data/scenarios.json
- /data/diagnostics.json

Goal: future courses become content packages instead of separate software builds.

## Development Rule Going Forward
1. Identify last known stable build.
2. Make one controlled change at a time.
3. Preserve core logic unless intentionally refactoring.
4. Update PROJECT_HISTORY.md with every meaningful change.
5. Deploy only after local/static sanity check.


---

## v2.2a — Repository Engine Preparation

Date: June 23, 2026

### Purpose
Convert the stable v2.1e build from a single course-data file into a modular repository-style content structure.

### Changes
- Preserved v2.1e clean bottom-button UI.
- Split content into `/data` folder.
- Created `courses.js`, `modules.js`, `questions.js`, `scenarios.js`, and `diagnostics.js`.
- Updated `index.html` to load modular data files before `app.js`.
- Kept existing learning engine, Readiness Score™, Missed Question Vault™, Weak Area Analyzer™, Practice Session Engine, Exam Simulator, Scenario Trainer, and Dashboard.
- Added diagnostic-tree placeholder as a bridge to the future branching diagnostic engine.

### Strategic Importance
This is the first step toward turning the Fertilizer Trainer from a standalone course into a reusable Green Industry Academy platform engine. Future courses can now be added by expanding the data repository rather than rewriting the app.

### Next Candidate Version
`v2.2b` — Course selector shell and multi-course registry preparation.


---

## Version 2.2b – Course Loader Framework
Date: June 24, 2026
Status: Development Release

Objectives:
- Add a visible course library shell without disrupting the working Fertilizer course.
- Keep Florida Fertilizer as the only active course.
- Show future course cards for Ornamental & Turf, Irrigation Technician, Backflow Prevention, and HVAC Service Fundamentals.
- Confirm the platform is moving from single-course trainer to multi-course framework.
- Preserve v2.2a repository split and stable UI.

Changes:
- Updated header to Green Industry Academy™ with selected course line.
- Added Course Library section above study tabs.
- Expanded data/courses.js to include active and planned courses.
- Added status labels: Active and Coming Soon.
- Added future language placeholders for Spanish, Portuguese, and French.

Result:
- Fertilizer remains the active course.
- Future course architecture is now visible in the user interface.
- Platform is ready for the next step: language framework and/or course-specific data loading.

Next:
- v2.2c or v2.3: Language Framework / Dual Language Mode planning.
- v2.3+: Ornamental & Turf content shell.


## v2.2c – Diagnostic Tree Framework

Date: June 24, 2026

Objectives:
- Add the first reusable diagnostic-tree framework.
- Preserve stable v2.2b course loader behavior.
- Begin moving from question/answer training into branching troubleshooting.
- Prepare the engine for fertilizer, Ornamental & Turf, irrigation, backflow, HVAC, and future service technician tracks.

Completed:
- Added Diagnostics tab.
- Added data/diagnostics.js as the diagnostic-tree repository.
- Added two active fertilizer diagnostic trees:
  - Yellow Turf Diagnostic
  - Fertilizer Before Storm Diagnostic
- Added diagnostic node rendering.
- Added path tracking so users can see their decision route.
- Added outcome screens with explanation and memory aid.

Status:
Ready for GitHub/Netlify testing.

Next:
- v2.2d or v2.3: refine diagnostic UI and begin adding more diagnostic trees.


## v2.2d – Diagnostic Tree Builder Framework

Date: June 24, 2026

Objectives:
- Add builder infrastructure for creating and validating diagnostic trees.
- Preserve stable v2.2c diagnostic functionality.
- Make future troubleshooting content easier to create for Fertilizer, O&T, Irrigation, Backflow, HVAC, Arborist, and Service Technician tracks.

Completed:
- Added Builder tab.
- Added Diagnostic Builder Console.
- Added diagnostic-tree validation logic.
- Added diagnostic-tree template viewer.
- Added builder rules viewer.
- Added DIAGNOSTIC_TREE_BUILDER_GUIDE.md.
- Added validation rules for missing nodes, missing choices, broken branches, duplicate IDs, and missing outcomes.

Status:
Ready for GitHub/Netlify testing.

Next:
- v2.3: Language Framework and Dual Language Mode planning.
- Future: visual diagnostic tree editor.


## v2.3 – Language Framework

Date: June 24, 2026

Objectives:
- Establish English, Spanish, and Dual Language Mode foundation.
- Preserve stable v2.2d functionality.
- Begin language-neutral architecture for future courses.
- Prepare the platform for workforce bilingual training.

Completed:
- Added Language Mode selector in header.
- Added Language tab.
- Added English, Spanish, and Dual Language framework.
- Added starter technical vocabulary list.
- Added Dual Language examples.
- Added LANGUAGE_FRAMEWORK_GUIDE.md.
- Added future-ready planning for Portuguese and French.
- Added design principle: technical communication confidence through shared goals.

Status:
Ready for GitHub/Netlify testing.

Next:
- v2.3a or v2.4: start language-aware data fields or begin Ornamental & Turf skeleton.
