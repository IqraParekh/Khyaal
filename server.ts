import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { VERIFIED_ISLAMIC_SOURCES } from './src/data/islamicGroundings';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '2mb' }));

// Initialize GoogleGenAI client (Server-Side)
const apiKey = process.env.GEMINI_API_KEY || '';
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Crisis Keywords Check for high risk safety
function detectCrisisKeywords(text: string): boolean {
  const normalized = text.toLowerCase();
  const crisisPatterns = [
    /\b(suicide|kill myself|want to die|end my life|take my own life)\b/,
    /\b(self[-\s]?harm|cut myself|hurting myself|hang myself)\b/,
    /\b(no reason to live|better off dead|can'?t go on living)\b/,
    /\b(overdose on pills|jumping off|ending it all)\b/
  ];
  return crisisPatterns.some((pattern) => pattern.test(normalized));
}

// Fallback reflection generator if API key is absent or network fails
function generateFallbackReflection(text: string, mood?: string) {
  const lines = text.split(/[.\n!?]+/).map((s) => s.trim()).filter((s) => s.length > 5);
  const event = lines[0] || 'A situation that is currently occupying your mind';
  
  // Pick a verified Islamic source matching theme
  const selectedSource = VERIFIED_ISLAMIC_SOURCES[Math.floor(Math.random() * VERIFIED_ISLAMIC_SOURCES.length)];

  return {
    summary: `Reflecting on what is occupying your thoughts right now with clarity and patience.`,
    whatHappened: [
      event,
      `You took the time to pause and put these thoughts down into words.`
    ],
    feelings: [
      {
        emotion: mood || 'Unease & Anticipatory Worry',
        explanation: `It sounds like you might be experiencing a quiet tension as your mind attempts to anticipate what hasn't unfolded yet.`
      },
      {
        emotion: 'Mental Fatigue & Overwhelm',
        explanation: `It seems possible that you are carrying multiple open loops at once, which can make the present moment feel crowded.`
      },
      {
        emotion: 'Quiet Yearning for Clarity',
        explanation: `Perhaps there is a feeling of hesitation, wondering whether you have enough certainty to take the next step.`
      }
    ],
    factVsFear: {
      whatIKnow: [
        `You are here right now, reflecting on your thoughts honestly.`,
        `Certain circumstances are currently demanding your attention.`
      ],
      whatIThink: [
        `That things might remain unresolved or difficult if not handled immediately.`,
        `That other people's perceptions are something you have to decode.`
      ],
      whatIFear: [
        `Fearing future outcomes that have not yet occurred.`,
        `Fearing that taking a pause means falling behind.`
      ],
      whatIDontKnow: [
        `The exact outcome of this situation tomorrow or next week.`,
        `What other people are dealing with in their own private lives.`
      ]
    },
    controlCircle: {
      withinControl: [
        `Taking a quiet breath and pausing for a moment.`,
        `Your own response and lawful effort today.`,
        `Asking Allah for guidance and clarity.`
      ],
      outsideControl: [
        `Past decisions or events that have already transpired.`,
        `How other people react or feel.`,
        `The exact timing of future outcomes.`
      ]
    },
    oneSmallStep: {
      action: `Set this situation aside for 15 minutes. Step away, drink a glass of water, and focus only on one simple physical task right before you.`,
      rationale: `When the mind is caught in an overthinking loop, small grounded movement breaks the cycle.`,
      alternativeAction: `Make a brief, sincere dua asking Allah to remove the weight from your heart, then do one small constructive task.`
    },
    islamicGrounding: {
      theme: selectedSource.theme,
      category: selectedSource.category,
      arabicText: selectedSource.arabicText,
      translation: selectedSource.translation,
      reference: selectedSource.reference,
      spiritualReflection: selectedSource.spiritualReflection
    }
  };
}

// POST /api/reflect endpoint
app.post('/api/reflect', async (req: Request, res: Response) => {
  try {
    const { text, mood } = req.body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({ error: 'Text is required for reflection.' });
    }

    // High risk detection
    if (detectCrisisKeywords(text)) {
      return res.json({
        isHighRisk: true,
        crisisSupport: {
          title: "Please don't face this moment alone",
          compassionateMessage: "I'm really sorry you're carrying this much right now. When thoughts become this painful or overwhelming, please know that you are not alone and you deserve real human care and support right now.",
          guidance: [
            "Take a slow breath. Put down any harmful items and step into a safe place.",
            "Reach out immediately to someone you trust or a free, confidential crisis service.",
            "Seeking professional emergency care or psychological support is an honorable, necessary action—not a sign of weak faith."
          ],
          resources: [
            {
              name: "988 Suicide & Crisis Lifeline (US & Canada)",
              contact: "Call or text 988",
              note: "Free, confidential, available 24/7"
            },
            {
              name: "Crisis Text Line (US, UK, Canada)",
              contact: "Text HOME to 741741",
              note: "Free, confidential crisis counseling via text"
            },
            {
              name: "Befrienders Worldwide",
              contact: "https://www.befrienders.org",
              note: "Global directory of free emotional support helplines"
            },
            {
              name: "Local Emergency Services",
              contact: "Call your local emergency line (e.g., 911, 999, 112)",
              note: "For immediate, in-person assistance"
            }
          ]
        }
      });
    }

    if (!ai) {
      // Graceful fallback with verified sources
      const fallback = generateFallbackReflection(text, mood);
      return res.json(fallback);
    }

    const verifiedCatalogText = VERIFIED_ISLAMIC_SOURCES.map(
      (s) => `- [${s.category}] [${s.theme}] Reference: ${s.reference} | Arabic: ${s.arabicText || ''} | Translation: "${s.translation}"`
    ).join('\n');

    const systemInstruction = `
You are the reflection intelligence of "Khayal" (خيال) - a calm, private, AI-assisted reflection and overthinking journal.
Tagline: "Untangle your thoughts. Return your heart to Allah."

BRAND & PHILOSOPHY:
- Peaceful, warm, private, reflective, spiritually grounded, intelligent, gentle, minimal, trustworthy.
- Like a quiet room after Fajr: soft daylight, stillness, warmth, breathing space.
- Understand English, Urdu, Roman Urdu, and mixed English/Urdu seamlessly.

CRITICAL ETHICAL & CLINICAL BOUNDARIES:
- Khayal is NOT a therapist, doctor, psychiatrist, mufti, or diagnostic tool.
- NEVER diagnose mental health disorders (do NOT say "you have anxiety disorder", "you suffer from depression", etc.).
- NEVER say that emotional problems or anxiety are caused by "weak iman".
- NEVER shame the user or tell them "just stop overthinking" or "have more faith".
- Islamic reminders complement reflection and practical action, not replace professional medical or psychological care.

EMOTIONAL REFLECTION SPECTRUM & GENTLE POSSIBILITY FRAMING:
- Recognize a wide, nuanced spectrum of human emotions beyond generic labels, such as:
  * Anticipatory dread / quiet unease / racing thoughts
  * Mental exhaustion / depleted energy / burnout
  * Quiet loneliness / feeling unheard / disconnection
  * Self-doubt / fear of falling short / imposter pressure
  * Disillusionment / unmet expectations / quiet grief
  * Restless ambiguity / yearning for clarity / hesitation
  * Compassion fatigue / carrying burdens not your own
  * Frustration / blocked momentum / feeling misunderstood
  * Overwhelm / feeling frozen / executive paralysis
  * Spiritual yearning / remorse / desire for inner peace
- MANDATORY PHRASING RULE: Frame ALL emotional reflections as gentle possibilities rather than certainties or facts.
  Use phrases like:
  * "It sounds like you might be experiencing..."
  * "It seems possible that you are carrying..."
  * "You might be noticing a quiet sense of..."
  * "Perhaps there is a feeling of..."
  * "It sounds like you may be grappling with..."
- Never speak in absolutes like "You are feeling X" or "This shows you have X".

STRUCTURED REFLECTION OUTPUT:
1. WHAT HAPPENED? (Observable events only, stripped of assumptions)
2. WHAT AM I FEELING? (Nuanced emotional states, each framed gently using possibility phrasing)
3. WHAT DO I KNOW vs WHAT DO I FEAR? (Separate what is supported by facts, what the user thinks, what they fear, and what is currently unknown)
4. WHAT BELONGS TO YOU? (Control Circle: what is within user's direct control vs what is outside control like other people's thoughts/reactions or future decree)
5. ONE SMALL STEP (Give ONE realistic, immediate, non-overwhelming next step achievable in 15-20 minutes, plus an alternative)
6. ISLAMIC GROUNDING:
   - Sourced strictly from authentic Qur'an and authentic Sunnah following a Salafi / Ahl al-Hadith methodology.
   - SOURCING RULES: NEVER invent, hallucinate, or fabricate a verse, hadith, or scholar statement.
   - When citing Qur'an: provide exact Surah name and verse number (e.g. Surah At-Talaq [65:3], Surah Ar-Ra'd [13:28], Surah Ash-Sharh [94:5-6], Surah Al-Baqarah [2:286], Surah Al-Baqarah [2:216], Surah Ibrahim [14:7]).
   - When citing Hadith: use only authentic narrations (Sahih al-Bukhari, Sahih Muslim, Jami' al-Tirmidhi, etc.) with collection name, hadith number, and grading.
   - You may select from these verified citations when relevant:
${verifiedCatalogText}
   - Themes include Tawakkul, Sabr, Dua, Dhikr, Raja', Rida, Akhirah Perspective, Taking Means, and Shukr & Gratitude.
   - Clear distinction: Category must be "QUR'AN" or "HADITH" or "SCHOLAR STATEMENT".
   - Language: "Perhaps this is a moment to do what is within your ability, then leave the outcome to Allah."
   - If user's dilemma is purely practical, practical advice first, spiritual grounding second.
`;

    const prompt = `
Analyze the following journal brain dump entry:
User Mood: ${mood || 'Not specified'}
User Entry Text:
"""
${text}
"""

Return a comprehensive JSON reflection following the schema.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: {
              type: Type.STRING,
              description: 'A gentle 1-2 sentence summary of what is occupying the user mind.',
            },
            whatHappened: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'List of observable events only, free of assumptions.',
            },
            feelings: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  emotion: { type: Type.STRING },
                  explanation: { type: Type.STRING },
                },
                required: ['emotion', 'explanation'],
              },
              description: 'Emotions identified gently, e.g. "It sounds like you may be feeling..."',
            },
            factVsFear: {
              type: Type.OBJECT,
              properties: {
                whatIKnow: { type: Type.ARRAY, items: { type: Type.STRING } },
                whatIThink: { type: Type.ARRAY, items: { type: Type.STRING } },
                whatIFear: { type: Type.ARRAY, items: { type: Type.STRING } },
                whatIDontKnow: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ['whatIKnow', 'whatIThink', 'whatIFear', 'whatIDontKnow'],
              description: 'Fact or Fear breakdown cards.',
            },
            controlCircle: {
              type: Type.OBJECT,
              properties: {
                withinControl: { type: Type.ARRAY, items: { type: Type.STRING } },
                outsideControl: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ['withinControl', 'outsideControl'],
              description: 'What is in user control vs outside control.',
            },
            oneSmallStep: {
              type: Type.OBJECT,
              properties: {
                action: { type: Type.STRING, description: 'ONE realistic immediate step' },
                rationale: { type: Type.STRING, description: 'Why this helps right now' },
                alternativeAction: { type: Type.STRING, description: 'An alternative gentle step' },
              },
              required: ['action', 'rationale'],
            },
            islamicGrounding: {
              type: Type.OBJECT,
              properties: {
                theme: { type: Type.STRING, description: 'Tawakkul, Sabr, Dua, Dhikr, Raja\', Rida, Akhirah Perspective, or Taking Means' },
                category: { type: Type.STRING, description: 'QUR\'AN or HADITH or SCHOLAR STATEMENT' },
                arabicText: { type: Type.STRING },
                translation: { type: Type.STRING },
                reference: { type: Type.STRING, description: 'Exact Surah/verse or Hadith collection and number' },
                spiritualReflection: { type: Type.STRING },
                scholarlyNote: { type: Type.STRING },
              },
              required: ['theme', 'category', 'translation', 'reference', 'spiritualReflection'],
            },
          },
          required: [
            'summary',
            'whatHappened',
            'feelings',
            'factVsFear',
            'controlCircle',
            'oneSmallStep',
          ],
        },
      },
    });

    const parsedJson = JSON.parse(response.text || '{}');
    return res.json(parsedJson);
  } catch (error: any) {
    console.error('Reflection endpoint error:', error);
    // Graceful fallback to prevent breaking user flow
    const fallback = generateFallbackReflection(req.body.text || '', req.body.mood);
    return res.json(fallback);
  }
});

// POST /api/patterns endpoint
app.post('/api/patterns', async (req: Request, res: Response) => {
  try {
    const { entries } = req.body;
    if (!entries || !Array.isArray(entries) || entries.length === 0) {
      return res.json({ patterns: [] });
    }

    if (!ai) {
      return res.json({
        patterns: [
          {
            themeTitle: 'Navigating Uncertainty',
            observation: 'Your recent entries frequently touch on wanting clarity before taking the next step.',
            groundingPrompt: 'What would happen if you accepted not knowing the entire outcome today?',
            suggestedAction: 'Focus on today\'s single duty and entrust tomorrow\'s unfoldment to Allah.'
          },
          {
            themeTitle: 'Carrying Other People’s Reactions',
            observation: 'Several reflections mention worry about how others perceived you or why they responded slowly.',
            groundingPrompt: 'Are you holding yourself responsible for someone else\'s silence or state of mind?',
            suggestedAction: 'Remember that you can only control your own respect and effort, not another heart\'s reaction.'
          }
        ]
      });
    }

    const summaries = entries
      .slice(0, 10)
      .map((e: any, i: number) => `Entry ${i + 1} (${e.mood || 'Reflective'}): ${e.title} - ${e.rawText?.slice(0, 200)}`)
      .join('\n');

    const prompt = `
Analyze the recurring themes across these user journal entries.
Follow strictly non-diagnostic rules:
- NEVER diagnose any condition (e.g. do not say "You suffer from anxiety").
- Use gentle observations: "Your journal entries frequently mention...", "You often reflect on..."
- Provide 2-3 gentle theme insights with a grounding question and suggested mindful action.

User Entries:
${summaries}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            patterns: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  themeTitle: { type: Type.STRING },
                  observation: { type: Type.STRING },
                  groundingPrompt: { type: Type.STRING },
                  suggestedAction: { type: Type.STRING },
                },
                required: ['themeTitle', 'observation', 'groundingPrompt', 'suggestedAction'],
              },
            },
          },
          required: ['patterns'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{"patterns": []}');
    return res.json(parsed);
  } catch (err) {
    console.error('Patterns endpoint error', err);
    return res.json({
      patterns: [
        {
          themeTitle: 'Recurring Overthinking in the Quiet',
          observation: 'Your entries reflect a thoughtful mind that deeply considers consequences and relationships.',
          groundingPrompt: 'Where can you grant yourself permission to pause without fixing everything immediately?',
          suggestedAction: 'Take one slow prayer or pause after Fajr or Isha to place your affairs in Allah\'s hands.'
        }
      ]
    });
  }
});

// Dev vs Prod Vite Integration
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Khayal server running on port ${PORT}`);
  });
}

startServer();
