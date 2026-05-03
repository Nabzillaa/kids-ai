# Stage Blueprint Template

Use this guide to build Stages 2–8. Stage 1 (`stage-1.ts`) is the reference implementation.

---

## Stage Anatomy

Every stage follows the same structure:

```
Stage
├── 4 Units
│   ├── 2–3 Lessons per unit   (10–12 lessons total)
│   └── 4–5 Activities per unit (15–20 activities total)
│       ├── beginner tier
│       ├── explorer tier
│       └── pro tier
├── 15 Tip Cards
├── 1 Output Project
└── 4 Badges
```

---

## Stage-by-Stage Reference

| Stage | Age | Name | Core Skill | Model Tier | Output Project | Mascot |
|---|---|---|---|---|---|---|
| 1 | 7–8 | AI Explorers | Basic prompting (WHO+WHAT+WHERE) | lightweight | My AI Story Book | 🦁 |
| 2 | 8–9 | AI Builders | Refining prompts, context, templates | lightweight | My Character Portfolio | 🦊 |
| 3 | 9–10 | AI Creators | Chaining prompts, role prompting | lightweight | My Game Design Doc | 🐉 |
| 4 | 10–11 | AI Engineers | Structured prompting, few-shot | mid | My Research Report | 🦅 |
| 5 | 11–12 | AI Innovators | Workflows, ethics, no-code | mid | My Capstone Project | 🚀 |
| 6 | 12–13 | AI Designers | Multi-modal, art direction | mid + image | My Creative Portfolio | 🎨 |
| 7 | 13–14 | AI Developers | AI-assisted coding, automations | mid | My GitHub Mini-App | 💻 |
| 8 | 14–15 | AI Architects | Systems thinking, real products | premium | My Launchable Product | 🏛️ |

---

## Unit Themes per Stage

### Stage 2 — AI Builders
| Unit | Theme |
|---|---|
| 1 | Context is everything |
| 2 | Fill-in-the-blank templates |
| 3 | Iteration and refinement |
| 4 | Building your character portfolio |

### Stage 3 — AI Creators
| Unit | Theme |
|---|---|
| 1 | Breaking ideas into steps |
| 2 | Role prompting ("Act as a...") |
| 3 | Revision loops |
| 4 | Game design with AI |

### Stage 4 — AI Engineers
| Unit | Theme |
|---|---|
| 1 | Prompt constraints and format |
| 2 | Few-shot prompting (show examples) |
| 3 | Self-checking and fact-checking |
| 4 | Building your research report |

### Stage 5 — AI Innovators
| Unit | Theme |
|---|---|
| 1 | Chaining tools into workflows |
| 2 | AI ethics and responsibility |
| 3 | No-code building with AI |
| 4 | Capstone project development |

### Stage 6 — AI Designers
| Unit | Theme |
|---|---|
| 1 | Text + image prompt combinations |
| 2 | Directing style and mood visually |
| 3 | Brand and storytelling across formats |
| 4 | Multi-modal portfolio piece |

### Stage 7 — AI Developers
| Unit | Theme |
|---|---|
| 1 | Using AI to read and write code |
| 2 | Building simple scripts |
| 3 | APIs and how AI uses them |
| 4 | Personal chatbot or automation |

### Stage 8 — AI Architects
| Unit | Theme |
|---|---|
| 1 | System design with AI |
| 2 | Full product lifecycle |
| 3 | Responsible AI and societal impact |
| 4 | Capstone: launchable product |

---

## Activity Difficulty Tiers — Rules

| Tier | Description | Est. Minutes | Max Tokens | XP |
|---|---|---|---|---|
| beginner | Fill-in-the-blank, 3–4 fields, highly guided | 5–7 min | 150–250 | 25–40 |
| explorer | More fields, richer prompts, some open choices | 7–10 min | 300–450 | 45–65 |
| pro | Open-creative or multi-step, minimal guidance | 10–15 min | 450–700 | 70–100 |

**Rules:**
- Every activity MUST have a `beginner` and `explorer` tier
- `pro` tier is optional but strongly encouraged (aim for 12–15 per stage)
- Pro activities should feel like a real-world creative or technical challenge
- `contributesToOutput` = true for activities whose result goes into the stage output project

---

## Model Tier Selection

| Stage | Default Model | Override when |
|---|---|---|
| 1–3 | `lightweight` | Never — keep costs low for basic prompting |
| 4–5 | `mid` | Use `lightweight` for quiz/knowledge-check activities |
| 6 | `mid` + image API | Use `premium` only for final capstone output |
| 7–8 | `mid` → `premium` | Use `premium` only for the stage output generation |

Map model tiers to specific models in `/lib/ai/model-selector.ts` (not hardcoded in stage files).

---

## Tip Card Formula (per card)

```ts
{
  id: "t{n}",
  title: "Short memorable title",     // max 5 words
  emoji: "one emoji",
  tip: "The rule in plain language — max 2 sentences.",
  example: {
    bad: "weak version (what NOT to do)",
    good: "strong version (what TO do)",
  },
}
```

**15 tip cards per stage:**
- 4 from Unit 1 (foundational)
- 4 from Unit 2 (building on Unit 1)
- 4 from Unit 3 (advanced for the stage)
- 3 from Unit 4 (output/reflection focused)

---

## Badge Formula (4 per stage)

| Badge | Condition | When awarded |
|---|---|---|
| Stage badge | `stage-complete` | All lessons + output project done |
| First output | `first-output` | First activity completed in stage |
| Pro badge | `all-pro` | 5+ pro activities completed |
| Streak badge | `streak-7` | 7 consecutive days of activity |

---

## Lesson Content Format

```ts
{
  id: "l{unit}-{lesson}",        // e.g. "l2-1"
  title: "Short engaging title",
  summary: "One sentence teaser shown in lesson list",
  durationMinutes: 3-5,           // Keep short — max 5 min for Stages 1-4, 8 min for 5-8
  keyConcept: "The single most important takeaway",
  content: `markdown content`,   // Use headers, tables, examples, bold for key terms
  videoUrl: undefined,            // Optional — add later
  unlocksActivityIds: [],         // Which activities become available after this lesson
  xpReward: 20-30,                // Scale with lesson difficulty
}
```

**Lesson content should always include:**
1. An engaging hook (question or analogy)
2. The concept explained simply
3. A before/after example or comparison table
4. A mini challenge or reflection question at the end

---

## Output Project Formula

```ts
{
  type: OutputType,
  title: "Catchy name",
  description: "1–2 sentences. What the child ends up with.",
  activityIds: [],              // All activity IDs that can contribute
  minActivitiesRequired: 3,    // Minimum to generate the output
  downloadable: true,
  shareable: true,
}
```

---

## Stage File Naming

```
/src/stages/
  stage-1.ts      ← AI Explorers (complete)
  stage-2.ts      ← AI Builders
  stage-3.ts      ← AI Creators
  stage-4.ts      ← AI Engineers
  stage-5.ts      ← AI Innovators
  stage-6.ts      ← AI Designers
  stage-7.ts      ← AI Developers
  stage-8.ts      ← AI Architects
  index.ts        ← exports all stages as an array
  STAGE-TEMPLATE.md  ← this file
```

---

## Stage Index (`index.ts`)

```ts
import { stage1 } from "./stage-1"
import { stage2 } from "./stage-2"
// ... etc

export const stages = [stage1, stage2, /* ... */]

export const getStageById = (id: string) =>
  stages.find((s) => s.id === id) ?? null

export const getStageForAge = (age: number) =>
  stages.find((s) => age >= s.ageRange[0] && age <= s.ageRange[1]) ?? null
```

---

## Quality Checklist Before Publishing a Stage

- [ ] All 10–12 lessons have content, keyConcept, and unlocksActivityIds filled in
- [ ] All activities have promptTemplate, fields, model, maxTokens, and xpReward
- [ ] Every activity has at least beginner + explorer tiers
- [ ] Tip cards: 15 total, each with a bad/good example
- [ ] At least 3 activities have `contributesToOutput: true`
- [ ] Output project lists all contributing activity IDs
- [ ] totalXP matches the sum of all lesson + activity XP values
- [ ] Stage tested with real inputs from a child in the target age range
- [ ] Prompt templates checked for adversarial edge cases (kids will try to break them!)
- [ ] Model tier appropriate for the stage (no premium models in Stage 1–3)
