import type { Stage } from "@/types/stage"

// ─────────────────────────────────────────────
// Stage 2 — AI Builders
// Ages 8–9 | Core skill: Refining prompts and using context
//
// STRUCTURE:
//   4 Units × 2–3 Lessons = 10 lessons total
//   20 activities (3 difficulty tiers each)
//   15 tip cards
//   1 output project: "My Character Portfolio"
//
// This stage teaches kids that context transforms results.
// They learn prompt templates, iteration, and how to give AI
// background information so it can do exactly what they imagine.
// ─────────────────────────────────────────────

export const stage2: Stage = {
  id: "stage-2",
  number: 2,
  name: "AI Builders",
  tagline: "Give AI context and watch your ideas level up!",
  ageRange: [8, 9],
  themeColor: "pink",
  mascot: "🦊",
  coreSkill: "Context + Prompt Templates + Iteration",
  primaryModel: "lightweight",

  // ────────────────────────────────────────
  // LESSONS (10 total across 4 units)
  // ────────────────────────────────────────
  lessons: [
    // ── UNIT 1: Context is Everything ─────────────
    {
      id: "l1-1",
      title: "Why context changes everything",
      summary: "A little background information turns an okay result into an amazing one.",
      durationMinutes: 4,
      keyConcept: "Context = background information. The more you tell AI about the situation, the more accurate and personal the result.",
      content: `
# Why context changes everything

You've already learned the WHO + WHAT + WHERE formula.
Now it's time for the secret ingredient that makes AI results **feel like they were made just for you**.

That secret? **Context.**

### What is context?
Context is **background information** — the extra details that help AI understand your situation.

### Imagine this:
You ask a friend to draw you something.

❌ "Draw me something nice."
→ They draw a random flower. It's pretty but... not what you wanted.

✅ "I'm making a birthday card for my 7-year-old brother who LOVES dinosaurs and hates the colour pink."
→ Now they draw a dinosaur in a party hat holding a cake. Perfect!

That extra information? That's context.

### Context in prompts:
Adding "I am..." or "This is for..." to your prompt changes everything.

| Without context | With context |
|---|---|
| "Write a poem" | "Write a poem for a 9-year-old who loves football and is sad because their team lost" |
| "Write a story" | "Write a story for my little sister who is 5, loves unicorns, and is scared of the dark" |
| "Give me ideas" | "Give me ideas for a birthday party for a 10-year-old who loves robots and hates loud music" |

### The "I am / This is for" Formula:
Start your prompt with:
- "I am [age] years old and I love [topic]..."
- "This is for my [who], who likes [interest]..."
- "I need help with [task] because [reason]..."

Try it in your next activity! 🦊
      `,
      unlocksActivityIds: ["a1-1-beginner", "a1-1-explorer"],
      xpReward: 25,
    },
    {
      id: "l1-2",
      title: "The 'I am' and 'This is for' formulas",
      summary: "Two magic sentence starters that instantly make every prompt better.",
      durationMinutes: 4,
      keyConcept: "Starting with 'I am...' or 'This is for...' gives AI the audience, purpose, and tone all at once.",
      content: `
# The "I am" and "This is for" formulas

Let's build on what you just learned about context.
These two sentence starters are the fastest way to make any prompt 10x better.

## Formula 1: "I am..."
Tell AI who YOU are. This helps it write in the right language and style.

Examples:
- "I am 9 years old and I love space and robots..."
- "I am making a project about volcanoes for school..."
- "I am writing a story for my best friend's birthday..."

## Formula 2: "This is for..."
Tell AI who the READER or AUDIENCE is.

Examples:
- "This is for a 6-year-old who doesn't know big words..."
- "This is for my mum who loves gardening..."
- "This is for a school presentation — it needs to be serious and informative..."

## Combining both:
> "I am a 9-year-old making a birthday card. This is for my grandpa who loves fishing and bad jokes. Make it warm, funny, and not too long."

That single prompt tells AI:
- WHO is writing it (a 9-year-old)
- WHAT it's for (birthday card)
- WHO will read it (grandpa, loves fishing)
- HOW it should feel (warm, funny, short)

AI now has everything it needs! 🚀

### Quick builder table:
| Piece | Your version |
|---|---|
| "I am..." | [your age, what you're making] |
| "This is for..." | [who will read/use it, what they like] |
| Tone | [funny / serious / warm / exciting] |
| Length | [short / medium / long] |
      `,
      unlocksActivityIds: ["a1-2-beginner", "a1-2-explorer", "a1-2-pro"],
      xpReward: 25,
    },
    {
      id: "l1-3",
      title: "Context clues — what to include",
      summary: "Not all context is useful. Learn which details actually change the result.",
      durationMinutes: 4,
      keyConcept: "Relevant context = details that change how AI should write. Irrelevant context = details that don't affect the output.",
      content: `
# Context clues — what to include

Now you know context helps — but does EVERYTHING help?
Not always! Here's how to choose what to include.

### Useful context (always include this):
- **Age of the reader** → changes vocabulary
- **Purpose** → story vs. card vs. explanation vs. joke
- **Tone** → funny, serious, kind, exciting
- **Topic interest** → what the person loves
- **Length needed** → 3 sentences, 1 paragraph, short

### Context that doesn't change much:
- The exact date
- Where you live (unless it's relevant!)
- Random background info unrelated to the task

### Example — spot the useful context:

> "I am writing a story. It is Tuesday. I live in London. My teacher is called Mr. Smith. I want a funny story about a penguin for my 7-year-old cousin Sofia who loves penguins and is scared of the dark."

Useful context here:
✅ funny tone
✅ 7-year-old reader
✅ topic: penguin
✅ Sofia (personal touch — AI can use the name!)
✅ afraid of the dark (character detail!)

Not useful:
❌ "It is Tuesday"
❌ "I live in London"
❌ "My teacher is called Mr. Smith"

### The test: "Does this change what AI writes?"
If yes → include it.
If no → leave it out. Keep prompts focused!

### Your cheat sheet:
**Always include:** age, purpose, tone, topic interest, length
**Usually skip:** dates, random locations, unrelated facts
      `,
      unlocksActivityIds: ["a1-3-beginner", "a1-3-explorer", "a1-3-pro"],
      xpReward: 25,
    },

    // ── UNIT 2: Template Magic ─────────────────────
    {
      id: "l2-1",
      title: "What are prompt templates?",
      summary: "Templates are reusable prompt structures — fill in the blanks, get great results every time.",
      durationMinutes: 4,
      keyConcept: "A prompt template is a structure with blank spaces — fill them in for a consistent, high-quality result without starting from scratch.",
      content: `
# What are prompt templates?

Imagine you had a magic blueprint that always gave you a great result.
You just fill in the blanks and press go. That's a **prompt template**!

### Why use templates?
- You don't have to think from scratch every time
- The structure is already proven to work
- You can reuse them for different topics

### Example template — Story Starter:
\`\`\`
Write a [LENGTH] [TONE] story about a [CHARACTER] who [PROBLEM].
Set it in [SETTING]. End with [ENDING TYPE].
\`\`\`

Fill it in:
\`\`\`
Write a short funny story about a robot dog who keeps sneezing sparks.
Set it in a futuristic pet shop. End with a surprising twist.
\`\`\`

### Example template — Explainer:
\`\`\`
Explain [TOPIC] in simple words for a [AGE]-year-old.
Use an example about [FAMILIAR THING]. Keep it under [LENGTH].
\`\`\`

Fill it in:
\`\`\`
Explain how volcanoes work in simple words for an 8-year-old.
Use an example about a fizzy drink bottle. Keep it under 4 sentences.
\`\`\`

### Templates you'll build in this stage:
- 🎂 Birthday message template
- 🎮 Game character template
- 📖 Story starter template
- 🤔 Explain anything template
- ✉️ Letter writing template

Templates are power tools for builders. And you're a Builder now! 🦊
      `,
      unlocksActivityIds: ["a2-1-beginner", "a2-1-explorer"],
      xpReward: 25,
    },
    {
      id: "l2-2",
      title: "Building your own templates",
      summary: "Great prompters build templates they can reuse forever.",
      durationMinutes: 5,
      keyConcept: "To build a template, find a prompt that worked well, then replace the specific details with blank [LABELS].",
      content: `
# Building your own templates

Here's the coolest thing: you can turn ANY great prompt into a template!

### How to build a template:
1. Find a prompt that gave you an amazing result
2. Look for the parts that are **specific to that one use**
3. Replace those parts with [LABELS]
4. Save your template!

### Example:
**Great prompt that worked:**
> "Write a short funny story about a penguin named Percy who wants to learn to fly. Set it in Antarctica. End with a happy surprise."

**Turn it into a template:**
> "Write a [LENGTH] [TONE] story about a [ANIMAL] named [NAME] who wants to [GOAL]. Set it in [SETTING]. End with a [ENDING]."

Now you can use it for ANY animal, ANY goal, ANY setting!

### The 4 things to always include in a story template:
| Slot | What to put here |
|---|---|
| [ANIMAL/CHARACTER] | Who the story is about |
| [GOAL] | What they want to achieve |
| [OBSTACLE/SETTING] | What makes it challenging |
| [TONE] | Funny / emotional / exciting |

### Your mission in this unit:
Build 3 of your own templates that you'll use again and again.
Templates you build yourself are the most powerful — because they're made for YOUR style! 🔥
      `,
      unlocksActivityIds: ["a2-2-beginner", "a2-2-explorer", "a2-2-pro"],
      xpReward: 30,
    },
    {
      id: "l2-3",
      title: "Template combos — mixing and matching",
      summary: "Use multiple templates together to build something bigger than each one alone.",
      durationMinutes: 4,
      keyConcept: "Advanced builders chain templates — using the output of one as the input for another to create complex, layered results.",
      content: `
# Template combos — mixing and matching

You've built individual templates. Now let's combine them!

### The template combo technique:
Step 1: Use a **Character Template** to build your character.
Step 2: Feed that character into a **Story Template**.
Step 3: Use a **Dialogue Template** to write what they say.

### Example combo:
**Step 1 — Character Template:**
> "Create a character who is [TRAIT 1] and [TRAIT 2]. They love [INTEREST] and are afraid of [FEAR]. Their name is [NAME] and they are [AGE]."

Result: Maya, a 10-year-old who is brave but extremely clumsy. She loves robotics but is terrified of spiders.

**Step 2 — Story Template (using Maya):**
> "Write a story about Maya, a brave but clumsy 10-year-old who loves robotics. She needs to fix a robot that's broken in a room that contains a spider. Make it funny."

**Step 3 — Dialogue Template:**
> "Write a funny conversation between Maya and the robot as she tries to fix it, while trying to avoid looking at the corner where a huge spider is sitting."

Each step builds on the last. The result is something much richer than any single prompt!

### Template combo uses:
- Build a character → Write their story → Write their dialogue
- Research a topic → Explain it simply → Create quiz questions about it
- Describe a setting → Write a scene in it → Add a problem to the scene

This is how professional storytellers and game designers think! 🎮
      `,
      unlocksActivityIds: ["a2-3-beginner", "a2-3-explorer", "a2-3-pro"],
      xpReward: 30,
    },

    // ── UNIT 3: The Iteration Game ──────────────────
    {
      id: "l3-1",
      title: "Change one thing at a time",
      summary: "The fastest way to improve AI output is to change just one variable at a time.",
      durationMinutes: 4,
      keyConcept: "Changing one word or detail per iteration lets you track exactly what improved the result — this is how scientists experiment too!",
      content: `
# Change one thing at a time

You've tried the Try → Read → Improve loop.
Now let's level it up with a science experiment approach.

### The Scientist Method for Prompts:
Scientists test ONE variable at a time so they know WHAT caused the change.
You should do the same with prompts!

❌ **Don't do this:**
> Round 1: "Write a story about a dragon"
> Round 2: "Write a long funny emotional story about a purple dragon named Zyx who lives on a cloud and wants to be a chef"

You changed 7 things! You don't know which one made it better.

✅ **Do this instead:**
> Round 1: "Write a short story about a dragon" → too boring
> Round 2: "Write a short story about a **purple** dragon" → better colour but still dull
> Round 3: "Write a short **funny** story about a purple dragon" → now it has personality!
> Round 4: "Write a short funny story about a purple dragon **named Zyx**" → personal and unique now

Now you know exactly what each change did. That's the superpower!

### What to change per round:
| Round | Change this |
|---|---|
| 1 | Tone (funny/serious/scary) |
| 2 | Character detail (name, trait) |
| 3 | Setting detail (where, when) |
| 4 | Length (shorter/longer) |
| 5 | Add a constraint ("must include...") |
      `,
      unlocksActivityIds: ["a3-1-beginner", "a3-1-explorer", "a3-1-pro"],
      xpReward: 30,
    },
    {
      id: "l3-2",
      title: "Reading results like a critic",
      summary: "A good critic knows exactly what to praise and what to improve. Apply that to AI output.",
      durationMinutes: 4,
      keyConcept: "Critical reading means asking 4 questions: Did AI understand me? Is the tone right? What's missing? What's extra?",
      content: `
# Reading results like a critic

A critic doesn't just say "good" or "bad" — they explain exactly WHY.
When you read AI output, be a critic. Ask 4 questions.

### The 4 Critic Questions:
1. **Did AI understand me?** Did it write about what I asked, or did it go off-topic?
2. **Is the tone right?** Does it feel funny/serious/warm/exciting like I wanted?
3. **What's missing?** What did I ask for that AI forgot to include?
4. **What's extra?** Is there anything in the output I didn't want?

### Example — critical reading in action:

**Prompt:** "Write a funny 4-sentence poem about a dog who hates bath time."

**AI output:** "In morning light the dog awoke, beside the fire warm. The owner called for bath time soon, amid the gentle storm. The dog sat still and took the bath, without a single bark. Then fell asleep with dreaming thoughts as twilight turned to dark."

**Critique:**
1. ✅ Did it understand me? Yes — dog + bath time
2. ❌ Is the tone right? No — it's serious and poetic, not funny at all
3. ❌ What's missing? Humour! The dog's resistance and drama
4. ✅ What's extra? Nothing unnecessary — just wrong tone

**Fix:** "Write a VERY funny 4-sentence poem about a dramatic dog who completely loses his mind when bath time is mentioned. Include him hiding and making a huge fuss."

Being a critic makes you a better prompter! 🦊
      `,
      unlocksActivityIds: ["a3-2-beginner", "a3-2-explorer", "a3-2-pro"],
      xpReward: 30,
    },

    // ── UNIT 4: Character Portfolio ──────────────────
    {
      id: "l4-1",
      title: "The character builder system",
      summary: "A professional process for designing original, memorable AI-assisted characters.",
      durationMinutes: 5,
      keyConcept: "A fully designed character has: appearance, personality, backstory, goal, flaw, and catchphrase. AI can help with all of these.",
      content: `
# The character builder system

In Stage 1 you gave characters basic personalities.
Now we're going pro. Here's the full **Character Builder System**:

### The 6 Elements of a Great Character:

| Element | Question | Example |
|---|---|---|
| 🎨 Appearance | What do they look like? | "A tall girl with bright orange braids and paint-stained hands" |
| 💫 Personality | 2–3 traits that define them | "Curious, impulsive, secretly very kind" |
| 📖 Backstory | Where did they come from? What shaped them? | "Grew up in a lighthouse. Never had friends her age." |
| 🎯 Goal | What do they want more than anything? | "To become the youngest inventor to win the City Science Prize" |
| 🌀 Flaw | What makes them struggle? | "She acts first and thinks later — often making things worse" |
| 💬 Catchphrase | Something only THEY would say | "There's no problem too big if you've got a screwdriver!" |

### Why all 6 matter:
- **Appearance** → readers picture them instantly
- **Personality** → makes their decisions feel real
- **Backstory** → explains WHY they are this way
- **Goal** → drives the entire story
- **Flaw** → creates conflict and growth
- **Catchphrase** → makes them unforgettable

### AI can help with each element separately!
You don't have to build the whole character in one prompt.
Use 6 separate prompts, one per element. Then combine them!

That's professional character design. That's what game designers and novelists do. 🎮📚
      `,
      unlocksActivityIds: ["a4-1-beginner", "a4-1-explorer", "a4-1-pro"],
      xpReward: 35,
    },
    {
      id: "l4-2",
      title: "Character relationships and dynamics",
      summary: "Characters become 10x more interesting when they have relationships with other characters.",
      durationMinutes: 4,
      keyConcept: "A character's relationship with others (best friend, rival, mentor) creates natural story tension and depth.",
      content: `
# Character relationships and dynamics

A character alone is interesting.
A character in a relationship with another character is ELECTRIC.

### The 5 key relationships:

| Relationship | Dynamic | Example |
|---|---|---|
| 🤝 Best Friend | They support and challenge each other | Maya and her robot companion BUZZ |
| ⚔️ Rival | Same goal, opposite approaches | Two kids both trying to win the Science Prize |
| 🧙 Mentor | The experienced one who teaches | The old lighthouse keeper who trained her |
| 😤 Antagonist | Who/what is stopping them | The prize committee who says she's too young |
| ❤️ Someone to protect | Makes the stakes personal | Her little brother who believes in her |

### How to use AI for relationships:

**Prompt example:**
> "Maya is a curious, impulsive 11-year-old inventor. Write a description of her best friend Theo, who is the OPPOSITE of her personality — calm, careful, and always thinks before acting. They complement each other perfectly."

Now you have two characters who are interesting BECAUSE of how they interact!

### For your portfolio:
- Design at least 2 characters who know each other
- Give them one thing in common and one major difference
- Let AI help you write how they first met!
      `,
      unlocksActivityIds: ["a4-2-beginner", "a4-2-explorer", "a4-2-pro"],
      xpReward: 35,
    },
    {
      id: "l4-3",
      title: "Finishing your Character Portfolio",
      summary: "Combine all your characters into one showcase — your first AI-built creative portfolio.",
      durationMinutes: 3,
      keyConcept: "A portfolio isn't just a collection — it's curated work that shows your growth, creativity, and skills.",
      content: `
# Finishing your Character Portfolio

You've learned:
- ✅ Context and the "I am / This is for" formula
- ✅ Prompt templates and combos
- ✅ The scientist's iteration method
- ✅ Critical reading like a pro
- ✅ The 6-element character builder
- ✅ Character relationships

Now it's time to bring it all together into your **Character Portfolio**!

### What goes in your portfolio:
- **3+ original characters** — each with all 6 elements
- **1 relationship page** — how 2 of your characters know each other
- **1 "My Process" page** — a short note about how you built your characters with AI
- **A portfolio cover** — a title and short description

### Your portfolio shows:
- What YOU imagined
- How you used AI to bring it to life
- How your skills grew from Stage 1

### Remember:
AI wrote the words, but YOU created every idea.
You told AI what the character looks like, what they want, what they fear.
AI just helped you say it beautifully.

That is REAL creative work. And now you have a portfolio to prove it. 🦊
      `,
      unlocksActivityIds: ["a4-3-beginner", "a4-3-explorer", "a4-3-pro"],
      xpReward: 50,
    },
  ],

  // ────────────────────────────────────────
  // ACTIVITIES (20 total — 3 tiers each)
  // ────────────────────────────────────────
  activities: [

    // ── UNIT 1: Context ──────────────────────────

    // 1-1: Context Power-Up
    {
      id: "a1-1-beginner",
      title: "Context Power-Up: Birthday Message",
      description: "Add context to make the perfect birthday message for someone you know.",
      type: "fill-in-the-blank",
      difficulty: "beginner",
      estimatedMinutes: 5,
      promptTemplate:
        "I am {myAge} years old and I'm writing a birthday message. This is for {recipient} who loves {interest}. Write a {tone} birthday message that feels personal and mentions {interest}. Keep it under 4 sentences.",
      fields: [
        { key: "myAge", label: "Your age", placeholder: "e.g. 8" },
        { key: "recipient", label: "Who is it for?", placeholder: "e.g. my best friend Lily" },
        { key: "interest", label: "What do they love?", placeholder: "e.g. horses, gaming, painting" },
        { key: "tone", label: "How should it feel?", placeholder: "e.g. funny, warm, exciting" },
      ],
      model: "lightweight",
      maxTokens: 200,
      xpReward: 30,
      contributesToOutput: false,
      allowRetry: true,
      preTip: "💡 The more specific you are about what they love, the more personal it feels!",
    },
    {
      id: "a1-1-explorer",
      title: "Context Power-Up: Explain It for Them (Explorer)",
      description: "Use context to explain a tricky topic in the perfect way for a specific person.",
      type: "fill-in-the-blank",
      difficulty: "explorer",
      estimatedMinutes: 7,
      promptTemplate:
        "I need to explain {topic} to {audience}. {audience} is {audienceAge} years old and loves {interest}. Use an example involving {interest} to explain {topic} in simple words. Keep it friendly and under 5 sentences. Avoid any complicated words.",
      fields: [
        { key: "topic", label: "What to explain", placeholder: "e.g. how black holes work, why the sky is blue" },
        { key: "audience", label: "Who are you explaining to?", placeholder: "e.g. my little sister Mia" },
        { key: "audienceAge", label: "Their age", placeholder: "e.g. 6" },
        { key: "interest", label: "Something they love", placeholder: "e.g. dinosaurs, Minecraft, baking" },
      ],
      model: "lightweight",
      maxTokens: 300,
      xpReward: 50,
      contributesToOutput: false,
      allowRetry: true,
      preTip: "💡 Using an example from something they already love makes any topic 10x easier to understand!",
    },

    // 1-2: The I Am Formula
    {
      id: "a1-2-beginner",
      title: "I Am Formula: School Project Helper",
      description: "Use the 'I am' formula to get AI to help with exactly the kind of project you're making.",
      type: "fill-in-the-blank",
      difficulty: "beginner",
      estimatedMinutes: 5,
      promptTemplate:
        "I am {age} years old and I am making a school project about {topic}. The project is for {audience}. I need {outputType} that is {tone} and uses simple words. Keep it to {length}.",
      fields: [
        { key: "age", label: "Your age", placeholder: "e.g. 9" },
        { key: "topic", label: "Your project topic", placeholder: "e.g. rainforests, space, ancient Egypt" },
        { key: "audience", label: "Who will see it?", placeholder: "e.g. my class, my teacher, my family" },
        { key: "outputType", label: "What do you need?", placeholder: "e.g. 3 interesting facts, an introduction paragraph, a short poem" },
        { key: "tone", label: "Tone", placeholder: "e.g. interesting, fun, educational" },
        { key: "length", label: "How long?", placeholder: "e.g. 3 sentences, one paragraph, 5 bullet points" },
      ],
      model: "lightweight",
      maxTokens: 300,
      xpReward: 35,
      contributesToOutput: false,
      allowRetry: true,
    },
    {
      id: "a1-2-explorer",
      title: "I Am Formula: Party Planner (Explorer)",
      description: "Design the perfect party plan for a specific person using full context.",
      type: "fill-in-the-blank",
      difficulty: "explorer",
      estimatedMinutes: 8,
      promptTemplate:
        "I am planning a birthday party for {name} who is turning {age}. {name} loves {interest1} and {interest2} but dislikes {dislike}. The budget is {budget} and the location is {location}. Create a party plan with: a theme idea, 3 activities, and a food suggestion. Make it personalised and exciting.",
      fields: [
        { key: "name", label: "Who is the party for?", placeholder: "e.g. Jamie" },
        { key: "age", label: "Their age", placeholder: "e.g. 9" },
        { key: "interest1", label: "Thing they love #1", placeholder: "e.g. superheroes" },
        { key: "interest2", label: "Thing they love #2", placeholder: "e.g. building things" },
        { key: "dislike", label: "Something they dislike", placeholder: "e.g. loud music, scary things" },
        { key: "budget", label: "Budget", placeholder: "e.g. low, medium, or anything goes" },
        { key: "location", label: "Where will it be?", placeholder: "e.g. at home, in a park, in a hall" },
      ],
      model: "lightweight",
      maxTokens: 400,
      xpReward: 55,
      contributesToOutput: false,
      allowRetry: true,
    },
    {
      id: "a1-2-pro",
      title: "Context Master: Personal Story (Pro)",
      description: "Write a story specifically tailored to one real person using maximum context.",
      type: "open-creative",
      difficulty: "pro",
      estimatedMinutes: 12,
      promptTemplate:
        "Write a personalised short story (8–10 sentences) using all of this context:\n\nAbout the reader: {readerContext}\nWhat they love: {loves}\nWhat makes them laugh: {humour}\nSomething they're scared of or struggle with: {fear}\nSetting the story in: {setting}\n\nMake the story feel like it was written JUST for this person. Include references to what they love, make it {tone}, and give it a satisfying ending where the main character overcomes their struggle.",
      fields: [
        { key: "readerContext", label: "Who is this for? (age, who they are)", placeholder: "e.g. My 9-year-old cousin Alex who is really shy" },
        { key: "loves", label: "What do they love?", placeholder: "e.g. coding, Roblox, building Lego" },
        { key: "humour", label: "What makes them laugh?", placeholder: "e.g. silly puns, unexpected situations, animal jokes" },
        { key: "fear", label: "Something they find hard or scary", placeholder: "e.g. talking in front of people, trying new things" },
        { key: "setting", label: "Setting for the story", placeholder: "e.g. a futuristic school, a video game world, a giant Lego city" },
        { key: "tone", label: "Overall tone", placeholder: "e.g. funny and encouraging" },
      ],
      model: "lightweight",
      maxTokens: 600,
      xpReward: 90,
      contributesToOutput: false,
      allowRetry: true,
      preTip: "💡 This is a gift — a story made just for someone. The more context you give, the more they'll love it!",
    },

    // 1-3: Useful vs Useless Context
    {
      id: "a1-3-beginner",
      title: "Spot the Useful Context",
      description: "A quiz activity — can you identify which context actually helps AI?",
      type: "quiz",
      difficulty: "beginner",
      estimatedMinutes: 5,
      promptTemplate: "",
      model: "lightweight",
      maxTokens: 0,
      quiz: [
        {
          id: "q1",
          question: "You're writing a story for a 7-year-old. Which piece of context is most useful to include?",
          options: ["It is a Wednesday", "The child loves dinosaurs and funny stories", "You are sitting at a wooden desk", "It is 4pm"],
          correctIndex: 1,
          explanation: "The child's age + interests directly change what AI writes. Time, day, and where you're sitting have no effect on the story!",
        },
        {
          id: "q2",
          question: "Which prompt has the MOST useful context?",
          options: [
            "Write a birthday card",
            "Write a birthday card for my grandma",
            "Write a birthday card for my grandma who loves cats, gardening, and making people laugh",
            "Write a birthday card for my grandma who lives in a house",
          ],
          correctIndex: 2,
          explanation: "Interests (cats, gardening, humour) directly shape the content. Just knowing she exists or where she lives doesn't help AI write a better card.",
        },
        {
          id: "q3",
          question: "You want AI to explain gravity for your 6-year-old brother. What's the BEST context to add?",
          options: [
            "My brother is 6 and loves football",
            "It is my brother's birthday next week",
            "My brother attends Hillside Primary School",
            "My brother's favourite colour is blue",
          ],
          correctIndex: 0,
          explanation: "Age + a familiar interest (football) lets AI explain gravity using a ball-dropping example — perfect for a 6-year-old!",
        },
        {
          id: "q4",
          question: "Which of these is NOT useful context for a story prompt?",
          options: [
            "The story is for a 10-year-old who loves mystery",
            "The tone should be suspenseful but not scary",
            "I wrote the prompt at 7pm on a rainy day",
            "The main character should be a girl named Zara",
          ],
          correctIndex: 2,
          explanation: "The time and weather when YOU wrote the prompt have no effect on the story. Everything else gives AI useful direction!",
        },
      ],
      xpReward: 40,
      contributesToOutput: false,
      allowRetry: true,
    },
    {
      id: "a1-3-explorer",
      title: "Context Rewrite Challenge (Explorer)",
      description: "Take a weak prompt and rewrite it with rich context to get a much better result.",
      type: "fill-in-the-blank",
      difficulty: "explorer",
      estimatedMinutes: 8,
      promptTemplate:
        "Here is a weak prompt: '{weakPrompt}'\n\nNow I will improve it by adding context:\n- I am: {iAm}\n- This is for: {thisIsFor}\n- The tone should be: {tone}\n- Length: {length}\n- Must include: {mustInclude}\n\nPlease use all this context to give a much better result than the weak prompt would have produced.",
      fields: [
        { key: "weakPrompt", label: "The weak prompt (start simple!)", placeholder: "e.g. Write a poem" },
        { key: "iAm", label: "I am...", placeholder: "e.g. a 9-year-old who loves nature" },
        { key: "thisIsFor", label: "This is for...", placeholder: "e.g. a card for my teacher who retires this week" },
        { key: "tone", label: "Tone", placeholder: "e.g. warm and grateful with one funny line" },
        { key: "length", label: "Length", placeholder: "e.g. 6 lines" },
        { key: "mustInclude", label: "One thing it MUST include", placeholder: "e.g. a reference to the classroom" },
      ],
      model: "lightweight",
      maxTokens: 350,
      xpReward: 60,
      contributesToOutput: false,
      allowRetry: true,
      preTip: "💡 Start with the weakest possible prompt you can think of — then transform it with context and watch the difference!",
    },
    {
      id: "a1-3-pro",
      title: "Context Chain (Pro)",
      description: "Build a 3-step context chain — each output becomes context for the next.",
      type: "multi-step",
      difficulty: "pro",
      estimatedMinutes: 15,
      promptTemplate:
        "Step 1 — Create the context:\nGenerate a detailed profile of a fictional person: name, age, 3 interests, 1 fear, 1 dream, and their personality in 3 words.\n\nStep 2 — Use that context:\nUsing the profile from Step 1, write a short personalised story (6 sentences) about that person achieving their dream, but having to face their fear to do it.\n\nStep 3 — Reflect on the context:\nWrite a short note (3 sentences) explaining which piece of context from Step 1 made the biggest difference to the story in Step 2, and why.\n\nBase everything on this starting idea: {startingIdea}",
      fields: [
        { key: "startingIdea", label: "A starting interest or theme (Step 1 builds from this)", placeholder: "e.g. a kid who loves marine biology, or a child who wants to be an astronaut" },
      ],
      model: "lightweight",
      maxTokens: 700,
      xpReward: 95,
      contributesToOutput: false,
      allowRetry: false,
      preTip: "💡 This is a 3-step chain. Watch how each step becomes the context for the next. That's advanced prompting!",
    },

    // ── UNIT 2: Template Magic ───────────────────────

    // 2-1: Your First Template
    {
      id: "a2-1-beginner",
      title: "The Birthday Message Template",
      description: "Use the proven birthday message template — fill in the blanks, get a personal result!",
      type: "fill-in-the-blank",
      difficulty: "beginner",
      estimatedMinutes: 5,
      promptTemplate:
        "Write a {length} {tone} birthday message for {name} who is turning {age} and loves {interest}. Include a reference to {interest} and end with {ending}. No more than {sentences} sentences.",
      fields: [
        { key: "length", label: "Length", placeholder: "e.g. short, medium" },
        { key: "tone", label: "Tone", placeholder: "e.g. funny, warm, exciting" },
        { key: "name", label: "Name", placeholder: "e.g. Sam" },
        { key: "age", label: "Age", placeholder: "e.g. 10" },
        { key: "interest", label: "Their big interest", placeholder: "e.g. space, football, art" },
        { key: "ending", label: "How to end it", placeholder: "e.g. a wish, a joke, a challenge" },
        { key: "sentences", label: "Max sentences", placeholder: "e.g. 4" },
      ],
      model: "lightweight",
      maxTokens: 200,
      xpReward: 30,
      contributesToOutput: false,
      allowRetry: true,
      preTip: "💡 This is a ready-made template. Notice how changing just one field changes the whole output!",
    },
    {
      id: "a2-1-explorer",
      title: "The Story Starter Template (Explorer)",
      description: "Use the story starter template — then extend it by adding a complication.",
      type: "fill-in-the-blank",
      difficulty: "explorer",
      estimatedMinutes: 8,
      promptTemplate:
        "Using this story starter template:\n'Write a [LENGTH] [TONE] story about a [CHARACTER] who [GOAL]. Set it in [SETTING]. End with [ENDING].'\n\nFill it with:\nLength: {length}\nTone: {tone}\nCharacter: {character}\nGoal: {goal}\nSetting: {setting}\nEnding: {ending}\n\nAfter the story, add one complication that makes the goal harder to reach, then extend the story by 2 more sentences showing how the character handles it.",
      fields: [
        { key: "length", label: "Story length", placeholder: "e.g. short (5 sentences)" },
        { key: "tone", label: "Tone", placeholder: "e.g. funny and adventurous" },
        { key: "character", label: "Who is the story about?", placeholder: "e.g. a timid inventor who is actually a genius" },
        { key: "goal", label: "What do they want?", placeholder: "e.g. to build a machine that translates animal speech" },
        { key: "setting", label: "Where is it set?", placeholder: "e.g. a floating lab above the clouds" },
        { key: "ending", label: "How does it end?", placeholder: "e.g. a surprising discovery that changes everything" },
      ],
      model: "lightweight",
      maxTokens: 450,
      xpReward: 55,
      contributesToOutput: true,
      allowRetry: true,
    },

    // 2-2: Build Your Own Template
    {
      id: "a2-2-beginner",
      title: "Turn a Great Prompt into a Template",
      description: "Take a prompt that worked well and transform it into a reusable template.",
      type: "fill-in-the-blank",
      difficulty: "beginner",
      estimatedMinutes: 7,
      promptTemplate:
        "Here is a prompt I want to turn into a reusable template:\n'{originalPrompt}'\n\nStep 1: Rewrite it as a template by replacing the specific details with [LABEL] placeholders.\nStep 2: Then fill the template with completely NEW values (different topic, different character, different setting).\nStep 3: Show the filled-in result as a working prompt.",
      fields: [
        { key: "originalPrompt", label: "A prompt that worked well for you", placeholder: "e.g. Write a funny story about a penguin named Percy who wants to fly, set in Antarctica" },
      ],
      model: "lightweight",
      maxTokens: 400,
      xpReward: 40,
      contributesToOutput: false,
      allowRetry: true,
      preTip: "💡 Your best prompts are worth turning into templates! You'll be able to reuse them forever.",
    },
    {
      id: "a2-2-explorer",
      title: "Design Your Signature Template (Explorer)",
      description: "Build a custom prompt template from scratch — one you'll use throughout Stage 2 and beyond.",
      type: "open-creative",
      difficulty: "explorer",
      estimatedMinutes: 10,
      promptTemplate:
        "I want to create my own signature prompt template for: {purpose}\n\nThe template should:\n- Work for many different uses (not just one specific topic)\n- Have {numSlots} blank slots with clear [LABELS]\n- Always produce a {tone} result\n- Be suitable for someone who is {audience}\n\nPlease:\n1. Create the template with labeled blanks\n2. Show it filled in with one example\n3. Explain what each blank slot is for in one sentence",
      fields: [
        { key: "purpose", label: "What will your template be used for?", placeholder: "e.g. writing character descriptions, explaining things simply, writing creative intros" },
        { key: "numSlots", label: "How many blank slots?", placeholder: "e.g. 4 or 5" },
        { key: "tone", label: "What kind of result?", placeholder: "e.g. creative, funny, educational, personal" },
        { key: "audience", label: "Who is it for?", placeholder: "e.g. 9-year-olds who love storytelling" },
      ],
      model: "lightweight",
      maxTokens: 500,
      xpReward: 65,
      contributesToOutput: false,
      allowRetry: true,
    },
    {
      id: "a2-2-pro",
      title: "Template Library (Pro)",
      description: "Build a mini library of 3 different templates — story, explainer, and character.",
      type: "multi-step",
      difficulty: "pro",
      estimatedMinutes: 15,
      promptTemplate:
        "Create a mini template library with 3 templates based on these requirements:\n\nTemplate 1 — Story Template:\nFor writing {storyGenre} stories. Must have 5 blank slots.\n\nTemplate 2 — Explainer Template:\nFor explaining {explainSubject} to young kids. Must have 4 blank slots and always use a relatable example.\n\nTemplate 3 — Character Template:\nFor creating {characterType} characters. Must have 6 blank slots covering appearance, personality, goal, and flaw.\n\nFor each template:\n- Show the template with [LABEL] blanks\n- Demonstrate it with a filled-in example\n- Rate how reusable it is out of 10 and why",
      fields: [
        { key: "storyGenre", label: "What kind of stories?", placeholder: "e.g. adventure, mystery, sci-fi" },
        { key: "explainSubject", label: "What kind of things to explain?", placeholder: "e.g. science facts, historical events, how things work" },
        { key: "characterType", label: "What kind of characters?", placeholder: "e.g. heroic, villain, sidekick, magical creature" },
      ],
      model: "lightweight",
      maxTokens: 700,
      xpReward: 95,
      contributesToOutput: false,
      allowRetry: false,
      preTip: "💡 A library of 3 great templates will make you a faster, better prompter for the rest of the course!",
    },

    // 2-3: Template Combos
    {
      id: "a2-3-beginner",
      title: "Character → Story Combo",
      description: "Build a character first, then feed them into a story — two templates working together.",
      type: "multi-step",
      difficulty: "beginner",
      estimatedMinutes: 8,
      promptTemplate:
        "Step 1 — Character:\nCreate a character with: name ({name}), age ({charAge}), one main personality trait ({trait}), and one thing they love ({love}).\n\nStep 2 — Story:\nNow write a short funny story (4 sentences) starring the character from Step 1. The story should show their personality trait and involve what they love.",
      fields: [
        { key: "name", label: "Character name", placeholder: "e.g. Zara" },
        { key: "charAge", label: "Character age", placeholder: "e.g. 10" },
        { key: "trait", label: "Main personality trait", placeholder: "e.g. extremely curious" },
        { key: "love", label: "Something they love", placeholder: "e.g. building robots out of junk" },
      ],
      model: "lightweight",
      maxTokens: 350,
      xpReward: 40,
      contributesToOutput: true,
      allowRetry: true,
    },
    {
      id: "a2-3-explorer",
      title: "3-Template Combo (Explorer)",
      description: "Chain character → scene → dialogue into one flowing creative piece.",
      type: "multi-step",
      difficulty: "explorer",
      estimatedMinutes: 12,
      promptTemplate:
        "I want to create a 3-part creative piece using template combos.\n\nTemplate 1 — Character Profile:\nCreate {character1Name}: {character1Trait} who loves {character1Love}.\nCreate {character2Name}: the OPPOSITE personality who loves {character2Love}.\n\nTemplate 2 — Scene:\nWrite a short scene (4 sentences) where both characters meet for the first time in {meetingPlace}. They immediately disagree about something related to what they each love.\n\nTemplate 3 — Dialogue:\nWrite 6 lines of funny dialogue between {character1Name} and {character2Name} showing their opposite personalities. End with them finding one thing they actually agree on.",
      fields: [
        { key: "character1Name", label: "Character 1 name", placeholder: "e.g. Max" },
        { key: "character1Trait", label: "Character 1 personality", placeholder: "e.g. loud, adventurous, acts first" },
        { key: "character1Love", label: "Character 1 loves", placeholder: "e.g. exploring ruins" },
        { key: "character2Name", label: "Character 2 name", placeholder: "e.g. Priya" },
        { key: "character2Love", label: "Character 2 loves", placeholder: "e.g. planning everything perfectly" },
        { key: "meetingPlace", label: "Where they meet", placeholder: "e.g. a crumbling ancient library" },
      ],
      model: "lightweight",
      maxTokens: 600,
      xpReward: 70,
      contributesToOutput: true,
      allowRetry: true,
    },
    {
      id: "a2-3-pro",
      title: "Full World-Building Combo (Pro)",
      description: "Use 4 templates together: world → character → conflict → resolution.",
      type: "multi-step",
      difficulty: "pro",
      estimatedMinutes: 18,
      promptTemplate:
        "Use 4 templates in sequence to build a complete mini-world:\n\nTemplate 1 — World:\nDescribe the world of {worldName}: its rules ({rule}), its biggest problem ({worldProblem}), and what makes it unique ({uniqueThing}).\n\nTemplate 2 — Character:\nCreate the hero for this world: {heroName}, who has the specific skill ({skill}) needed to solve the world's problem, but who struggles with {flaw}.\n\nTemplate 3 — Conflict:\nWrite the moment {heroName} discovers the world's problem and decides they must act. Show their internal conflict between their skill and their flaw. 4 sentences.\n\nTemplate 4 — Resolution:\nWrite how {heroName} uses their skill, overcomes their flaw, and solves {worldProblem}. End with one line showing how the world changes as a result. 5 sentences.\n\nChain all 4 parts together as one cohesive story.",
      fields: [
        { key: "worldName", label: "Name of your world", placeholder: "e.g. The Cloudlands, Deepwater City, The Iron Forest" },
        { key: "rule", label: "A unique rule of this world", placeholder: "e.g. music is illegal, everyone can fly, memories can be sold" },
        { key: "worldProblem", label: "The world's biggest problem", placeholder: "e.g. the sun is fading, the water is running out, silence is spreading" },
        { key: "uniqueThing", label: "What makes this world special", placeholder: "e.g. buildings are made of living coral, time moves backwards at night" },
        { key: "heroName", label: "Your hero's name", placeholder: "e.g. Nora, Kai, Sable" },
        { key: "skill", label: "Their unique skill", placeholder: "e.g. they can hear what machines are thinking" },
        { key: "flaw", label: "Their flaw", placeholder: "e.g. they are terrified of making decisions under pressure" },
      ],
      model: "lightweight",
      maxTokens: 800,
      xpReward: 100,
      contributesToOutput: true,
      allowRetry: false,
      preTip: "💡 This is professional world-building using template chains. Game designers and novelists use this exact process!",
    },

    // ── UNIT 3: Iteration ──────────────────────────

    // 3-1: Change One Thing
    {
      id: "a3-1-beginner",
      title: "The One-Change Experiment",
      description: "Generate a story, then make 3 rounds of single-variable changes. Watch how each one shifts the result.",
      type: "fill-in-the-blank",
      difficulty: "beginner",
      estimatedMinutes: 8,
      promptTemplate:
        "I am going to test prompt iteration by changing one thing at a time.\n\nBase story: Write a short story (3 sentences) about a {character} in a {setting}.\n\nRound 2 change: Now rewrite it, changing ONLY the tone to {newTone}. Keep everything else the same.\n\nRound 3 change: Now rewrite it again, keeping the new tone but changing ONLY the character to {newCharacter}.\n\nLabel each version clearly: Base / Round 2 / Round 3.\nAt the end, write one sentence about which change had the biggest effect.",
      fields: [
        { key: "character", label: "Base character", placeholder: "e.g. a small robot" },
        { key: "setting", label: "Base setting", placeholder: "e.g. a busy city" },
        { key: "newTone", label: "Round 2: New tone (only this changes!)", placeholder: "e.g. spooky" },
        { key: "newCharacter", label: "Round 3: New character (only this changes!)", placeholder: "e.g. a tiny dragon" },
      ],
      model: "lightweight",
      maxTokens: 500,
      xpReward: 40,
      contributesToOutput: false,
      allowRetry: true,
      preTip: "💡 See how each single change shifts the story? That's exactly how scientists experiment!",
    },
    {
      id: "a3-1-explorer",
      title: "5-Round Iteration Challenge (Explorer)",
      description: "Run 5 controlled iterations on a poem — improving it one variable at a time.",
      type: "multi-step",
      difficulty: "explorer",
      estimatedMinutes: 12,
      promptTemplate:
        "I am iterating on a poem in 5 controlled rounds. Start with the base, then change ONLY the stated variable each round.\n\nBase: Write a 4-line rhyming poem about {baseTopic}.\nRound 2 change: Change ONLY the subject to {round2Subject}.\nRound 3 change: Change ONLY the tone to {round3Tone}.\nRound 4 change: Change ONLY the style to {round4Style} (e.g. make it sound like a rap, a lullaby, a warning sign).\nRound 5 change: Change ONLY the ending — make the last line {round5Ending}.\n\nLabel each round. After all 5, write your verdict: which version is the best and why?",
      fields: [
        { key: "baseTopic", label: "Base poem topic", placeholder: "e.g. a lost sock" },
        { key: "round2Subject", label: "Round 2: Change subject to", placeholder: "e.g. a lost key" },
        { key: "round3Tone", label: "Round 3: Change tone to", placeholder: "e.g. dramatic and tragic" },
        { key: "round4Style", label: "Round 4: Change style to", placeholder: "e.g. a pirate shanty" },
        { key: "round5Ending", label: "Round 5: Make the last line", placeholder: "e.g. surprising and hopeful" },
      ],
      model: "lightweight",
      maxTokens: 700,
      xpReward: 70,
      contributesToOutput: false,
      allowRetry: false,
      preTip: "💡 Five rounds, five variables. By the end you'll have transformed the poem completely — and you'll know exactly why!",
    },
    {
      id: "a3-1-pro",
      title: "The Iteration Lab (Pro)",
      description: "Design your OWN experiment: pick a prompt, choose 5 variables to test, and document what you discover.",
      type: "open-creative",
      difficulty: "pro",
      estimatedMinutes: 18,
      promptTemplate:
        "I am running my own prompt iteration experiment.\n\nMy base prompt: {basePrompt}\nMy hypothesis (what I think will have the biggest effect): {hypothesis}\n\nRun 5 iterations, changing one variable at a time:\n1. Change {var1}\n2. Change {var2}\n3. Change {var3}\n4. Change {var4}\n5. Change {var5}\n\nAfter all iterations:\n- Label which was the BIGGEST improvement and explain why\n- Label which change made the LEAST difference and explain why\n- Conclude: was my hypothesis correct?\n- Give my prompt a score out of 10 for the final version and explain why",
      fields: [
        { key: "basePrompt", label: "Your base prompt", placeholder: "e.g. Write a short adventure story about a kid" },
        { key: "hypothesis", label: "What do you think will change it most?", placeholder: "e.g. I think adding a personality trait to the character will have the biggest effect" },
        { key: "var1", label: "Iteration 1: What to change", placeholder: "e.g. the character's age" },
        { key: "var2", label: "Iteration 2: What to change", placeholder: "e.g. the tone (make it funny)" },
        { key: "var3", label: "Iteration 3: What to change", placeholder: "e.g. add a specific personality trait" },
        { key: "var4", label: "Iteration 4: What to change", placeholder: "e.g. add a specific setting" },
        { key: "var5", label: "Iteration 5: What to change", placeholder: "e.g. add a constraint (must include a twist ending)" },
      ],
      model: "lightweight",
      maxTokens: 900,
      xpReward: 100,
      contributesToOutput: false,
      allowRetry: false,
      preTip: "💡 You're now thinking like a prompt engineer! Designing your own experiment is a real professional skill.",
    },

    // 3-2: Reading Like a Critic
    {
      id: "a3-2-beginner",
      title: "Critic Mode: Rate and Fix",
      description: "Get an AI output, rate it using the 4 critic questions, then give AI specific feedback to fix it.",
      type: "fill-in-the-blank",
      difficulty: "beginner",
      estimatedMinutes: 8,
      promptTemplate:
        "Step 1: Write a short story (4 sentences) about {topic}.\n\nStep 2: Then immediately review the story using exactly these 4 critic questions:\n1. Did I understand the topic? (Yes/No + explanation)\n2. Is the tone {desiredTone}? (Yes/No + explanation)\n3. What's missing that would make it better?\n4. What's unnecessary?\n\nStep 3: Rewrite the story using the feedback from Step 2 to fix all the issues.",
      fields: [
        { key: "topic", label: "Story topic", placeholder: "e.g. a brave mouse who enters a science competition" },
        { key: "desiredTone", label: "What tone do you want?", placeholder: "e.g. funny and heartwarming" },
      ],
      model: "lightweight",
      maxTokens: 500,
      xpReward: 45,
      contributesToOutput: true,
      allowRetry: true,
      preTip: "💡 You're asking AI to critique its own work! This is a real technique called self-evaluation.",
    },
    {
      id: "a3-2-explorer",
      title: "Before and After Critique (Explorer)",
      description: "Critique an output and write the improved prompt yourself — then compare the results.",
      type: "fill-in-the-blank",
      difficulty: "explorer",
      estimatedMinutes: 12,
      promptTemplate:
        "I am going to practice critical reading and prompt improvement.\n\nStep 1: Generate a story from this prompt:\n'{weakPrompt}'\n\nStep 2: Critically review it using all 4 questions:\n- Did AI understand the prompt?\n- Is the tone right ({desiredTone})?\n- What's missing?\n- What's extra?\n\nStep 3: Write an improved prompt that addresses every issue from Step 2.\n\nStep 4: Generate the story using the improved prompt.\n\nStep 5: Write one sentence comparing the two versions — what changed most significantly?",
      fields: [
        { key: "weakPrompt", label: "Start with a simple/weak prompt", placeholder: "e.g. Write a story about a kid who wins a competition" },
        { key: "desiredTone", label: "What tone are you aiming for?", placeholder: "e.g. emotional and uplifting" },
      ],
      model: "lightweight",
      maxTokens: 700,
      xpReward: 70,
      contributesToOutput: true,
      allowRetry: false,
    },
    {
      id: "a3-2-pro",
      title: "The Peer Review (Pro)",
      description: "Write a story, critique it fully, rewrite it twice — documenting your full improvement process.",
      type: "open-creative",
      difficulty: "pro",
      estimatedMinutes: 18,
      promptTemplate:
        "I want to run a full creative improvement cycle on this story idea: {storyIdea}\n\nRound 1: Write a first draft (6 sentences) based on the idea. Aim for good but not perfect.\n\nReview: Critique the first draft answering all 4 critic questions in detail.\n\nRound 2: Rewrite the story using the critique. Aim for significant improvement.\n\nFinal Review: Compare Round 1 and Round 2. Score each version out of 10 on:\n- Character (how real and interesting they feel)\n- Setting (how vivid)\n- Plot (how engaging)\n- Emotion (how it makes the reader feel)\n\nConclusion: What was the single most important thing you changed between rounds?",
      fields: [
        { key: "storyIdea", label: "Your story idea", placeholder: "e.g. A kid who discovers they can pause time, but only for 5 seconds, and must use it to prevent a disaster at their school science fair" },
      ],
      model: "lightweight",
      maxTokens: 900,
      xpReward: 100,
      contributesToOutput: true,
      allowRetry: false,
    },

    // ── UNIT 4: Character Portfolio ──────────────────

    // 4-1: Character Builder
    {
      id: "a4-1-beginner",
      title: "Build Your First Full Character",
      description: "Use all 6 elements to build a rich, memorable character for your portfolio.",
      type: "fill-in-the-blank",
      difficulty: "beginner",
      estimatedMinutes: 8,
      promptTemplate:
        "Create a detailed character profile for a {type} character named {name} using all 6 elements:\n\n🎨 Appearance: {appearance}\n💫 Personality: {personality}\n📖 Backstory: {backstory}\n🎯 Goal: {goal}\n🌀 Flaw: {flaw}\n💬 Catchphrase: generate a unique one that fits their personality\n\nAfter the profile, write one paragraph (4 sentences) of a scene that shows their personality, flaw, AND goal in action — without ever directly stating those words.",
      fields: [
        { key: "type", label: "What kind of character?", placeholder: "e.g. young inventor, magical creature, space explorer" },
        { key: "name", label: "Their name", placeholder: "e.g. Nora, Zyx, Captain Drift" },
        { key: "appearance", label: "How do they look?", placeholder: "e.g. tall with electric-blue hair and a coat full of gadgets" },
        { key: "personality", label: "2-3 personality traits", placeholder: "e.g. fiercely curious, accidentally chaotic, secretly shy" },
        { key: "backstory", label: "Where did they come from?", placeholder: "e.g. grew up in an underwater lab, raised by engineers, never attended school" },
        { key: "goal", label: "What do they want most?", placeholder: "e.g. to build the world's first emotion-powered engine" },
        { key: "flaw", label: "What holds them back?", placeholder: "e.g. they trust machines more than people and often forget to ask for help" },
      ],
      model: "lightweight",
      maxTokens: 500,
      xpReward: 50,
      contributesToOutput: true,
      allowRetry: true,
      preTip: "💡 The scene at the end is the most important part — showing personality through action is what great writers do!",
    },
    {
      id: "a4-1-explorer",
      title: "Character Contrast Pair (Explorer)",
      description: "Build two characters who are opposite in key ways — then write their first meeting.",
      type: "fill-in-the-blank",
      difficulty: "explorer",
      estimatedMinutes: 12,
      promptTemplate:
        "Create two contrasting characters who will eventually become a team.\n\nCharacter 1 — {name1}:\nPersonality: {personality1}\nStrength: {strength1}\nFlaw: {flaw1}\nWhat they love: {love1}\n\nCharacter 2 — {name2}:\nPersonality: THE OPPOSITE of {name1} in every way\nStrength: fills the exact gap that {name1}'s flaw creates\nFlaw: the opposite of {name1}'s strength\n\nFor both: write full 6-element profiles.\n\nThen write their first meeting (6 sentences). They are in {meetingLocation} and must immediately work together to solve {sharedProblem}. Show how their differences both cause friction AND help them solve it faster together.",
      fields: [
        { key: "name1", label: "Character 1 name", placeholder: "e.g. Theo" },
        { key: "personality1", label: "Character 1 personality", placeholder: "e.g. impulsive and creative but disorganised" },
        { key: "strength1", label: "Character 1 main strength", placeholder: "e.g. comes up with brilliant ideas instantly" },
        { key: "flaw1", label: "Character 1 flaw", placeholder: "e.g. never finishes anything they start" },
        { key: "love1", label: "Character 1 loves", placeholder: "e.g. wild experiments with no plan" },
        { key: "name2", label: "Character 2 name", placeholder: "e.g. Priya" },
        { key: "meetingLocation", label: "Where they first meet", placeholder: "e.g. a collapsing bridge, a school science lab, a broken space station" },
        { key: "sharedProblem", label: "The problem they both face", placeholder: "e.g. a runaway experiment heading toward the city, a code that needs to be cracked in 60 seconds" },
      ],
      model: "lightweight",
      maxTokens: 700,
      xpReward: 75,
      contributesToOutput: true,
      allowRetry: true,
    },
    {
      id: "a4-1-pro",
      title: "The Villain Character (Pro)",
      description: "Build a compelling villain — one who believes they are the hero of their own story.",
      type: "open-creative",
      difficulty: "pro",
      estimatedMinutes: 15,
      promptTemplate:
        "Create a villain for this world/story: {context}\n\nThis villain MUST:\n1. Have a reason for what they do that makes sense from their perspective\n2. Have a tragic backstory that explains (but doesn't excuse) their actions\n3. Want something the hero also wants — but for different reasons\n4. Have one redeeming quality that makes them sympathetic\n5. Use all 6 character elements\n\nAfter the profile, write:\n- The villain's own internal monologue (3 sentences from their point of view — they believe they are RIGHT)\n- One scene where the villain and hero meet (5 sentences) that shows they are more alike than different\n- What would it take for this villain to change sides?",
      fields: [
        { key: "context", label: "The world/story this villain exists in", placeholder: "e.g. A world where memories can be sold. The villain is stealing memories from the rich to give to the poor who can't afford to remember their own childhoods." },
      ],
      model: "lightweight",
      maxTokens: 800,
      xpReward: 100,
      contributesToOutput: true,
      allowRetry: false,
      preTip: "💡 The best villains always believe they are right. Writing from their perspective is one of the hardest — and most rewarding — creative challenges.",
    },

    // 4-2: Relationships
    {
      id: "a4-2-beginner",
      title: "Character Meet-Cute",
      description: "Write the first time two of your portfolio characters meet.",
      type: "fill-in-the-blank",
      difficulty: "beginner",
      estimatedMinutes: 7,
      promptTemplate:
        "Write the scene where {character1} meets {character2} for the first time. They meet in {location}.\n\nCharacter 1 — {character1}: {character1Description}\nCharacter 2 — {character2}: {character2Description}\n\nThe meeting should:\n- Show both personalities clearly through their actions and words\n- Include one moment of misunderstanding because of their different personalities\n- End with them deciding to work together despite the awkward start\n\nKeep it 5–6 sentences.",
      fields: [
        { key: "character1", label: "Character 1 name", placeholder: "e.g. Nora (from your portfolio)" },
        { key: "character1Description", label: "Character 1 in 10 words", placeholder: "e.g. Brave but clumsy inventor who trusts machines over people" },
        { key: "character2", label: "Character 2 name", placeholder: "e.g. a new character" },
        { key: "character2Description", label: "Character 2 in 10 words", placeholder: "e.g. Calm and organised navigator who distrusts technology" },
        { key: "location", label: "Where they meet", placeholder: "e.g. in a malfunctioning elevator, at a science fair disaster" },
      ],
      model: "lightweight",
      maxTokens: 400,
      xpReward: 45,
      contributesToOutput: true,
      allowRetry: true,
    },
    {
      id: "a4-2-explorer",
      title: "The Relationship Arc (Explorer)",
      description: "Write 3 scenes showing how two characters' relationship changes over time.",
      type: "multi-step",
      difficulty: "explorer",
      estimatedMinutes: 12,
      promptTemplate:
        "Write 3 scenes showing a relationship arc between {character1} and {character2}.\n\nCharacter details: {characterDetails}\n\nScene 1 — THE MEETING (3 sentences):\nThey meet in {setting1}. First impression: they don't trust each other. Show WHY with specific actions.\n\nScene 2 — THE TURNING POINT (4 sentences):\nIn {setting2}, a crisis happens. {character1} does something unexpected that changes how {character2} sees them.\n\nScene 3 — THE BOND (3 sentences):\nIn {setting3}, they work together using both their strengths. End with a line of dialogue showing how their relationship has grown.\n\nAfter all 3 scenes, write: 'What changed: [one sentence about the relationship arc]'",
      fields: [
        { key: "character1", label: "Character 1 name", placeholder: "e.g. Zara" },
        { key: "character2", label: "Character 2 name", placeholder: "e.g. Kai" },
        { key: "characterDetails", label: "Brief description of both characters", placeholder: "e.g. Zara is fiercely independent and distrustful. Kai is overly eager to help and often annoying about it." },
        { key: "setting1", label: "Scene 1 location", placeholder: "e.g. a broken-down spaceship" },
        { key: "setting2", label: "Scene 2 location", placeholder: "e.g. the planet's hostile surface" },
        { key: "setting3", label: "Scene 3 location", placeholder: "e.g. the control room during launch" },
      ],
      model: "lightweight",
      maxTokens: 600,
      xpReward: 70,
      contributesToOutput: true,
      allowRetry: true,
    },

    // 4-3: Portfolio Assembly
    {
      id: "a4-3-beginner",
      title: "Portfolio Cover Page",
      description: "Write an exciting cover description for your Character Portfolio.",
      type: "fill-in-the-blank",
      difficulty: "beginner",
      estimatedMinutes: 5,
      promptTemplate:
        "Write a dramatic and exciting back-cover description for a character portfolio called '{portfolioTitle}'. This portfolio was created by a {creatorAge}-year-old using AI. It contains {numCharacters} original characters who {portfolioTheme}. Make it sound like the back of an epic graphic novel — exciting, mysterious, and making readers want to open it immediately. Keep it under 5 sentences.",
      fields: [
        { key: "portfolioTitle", label: "Your portfolio title", placeholder: "e.g. The Builders of the Iron Age" },
        { key: "creatorAge", label: "Your age", placeholder: "e.g. 9" },
        { key: "numCharacters", label: "How many characters?", placeholder: "e.g. 4" },
        { key: "portfolioTheme", label: "What connects your characters?", placeholder: "e.g. live in a futuristic city and each have a secret superpower they're learning to control" },
      ],
      model: "lightweight",
      maxTokens: 250,
      xpReward: 40,
      contributesToOutput: true,
      allowRetry: true,
    },
    {
      id: "a4-3-explorer",
      title: "My Builder's Note (Explorer)",
      description: "Write a personal note explaining your creative process — how you built these characters using AI.",
      type: "fill-in-the-blank",
      difficulty: "explorer",
      estimatedMinutes: 7,
      promptTemplate:
        "Write a personal 'Builder's Note' (5–6 sentences) for a character portfolio, written from the perspective of {name}, a {age}-year-old creator.\n\nInclude:\n- What inspired the characters ({inspiration})\n- The most interesting thing they learned about using AI ({aiLesson})\n- Which character they're most proud of and why ({proudOf})\n- A message to the reader about creativity and AI ({message})\n\nTone: {tone} and personal — like talking directly to the reader.",
      fields: [
        { key: "name", label: "Your name", placeholder: "e.g. your name or a pen name" },
        { key: "age", label: "Your age", placeholder: "e.g. 9" },
        { key: "inspiration", label: "What inspired your characters?", placeholder: "e.g. games I love, problems I care about, people I admire" },
        { key: "aiLesson", label: "What did you learn about AI?", placeholder: "e.g. that giving context makes everything better, that templates save time" },
        { key: "proudOf", label: "Which character are you most proud of?", placeholder: "e.g. my villain, because I had to think like a completely different person" },
        { key: "message", label: "What do you want to say about creativity?", placeholder: "e.g. that your imagination is the most important tool and AI just helps you say it" },
        { key: "tone", label: "Tone", placeholder: "e.g. proud and inspiring" },
      ],
      model: "lightweight",
      maxTokens: 350,
      xpReward: 60,
      contributesToOutput: true,
      allowRetry: true,
    },
    {
      id: "a4-3-pro",
      title: "Portfolio World Bible (Pro)",
      description: "Create a world bible — the shared universe your portfolio characters all exist in.",
      type: "open-creative",
      difficulty: "pro",
      estimatedMinutes: 15,
      promptTemplate:
        "Create a World Bible for my character portfolio. A World Bible is a document that defines the shared universe all characters live in.\n\nBased on my characters and their stories: {characterSummary}\n\nCreate a World Bible that includes:\n1. The World's Name and one-line description\n2. 3 rules of this world (things that are always true here)\n3. 2 major locations that appear in multiple characters' stories\n4. 1 shared threat or conflict that connects all the characters\n5. A timeline: 3 key events that shaped this world (past, present, near future)\n6. A glossary: 5 unique words or terms used in this world with definitions\n\nMake it feel like a real game design document — exciting, detailed, and internally consistent.",
      fields: [
        { key: "characterSummary", label: "Brief summary of your characters and their stories", placeholder: "e.g. Nora the inventor, Kai the navigator, and Sable the villain all live in a city where technology runs on memories. Nora builds things, Kai maps the unknown, and Sable wants to control all the city's stored memories.", maxLength: 400 },
      ],
      model: "lightweight",
      maxTokens: 800,
      xpReward: 100,
      contributesToOutput: true,
      allowRetry: false,
      preTip: "💡 Game designers and authors use World Bibles to keep their universes consistent. You're doing real professional creative work here!",
    },
  ],

  // ────────────────────────────────────────
  // TIP CARDS (15 total)
  // ────────────────────────────────────────
  tipCards: [
    // Unit 1 — Context
    {
      id: "t1",
      title: "The 'I Am' Starter",
      emoji: "🙋",
      tip: "Start your prompt with 'I am [age] years old and I...' to give AI your identity and purpose instantly.",
      example: {
        bad: "Write a story about space",
        good: "I am 9 years old and I love space. Write a story about a kid my age who discovers a new planet",
      },
    },
    {
      id: "t2",
      title: "The 'This is for' Starter",
      emoji: "🎁",
      tip: "Tell AI who the reader is with 'This is for my [person] who loves [interest]...' — it changes everything.",
      example: {
        bad: "Write a birthday message",
        good: "This is for my grandpa who loves fishing and bad jokes — write a warm birthday message with a fishing pun",
      },
    },
    {
      id: "t3",
      title: "Useful Context Only",
      emoji: "🎯",
      tip: "Only include context that changes what AI writes. Age, interests, tone, and purpose = useful. Day of the week = not useful.",
      example: {
        bad: "It's a Tuesday and I'm at my desk. Write a story about a dragon.",
        good: "I am 9 years old. Write a story about a dragon for a 6-year-old who gets scared easily — keep it funny, not scary.",
      },
    },
    {
      id: "t4",
      title: "Audience Changes Everything",
      emoji: "👀",
      tip: "Tell AI exactly who will read, watch, or use the output. A 6-year-old and a 13-year-old need completely different language.",
      example: {
        bad: "Explain gravity",
        good: "Explain gravity to a 7-year-old who loves Minecraft, using a blocks-falling example. No complicated words.",
      },
    },

    // Unit 2 — Templates
    {
      id: "t5",
      title: "Turn Great Prompts into Templates",
      emoji: "🔩",
      tip: "When a prompt works brilliantly, save it as a template by replacing specific words with [LABELS]. Reuse it forever.",
      example: {
        bad: "(using the same specific prompt every time)",
        good: "Write a [LENGTH] [TONE] story about a [CHARACTER] who [GOAL]. Set in [SETTING]. End with [ENDING].",
      },
    },
    {
      id: "t6",
      title: "Chain Templates Together",
      emoji: "🔗",
      tip: "Use the output from one template as the input for the next. Character → Story → Dialogue = a complete creative piece.",
      example: {
        bad: "Write a story about two characters",
        good: "Step 1: Build character profiles. Step 2: Use profiles to write their first meeting. Step 3: Write dialogue using their personalities.",
      },
    },
    {
      id: "t7",
      title: "Label Your Template Slots Clearly",
      emoji: "🏷️",
      tip: "Use clear, descriptive [LABELS] in capitals. [CHARACTER] is better than [X]. [TONE] is better than [T]. Clear labels = clearer prompts.",
      example: {
        bad: "Write a [X] about a [Y] in a [Z]",
        good: "Write a [TONE] story about a [CHARACTER_TYPE] in a [SETTING]. End with a [ENDING_TYPE].",
      },
    },

    // Unit 3 — Iteration
    {
      id: "t8",
      title: "Change One Thing per Round",
      emoji: "🔬",
      tip: "Like a scientist, change only ONE variable per iteration. That way you know exactly what improved the result.",
      example: {
        bad: "Completely rewriting the prompt after getting a bad result",
        good: "Round 1 → bad result. Round 2 → change only the tone. Round 3 → change only the character. Track what each change does.",
      },
    },
    {
      id: "t9",
      title: "The 4 Critic Questions",
      emoji: "🔍",
      tip: "Always read AI output through 4 lenses: Did it understand me? Is the tone right? What's missing? What's extra?",
      example: {
        bad: "'It's bad, rewrite it'",
        good: "'The tone is wrong (too serious — I wanted funny), and you forgot to include the character's name. Keep the ending — that part was perfect.'",
      },
    },
    {
      id: "t10",
      title: "Ask AI to Critique Itself",
      emoji: "🪞",
      tip: "After generating output, ask AI: 'Review what you just wrote. What's weak? What could be better?' Then ask it to improve.",
      example: {
        bad: "Getting one result and accepting it",
        good: "Step 1: Generate. Step 2: 'Now critique what you wrote — what's missing or weak?' Step 3: 'Fix the issues you found.'",
      },
    },
    {
      id: "t11",
      title: "The Fix Formula",
      emoji: "🔧",
      tip: "Use this exact phrase: 'I liked [X], please change [Y] to [Z].' It tells AI what to keep AND what to fix.",
      example: {
        bad: "'Make it better'",
        good: "'I liked the funny ending. Please change the main character to be younger and change the setting to underwater.'",
      },
    },

    // Unit 4 — Characters
    {
      id: "t12",
      title: "6-Element Character System",
      emoji: "🧩",
      tip: "Great characters need: Appearance, Personality, Backstory, Goal, Flaw, and Catchphrase. Build each separately with AI then combine.",
      example: {
        bad: "Write a character who is brave",
        good: "Create a character with these 6 elements: appearance [X], personality [X], backstory [X], goal [X], flaw [X]. Generate a unique catchphrase for them.",
      },
    },
    {
      id: "t13",
      title: "Flaws Make Characters Real",
      emoji: "💔",
      tip: "A character without a flaw is boring. Their flaw should create problems that make the story exciting — and their growth is how they overcome it.",
      example: {
        bad: "A brilliant inventor who is good at everything",
        good: "A brilliant inventor who trusts machines more than people — which means she always tries to solve problems alone even when she desperately needs help.",
      },
    },
    {
      id: "t14",
      title: "Opposite Characters Create Chemistry",
      emoji: "⚡",
      tip: "Put two characters with opposite personalities together. Their differences create natural tension AND make them a better team than either alone.",
      example: {
        bad: "Two best friends who always agree",
        good: "An impulsive risk-taker and a careful planner — they clash constantly, but together one comes up with ideas and the other makes them actually work.",
      },
    },
    {
      id: "t15",
      title: "Show, Don't Tell",
      emoji: "🎬",
      tip: "Instead of saying 'she was brave', ask AI to write a SCENE that shows her being brave. Actions reveal character far better than labels.",
      example: {
        bad: "She was very brave and kind.",
        good: "Write a 3-sentence scene that shows (without saying it) that she is brave and kind through her actions.",
      },
    },
  ],

  // ────────────────────────────────────────
  // OUTPUT PROJECT
  // ────────────────────────────────────────
  output: {
    type: "character-portfolio",
    title: "My Character Portfolio",
    description:
      "A professional-quality showcase of 3+ original characters — each with full profiles, relationships, and their first scenes. Built with AI using context, templates, and iteration.",
    activityIds: [
      "a2-1-explorer",
      "a2-3-beginner", "a2-3-explorer", "a2-3-pro",
      "a3-2-beginner", "a3-2-explorer", "a3-2-pro",
      "a4-1-beginner", "a4-1-explorer", "a4-1-pro",
      "a4-2-beginner", "a4-2-explorer",
      "a4-3-beginner", "a4-3-explorer", "a4-3-pro",
    ],
    minActivitiesRequired: 4,
    downloadable: true,
    shareable: true,
  },

  // ────────────────────────────────────────
  // BADGES
  // ────────────────────────────────────────
  badges: [
    {
      id: "badge-builder",
      name: "AI Builder",
      description: "Completed Stage 2 — you can give AI context and build reusable templates!",
      emoji: "🦊",
      condition: "stage-complete",
    },
    {
      id: "badge-first-character",
      name: "Character Creator",
      description: "Built your first full 6-element character profile.",
      emoji: "🧩",
      condition: "first-output",
    },
    {
      id: "badge-template-master",
      name: "Template Master",
      description: "Built and used 3+ original prompt templates.",
      emoji: "🔩",
      condition: "all-pro",
    },
    {
      id: "badge-streak-7",
      name: "7-Day Streak",
      description: "Came back to build for 7 days in a row!",
      emoji: "🔥",
      condition: "streak-7",
    },
  ],

  // Total XP: 10 lessons × avg 29xp + 20 activities × avg 60xp ≈ 1,490 XP
  totalXP: 1490,
}
