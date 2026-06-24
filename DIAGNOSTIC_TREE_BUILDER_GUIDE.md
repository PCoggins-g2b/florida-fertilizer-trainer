# Diagnostic Tree Builder Guide v2.2d

## Purpose

Diagnostic trees teach professional decision-making.

They are not ordinary quiz questions. They guide a learner through:

1. Situation
2. Observation
3. Decision
4. New information
5. Additional decision
6. Outcome
7. Explanation

## Why This Matters

Green Industry Academy is designed to help people become confident and capable, not merely memorize answers.

Diagnostic trees are the bridge between test prep and field judgment.

## Required Tree Fields

- `id`
- `courseId`
- `title`
- `category`
- `difficulty`
- `status`
- `objective`
- `startNode`
- `nodes`

## Required Node Types

### Decision Node

A decision node asks the learner what to do next.

Required fields:
- `prompt`
- `observation`
- `choices`

Each choice requires:
- `label`
- `next`

### Outcome Node

An outcome node ends a diagnostic path.

Required fields:
- `outcome: true`
- `title`
- `explanation`
- `memoryAid`

## Builder Rules

1. Start with a real-world situation.
2. Make the learner observe before treating.
3. Every choice must point to another node or outcome.
4. Wrong paths should teach, not merely punish.
5. Outcomes should explain the reason.
6. Each tree should improve confidence, judgment, and field readiness.

## Example Courses That Will Use This

- Florida Fertilizer
- Ornamental & Turf
- Irrigation Technician
- Backflow Prevention
- HVAC Fundamentals
- ISA Arborist Certification
- Service Technician Academy

## Future Improvement

A future version may include a visual tree editor so diagnostic trees can be created without editing JavaScript directly.
