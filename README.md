# Florida Fertilizer Certification Trainer v2.3

## Main Upgrade
Repository-engine preparation. This version preserves the stable v2.1e UI and functionality while moving course content into separate `/data` files.

## What Changed
- Replaced single `data.js` structure with modular data files.
- Added `/data/courses.js`.
- Added `/data/modules.js`.
- Added `/data/questions.js`.
- Added `/data/scenarios.js`.
- Added `/data/diagnostics.js` prototype.
- Updated `index.html` script loading order.
- Updated local storage namespace to `giaV22a`.
- Preserved v2.1e clean bottom controls.
- Continued project history tracking.

## Upload to GitHub
Replace or upload:
- `index.html`
- `styles.css`
- `app.js`
- `README.md`
- `PROJECT_HISTORY.md`
- `REPOSITORY_BLUEPRINT_v1.md`
- `NETLIFY_DEPLOY_NOTES.md`

Add the new folder:
- `/data/`

Containing:
- `courses.js`
- `modules.js`
- `questions.js`
- `scenarios.js`
- `diagnostics.js`

## Netlify
No build command. Publish directory remains `/`.

## Important
This is still a static prototype. Before public launch, verify current Florida rules and add terms, privacy notice, and compliance disclaimers.


## v2.3 Course Loader Framework
- Adds a Course Library shell.
- Keeps Florida Fertilizer as the only active course.
- Adds Coming Soon cards for Ornamental & Turf, Irrigation, Backflow, and HVAC.
- Keeps content in /data files from v2.2a.
- Prepares for future language modes: English, Spanish, Portuguese, French.


## v2.3 Diagnostic Tree Framework

Adds a Diagnostics tab and reusable diagnostic-tree repository in `data/diagnostics.js`.


## v2.3 Diagnostic Tree Builder Framework

Adds a Builder tab with diagnostic-tree validation, a reusable template, builder rules, and `DIAGNOSTIC_TREE_BUILDER_GUIDE.md`.


## v2.3 Language Framework

Adds English, Spanish, and Dual Language Mode foundation plus `LANGUAGE_FRAMEWORK_GUIDE.md`.
