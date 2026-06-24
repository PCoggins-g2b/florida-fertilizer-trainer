# Language Framework Guide v2.3

## Purpose

Green Industry Academy should support workers and employers across language barriers.

The goal is not to become a conventional language-learning app. The goal is to help people learn technical material while becoming more comfortable with job-relevant vocabulary in another language.

## Supported Language Modes

### English
Primary current course language.

### Spanish
First major expansion language. Spanish is strategically important for landscaping, irrigation, backflow, HVAC, arboriculture, and service technician training.

### Dual Language Mode
English and Spanish shown together.

This is intended for:
- English-speaking supervisors helping Spanish-speaking workers.
- Spanish-speaking technicians learning technical English.
- Mixed teams building shared technical vocabulary.
- Employers wanting safer and clearer jobsite communication.

## Future-Ready Languages

The repository should remain capable of later supporting:
- Portuguese
- French

These should be architected for, but not actively translated until the core product is validated.

## Design Philosophy

People are often uncomfortable speaking another language because they fear sounding foolish.

Dual Language Mode reduces that pressure by focusing on a shared goal:
- Pass the test.
- Diagnose the problem.
- Do the work safely.
- Communicate the task.

Language familiarity develops through repeated exposure while pursuing a meaningful goal.

## Repository Direction

Future content objects should support fields such as:

- `text_en`
- `text_es`
- `text_pt`
- `text_fr`
- `explanation_en`
- `explanation_es`
- `explanation_pt`
- `explanation_fr`

Fields may be blank initially. The important point is to avoid hard-wiring content to only one language.

## Translation Quality Rule

Do not rely on raw machine translation for commercial launch.

Before public Spanish launch:
- Review by fluent Spanish speaker familiar with trade terminology.
- Confirm regional terminology where possible.
- Validate safety-sensitive terms.
- Ensure exam concepts remain accurate.
