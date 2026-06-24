// Green Industry Academy™ Diagnostic Tree Repository v2.2c
// Structure: each tree contains nodes. Each node can show observations and choices.
// Each choice sends the learner to the next node or to an outcome.

const DIAGNOSTICS = [
  {
    id: "FER-DT-001",
    courseId: "FER",
    title: "Yellow Turf Diagnostic",
    category: "Turf Diagnosis",
    difficulty: "Beginner",
    status: "active",
    objective: "Determine whether yellow turf is likely caused by nutrients, irrigation, disease, shade, or compaction.",
    startNode: "start",
    nodes: {
      start: {
        prompt: "A customer says the lawn is yellow and wants more fertilizer. What should you check first?",
        observation: "Yellow turf can be caused by nutrient deficiency, drought stress, disease, shade, overwatering, insects, or soil problems.",
        choices: [
          { label: "Apply extra nitrogen immediately", next: "tooFast" },
          { label: "Observe whether the yellowing is uniform or patchy", next: "pattern" },
          { label: "Apply fungicide immediately", next: "tooFast" }
        ]
      },
      tooFast: {
        prompt: "You selected a treatment before diagnosis.",
        observation: "Professional rule: observe first, diagnose second, treat third.",
        choices: [
          { label: "Go back and inspect the pattern", next: "pattern" }
        ]
      },
      pattern: {
        prompt: "The yellowing is mostly uniform across the lawn. What is the next best check?",
        observation: "Uniform yellowing often points toward nutrient deficiency, broad water stress, or site-wide soil conditions.",
        choices: [
          { label: "Check soil moisture and irrigation coverage", next: "waterCheck" },
          { label: "Assume it is insects", next: "insectAssumption" },
          { label: "Apply fertilizer at double rate", next: "tooFast" }
        ]
      },
      insectAssumption: {
        prompt: "Insects can cause turf decline, but this pattern is uniform.",
        observation: "Patchy or localized damage is more typical of many insect, disease, irrigation-head, shade, or compaction issues.",
        choices: [
          { label: "Return to water and irrigation checks", next: "waterCheck" }
        ]
      },
      waterCheck: {
        prompt: "Soil is dry and one irrigation zone has poor coverage. What should happen first?",
        observation: "Dry soil and poor irrigation coverage point toward water stress.",
        choices: [
          { label: "Repair irrigation or adjust coverage first", next: "outcomeWater" },
          { label: "Apply iron immediately", next: "tooFast" },
          { label: "Apply nitrogen immediately", next: "tooFast" }
        ]
      },
      outcomeWater: {
        outcome: true,
        title: "Likely Diagnosis: Irrigation / Drought Stress",
        explanation: "The best first action is to correct the water problem. Fertilizer may not solve turf stress caused by poor irrigation coverage.",
        memoryAid: "Check water before selling fertilizer."
      }
    }
  },
  {
    id: "FER-DT-002",
    courseId: "FER",
    title: "Fertilizer Before Storm Diagnostic",
    category: "BMP Decision Making",
    difficulty: "Beginner",
    status: "active",
    objective: "Choose the BMP-compliant decision when heavy rain is forecast.",
    startNode: "start",
    nodes: {
      start: {
        prompt: "A customer wants fertilizer today. Heavy rain is forecast tomorrow. What should you consider first?",
        observation: "Florida fertilizer decisions should protect water quality and reduce runoff risk.",
        choices: [
          { label: "Apply extra fertilizer so some remains after rain", next: "wrongExtra" },
          { label: "Consider delaying application due to runoff risk", next: "outcomeDelay" },
          { label: "Wash product in toward the street", next: "wrongWash" }
        ]
      },
      wrongExtra: {
        prompt: "Extra fertilizer increases risk.",
        observation: "More fertilizer is rarely the professional answer. Correct rate and timing matter.",
        choices: [
          { label: "Return to BMP decision", next: "start" }
        ]
      },
      wrongWash: {
        prompt: "Washing toward the street is not BMP-compliant.",
        observation: "Storm drains are not treatment plants and may carry nutrients toward waterways.",
        choices: [
          { label: "Return to BMP decision", next: "start" }
        ]
      },
      outcomeDelay: {
        outcome: true,
        title: "Likely Decision: Delay Application",
        explanation: "Heavy rain increases runoff risk. The BMP-minded answer is to delay or follow current label/local guidance.",
        memoryAid: "When unsure, protect water quality."
      }
    }
  }
];


// ---------- Diagnostic Tree Builder Standard v2.2d ----------
// Required tree fields:
// id, courseId, title, category, difficulty, status, objective, startNode, nodes
//
// Required node types:
// 1. Decision node:
//    prompt, observation, choices
//    choices require: label, next
//
// 2. Outcome node:
//    outcome: true, title, explanation, memoryAid
//
// Validation rules:
// - startNode must exist in nodes.
// - Every choice.next must point to an existing node.
// - Every decision node must have at least one choice.
// - Every active tree should have at least one outcome node.
// - Each tree ID should be unique.
//
// Example template:
const DIAGNOSTIC_TREE_TEMPLATE_V22D = {
  id: "COURSE-DT-###",
  courseId: "COURSE",
  title: "Diagnostic Tree Title",
  category: "Category",
  difficulty: "Beginner | Intermediate | Advanced",
  status: "draft | active | retired",
  objective: "What the learner should diagnose or decide.",
  startNode: "start",
  nodes: {
    start: {
      prompt: "Situation or first decision point.",
      observation: "Background information shown to the learner.",
      choices: [
        { label: "Choice A", next: "nodeA" },
        { label: "Choice B", next: "nodeB" }
      ]
    },
    nodeA: {
      prompt: "Follow-up decision point.",
      observation: "New information after choice A.",
      choices: [
        { label: "Proceed to outcome", next: "outcomeGood" }
      ]
    },
    nodeB: {
      prompt: "Coaching or correction node.",
      observation: "Explanation of why this branch needs review.",
      choices: [
        { label: "Return to start", next: "start" }
      ]
    },
    outcomeGood: {
      outcome: true,
      title: "Likely Diagnosis or Correct Decision",
      explanation: "Why this outcome is correct.",
      memoryAid: "Short memory aid."
    }
  }
};
