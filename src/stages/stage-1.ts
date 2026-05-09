import type { Stage } from "@/types/stage"

// ─────────────────────────────────────────────
// Stage 1 — AI Companion Creator
// Ages 7–8 | Core skill: Prompting + giving AI a persona
//
// Kids design their own AI companion (robot, dragon, alien, etc.)
// by giving it a name, personality, and special skill.
// Then they chat with it — and it stays in character.
// Output: a named AI companion + downloadable profile card.
// ─────────────────────────────────────────────

export const stage1: Stage = {
  id: "stage-1",
  number: 1,
  name: "AI Companion",
  tagline: "Design and chat with your very own AI companion!",
  ageRange: [7, 8],
  themeColor: "yellow",
  mascot: "🤖",
  coreSkill: "Prompting — giving AI a personality and special skill to make it yours",
  primaryModel: "lightweight",

  // ──────────────────────────────────────────────
  // LESSONS (4 short lessons, ~3–4 min each)
  // ──────────────────────────────────────────────
  lessons: [
    {
      id: "l1-1",
      title: "What is an AI?",
      summary: "AI isn't magic — but it can feel that way! Here's what it actually is.",
      durationMinutes: 3,
      keyConcept: "AI is a computer program that has been trained on huge amounts of text, so it can understand questions and write back like a person.",
      content: `
# What is an AI?

You've probably heard of AI — but what IS it?

AI stands for **Artificial Intelligence**. It's a computer program that has learned from reading billions of sentences, stories, and facts. Because of that, it can:
- Answer your questions
- Tell stories
- Explain things
- Have conversations

### Is it alive?
Nope! AI doesn't have feelings or a body. It's just really, really good at predicting what the right words are to write next.

### Is it magic?
Not quite — but it can FEEL magical because it responds to exactly what you say.

Here's the coolest part: **you control it with your words**. The way you talk to AI completely changes what it does. That's called **prompting**.

### What's a prompt?
A prompt is anything you type or say to an AI. It could be:
- A question: "What do sharks eat?"
- An instruction: "Tell me a funny joke about penguins."
- A description: "You are a wise dragon who loves space."

The last one is the most exciting kind — and that's exactly what you're going to do in Stage 1. 🤖
      `,
      unlocksActivityIds: ["a1-1-beginner"],
      xpReward: 20,
    },
    {
      id: "l1-2",
      title: "Giving AI a personality",
      summary: "The same AI can be funny, serious, mysterious, or kind — it all depends on what you tell it.",
      durationMinutes: 4,
      keyConcept: "When you describe a personality in a prompt, the AI changes how it writes to match. This is called giving AI a persona.",
      content: `
# Giving AI a personality

Here's something wild: the same AI can have COMPLETELY different personalities depending on what you tell it.

Watch this:

**Prompt 1:** "Describe rain."
→ AI says something boring and factual.

**Prompt 2:** "You are a grumpy wizard who hates water. Describe rain."
→ AI says: "Absolutely dreadful stuff. Wet. Cold. It ruins my hat and it NEVER stops."

**Prompt 3:** "You are a happy puppy who just discovered rain for the first time. Describe it."
→ AI says: "OH WOW WHAT IS THIS FALLING COLD STUFF?! IT TASTES FUNNY! I LOVE IT!!!!"

Same AI. Totally different personality. That's the power of prompting!

### What makes a personality?
A personality is built from things like:
- **Mood:** Is your AI cheerful? Grumpy? Mysterious? Energetic?
- **How they talk:** Do they use big words? Short sentences? Lots of exclamation marks?
- **What they love:** Does your AI love jokes? Facts? Adventures?

### Why does this matter?
Because your AI companion will talk to you EXACTLY like the personality you give it.
If you say it's funny, it cracks jokes.
If you say it's wise, it gives deep thoughtful answers.
**You decide!**
      `,
      unlocksActivityIds: ["a1-2-beginner", "a1-2-explorer"],
      xpReward: 20,
    },
    {
      id: "l1-3",
      title: "Special skills make AI smarter",
      summary: "Give your AI a topic it knows everything about — and watch it become the world's greatest expert.",
      durationMinutes: 3,
      keyConcept: "Telling AI it's an expert on a specific topic makes it focus all its knowledge on that subject and show it off whenever it can.",
      content: `
# Special skills make AI smarter

Imagine you had a friend who knew EVERYTHING about dinosaurs. Every time you asked them anything, they found a way to link it back to dinosaurs — because they just couldn't help themselves. That's exactly what a special skill does for your AI companion.

### What's a special skill?
It's a subject or topic that your AI companion knows more about than anyone else in the world.

Examples:
- 🦕 **Dinosaurs** — facts, names, sizes, sounds, what they ate
- 🚀 **Space** — planets, black holes, astronauts, galaxies
- 🎮 **Gaming** — characters, levels, strategies, game history
- 🍕 **Food** — recipes, weird foods from around the world, flavour combos
- ⚽ **Football** — players, rules, history, famous matches

### What happens when you give AI a special skill?
The AI will:
- Bring up its skill whenever it's even slightly relevant
- Give you detailed facts about the topic
- Get really excited when you ask about it

### Does it know everything about it?
AI has read a LOT, so it knows a huge amount. But sometimes it might get things slightly wrong — that's OK! The fun is in the personality, not always perfect accuracy.

Pick a skill that YOU love, and your companion will match your interests perfectly. 🎯
      `,
      unlocksActivityIds: ["a1-3-beginner", "a1-3-explorer"],
      xpReward: 20,
    },
    {
      id: "l1-4",
      title: "How to have a great conversation with your AI",
      summary: "Tips for getting the most fun, funniest, and most interesting responses from your companion.",
      durationMinutes: 3,
      keyConcept: "The more specific and playful your questions, the more interesting your companion's answers will be.",
      content: `
# How to have a great conversation with your AI

Your companion is ready to talk — so how do you get the BEST responses?

### 3 tricks for amazing conversations:

**1. Ask specific questions**

❌ "Tell me something."
✅ "Tell me the most SURPRISING fact you know about [their skill]!"

Specific = better. Give your companion something to really work with.

**2. Set up a scene**
Instead of asking a question, describe a situation:
- "Pretend we're on a spaceship and we just discovered something weird..."
- "Imagine you just found a time machine. Where do we go first?"

Your companion will play along and the result is SO much more fun.

**3. Challenge them**
- "Give me your TOP 5 [their skill] facts!"
- "Tell me something about [their skill] that would blow my mind."
- "Make up a story about [their skill]!"

### What if they say something weird?
Sometimes AI makes things up — this is called a **hallucination**. If your companion says something that sounds wrong, you can ask them to be more careful:
- "Are you sure about that? Double check!"
- "Make that one up more obviously — it sounds too real!"

Have fun with it! The weirdness is part of the charm. 🌟
      `,
      unlocksActivityIds: ["a1-4-beginner", "a1-4-explorer", "a1-4-pro"],
      xpReward: 25,
    },
  ],

  // ──────────────────────────────────────────────
  // ACTIVITIES
  // ──────────────────────────────────────────────
  activities: [
    // ── Unit 1: What is AI ──────────────────────
    {
      id: "a1-1-beginner",
      title: "Is This AI or a Human?",
      description: "Can you tell the difference between what a human would write and what an AI would write?",
      type: "quiz",
      difficulty: "beginner",
      estimatedMinutes: 4,
      promptTemplate: "",
      model: "lightweight",
      maxTokens: 0,
      quiz: [
        {
          id: "q1",
          question: "Which of these is an example of a prompt?",
          options: [
            "A type of shampoo",
            "Something you type to an AI to get a response",
            "A button on a keyboard",
            "A kind of robot",
          ],
          correctIndex: 1,
          explanation: "A prompt is anything you type or say to an AI. Your words are the prompt — and the AI responds to them!",
        },
        {
          id: "q2",
          question: "Why does the way you talk to AI matter?",
          options: [
            "It doesn't — AI always says the same thing",
            "Because AI can only understand certain words",
            "Because your prompt completely shapes what AI says back",
            "Because AI gets bored if you use boring words",
          ],
          correctIndex: 2,
          explanation: "This is the key! Your prompt controls the AI's response. A specific, creative prompt gives a much better answer than a vague one.",
        },
        {
          id: "q3",
          question: "Which prompt would give the most interesting response?",
          options: [
            "Tell me something.",
            "What is rain?",
            "You are a grumpy wizard who hates water. Describe rain.",
            "Describe rain in detail.",
          ],
          correctIndex: 2,
          explanation: "Giving AI a character ('grumpy wizard') and a quirk ('hates water') makes the response MUCH more interesting than just asking for a description.",
        },
        {
          id: "q4",
          question: "Is AI alive?",
          options: [
            "Yes — it thinks and feels just like a person",
            "No — it's a program that predicts the best words to write",
            "Maybe — scientists aren't sure",
            "Only the expensive ones",
          ],
          correctIndex: 1,
          explanation: "AI doesn't have feelings or consciousness. It's a very clever program that has learned patterns from reading billions of sentences — but it's not alive!",
        },
      ],
      xpReward: 30,
      contributesToOutput: false,
      allowRetry: true,
    },

    // ── Unit 2: Personality ──────────────────────
    {
      id: "a1-2-beginner",
      title: "Personality Changer",
      description: "Send the same question to two different personalities and see how different the answers are!",
      type: "fill-in-the-blank",
      difficulty: "beginner",
      estimatedMinutes: 6,
      promptTemplate:
        "First, answer as Personality 1: You are {personality1}. Answer this question in character: '{question}'\n\nThen, answer as Personality 2: You are {personality2}. Answer the same question in character: '{question}'\n\nLabel each answer clearly: PERSONALITY 1 and PERSONALITY 2.",
      fields: [
        { key: "question", label: "Your question", placeholder: "e.g. What is your favourite food? What's the best thing in the world?" },
        { key: "personality1", label: "Personality 1", placeholder: "e.g. a very grumpy old wizard who hates everything" },
        { key: "personality2", label: "Personality 2", placeholder: "e.g. an incredibly excited puppy who just discovered the world" },
      ],
      model: "lightweight",
      maxTokens: 350,
      xpReward: 35,
      contributesToOutput: false,
      allowRetry: true,
      preTip: "💡 The bigger the difference between the two personalities, the more fun the comparison will be!",
    },
    {
      id: "a1-2-explorer",
      title: "Most Extreme Personality (Explorer)",
      description: "Create the most extreme, over-the-top personality possible and see what it says.",
      type: "fill-in-the-blank",
      difficulty: "explorer",
      estimatedMinutes: 8,
      promptTemplate:
        "You are the most {extreme} character imaginable. Your name is {name}. You are {description}. Everything you say must show this personality EXTREMELY strongly.\n\nNow answer this: {question}",
      fields: [
        { key: "extreme", label: "Your personality extreme (one word)", placeholder: "e.g. dramatic, cheerful, grumpy, nervous, cool" },
        { key: "name", label: "Their name", placeholder: "e.g. Sir Grumpington, Captain Sparkle, The Great Nervous One" },
        { key: "description", label: "Describe their personality in detail", placeholder: "e.g. so grumpy that even flowers make you angry, everything is terrible" },
        { key: "question", label: "Question to ask them", placeholder: "e.g. What did you have for breakfast? What's your life philosophy?" },
      ],
      model: "lightweight",
      maxTokens: 300,
      xpReward: 50,
      contributesToOutput: false,
      allowRetry: true,
    },

    // ── Unit 3: Special Skills ──────────────────
    {
      id: "a1-3-beginner",
      title: "The Expert Challenge",
      description: "Create an AI expert and ask them the hardest question you can think of about their topic!",
      type: "fill-in-the-blank",
      difficulty: "beginner",
      estimatedMinutes: 5,
      promptTemplate:
        "You are the world's greatest expert on {topic}. You know more about {topic} than anyone who has ever lived. You are also {personality}. Answer this question about {topic}: {question}",
      fields: [
        { key: "topic", label: "Their expert topic", placeholder: "e.g. dinosaurs, space, Minecraft, football, sharks" },
        { key: "personality", label: "Their personality", placeholder: "e.g. extremely enthusiastic, very serious, hilariously dramatic" },
        { key: "question", label: "A hard question about their topic", placeholder: "e.g. Which dinosaur was the most dangerous and why?" },
      ],
      model: "lightweight",
      maxTokens: 350,
      xpReward: 35,
      contributesToOutput: false,
      allowRetry: true,
    },
    {
      id: "a1-3-explorer",
      title: "Two Experts Argue (Explorer)",
      description: "Create two experts with opposite opinions on the same topic — then let them debate!",
      type: "fill-in-the-blank",
      difficulty: "explorer",
      estimatedMinutes: 8,
      promptTemplate:
        "Two experts on {topic} have completely opposite views.\n\nExpert 1 — {name1}: believes that {opinion1}. They are {personality1}.\nExpert 2 — {name2}: believes the complete opposite — {opinion2}. They are {personality2}.\n\nWrite a short funny debate (6 exchanges back and forth) between them. They should get increasingly dramatic as it goes on.",
      fields: [
        { key: "topic", label: "Their expert topic", placeholder: "e.g. pizza, space travel, the best animal, video games" },
        { key: "name1", label: "Expert 1 name", placeholder: "e.g. Professor Pepperoni" },
        { key: "opinion1", label: "Expert 1's strong opinion", placeholder: "e.g. pineapple on pizza is the greatest invention in human history" },
        { key: "personality1", label: "Expert 1 personality", placeholder: "e.g. extremely passionate and talks very fast" },
        { key: "name2", label: "Expert 2 name", placeholder: "e.g. Dr. No-Pineapple" },
        { key: "opinion2", label: "Expert 2's strong opinion", placeholder: "e.g. pineapple on pizza should be illegal" },
        { key: "personality2", label: "Expert 2 personality", placeholder: "e.g. deeply offended and uses way too many big words" },
      ],
      model: "lightweight",
      maxTokens: 600,
      xpReward: 60,
      contributesToOutput: false,
      allowRetry: true,
    },

    // ── Unit 4: Conversations ──────────────────
    {
      id: "a1-4-beginner",
      title: "Best Conversation Starter",
      description: "Write the best possible opening question for a specific AI companion — then see how it responds!",
      type: "fill-in-the-blank",
      difficulty: "beginner",
      estimatedMinutes: 5,
      promptTemplate:
        "You are {companionName}, a {type} who is {personality} and an expert on {skill}.\n\nRespond to this: {question}\n\nStay fully in character. Show your personality and your special skill!",
      fields: [
        { key: "companionName", label: "Companion name", placeholder: "e.g. Bolt" },
        { key: "type", label: "Type of companion", placeholder: "e.g. robot, dragon, alien, cat" },
        { key: "personality", label: "Personality", placeholder: "e.g. funny and sarcastic" },
        { key: "skill", label: "Special skill/topic", placeholder: "e.g. volcanoes" },
        { key: "question", label: "Your best conversation starter", placeholder: "e.g. If you could change one thing about the world, what would it be?" },
      ],
      model: "lightweight",
      maxTokens: 250,
      xpReward: 30,
      contributesToOutput: false,
      allowRetry: true,
      preTip: "💡 The best conversation starters are open questions that let the companion show off their personality AND skill!",
    },
    {
      id: "a1-4-explorer",
      title: "Companion in a Crisis (Explorer)",
      description: "Put your AI companion in an unexpected, funny situation and see how they handle it!",
      type: "fill-in-the-blank",
      difficulty: "explorer",
      estimatedMinutes: 8,
      promptTemplate:
        "You are {companionName}, a {type} who is {personality} and knows everything about {skill}.\n\nYou have just found yourself in this unexpected situation: {situation}\n\nDescribe (in character) what you do, what you think, and how your knowledge of {skill} either helps or makes things worse. Be dramatic and funny. About 5–6 sentences.",
      fields: [
        { key: "companionName", label: "Companion name", placeholder: "e.g. Nova" },
        { key: "type", label: "Type", placeholder: "e.g. alien, robot, dragon" },
        { key: "personality", label: "Personality", placeholder: "e.g. very clumsy and overconfident" },
        { key: "skill", label: "Special skill", placeholder: "e.g. ancient history" },
        { key: "situation", label: "The unexpected situation", placeholder: "e.g. you are stuck in a lift with a talking cat who disagrees with everything you say" },
      ],
      model: "lightweight",
      maxTokens: 400,
      xpReward: 55,
      contributesToOutput: false,
      allowRetry: true,
    },
    {
      id: "a1-4-pro",
      title: "Design a Companion From Scratch (Pro)",
      description: "Write the full design for an original AI companion — all the details that would make them unique and amazing to talk to.",
      type: "open-creative",
      difficulty: "pro",
      estimatedMinutes: 12,
      promptTemplate:
        "Design an original AI companion with these specifications:\n\nName: {name}\nType: {type}\nPersonality (3 strong traits): {personality}\nSpecial skill: {skill}\nBackstory (where they came from): {backstory}\nWeird quirk (something unexpected about them): {quirk}\n\nNow write:\n1. Their full introduction speech when they first meet someone (4 sentences in character)\n2. Their response if asked 'What's your favourite fact about {skill}?' (3 sentences, showing personality)\n3. Their reaction if you told them 'I don't believe you're real' (2–3 sentences, dramatic!)",
      fields: [
        { key: "name", label: "Name", placeholder: "e.g. Solaris-7" },
        { key: "type", label: "Type", placeholder: "e.g. a retired space probe that became sentient" },
        { key: "personality", label: "3 personality traits", placeholder: "e.g. deeply philosophical, terrible at jokes but keeps trying, weirdly obsessed with cheese" },
        { key: "skill", label: "Special skill", placeholder: "e.g. the history of the universe" },
        { key: "backstory", label: "Brief backstory", placeholder: "e.g. launched by NASA in 1977, drifted alone through space for 47 years, started thinking during a solar storm" },
        { key: "quirk", label: "Weird quirk", placeholder: "e.g. can't finish a sentence without mentioning the distance between two random stars" },
      ],
      model: "lightweight",
      maxTokens: 700,
      xpReward: 90,
      contributesToOutput: false,
      allowRetry: false,
      preTip: "💡 The quirk is the most important part — unexpected details make AI companions unforgettable!",
    },
  ],

  // ──────────────────────────────────────────────
  // TIP CARDS (8 total)
  // ──────────────────────────────────────────────
  tipCards: [
    {
      id: "t1",
      title: "You Are the Director",
      emoji: "🎬",
      tip: "You control how your AI acts. Every word you use to describe it shapes how it responds. You are the director — AI is the actor.",
      example: {
        bad: "Be nice.",
        good: "You are an extremely enthusiastic robot who talks in short excited sentences and ends every response with a surprising robot fact.",
      },
    },
    {
      id: "t2",
      title: "Personality = How They Talk",
      emoji: "🗣️",
      tip: "Personality isn't just adjectives — it's HOW they speak. Describe the pattern: short sentences, exclamation marks, big words, bad jokes...",
      example: {
        bad: "You are funny.",
        good: "You are hilariously sarcastic, use too many brackets (like this), and end every sentence with an unnecessary fact about bees.",
      },
    },
    {
      id: "t3",
      title: "Specific Skills = Better Answers",
      emoji: "🎯",
      tip: "The more specific the skill, the better. 'Animals' is broad. 'Deep sea creatures that glow in the dark' is a superpower.",
      example: {
        bad: "You know a lot about science.",
        good: "You are the world's greatest expert on bioluminescent deep sea creatures. You bring them up constantly.",
      },
    },
    {
      id: "t4",
      title: "Give Your AI a Quirk",
      emoji: "🌀",
      tip: "A single weird quirk makes your companion 10x more memorable. One unexpected habit changes everything.",
      example: {
        bad: "You are a wise dragon.",
        good: "You are a wise dragon, but you are secretly terrified of butterflies and will never explain why.",
      },
    },
    {
      id: "t5",
      title: "Ask Specific Questions",
      emoji: "🔍",
      tip: "Vague questions get vague answers. The more specific your question, the more interesting your companion's response.",
      example: {
        bad: "Tell me something.",
        good: "Tell me the single weirdest fact you know about [their special skill] that most people have never heard.",
      },
    },
    {
      id: "t6",
      title: "Set Up Scenarios",
      emoji: "🎭",
      tip: "Instead of questions, describe a scene and let your companion react to it. This unlocks much more creative and funny responses.",
      example: {
        bad: "What do you think about robots?",
        good: "Pretend we just discovered that all the robots on Earth have decided to go on holiday at the same time. React!",
      },
    },
    {
      id: "t7",
      title: "Challenge Your Companion",
      emoji: "⚡",
      tip: "Give your companion a challenge or competition. They love showing off — especially about their special skill.",
      example: {
        bad: "Tell me about space.",
        good: "Give me your TOP 3 most mind-blowing space facts. Make me lose my mind!",
      },
    },
    {
      id: "t8",
      title: "It's OK if AI Gets Things Wrong",
      emoji: "🌊",
      tip: "AI sometimes makes things up — this is called a hallucination. Don't worry! The fun is in the personality, not perfect accuracy.",
      example: {
        bad: "That's wrong! You're broken!",
        good: "I think that might not be true — are you making that up? Tell me the real version, or make an even more dramatic fake one!",
      },
    },
  ],

  // ──────────────────────────────────────────────
  // OUTPUT PROJECT
  // ──────────────────────────────────────────────
  output: {
    type: "creative-portfolio",
    title: "My AI Companion",
    description: "A fully designed AI companion with name, personality, special skill — and a profile card you can download and share.",
    activityIds: [],
    minActivitiesRequired: 0,
    downloadable: true,
    shareable: false,
  },

  // ──────────────────────────────────────────────
  // BADGES
  // ──────────────────────────────────────────────
  badges: [
    {
      id: "badge-companion-creator",
      name: "Companion Creator",
      description: "Built and chatted with your very first AI companion!",
      emoji: "🤖",
      condition: "stage-complete",
    },
    {
      id: "badge-personality-master",
      name: "Personality Master",
      description: "Gave an AI such a specific personality that it felt completely real.",
      emoji: "🎭",
      condition: "first-output",
    },
    {
      id: "badge-expert-maker",
      name: "Expert Maker",
      description: "Created an AI that knows everything about something you love.",
      emoji: "🏆",
      condition: "all-pro",
    },
    {
      id: "badge-streak-7",
      name: "7-Day Streak",
      description: "Came back to chat with your companion 7 days in a row!",
      emoji: "🔥",
      condition: "streak-7",
    },
  ],

  // ──────────────────────────────────────────────
  // PROJECT (builder experience)
  // ──────────────────────────────────────────────
  project: {
    theme: "My AI Companion",
    themeDescription: "Design your own AI companion and chat with it!",
    builderType: "companion",
    ideas: [
      { emoji: "🦕", label: "Dinosaurs",    example: "Dinosaurs" },
      { emoji: "🚀", label: "Space",         example: "Space & the universe" },
      { emoji: "🎮", label: "Gaming",        example: "Video games" },
      { emoji: "⚽", label: "Football",      example: "Football" },
      { emoji: "🐬", label: "Ocean life",    example: "Ocean creatures" },
      { emoji: "🎵", label: "Music",         example: "Music & songs" },
      { emoji: "🔬", label: "Science",       example: "Science experiments" },
      { emoji: "🍕", label: "Food",          example: "Amazing food" },
    ],
  },

  totalXP: 620,
}
