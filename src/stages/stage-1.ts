import type { Stage } from "@/types/stage"

// ─────────────────────────────────────────────
// Stage 1 — AI Explorers
// Ages 7–8 | Core skill: What is a prompt?
//
// DESIGN PHILOSOPHY:
//   Every concept is taught → quizzed → applied.
//   Activities build toward a personal Adventure Story Book.
//   Kids don't just USE AI — they understand WHY it works.
//
// STRUCTURE:
//   3 Units × 3 Lessons = 9 lessons
//   Activities: quiz after each concept + build activities
//   Output: "My Adventure Story Book" (personal, 3 chapters)
// ─────────────────────────────────────────────

export const stage1: Stage = {
  id: "stage-1",
  number: 1,
  name: "AI Explorers",
  tagline: "Learn what AI is, how to talk to it, and build your own story!",
  ageRange: [7, 8],
  themeColor: "yellow",
  mascot: "🦁",
  coreSkill: "Understanding prompts: WHO + WHAT + WHERE + details",
  primaryModel: "lightweight",

  // ────────────────────────────────────────
  // LESSONS — Concept first, then quiz, then apply
  // ────────────────────────────────────────
  lessons: [

    // ── UNIT 1: Hello AI! ────────────────────────────────────────────────────

    {
      id: "l1-1",
      title: "What is AI?",
      summary: "AI is a super-smart helper — but it needs YOUR instructions.",
      durationMinutes: 3,
      keyConcept: "AI learned from millions of books and stories. It helps YOU — but YOU are the creative one.",
      content: `
# What is AI?

**AI** stands for **Artificial Intelligence**.

Think of it like a **super-smart helper** who:
- Read every book in a gigantic library 📚
- Learned from millions of stories, pictures, and facts
- Can write stories, answer questions, and spark ideas instantly

But here is the important thing — **AI can't think for itself**.

It's like a **paintbrush**. A paintbrush can't make a painting alone. YOU have to pick it up and decide what to paint. AI is your paintbrush — YOU are the artist! 🎨

**What AI CAN do:**
✅ Write stories when you describe what you want
✅ Answer questions clearly
✅ Help you come up with new ideas

**What AI CANNOT do:**
❌ Read your mind — you have to tell it!
❌ Know what YOU like unless you explain it
❌ Make good things from bad instructions
      `,
      unlocksActivityIds: ["a1-1-beginner", "a1-1-explorer", "a1-1-pro"],
      xpReward: 20,
    },

    {
      id: "l1-2",
      title: "What is a Prompt?",
      summary: "A prompt is the message you send to AI — it's your superpower.",
      durationMinutes: 3,
      keyConcept: "The better your prompt, the better AI's answer. You control the quality!",
      content: `
# What is a Prompt?

A **prompt** is the message you type to AI.

It's like giving instructions to a friend:

> 🙂 You say: "Draw me something."
> 😕 Your friend: "...what? A circle? A house? A dragon?"

> 🙂 You say: "Draw me a purple dragon flying over a rainbow."
> 😀 Your friend: "Oh! I know exactly what to make!"

The **clearer your prompt**, the better AI can help you.

A bad prompt gives a boring or wrong answer.
A great prompt gives something amazing!

**The secret:** YOU control how good the answer is.
Every time you write a prompt, you are practising a skill that the world's best engineers use every single day. 🚀
      `,
      unlocksActivityIds: ["a1-2-beginner", "a1-2-explorer", "a1-2-pro"],
      xpReward: 20,
    },

    {
      id: "l1-3",
      title: "Your First Prompt",
      summary: "Time to send your very first message to AI and see what happens!",
      durationMinutes: 4,
      keyConcept: "Try it! Write a prompt, see the result, then ask: could I make this even better?",
      content: `
# Your First Prompt

Now you know what AI is and what a prompt is — time to try it!

When you write your first prompt, keep it simple:
- Think about something YOU love (an animal, a sport, a place)
- Tell AI what you want it to write
- Press generate and see what happens!

After you read the result, ask yourself:
1. Did AI understand what I wanted? 🤔
2. Is there anything I wish it included?
3. What one word could I change to make it better?

These three questions are what REAL AI engineers ask every time. Now you're thinking like one! 🧠
      `,
      unlocksActivityIds: ["a1-3-beginner", "a1-3-explorer", "a1-3-pro"],
      xpReward: 20,
    },

    // ── UNIT 2: The Magic Formula ────────────────────────────────────────────

    {
      id: "l2-1",
      title: "WHO is in your story?",
      summary: "Great prompts always start with a clear WHO — the main character.",
      durationMinutes: 3,
      keyConcept: "Describe your character clearly. The more detail, the more alive they become!",
      content: `
# WHO is in your story?

Every great story needs a **character** — the WHO.

Compare these two:

❌ "Write a story about a dog."
✅ "Write a story about a tiny golden puppy named Biscuit who is afraid of puddles."

Which one sounds more interesting? The second one, right! 🐾

That's because it tells AI:
- **What** kind of dog (tiny, golden, puppy)
- **Their name** (Biscuit — now they feel real!)
- **Something special** about them (afraid of puddles — that's a great story idea!)

**Your turn to think:**
Who is YOUR character going to be in your Adventure Story Book?
It could be:
- Your favourite animal 🦊
- A made-up creature 🐉
- A superhero version of you! 🦸
      `,
      unlocksActivityIds: ["a2-1-beginner", "a2-1-explorer", "a2-1-pro"],
      xpReward: 25,
    },

    {
      id: "l2-2",
      title: "WHAT happens?",
      summary: "The action makes your story exciting — what does your character DO?",
      durationMinutes: 3,
      keyConcept: "Tell AI exactly what happens. Action + feeling = great story!",
      content: `
# WHAT happens?

Once you have your WHO, you need the **WHAT** — the action!

Compare:

❌ "Write about a lion."
✅ "Write about a brave lion who discovers a hidden waterfall deep in the jungle."

The WHAT turns a character into a **story**. Without it, AI doesn't know what to write!

**Action words that make great stories:**
- discovers something secret 🗺️
- tries to do something hard 💪
- helps a friend in trouble 🤝
- goes on an adventure to find ___
- learns something surprising 💡

**Feeling words that make it emotional:**
- nervous but brave
- curious and excited
- confused but determined

Combine action + feeling and you have a story worth reading!
      `,
      unlocksActivityIds: ["a2-2-beginner", "a2-2-explorer", "a2-2-pro"],
      xpReward: 25,
    },

    {
      id: "l2-3",
      title: "WHERE does it happen?",
      summary: "The setting brings your story to life. WHERE takes you somewhere new!",
      durationMinutes: 3,
      keyConcept: "A great WHERE makes readers feel like they're actually there.",
      content: `
# WHERE does it happen?

The **WHERE** is the setting — the world your character lives in.

Compare:

❌ "A dog goes on an adventure."
✅ "A dog goes on an adventure through a snowy forest where the trees glow blue at night."

That second one made you picture something, didn't it? 🌲❄️✨

That's the power of WHERE!

**Amazing WHERE ideas for 7-year-olds:**
- A jungle where the animals can talk 🌿
- An underwater city made of coral 🐠
- A candy mountain where it snows chocolate chips 🍫
- Outer space, but Earth is visible below 🌍
- Your school — but at midnight, when it comes alive! 🏫

**Put it all together:**
WHO + WHAT + WHERE = a prompt that gives AI everything it needs!

"Write a story about [WHO] who [WHAT] in [WHERE]."

That's the Magic Formula! 🪄
      `,
      unlocksActivityIds: ["a2-3-beginner", "a2-3-explorer", "a2-3-pro"],
      xpReward: 25,
    },

    // ── UNIT 3: Make It Yours ────────────────────────────────────────────────

    {
      id: "l3-1",
      title: "Details make it special",
      summary: "The more you tell AI, the more personal and amazing the result.",
      durationMinutes: 3,
      keyConcept: "Small details make the difference between a generic story and YOUR story.",
      content: `
# Details make it special

Here's a secret: AI writes the same generic story for a million kids who type "write a story about a lion."

But YOUR story can be totally unique — if you add details that are special to YOU.

Compare:
❌ "Write a story about a lion who goes on an adventure."
✅ "Write a funny story about a lion named Leo who loves football but has never scored a goal. He goes on an adventure to find the legendary Golden Boot. Make it exciting but not scary — I'm 7 years old."

The second prompt tells AI:
- The character's name and personality (loves football)
- A specific goal (score a goal, find the Golden Boot)
- The tone (funny, exciting, not scary)
- Who is reading it (you, age 7!)

**Tip:** Include your age in prompts! AI will make the words easier or harder to match you perfectly.
      `,
      unlocksActivityIds: ["a3-1-beginner", "a3-1-explorer", "a3-1-pro"],
      xpReward: 30,
    },

    {
      id: "l3-2",
      title: "Say what you DON'T want",
      summary: "Telling AI what to avoid is just as powerful as telling it what you want.",
      durationMinutes: 3,
      keyConcept: "Use 'don't include' to guide AI away from things you don't like.",
      content: `
# Say what you DON'T want

Did you know you can tell AI what NOT to do?

If you got a story that was too scary, or too long, or included something you didn't like — you can fix it with your next prompt!

**Examples:**

❌ "Write a ghost story." → AI might make it really scary!
✅ "Write a ghost story — but make the ghost friendly and funny. Don't make it scary or dark."

❌ "Write a long story." → You might get 10 pages!
✅ "Write a short story, just 3 paragraphs."

❌ AI includes a sad ending → You didn't want that!
✅ "Write a story with a happy ending where everyone is okay."

**The words to use:**
- "Don't include..."
- "Avoid..."
- "Keep it [short/simple/funny]..."
- "Make sure it's not..."

You're now controlling TWO things — what you want AND what you don't. That's double the power! 💪
      `,
      unlocksActivityIds: ["a3-2-beginner", "a3-2-explorer", "a3-2-pro"],
      xpReward: 30,
    },

    {
      id: "l3-3",
      title: "Try it again, better!",
      summary: "Real engineers always improve their prompts. One change at a time.",
      durationMinutes: 4,
      keyConcept: "Change one thing, see what changes. That's how the best AI users work.",
      content: `
# Try it again, better!

Here's what the best AI engineers in the world do:

1. Write a prompt
2. Read the result
3. Think: what's missing? what could be better?
4. Change ONE thing
5. Try again!

This is called **iteration** — and it's the most important skill in all of AI.

**How to iterate like a pro:**

Got a story but it was too boring? → Add more action to your prompt.
Got a story but the character felt flat? → Add more detail about WHO they are.
Got a story but the ending was sad? → Add "end with a happy, exciting moment."
Got a story but it was too long? → Add "keep it to 2 paragraphs."

**The rule:** Only change ONE thing at a time.

Why? Because if you change everything, you won't know what made it better!

Scientists do this. Engineers do this. Now YOU do this. 🔬
      `,
      unlocksActivityIds: ["a3-3-beginner", "a3-3-explorer", "a3-3-pro"],
      xpReward: 30,
    },
  ],

  // ────────────────────────────────────────
  // ACTIVITIES
  // Each concept: quiz first → then apply → build story
  // Beginner = most guided | Explorer = moderate | Pro = open challenge
  // ────────────────────────────────────────
  activities: [

    // ═══════════════════════════════════════
    // UNIT 1 — Hello AI!
    // ═══════════════════════════════════════

    // 1-1: What is AI? → Quiz
    {
      id: "a1-1-beginner",
      title: "What is AI? — Quick Quiz",
      description: "Test what you just learned about AI before you start using it.",
      type: "quiz",
      difficulty: "beginner",
      estimatedMinutes: 4,
      promptTemplate: "",
      model: "lightweight",
      maxTokens: 0,
      quiz: [
        {
          id: "q1",
          question: "What does AI stand for?",
          options: ["Amazing Intelligence", "Artificial Intelligence", "Animal Instinct", "Awesome Internet"],
          correctIndex: 1,
          explanation: "AI stands for Artificial Intelligence — a computer program that learned from millions of books and pictures to be helpful!",
        },
        {
          id: "q2",
          question: "AI can read your mind and know what you want without you typing anything. True or false?",
          options: ["True — AI is magic!", "False — you have to tell AI what you want"],
          correctIndex: 1,
          explanation: "False! AI cannot read your mind. You have to write a clear message (called a prompt) to tell AI exactly what you want.",
        },
        {
          id: "q3",
          question: "AI is like a paintbrush. What does that mean?",
          options: [
            "AI paints pictures for you",
            "AI can only do art",
            "AI is a tool — YOU are the creative one who decides what to make",
            "AI is colourful",
          ],
          correctIndex: 2,
          explanation: "Just like a paintbrush needs an artist to hold it, AI needs YOU to give it ideas and instructions. You're the creative one!",
        },
        {
          id: "q4",
          question: "Which of these can AI actually do?",
          options: [
            "Think of ideas completely by itself with no help",
            "Write a story when you describe what you want",
            "Know your favourite colour without being told",
            "Do your homework without you asking",
          ],
          correctIndex: 1,
          explanation: "AI can write stories, answer questions, and give ideas — but only when YOU tell it what you want. Always start with a good prompt!",
        },
      ],
      xpReward: 40,
      contributesToOutput: false,
      allowRetry: true,
      preTip: "💡 Read each question carefully — some are tricky! Take your time.",
    },

    {
      id: "a1-1-explorer",
      title: "AI vs Human — Spot the Difference",
      description: "Quiz: can you tell what AI can do vs what only humans can do?",
      type: "quiz",
      difficulty: "explorer",
      estimatedMinutes: 5,
      promptTemplate: "",
      model: "lightweight",
      maxTokens: 0,
      quiz: [
        {
          id: "q1",
          question: "Which of these is something only a HUMAN can do — not AI?",
          options: [
            "Write a poem about the ocean",
            "Answer questions about history",
            "Actually FEEL excited or happy",
            "Explain how rainbows form",
          ],
          correctIndex: 2,
          explanation: "AI can write poems and answer questions, but it doesn't actually FEEL emotions. It uses patterns from human writing to sound emotional — but the real feelings are all yours!",
        },
        {
          id: "q2",
          question: "Your friend says 'AI does all the creative work and you just press a button.' Are they right?",
          options: [
            "Yes — AI does everything",
            "No — you write the prompt that shapes everything AI creates",
            "Sort of — AI does 90% and you do 10%",
            "It depends on the day",
          ],
          correctIndex: 1,
          explanation: "You're the creative director! Your prompt shapes everything. Two kids with the same tool but different prompts will get completely different results.",
        },
        {
          id: "q3",
          question: "AI learned by reading millions of books. What does this mean for you?",
          options: [
            "AI knows everything and is always right",
            "You can ask AI about almost anything — but always check important facts",
            "AI will only write about books",
            "You have to teach AI yourself",
          ],
          correctIndex: 1,
          explanation: "AI learned from lots of sources so it's very knowledgeable — but it can still make mistakes. Always double-check facts that really matter!",
        },
        {
          id: "q4",
          question: "What's the most important skill when working with AI?",
          options: [
            "Typing really fast",
            "Knowing how to code",
            "Writing clear, detailed prompts",
            "Having the latest computer",
          ],
          correctIndex: 2,
          explanation: "Clear, detailed prompts are the #1 skill. You don't need to code or have a fancy computer — just learn to describe what you want really well!",
        },
      ],
      xpReward: 50,
      contributesToOutput: false,
      allowRetry: true,
    },

    {
      id: "a1-1-pro",
      title: "AI Ethics — Think Deeply",
      description: "Harder quiz: think about how AI should and shouldn't be used.",
      type: "quiz",
      difficulty: "pro",
      estimatedMinutes: 6,
      promptTemplate: "",
      model: "lightweight",
      maxTokens: 0,
      quiz: [
        {
          id: "q1",
          question: "If AI writes your school essay for you and you say it's your own work — what's the problem?",
          options: [
            "No problem — AI is just a tool",
            "It's dishonest and you miss the chance to actually learn",
            "The problem is AI might get the answer wrong",
            "There is no problem if the essay is good",
          ],
          correctIndex: 1,
          explanation: "Using AI to pretend you did work yourself is dishonest. More importantly, you miss actually learning! AI is best used to HELP you learn, not replace your thinking.",
        },
        {
          id: "q2",
          question: "AI says a fact confidently. Should you always believe it?",
          options: [
            "Yes — AI read millions of books so it knows everything",
            "No — AI can make mistakes, especially on specific facts and recent events",
            "Only believe it if the answer is short",
            "Yes, but only if you asked nicely",
          ],
          correctIndex: 1,
          explanation: "AI can 'hallucinate' — meaning it sounds confident but gets things wrong sometimes. Always check important facts in a book or trusted website!",
        },
        {
          id: "q3",
          question: "You use AI to write a mean message about someone. Who is responsible?",
          options: [
            "AI — it wrote the words",
            "Nobody — it's just a computer",
            "You — you chose to create and send it",
            "The person who made AI",
          ],
          correctIndex: 2,
          explanation: "You are responsible for what you create with AI. The tool doesn't choose what to make — you do. Always use AI kindly and responsibly.",
        },
        {
          id: "q4",
          question: "What's the BEST way to describe AI to a friend who has never heard of it?",
          options: [
            "A magic robot that knows everything",
            "A helpful tool that follows your instructions to create and answer things",
            "A computer that thinks and feels like a human",
            "A search engine that also talks back",
          ],
          correctIndex: 1,
          explanation: "AI is a powerful tool that follows instructions — not magic, not a thinking human, not just search. It creates and answers based on your prompts!",
        },
      ],
      xpReward: 60,
      contributesToOutput: false,
      allowRetry: true,
    },

    // 1-2: What is a Prompt? → Apply it
    {
      id: "a1-2-beginner",
      title: "Good Prompt vs Bad Prompt",
      description: "Quiz: can you spot which prompts are clear and which are too vague?",
      type: "quiz",
      difficulty: "beginner",
      estimatedMinutes: 4,
      promptTemplate: "",
      model: "lightweight",
      maxTokens: 0,
      quiz: [
        {
          id: "q1",
          question: "Which is a better prompt for getting a fun story?",
          options: [
            "Write something.",
            "Write a funny short story about a penguin who is terrified of ice cream.",
          ],
          correctIndex: 1,
          explanation: "The second prompt tells AI exactly what to write (funny story), who is in it (a penguin), and something specific about them (terrified of ice cream). AI knows exactly what to do!",
        },
        {
          id: "q2",
          question: "You type 'Write a story' and get a boring result. What went wrong?",
          options: [
            "AI is broken",
            "Your prompt was too vague — AI didn't know enough to make it exciting",
            "Stories are always boring",
            "You need a better computer",
          ],
          correctIndex: 1,
          explanation: "Your prompt was too vague! When you give AI a tiny instruction, it makes a tiny, generic result. More detail in → more amazing out!",
        },
        {
          id: "q3",
          question: "What does a prompt do?",
          options: [
            "It turns AI off and on",
            "It tells AI exactly what you want it to create or answer",
            "It saves your work automatically",
            "It makes AI faster",
          ],
          correctIndex: 1,
          explanation: "A prompt is your message to AI. It tells AI what to create, how to write it, and what to include. It's the most important part of working with AI!",
        },
        {
          id: "q4",
          question: "Your prompt is long and detailed. Is that good or bad?",
          options: [
            "Bad — shorter is always better",
            "Good — more detail usually means a better result",
            "It doesn't matter at all",
            "Bad — AI gets confused by long prompts",
          ],
          correctIndex: 1,
          explanation: "Usually good! A detailed prompt gives AI more to work with. Of course it still needs to make sense — but detailed and clear almost always beats short and vague.",
        },
      ],
      xpReward: 40,
      contributesToOutput: false,
      allowRetry: true,
      preTip: "💡 Think about what makes instructions clear vs confusing — like telling someone how to draw something without showing them!",
    },

    {
      id: "a1-2-explorer",
      title: "Fix the Prompt",
      description: "Each prompt below is bad. Can you identify WHY it won't work well?",
      type: "quiz",
      difficulty: "explorer",
      estimatedMinutes: 5,
      promptTemplate: "",
      model: "lightweight",
      maxTokens: 0,
      quiz: [
        {
          id: "q1",
          question: "'Write something cool.' What's wrong with this prompt?",
          options: [
            "It uses the word 'cool'",
            "It's too vague — AI doesn't know what type of thing to write or what 'cool' means to you",
            "It's too short in length",
            "Nothing is wrong with it",
          ],
          correctIndex: 1,
          explanation: "'Cool' means different things to different people! AI needs specific details: what TYPE of thing? Who is it for? What makes it cool to YOU?",
        },
        {
          id: "q2",
          question: "'Write me a really really really long amazing story about everything.' What's the problem?",
          options: [
            "It used the word 'really' too many times",
            "It asks for 'everything' — AI doesn't know what to focus on, and 'really long' isn't a specific length",
            "Stories can't be long",
            "No problem — this is a great prompt",
          ],
          correctIndex: 1,
          explanation: "Too broad and too vague! 'Everything' gives AI nothing to focus on. Try picking ONE clear topic. And instead of 'really long', try 'about 3 paragraphs'.",
        },
        {
          id: "q3",
          question: "Which improvement would help the most? Starting prompt: 'Write a poem.'",
          options: [
            "Write a REALLY good poem.",
            "Write a rhyming poem about my cat Pepper who knocks things off tables for fun, for a 7-year-old.",
            "Write me a poem please.",
            "Can you write a poem? Thanks!",
          ],
          correctIndex: 1,
          explanation: "Adding specifics (rhyming, about my cat Pepper, what she does, who it's for) tells AI exactly what to create. Saying 'please' is nice but doesn't change the output!",
        },
        {
          id: "q4",
          question: "You want a story but not a scary one. What should you add to your prompt?",
          options: [
            "Nothing — AI will know it's for a kid",
            "Write it for me",
            "Make sure it's not scary, keep it fun and friendly",
            "Add more exclamation marks!!!",
          ],
          correctIndex: 2,
          explanation: "Tell AI what to avoid! 'Not scary, keep it fun and friendly' gives AI clear boundaries. You can always say what you DON'T want — it's just as useful as saying what you do want.",
        },
      ],
      xpReward: 50,
      contributesToOutput: false,
      allowRetry: true,
    },

    {
      id: "a1-2-pro",
      title: "Rank the Prompts",
      description: "Put these prompts in order from weakest to strongest — and explain why.",
      type: "quiz",
      difficulty: "pro",
      estimatedMinutes: 6,
      promptTemplate: "",
      model: "lightweight",
      maxTokens: 0,
      quiz: [
        {
          id: "q1",
          question: "Which is the STRONGEST prompt for a birthday card?",
          options: [
            "Write a birthday card.",
            "Write a birthday card for my gran.",
            "Write a funny birthday card for my gran who loves cats and gardening. Keep it warm and not too long. I'm 8 years old.",
            "Birthday card please!",
          ],
          correctIndex: 2,
          explanation: "The third prompt wins! It has a clear purpose (birthday card), who it's for (gran), what she loves (cats, gardening), tone (funny, warm), length (not too long), and who it's for (8-year-old). Every detail helps!",
        },
        {
          id: "q2",
          question: "A prompt says 'Make it better.' What's the problem?",
          options: [
            "AI doesn't understand English",
            "AI has no idea what 'it' is or what 'better' means to you — you need to be specific",
            "Prompts can't use the word 'better'",
            "It's too short to work",
          ],
          correctIndex: 1,
          explanation: "'It' is unclear (what is 'it'?) and 'better' means nothing without specifics. Say exactly WHAT to improve and HOW. E.g. 'Make the ending more exciting and add a plot twist.'",
        },
        {
          id: "q3",
          question: "You wrote a great prompt and got a great result. Now you want to change the tone from funny to serious. What's the BEST thing to do?",
          options: [
            "Delete everything and start again from scratch",
            "Keep your whole prompt but change only the tone instruction from 'funny' to 'serious and thoughtful'",
            "Type 'make it serious' and nothing else",
            "Ask AI to 'fix it'",
          ],
          correctIndex: 1,
          explanation: "Change ONE thing at a time! If you keep everything else the same and just change the tone, you can see exactly what that one change does. This is how real engineers improve their prompts.",
        },
        {
          id: "q4",
          question: "What makes a prompt truly excellent?",
          options: [
            "It's very long",
            "It uses fancy words",
            "It's clear, specific, tells AI who it's for, what to create, how it should sound, and what to avoid",
            "It ends with 'please'",
          ],
          correctIndex: 2,
          explanation: "An excellent prompt covers: WHAT to create, WHO it's for, HOW it should sound (tone), and WHAT to avoid. Length doesn't matter as much as clarity and completeness.",
        },
      ],
      xpReward: 60,
      contributesToOutput: false,
      allowRetry: true,
    },

    // 1-3: First prompt — apply
    {
      id: "a1-3-beginner",
      title: "Send Your Very First Prompt!",
      description: "Use what you've learned — write your first real AI prompt and see the result!",
      type: "fill-in-the-blank",
      difficulty: "beginner",
      estimatedMinutes: 6,
      promptTemplate:
        "Write a short, fun story (3 paragraphs) for a 7-year-old about {animal}. " +
        "The story should be {mood} and happen in {place}. " +
        "Make the language simple and exciting!",
      fields: [
        { key: "animal", label: "My favourite animal", placeholder: "e.g. a lion, a dolphin, a red panda", hint: "Think of an animal you really love!" },
        { key: "mood", label: "The mood of the story", placeholder: "e.g. funny, exciting, magical, adventurous", hint: "How do you want to feel when you read it?" },
        { key: "place", label: "Where it happens", placeholder: "e.g. a rainforest, outer space, an underwater city", hint: "Pick somewhere interesting — or make up your own!" },
      ],
      model: "lightweight",
      maxTokens: 400,
      xpReward: 50,
      contributesToOutput: true,
      allowRetry: true,
      preTip: "💡 You're using the WHO (your animal) + WHERE (your place) formula already! After you read the result, ask yourself: what could I change to make it even better?",
    },

    {
      id: "a1-3-explorer",
      title: "First Prompt — Add the Details!",
      description: "Write a more detailed first prompt, including what you DON'T want.",
      type: "fill-in-the-blank",
      difficulty: "explorer",
      estimatedMinutes: 8,
      promptTemplate:
        "Write a short story (3 paragraphs) about {character}. " +
        "The story should be {mood} and take place in {setting}. " +
        "Include this: {mustInclude}. " +
        "Do NOT include: {mustExclude}. " +
        "I am 8 years old — use words I can understand easily.",
      fields: [
        { key: "character", label: "Who is in the story?", placeholder: "e.g. a tiny fox named Ruby who loves climbing trees", hint: "Give your character a name and one special thing about them!" },
        { key: "mood", label: "Mood / feeling", placeholder: "e.g. exciting and adventurous, funny and silly", hint: "How should the reader feel?" },
        { key: "setting", label: "Where does it happen?", placeholder: "e.g. a jungle where animals talk at midnight", hint: "Make your WHERE interesting and specific!" },
        { key: "mustInclude", label: "One thing that MUST be in the story", placeholder: "e.g. a hidden treasure, a magic door, a surprise friend", hint: "This is YOUR special touch that makes it unique!" },
        { key: "mustExclude", label: "One thing to keep OUT", placeholder: "e.g. scary moments, sad endings, violence", hint: "Tell AI what you don't want — it's just as useful as what you do want!" },
      ],
      model: "lightweight",
      maxTokens: 500,
      xpReward: 65,
      contributesToOutput: true,
      allowRetry: true,
      preTip: "💡 You're using WHO + WHERE + details + don't-want all in one prompt. This is advanced prompting — well done for trying it!",
    },

    {
      id: "a1-3-pro",
      title: "First Prompt — Full Director Mode",
      description: "Write a complete, detailed prompt like a professional AI engineer would.",
      type: "fill-in-the-blank",
      difficulty: "pro",
      estimatedMinutes: 10,
      promptTemplate:
        "Write a story for me — I am {age} years old and I love {interests}.\n\n" +
        "CHARACTER: {character}\n" +
        "SETTING: {setting}\n" +
        "PLOT: {plot}\n" +
        "TONE: {tone}\n" +
        "MUST INCLUDE: {mustInclude}\n" +
        "DO NOT INCLUDE: {avoid}\n" +
        "LENGTH: {length}\n\n" +
        "Make it feel like it was written just for me.",
      fields: [
        { key: "age", label: "Your age", placeholder: "e.g. 7", hint: "AI will adjust the language to match!" },
        { key: "interests", label: "What you love (2-3 things)", placeholder: "e.g. football, animals, space", hint: "AI might weave these into the story!" },
        { key: "character", label: "Your main character (name + description)", placeholder: "e.g. Zara, a 7-year-old girl with purple boots who can talk to animals", hint: "The more detail, the more alive they feel!" },
        { key: "setting", label: "Setting (detailed)", placeholder: "e.g. A floating island above the clouds where it rains lemonade", hint: "Be creative — there are no rules!" },
        { key: "plot", label: "What happens? (the main event)", placeholder: "e.g. Zara discovers a hidden map that leads to a lost puppy sanctuary", hint: "Think: what problem does your character solve?" },
        { key: "tone", label: "Tone and style", placeholder: "e.g. exciting and funny, like a movie — with dialogue and action", hint: "Tone tells AI HOW to write, not just what to write!" },
        { key: "mustInclude", label: "Must include", placeholder: "e.g. a talking animal sidekick, a plot twist at the end", maxLength: 120 },
        { key: "avoid", label: "Must avoid", placeholder: "e.g. scary moments, long descriptions, sad endings", maxLength: 120 },
        { key: "length", label: "Length", placeholder: "e.g. 4 paragraphs, about 250 words", hint: "Being specific helps AI give you exactly the right amount!" },
      ],
      model: "lightweight",
      maxTokens: 600,
      xpReward: 80,
      contributesToOutput: true,
      allowRetry: true,
      preTip: "💡 You're thinking like a professional AI engineer. Every field is a tool — use them all to make something truly yours.",
    },

    // ═══════════════════════════════════════
    // UNIT 2 — The Magic Formula
    // ═══════════════════════════════════════

    // 2-1: WHO quiz + build
    {
      id: "a2-1-beginner",
      title: "WHO Quiz — Find the Character",
      description: "Can you spot the WHO in each prompt and tell if it's good or weak?",
      type: "quiz",
      difficulty: "beginner",
      estimatedMinutes: 4,
      promptTemplate: "",
      model: "lightweight",
      maxTokens: 0,
      quiz: [
        {
          id: "q1",
          question: "In the prompt 'Write about a brave little tortoise named Shelly who is afraid of heights', what is the WHO?",
          options: [
            "Brave",
            "A brave little tortoise named Shelly who is afraid of heights",
            "Heights",
            "Write",
          ],
          correctIndex: 1,
          explanation: "The WHO is your character: a brave little tortoise named Shelly who is afraid of heights. Notice how much more interesting that is than just 'a tortoise'!",
        },
        {
          id: "q2",
          question: "Which WHO gives AI the most to work with?",
          options: [
            "A cat.",
            "A cat named Mochi.",
            "Mochi, a fluffy ginger cat who loves stealing socks and hiding them under the sofa.",
            "An animal.",
          ],
          correctIndex: 2,
          explanation: "Mochi with the sock-stealing habit! The name, appearance, personality, and quirky habit all give AI a vivid, unique character to write about instead of a generic cat.",
        },
        {
          id: "q3",
          question: "Why does giving your character a NAME make the story better?",
          options: [
            "It doesn't — names don't matter",
            "Names make characters feel real and specific, not just 'a random animal'",
            "It makes the story longer",
            "AI needs names to function",
          ],
          correctIndex: 1,
          explanation: "'Mochi the cat' feels like a real character. 'A cat' feels like any cat. Names instantly make your WHO feel like someone we care about!",
        },
        {
          id: "q4",
          question: "You want to write about yourself as a superhero. What's the best WHO?",
          options: [
            "A kid.",
            "Me.",
            "A 7-year-old named [your name] who can turn invisible and loves football.",
            "A superhero.",
          ],
          correctIndex: 2,
          explanation: "The best WHO includes your age (so AI gets the language right), your name (it's YOUR story), your superpower, and something personal about you. That makes it special!",
        },
      ],
      xpReward: 40,
      contributesToOutput: false,
      allowRetry: true,
      preTip: "💡 After this quiz, you'll use what you learn to build YOUR story character!",
    },

    {
      id: "a2-1-explorer",
      title: "Build Your Story Character",
      description: "Design your main character for your Adventure Story Book — make them YOURS!",
      type: "fill-in-the-blank",
      difficulty: "explorer",
      estimatedMinutes: 7,
      promptTemplate:
        "Create a character description for a children's story character: " +
        "{name}, who is a {type} with {appearance}. " +
        "Their personality is {personality}. " +
        "Their special ability or quirk is {quirk}. " +
        "Write a vivid 2-paragraph character description that brings them to life for a 7-year-old reader. " +
        "Make it warm, fun, and exciting!",
      fields: [
        { key: "name", label: "Character name", placeholder: "e.g. Zara, Leo, Biscuit, Captain Fluff", hint: "Pick a name you love — this character is YOURS!" },
        { key: "type", label: "What kind of character?", placeholder: "e.g. a brave fox, a young wizard, a superhero version of me", hint: "Animal, human, creature — your choice!" },
        { key: "appearance", label: "What do they look like?", placeholder: "e.g. silver fur and bright green eyes, tiny wings that shimmer", hint: "Describe 2-3 things about how they look" },
        { key: "personality", label: "What are they like?", placeholder: "e.g. curious and funny but a little clumsy", hint: "A mix of good traits AND a flaw makes characters interesting!" },
        { key: "quirk", label: "Their special ability or funny habit", placeholder: "e.g. can talk to clouds, always hums when nervous, collects shiny objects", hint: "This is what makes them unique and memorable!" },
      ],
      model: "lightweight",
      maxTokens: 350,
      xpReward: 60,
      contributesToOutput: true,
      allowRetry: true,
      preTip: "💡 This character will be the hero of your Adventure Story Book! Spend time making them feel like YOUR character.",
    },

    {
      id: "a2-1-pro",
      title: "Character + Backstory",
      description: "Build a full character with backstory — the kind novelists write before starting a book.",
      type: "fill-in-the-blank",
      difficulty: "pro",
      estimatedMinutes: 10,
      promptTemplate:
        "Write a detailed character profile for: {name}.\n\n" +
        "Type: {type}\n" +
        "Appearance: {appearance}\n" +
        "Personality: {personality} — including one strength and one weakness\n" +
        "Special ability: {ability}\n" +
        "Backstory: {backstory}\n" +
        "What they want most: {want}\n" +
        "What they're afraid of: {fear}\n\n" +
        "Write this as a proper character bio, 3 paragraphs, as if introducing them at the start of a book. " +
        "Make the reader immediately care about this character. For a 7-8 year old audience.",
      fields: [
        { key: "name", label: "Character name", placeholder: "e.g. Zara the Quick" },
        { key: "type", label: "Type of character", placeholder: "e.g. a 7-year-old girl with magical powers" },
        { key: "appearance", label: "Appearance (3 details)", placeholder: "e.g. wild red hair, mismatched socks, carries a glowing compass" },
        { key: "personality", label: "Personality (strength + flaw)", placeholder: "e.g. incredibly brave but sometimes acts before thinking" },
        { key: "ability", label: "Special ability or skill", placeholder: "e.g. can understand any animal language" },
        { key: "backstory", label: "How they came to be here (brief)", placeholder: "e.g. found a mysterious door in her wardrobe one rainy Tuesday", maxLength: 150 },
        { key: "want", label: "What do they want most?", placeholder: "e.g. to find her missing little brother" },
        { key: "fear", label: "What are they secretly afraid of?", placeholder: "e.g. the dark, failing her friends, forgetting who she is" },
      ],
      model: "lightweight",
      maxTokens: 500,
      xpReward: 80,
      contributesToOutput: true,
      allowRetry: true,
    },

    // 2-2: WHAT quiz + apply
    {
      id: "a2-2-beginner",
      title: "WHAT Quiz — The Action!",
      description: "Quiz: can you spot the action that makes a story exciting?",
      type: "quiz",
      difficulty: "beginner",
      estimatedMinutes: 4,
      promptTemplate: "",
      model: "lightweight",
      maxTokens: 0,
      quiz: [
        {
          id: "q1",
          question: "What does the WHAT in a prompt tell AI?",
          options: [
            "The name of the character",
            "Where the story happens",
            "What the character does — the action and event of the story",
            "How long the story is",
          ],
          correctIndex: 2,
          explanation: "WHAT = the action! It's what your character does, what happens to them, and what the story is about. Without WHAT, you just have a character standing around with nothing to do!",
        },
        {
          id: "q2",
          question: "Which prompt has the strongest WHAT?",
          options: [
            "Write about a rabbit.",
            "Write about a rabbit who does things.",
            "Write about a rabbit who discovers a secret underground city beneath her garden.",
            "Write about a rabbit in the garden.",
          ],
          correctIndex: 2,
          explanation: "'Discovers a secret underground city beneath her garden' is a vivid, specific action that instantly creates story possibilities. The others are too vague or don't have a real event!",
        },
        {
          id: "q3",
          question: "Adding a FEELING to your WHAT makes it better. Which is best?",
          options: [
            "A dog runs.",
            "A dog runs nervously through the forest, looking for his lost bone.",
            "A dog does something.",
            "A dog moves somewhere.",
          ],
          correctIndex: 1,
          explanation: "'Runs nervously' adds emotion! Feelings make characters relatable and make readers care about what happens. Action + feeling = great story!",
        },
        {
          id: "q4",
          question: "You have WHO (a brave lion named Leo) and you want to add WHAT. Which is best?",
          options: [
            "Leo does stuff.",
            "Leo goes somewhere.",
            "Leo discovers a hidden cave with a mysterious treasure map and has to decide whether to follow it alone.",
            "Leo is brave.",
          ],
          correctIndex: 2,
          explanation: "This WHAT has: an action (discovers), something specific (cave + treasure map), a decision (follow it alone?). It creates suspense and makes us want to read on!",
        },
      ],
      xpReward: 40,
      contributesToOutput: false,
      allowRetry: true,
    },

    {
      id: "a2-2-explorer",
      title: "Add the Action — Chapter 1!",
      description: "Use your character and give them an adventure. This is Chapter 1 of your Story Book!",
      type: "fill-in-the-blank",
      difficulty: "explorer",
      estimatedMinutes: 8,
      promptTemplate:
        "Write Chapter 1 of an adventure story for a 7-year-old.\n\n" +
        "Main character: {character}\n" +
        "What happens: {character} {action}\n" +
        "How they feel: {feeling}\n" +
        "End the chapter on a cliffhanger — something that makes the reader want to know what happens next!\n\n" +
        "Length: 3 paragraphs. Language: simple and exciting. Tone: {mood}.",
      fields: [
        { key: "character", label: "Your character (name + who they are)", placeholder: "e.g. Leo, a brave lion from the jungle", hint: "Use the character you built earlier, or create someone new!" },
        { key: "action", label: "What happens to them?", placeholder: "e.g. discovers a hidden door in the big tree by the waterfall", hint: "Pick something exciting — the start of a big adventure!" },
        { key: "feeling", label: "How do they feel?", placeholder: "e.g. scared but too curious to stop, excited and nervous", hint: "Feelings make characters real!" },
        { key: "mood", label: "Story mood", placeholder: "e.g. exciting, mysterious, funny, magical", hint: "How do you want the reader to feel?" },
      ],
      model: "lightweight",
      maxTokens: 450,
      xpReward: 65,
      contributesToOutput: true,
      allowRetry: true,
      preTip: "💡 This is Chapter 1 of YOUR Adventure Story Book! Make it something you'd actually want to read.",
    },

    {
      id: "a2-2-pro",
      title: "Chapter 1 — Full Story Setup",
      description: "Write a complete Chapter 1 with character, action, conflict, and a cliffhanger.",
      type: "fill-in-the-blank",
      difficulty: "pro",
      estimatedMinutes: 10,
      promptTemplate:
        "Write Chapter 1 of a children's adventure story.\n\n" +
        "Character: {character}\n" +
        "Opening scene (where we meet them): {openingScene}\n" +
        "The event that starts the adventure: {incitingEvent}\n" +
        "The problem or challenge they face: {problem}\n" +
        "Chapter ending: A cliffhanger that makes the reader desperate to read Chapter 2.\n\n" +
        "Style: {style}\n" +
        "Length: 4 paragraphs\n" +
        "Audience: 7-8 year olds — make the words exciting but easy to follow.\n" +
        "Include some dialogue to make it feel alive.",
      fields: [
        { key: "character", label: "Main character (full description)", placeholder: "e.g. Maya, 8, tiny but fearless, has a pet cloud named Puff" },
        { key: "openingScene", label: "Opening scene — where do we first meet them?", placeholder: "e.g. Maya is sitting on her roof watching the sky when she spots something falling" },
        { key: "incitingEvent", label: "What starts the adventure?", placeholder: "e.g. a star crashes into her garden with a note attached that says 'HELP ME'" },
        { key: "problem", label: "The big problem to solve", placeholder: "e.g. the star is actually a young star-creature lost from its galaxy", maxLength: 150 },
        { key: "style", label: "Writing style", placeholder: "e.g. fast-paced like a movie, with short punchy sentences and some humour" },
      ],
      model: "lightweight",
      maxTokens: 600,
      xpReward: 80,
      contributesToOutput: true,
      allowRetry: true,
    },

    // 2-3: WHERE quiz + full formula
    {
      id: "a2-3-beginner",
      title: "WHERE Quiz — Set the Scene!",
      description: "Quiz: learn how a great setting makes your story feel like a real place.",
      type: "quiz",
      difficulty: "beginner",
      estimatedMinutes: 4,
      promptTemplate: "",
      model: "lightweight",
      maxTokens: 0,
      quiz: [
        {
          id: "q1",
          question: "What does WHERE do for your story?",
          options: [
            "Nothing — stories don't need a setting",
            "Creates the world your character lives in — makes readers feel like they're actually there",
            "Just tells AI which country to set it in",
            "Makes the story longer",
          ],
          correctIndex: 1,
          explanation: "WHERE = the setting! A great setting is like a movie set — it creates the atmosphere, mood, and world that your character lives in. It makes readers feel transported!",
        },
        {
          id: "q2",
          question: "Which WHERE is most interesting?",
          options: [
            "A forest.",
            "Outside.",
            "A forest where the trees glow purple at night and whisper secrets to anyone brave enough to listen.",
            "In nature.",
          ],
          correctIndex: 2,
          explanation: "The glowing purple trees that whisper secrets instantly creates atmosphere! It makes us curious, sets a magical mood, and gives the story a unique world. Details in WHERE = magic!",
        },
        {
          id: "q3",
          question: "WHO + WHAT + WHERE together is called the Magic Formula. Which prompt uses it best?",
          options: [
            "Write a story.",
            "A fox goes on an adventure in the woods.",
            "Write a story about Finn, a curious young fox (WHO), who discovers a hidden map to a treasure (WHAT), deep in an enchanted forest where the seasons change in a single day (WHERE).",
            "Write something cool about a fox in a forest.",
          ],
          correctIndex: 2,
          explanation: "Perfect! WHO (Finn, curious young fox) + WHAT (discovers a hidden map to treasure) + WHERE (enchanted forest where seasons change in a day). All three ingredients working together!",
        },
        {
          id: "q4",
          question: "You want to set your story at your school — but make it magical. Which WHERE is best?",
          options: [
            "At school.",
            "In a building.",
            "At Hillside School — but at midnight, when the books come alive and the corridors fill with fog.",
            "Somewhere familiar.",
          ],
          correctIndex: 2,
          explanation: "Starting with something familiar (your school) and adding a magical twist (midnight, living books, fog) is a great technique! It makes the reader feel safe and excited at the same time.",
        },
      ],
      xpReward: 40,
      contributesToOutput: false,
      allowRetry: true,
    },

    {
      id: "a2-3-explorer",
      title: "Chapter 2 — Into the Adventure!",
      description: "Use the full WHO + WHAT + WHERE formula to write Chapter 2 of your Story Book.",
      type: "fill-in-the-blank",
      difficulty: "explorer",
      estimatedMinutes: 8,
      promptTemplate:
        "Write Chapter 2 of a children's adventure story for a 7-year-old.\n\n" +
        "WHO: {who}\n" +
        "WHAT happens in this chapter: {what}\n" +
        "WHERE does this chapter take place: {where}\n" +
        "New character or challenge introduced: {newElement}\n" +
        "How this chapter ends: {ending}\n\n" +
        "Length: 3 paragraphs. Keep it exciting! Include at least one moment where the main character has to make a choice.",
      fields: [
        { key: "who", label: "WHO — your main character", placeholder: "e.g. Leo, the brave lion from Chapter 1", hint: "Use your character from Chapter 1!" },
        { key: "what", label: "WHAT — what happens in Chapter 2?", placeholder: "e.g. Leo follows the map and reaches the entrance to an underground cave", hint: "Build on the cliffhanger from Chapter 1!" },
        { key: "where", label: "WHERE — the setting for this chapter", placeholder: "e.g. a dark cave that glows with strange blue crystals", hint: "Make it feel like a NEW place — different from Chapter 1!" },
        { key: "newElement", label: "A new character or challenge", placeholder: "e.g. a small dragon who claims to be the guardian of the cave", hint: "Every great Chapter 2 introduces something new!" },
        { key: "ending", label: "How does Chapter 2 end?", placeholder: "e.g. Leo discovers the treasure — but it's not what he expected at all...", hint: "Surprise the reader! Or leave another cliffhanger!" },
      ],
      model: "lightweight",
      maxTokens: 450,
      xpReward: 65,
      contributesToOutput: true,
      allowRetry: true,
      preTip: "💡 You're using the full Magic Formula now — WHO + WHAT + WHERE all in one prompt. This is how real authors plan their chapters!",
    },

    {
      id: "a2-3-pro",
      title: "Chapter 2 — Advanced Storytelling",
      description: "Write Chapter 2 with a plot twist, character growth, and vivid setting details.",
      type: "fill-in-the-blank",
      difficulty: "pro",
      estimatedMinutes: 10,
      promptTemplate:
        "Write Chapter 2 of a children's adventure story.\n\n" +
        "Continuing from: {summary}\n" +
        "WHO: {who}\n" +
        "New setting (WHERE): {where} — describe it with 3 vivid sensory details (what they see, hear, and smell)\n" +
        "What happens (WHAT): {what}\n" +
        "Plot twist: {twist}\n" +
        "Character growth moment: {growth}\n" +
        "Tone: {tone}\n" +
        "Chapter ending: leave the reader wanting Chapter 3 desperately.\n\n" +
        "Length: 4 paragraphs. Include dialogue. Audience: 7-8 year olds.",
      fields: [
        { key: "summary", label: "Quick summary of Chapter 1", placeholder: "e.g. Leo the lion found a treasure map in a mysterious cave", maxLength: 150 },
        { key: "who", label: "Main character (with new detail from Chapter 1)", placeholder: "e.g. Leo, now carrying the treasure map and feeling braver than before" },
        { key: "where", label: "New setting for Chapter 2", placeholder: "e.g. the Crystal Forest, where the trees are made of ice and everything echoes" },
        { key: "what", label: "Main action of Chapter 2", placeholder: "e.g. Leo must cross a frozen lake while being watched by something in the shadows" },
        { key: "twist", label: "The plot twist (something unexpected!)", placeholder: "e.g. the 'treasure' on the map turns out to be a living creature that was stolen", maxLength: 150 },
        { key: "growth", label: "How does the character change or grow?", placeholder: "e.g. Leo learns that being brave doesn't mean not being scared — it means going anyway" },
        { key: "tone", label: "Tone and pacing", placeholder: "e.g. tense and exciting, with moments of humour to break the tension" },
      ],
      model: "lightweight",
      maxTokens: 600,
      xpReward: 80,
      contributesToOutput: true,
      allowRetry: true,
    },

    // ═══════════════════════════════════════
    // UNIT 3 — Make It Yours
    // ═══════════════════════════════════════

    // 3-1: Details quiz + apply
    {
      id: "a3-1-beginner",
      title: "Details Quiz — More = Better?",
      description: "Quiz: when do details help and when are they just noise?",
      type: "quiz",
      difficulty: "beginner",
      estimatedMinutes: 4,
      promptTemplate: "",
      model: "lightweight",
      maxTokens: 0,
      quiz: [
        {
          id: "q1",
          question: "Which detail would improve a story prompt about a lion the most?",
          options: [
            "It is Tuesday.",
            "The lion is named Leo and loves football but has never scored a goal.",
            "The lion exists.",
            "There is a lion somewhere.",
          ],
          correctIndex: 1,
          explanation: "A name (Leo), a passion (loves football), and a flaw (never scored a goal) give AI rich material to build a story around. The day of the week has no effect!",
        },
        {
          id: "q2",
          question: "You are writing a story for yourself. Should you tell AI your age?",
          options: [
            "No — AI automatically adjusts",
            "Yes — AI will make the words match your reading level",
            "Only if you're over 10",
            "It doesn't make any difference",
          ],
          correctIndex: 1,
          explanation: "Always tell AI your age! It adjusts the vocabulary, sentence length, and complexity to match you. A story for a 7-year-old is very different from one for a 14-year-old.",
        },
        {
          id: "q3",
          question: "Which is a detail that would actually make AI write a better story?",
          options: [
            "My favourite colour is green",
            "I am writing this at 3pm",
            "I love football and want the story to have football in it",
            "My keyboard has 104 keys",
          ],
          correctIndex: 2,
          explanation: "Telling AI what YOU love and asking it to include it makes the story feel personal! Your favourite colour or the time you wrote it have no effect on the story.",
        },
        {
          id: "q4",
          question: "True or false: Adding your real name to a story prompt can make it feel like it was written just for you.",
          options: [
            "True — AI can put your name in the story and make the character feel like you",
            "False — names don't help",
          ],
          correctIndex: 0,
          explanation: "True! Telling AI your name and asking it to include a character based on you is a brilliant trick. It instantly makes the story feel like it belongs to you!",
        },
      ],
      xpReward: 40,
      contributesToOutput: false,
      allowRetry: true,
    },

    {
      id: "a3-1-explorer",
      title: "Make It Personal — Your Details!",
      description: "Add YOUR real interests to your story and see how personal it gets.",
      type: "fill-in-the-blank",
      difficulty: "explorer",
      estimatedMinutes: 7,
      promptTemplate:
        "Write a short adventure scene (3 paragraphs) for a {age}-year-old who loves {interests}. " +
        "Include references to {interests} in the story naturally — weave them in, don't just list them. " +
        "Main character: {character}. " +
        "What happens: {action}. " +
        "Tone: {tone}. " +
        "Make it feel like this story was written JUST for {name}.",
      fields: [
        { key: "name", label: "Your name", placeholder: "e.g. Lily, Kai, Sam", hint: "The story will feel like it was written just for you!" },
        { key: "age", label: "Your age", placeholder: "e.g. 7", hint: "AI will match the words to your level!" },
        { key: "interests", label: "2-3 things you love", placeholder: "e.g. football, dinosaurs, and painting", hint: "These will appear naturally in your story!" },
        { key: "character", label: "Your character (can be you!)", placeholder: "e.g. a 7-year-old kid who can talk to animals", hint: "It can literally be you — or a superhero version!" },
        { key: "action", label: "What happens?", placeholder: "e.g. discovers a portal to a prehistoric world and has to find the way home", hint: "Build on your favourite things!" },
        { key: "tone", label: "Mood", placeholder: "e.g. exciting and funny, with a warm ending", hint: "How do you want to feel reading it?" },
      ],
      model: "lightweight",
      maxTokens: 450,
      xpReward: 60,
      contributesToOutput: true,
      allowRetry: true,
      preTip: "💡 This is the magic of good prompting — using YOUR real interests creates a story nobody else in the world would get!",
    },

    {
      id: "a3-1-pro",
      title: "Chapter 3 — The Finale!",
      description: "Write the final chapter of your Adventure Story Book — with a satisfying ending.",
      type: "fill-in-the-blank",
      difficulty: "pro",
      estimatedMinutes: 12,
      promptTemplate:
        "Write the final chapter of a children's adventure story.\n\n" +
        "Story so far: {storySoFar}\n" +
        "WHO: {character}\n" +
        "Final challenge: {challenge}\n" +
        "How they overcome it: {solution}\n" +
        "The ending: {ending}\n" +
        "What the character learned (the message): {lesson}\n" +
        "Include: a satisfying moment that references something from the beginning of the story.\n\n" +
        "Style: {style}\n" +
        "Length: 4 paragraphs. This is the emotional finale — make it feel big and earned!\n" +
        "Audience: 7-8 year olds.",
      fields: [
        { key: "storySoFar", label: "What happened in Chapters 1 and 2?", placeholder: "e.g. Leo found a treasure map, entered the Crystal Forest, and discovered the treasure was a lost creature", maxLength: 200 },
        { key: "character", label: "Your hero (what they've become by Chapter 3)", placeholder: "e.g. Leo, now braver and wiser than when he started" },
        { key: "challenge", label: "The final challenge", placeholder: "e.g. Leo must face the Shadow Beast who guards the exit from the Crystal Forest" },
        { key: "solution", label: "How do they overcome it?", placeholder: "e.g. not by fighting — but by showing the Shadow Beast kindness and understanding", hint: "The best solutions are clever or emotional, not just 'they fight and win'!" },
        { key: "ending", label: "How does it end?", placeholder: "e.g. Leo returns home with the creature and they become best friends forever", hint: "Give the reader the satisfying ending they deserve!" },
        { key: "lesson", label: "What does the character learn?", placeholder: "e.g. that courage isn't about being fearless — it's about doing the right thing even when you're scared" },
        { key: "style", label: "Writing style for the finale", placeholder: "e.g. emotional and warm, with a big exciting action moment followed by a quiet, heartfelt ending" },
      ],
      model: "lightweight",
      maxTokens: 600,
      xpReward: 90,
      contributesToOutput: true,
      allowRetry: true,
      preTip: "💡 This is YOUR finale — the ending of the story YOU built from scratch using everything you've learned about prompting. Make it amazing!",
    },

    // 3-2: Don't-want quiz + iterate
    {
      id: "a3-2-beginner",
      title: "DON'T WANT Quiz — Control the Output!",
      description: "Quiz: how do you tell AI what to leave OUT of your story?",
      type: "quiz",
      difficulty: "beginner",
      estimatedMinutes: 4,
      promptTemplate: "",
      model: "lightweight",
      maxTokens: 0,
      quiz: [
        {
          id: "q1",
          question: "You got a story but it was too scary. What should you add to your NEXT prompt?",
          options: [
            "Nothing — just try again",
            "Write it again",
            "'Make it not scary — keep it fun and friendly, no dark or frightening moments'",
            "Delete everything",
          ],
          correctIndex: 2,
          explanation: "Telling AI exactly what to avoid is just as powerful as telling it what you want! 'Not scary, fun and friendly, no dark moments' gives clear boundaries for the next attempt.",
        },
        {
          id: "q2",
          question: "Which prompt gives AI the clearest instructions about what to AVOID?",
          options: [
            "Don't make it bad.",
            "Avoid scary moments, sad endings, and violence. Keep it appropriate for a 7-year-old.",
            "Just make it okay.",
            "Don't do anything wrong.",
          ],
          correctIndex: 1,
          explanation: "Specific avoidances work best! 'Scary moments, sad endings, violence, appropriate for a 7-year-old' tells AI exactly what to steer clear of. 'Don't make it bad' tells AI nothing useful!",
        },
        {
          id: "q3",
          question: "You want a short story. How do you tell AI that?",
          options: [
            "Don't write too much.",
            "'Keep it to 2-3 short paragraphs — around 100 words.'",
            "Short please.",
            "Not long.",
          ],
          correctIndex: 1,
          explanation: "Be specific! '2-3 short paragraphs, around 100 words' gives AI a clear target. 'Short' means different things — to AI, even 500 words might feel short!",
        },
        {
          id: "q4",
          question: "You want a funny story. How do you make sure it STAYS funny and doesn't get serious?",
          options: [
            "Just ask for a funny story",
            "Ask for funny AND add 'keep it light-hearted throughout — avoid any sad or serious moments'",
            "Add lots of exclamation marks",
            "Hope for the best",
          ],
          correctIndex: 1,
          explanation: "Combining what you WANT (funny) with what to AVOID (sad, serious) gives AI both directions at once. It's like giving directions: go this way AND don't go that way!",
        },
      ],
      xpReward: 40,
      contributesToOutput: false,
      allowRetry: true,
    },

    {
      id: "a3-2-explorer",
      title: "Improve a Weak Prompt",
      description: "Take a weak prompt and rewrite it with details + what you don't want. See the difference!",
      type: "fill-in-the-blank",
      difficulty: "explorer",
      estimatedMinutes: 8,
      promptTemplate:
        "Here is a weak, vague prompt: '{weakPrompt}'\n\n" +
        "Now I'm going to improve it with proper prompting:\n\n" +
        "WHO: {who}\n" +
        "WHAT: {what}\n" +
        "WHERE: {where}\n" +
        "Tone and style: {tone}\n" +
        "Must include: {include}\n" +
        "Must NOT include: {exclude}\n" +
        "Audience: {audience}\n\n" +
        "Please use all of this to write a much better result than the weak prompt would have produced.",
      fields: [
        { key: "weakPrompt", label: "Start with a weak, vague prompt", placeholder: "e.g. Write a story. / Tell me something interesting. / Write about an animal.", hint: "The weaker the better — we're going to transform it!" },
        { key: "who", label: "WHO — your character with details", placeholder: "e.g. A 7-year-old girl named Isla who can speak to the wind" },
        { key: "what", label: "WHAT — what happens?", placeholder: "e.g. discovers that the wind has gone silent and she is the only one who can bring it back" },
        { key: "where", label: "WHERE — the setting", placeholder: "e.g. a seaside village where the sails on the boats have stopped moving" },
        { key: "tone", label: "Tone", placeholder: "e.g. mysterious but hopeful, with a magical feel" },
        { key: "include", label: "Must include", placeholder: "e.g. a moment of doubt where Isla almost gives up, then something inspires her" },
        { key: "exclude", label: "Must NOT include", placeholder: "e.g. scary moments, confusing words, sad ending" },
        { key: "audience", label: "Audience", placeholder: "e.g. a 7-year-old reader who loves adventure stories" },
      ],
      model: "lightweight",
      maxTokens: 500,
      xpReward: 65,
      contributesToOutput: false,
      allowRetry: true,
      preTip: "💡 You'll see EXACTLY why your improved prompt gives a better result than the weak one. This is the skill that changes everything!",
    },

    {
      id: "a3-2-pro",
      title: "Iteration Challenge",
      description: "Write a prompt, read the result, improve it, try again. Three rounds of iteration.",
      type: "fill-in-the-blank",
      difficulty: "pro",
      estimatedMinutes: 15,
      promptTemplate:
        "I want to practise improving prompts step by step.\n\n" +
        "My topic: {topic}\n\n" +
        "ROUND 1 — Write the story using this basic version: {round1Prompt}\n\n" +
        "Then improve it with these changes:\n" +
        "ROUND 2 additions: {round2Additions}\n" +
        "ROUND 3 additions: {round3Additions}\n\n" +
        "Write ROUND 3 as the final, most detailed version using all improvements combined.\n" +
        "Show me the best possible result from my most improved prompt.\n" +
        "Audience: 7-8 year old. Length: 3 paragraphs.",
      fields: [
        { key: "topic", label: "Your topic (something you love)", placeholder: "e.g. a dragon who can't breathe fire, a girl who discovers she can fly" },
        { key: "round1Prompt", label: "Round 1 — your basic prompt (keep it simple)", placeholder: "e.g. Write a story about a dragon who can't breathe fire", hint: "Start simple — we'll build from here!" },
        { key: "round2Additions", label: "Round 2 — what are you adding?", placeholder: "e.g. give the dragon a name (Ember), a specific personality (embarrassed but determined), and a setting (dragon school)", hint: "Add WHO details and WHERE" },
        { key: "round3Additions", label: "Round 3 — final improvements", placeholder: "e.g. add: a funny best friend, a moment of triumph at the end, no sad moments, tone should be funny and warm", hint: "Add tone, what to include, what to avoid, and any final touches" },
      ],
      model: "lightweight",
      maxTokens: 600,
      xpReward: 90,
      contributesToOutput: false,
      allowRetry: true,
      preTip: "💡 This activity shows the single most important skill in AI: iteration. Every great AI engineer does this — write, improve, write better.",
    },

    // 3-3: Iterate quiz + final
    {
      id: "a3-3-beginner",
      title: "Iteration Quiz — Try Again Better!",
      description: "Quiz: how do the best AI users keep improving their results?",
      type: "quiz",
      difficulty: "beginner",
      estimatedMinutes: 4,
      promptTemplate: "",
      model: "lightweight",
      maxTokens: 0,
      quiz: [
        {
          id: "q1",
          question: "What does 'iterate' mean when working with AI?",
          options: [
            "Delete everything and start from scratch every time",
            "Try, look at the result, improve ONE thing, try again",
            "Ask the same question over and over",
            "Add more words to your prompt randomly",
          ],
          correctIndex: 1,
          explanation: "Iteration means: try → read → improve ONE thing → try again. Real engineers, scientists, and artists all iterate. It's how you get from 'okay' to 'amazing'!",
        },
        {
          id: "q2",
          question: "Why should you change only ONE thing at a time when improving your prompt?",
          options: [
            "Because AI gets confused by big changes",
            "So you can see exactly what that one change did — otherwise you won't know what worked",
            "Because one change is faster",
            "There is no reason — change everything at once",
          ],
          correctIndex: 1,
          explanation: "If you change 5 things and the result is better, you don't know WHICH change helped! Change one thing → see what happens → now you know exactly what that change does.",
        },
        {
          id: "q3",
          question: "You got a story but the ending was boring. What's the best next step?",
          options: [
            "Give up and start a completely different story",
            "Keep your whole prompt but add: 'Make the ending surprising and exciting with a plot twist'",
            "Delete half your prompt and try again",
            "Ask someone else for help",
          ],
          correctIndex: 1,
          explanation: "If most of your story is good, don't throw it away! Keep your prompt and just fix the one thing that's wrong — the ending. That's efficient, smart iteration.",
        },
        {
          id: "q4",
          question: "After 3 rounds of iterating, your story is amazing. What did YOU do?",
          options: [
            "Nothing — AI did everything",
            "You used your creativity, knowledge, and prompting skills to guide AI to a great result",
            "You were lucky",
            "AI improved itself automatically",
          ],
          correctIndex: 1,
          explanation: "YOU guided the whole thing! Your creativity decided the story, your prompting skills shaped the result, and your iteration improved it. AI was just the tool. You're the creator!",
        },
      ],
      xpReward: 40,
      contributesToOutput: false,
      allowRetry: true,
    },

    {
      id: "a3-3-explorer",
      title: "Your Complete Adventure Story!",
      description: "Bring it all together — write the full summary of your Story Book with all 3 chapters.",
      type: "fill-in-the-blank",
      difficulty: "explorer",
      estimatedMinutes: 10,
      promptTemplate:
        "Write a complete 3-chapter children's adventure story for a 7-year-old.\n\n" +
        "Main character: {character}\n\n" +
        "Chapter 1 — {ch1Title}: {ch1Summary}\n" +
        "Chapter 2 — {ch2Title}: {ch2Summary}\n" +
        "Chapter 3 — {ch3Title}: {ch3Summary}\n\n" +
        "Story theme (what it's really about): {theme}\n" +
        "Tone throughout: {tone}\n\n" +
        "Write each chapter as 2-3 paragraphs. " +
        "Include a clear beginning, middle and end. " +
        "End with something that shows how the character grew through the adventure. " +
        "Audience: 7-year-old. Use exciting but easy-to-follow language.",
      fields: [
        { key: "character", label: "Your hero (name + who they are)", placeholder: "e.g. Leo, the brave but cautious young lion" },
        { key: "ch1Title", label: "Chapter 1 title", placeholder: "e.g. The Strange Map", hint: "Give it a name that makes you want to read it!" },
        { key: "ch1Summary", label: "What happens in Chapter 1?", placeholder: "e.g. Leo discovers a hidden treasure map in a mysterious cave near his home", hint: "Keep it to 1-2 sentences — AI will write the full version!" },
        { key: "ch2Title", label: "Chapter 2 title", placeholder: "e.g. Into the Crystal Forest" },
        { key: "ch2Summary", label: "What happens in Chapter 2?", placeholder: "e.g. Leo follows the map through a magical forest and meets a creature who needs his help", maxLength: 150 },
        { key: "ch3Title", label: "Chapter 3 title", placeholder: "e.g. The Bravest Moment" },
        { key: "ch3Summary", label: "What happens in Chapter 3?", placeholder: "e.g. Leo faces his biggest fear to save the creature, and discovers what real bravery means", maxLength: 150 },
        { key: "theme", label: "What is the story really about?", placeholder: "e.g. bravery, friendship, believing in yourself, being kind even when it's hard", hint: "Every great story has a deeper meaning — what is yours?" },
        { key: "tone", label: "Tone and style throughout", placeholder: "e.g. exciting and warm, with moments of humour and a heartfelt ending" },
      ],
      model: "lightweight",
      maxTokens: 800,
      xpReward: 100,
      contributesToOutput: true,
      allowRetry: true,
      preTip: "🏆 This is your FINAL project — the complete Adventure Story Book you've been building all stage. You directed every part of it using prompting skills. Be proud!",
    },

    {
      id: "a3-3-pro",
      title: "Story Book Cover & Dedication",
      description: "Every real book needs a cover blurb and a dedication. Write yours!",
      type: "fill-in-the-blank",
      difficulty: "pro",
      estimatedMinutes: 8,
      promptTemplate:
        "Write two things for a children's adventure story book:\n\n" +
        "1. BACK COVER BLURB (the exciting description you read before buying a book):\n" +
        "Book title: {title}\n" +
        "Main character: {character}\n" +
        "The big adventure: {adventure}\n" +
        "The hook (why should someone pick this book up?): {hook}\n" +
        "Write the blurb in 3 sentences. Make it gripping — end with a question that makes you desperate to read it.\n\n" +
        "2. DEDICATION PAGE (a short, personal dedication from the author — that's YOU!):\n" +
        "Dedicated to: {dedicatedTo}\n" +
        "Why: {why}\n" +
        "Write the dedication in 2-3 warm sentences, the way real authors write them.\n\n" +
        "Audience: this book is for 7-8 year olds. The author is {authorAge} years old.",
      fields: [
        { key: "title", label: "Your book title", placeholder: "e.g. Leo and the Crystal Forest, The Last Star, Zara's Secret Wings", hint: "Make it sound like something you'd see in a real bookshop!" },
        { key: "character", label: "Your main character", placeholder: "e.g. Leo, a young lion who discovers bravery" },
        { key: "adventure", label: "The big adventure (one exciting sentence)", placeholder: "e.g. discovering a treasure that turns out to be a living creature who needs to go home" },
        { key: "hook", label: "The hook — why read this book?", placeholder: "e.g. because bravery isn't about being fearless — it's about showing up even when you're terrified", hint: "This is the ONE reason a kid should pick your book up!" },
        { key: "dedicatedTo", label: "Who is your book dedicated to?", placeholder: "e.g. my mum, my best friend Ava, anyone who has ever been brave even when scared" },
        { key: "why", label: "Why?", placeholder: "e.g. for always believing I could do big things" },
        { key: "authorAge", label: "Your age (the author!)", placeholder: "e.g. 7" },
      ],
      model: "lightweight",
      maxTokens: 400,
      xpReward: 70,
      contributesToOutput: true,
      allowRetry: true,
      preTip: "🌟 Real authors write their dedications last — after finishing the whole book. You've finished yours. Now make it official!",
    },
  ],

  // ────────────────────────────────────────
  // TIP CARDS
  // ────────────────────────────────────────
  tipCards: [
    {
      id: "t1",
      title: "AI is a Tool, Not a Magician",
      emoji: "🪄",
      tip: "AI can do amazing things — but ONLY when you give it good instructions. The better your prompt, the better the result. YOU control the quality.",
      example: {
        bad: "Write me something.",
        good: "Write a funny 3-paragraph story about a penguin named Pablo who is terrified of snow, for a 7-year-old.",
      },
    },
    {
      id: "t2",
      title: "Always Include WHO",
      emoji: "🦁",
      tip: "Give your character a NAME and at least one personality detail. Named characters feel real — random characters feel forgettable.",
      example: {
        bad: "Write about a cat.",
        good: "Write about Mochi, a fluffy orange cat who steals socks and hides them under the sofa.",
      },
    },
    {
      id: "t3",
      title: "Always Include WHAT",
      emoji: "⚡",
      tip: "WHAT is the event or action — it turns a character into a story. Add a feeling word too: 'nervously', 'excitedly', 'with a pounding heart'.",
      example: {
        bad: "Write about a lion in the jungle.",
        good: "Write about a lion who nervously follows a treasure map deep into the jungle for the first time.",
      },
    },
    {
      id: "t4",
      title: "Always Include WHERE",
      emoji: "🗺️",
      tip: "WHERE is the setting — it creates the atmosphere. Add one magical or unusual detail to your WHERE and watch the story come alive.",
      example: {
        bad: "In a forest.",
        good: "In an ancient forest where the trees glow silver at night and whisper old secrets to anyone who listens.",
      },
    },
    {
      id: "t5",
      title: "Tell AI Your Age",
      emoji: "🧠",
      tip: "Always say 'I am 7 years old' or 'for a 7-year-old'. AI adjusts the words, sentence length, and complexity to match YOU perfectly.",
      example: {
        bad: "Write me a story.",
        good: "Write me a story — I am 7 years old. Use words I can understand easily.",
      },
    },
    {
      id: "t6",
      title: "Say What You DON'T Want",
      emoji: "🚫",
      tip: "Telling AI what to AVOID is just as powerful as telling it what you want. Use 'don't include', 'avoid', or 'keep it [not scary / not too long]'.",
      example: {
        bad: "Write a ghost story.",
        good: "Write a ghost story — but make the ghost friendly and funny. Don't make it scary or dark.",
      },
    },
    {
      id: "t7",
      title: "Add Feelings",
      emoji: "💛",
      tip: "Feelings make characters real. Add how your character feels — not just what they do. 'scared but determined' is always better than just 'brave'.",
      example: {
        bad: "A brave fox goes into the cave.",
        good: "A fox who is terrified but determined not to give up slowly steps into the dark cave.",
      },
    },
    {
      id: "t8",
      title: "Change ONE Thing at a Time",
      emoji: "🔬",
      tip: "When you improve your prompt, only change ONE thing. Then you'll know exactly what made it better. This is called iteration — and it's what real engineers do.",
      example: {
        bad: "Change everything at once and hope for the best.",
        good: "Keep your whole prompt but change just the ending: add 'end with a surprising plot twist'.",
      },
    },
    {
      id: "t9",
      title: "Give Specific Lengths",
      emoji: "📏",
      tip: "Instead of 'short' or 'long', say exactly what you mean: '3 paragraphs', 'about 150 words', '5 sentences'. AI will match it precisely.",
      example: {
        bad: "Write a short story.",
        good: "Write a story — exactly 3 paragraphs, each about 4-5 sentences.",
      },
    },
    {
      id: "t10",
      title: "Name Your Tone",
      emoji: "🎭",
      tip: "Tone tells AI HOW to write, not just what. 'Funny', 'mysterious', 'warm and cosy', 'exciting like a movie' — these single words transform the whole result.",
      example: {
        bad: "Write a story about dragons.",
        good: "Write a funny story about dragons — the kind that makes you laugh out loud.",
      },
    },
    {
      id: "t11",
      title: "Add Something Personal",
      emoji: "🌟",
      tip: "Tell AI things YOU love and ask it to weave them in. Your favourite animal, sport, or hobby can appear in ANY story — just ask!",
      example: {
        bad: "Write an adventure story.",
        good: "Write an adventure story — I love football and dinosaurs. Include both somehow!",
      },
    },
    {
      id: "t12",
      title: "Use the Magic Formula",
      emoji: "🪄",
      tip: "WHO + WHAT + WHERE = the foundation of every great prompt. If your prompt has all three AND feelings AND a tone, you're prompting like a pro.",
      example: {
        bad: "Write a story.",
        good: "WHO: a small hedgehog named Pip. WHAT: discovers she can see invisible things. WHERE: a park that comes alive at night. Tone: magical and warm.",
      },
    },
    {
      id: "t13",
      title: "Read It Like a Reviewer",
      emoji: "🔍",
      tip: "After you read AI's result, ask: Did it understand what I wanted? What's missing? What would make it better? These three questions will help you write a better next prompt.",
    },
    {
      id: "t14",
      title: "You Are the Creative One",
      emoji: "🎨",
      tip: "AI puts the words together — but YOUR ideas, YOUR characters, and YOUR story are what make it special. Two kids using the same AI get completely different results because of their prompts.",
    },
    {
      id: "t15",
      title: "Prompting is a Real Skill",
      emoji: "🚀",
      tip: "Prompt engineering is one of the most in-demand skills in the world right now. Every time you write a great prompt, you're practising something that real AI engineers do for their jobs. Take it seriously — and have fun!",
    },
  ],

  // ────────────────────────────────────────
  // OUTPUT PROJECT
  // ────────────────────────────────────────
  output: {
    type: "storybook",
    title: "My Adventure Story Book",
    description:
      "Your very own 3-chapter adventure story — built chapter by chapter using every prompting skill you learned. WHO, WHAT, WHERE, details, feelings, iteration. This story belongs to you because you designed every part of it.",
    activityIds: [
      "a1-3-beginner", "a1-3-explorer", "a1-3-pro",
      "a2-1-explorer", "a2-1-pro",
      "a2-2-explorer", "a2-2-pro",
      "a2-3-explorer", "a2-3-pro",
      "a3-1-explorer",
      "a3-1-pro",
      "a3-3-explorer", "a3-3-pro",
    ],
    minActivitiesRequired: 3,
    downloadable: true,
    shareable: true,
  },

  // ────────────────────────────────────────
  // BADGES
  // ────────────────────────────────────────
  badges: [
    {
      id: "first-prompt",
      name: "First Prompter",
      description: "You sent your very first prompt to AI — the journey begins!",
      emoji: "✨",
      condition: "first-output",
    },
    {
      id: "formula-master",
      name: "Formula Master",
      description: "Used WHO + WHAT + WHERE perfectly in a single prompt.",
      emoji: "🪄",
      condition: "stage-complete",
    },
    {
      id: "quiz-ace",
      name: "Quiz Ace",
      description: "Got full marks on every quiz in Stage 1.",
      emoji: "🧠",
      condition: "all-pro",
    },
    {
      id: "storyteller",
      name: "Storyteller",
      description: "Completed your Adventure Story Book — a real story built with real prompting skills.",
      emoji: "📖",
      condition: "stage-complete",
    },
  ],

  totalXP: 1820,
}
