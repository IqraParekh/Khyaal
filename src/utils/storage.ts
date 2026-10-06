import { JournalEntry } from '../types';
import { encryptData, decryptData } from './crypto';

const STORAGE_KEY = 'khayal_journal_entries_v1';

export async function getStoredEntries(): Promise<JournalEntry[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return getInitialDemoEntries();
    }
    const parsed = JSON.parse(raw) as (Omit<JournalEntry, 'rawText' | 'reflection'> & {
      rawTextCipher?: string;
      reflectionCipher?: string;
      rawText?: string;
      reflection?: any;
    })[];

    const decryptedEntries: JournalEntry[] = [];
    for (const item of parsed) {
      let rawText = item.rawText || '';
      let reflection = item.reflection;

      if (item.rawTextCipher) {
        rawText = await decryptData(item.rawTextCipher);
      }
      if (item.reflectionCipher) {
        const reflJson = await decryptData(item.reflectionCipher);
        try {
          reflection = JSON.parse(reflJson);
        } catch {
          reflection = undefined;
        }
      }

      decryptedEntries.push({
        ...item,
        rawText,
        reflection,
        isEncrypted: true
      });
    }

    return decryptedEntries;
  } catch (err) {
    console.error('Error loading stored entries', err);
    return [];
  }
}

export async function saveEntry(entry: JournalEntry): Promise<void> {
  const currentEntries = await getStoredEntries();
  const existingIndex = currentEntries.findIndex((e) => e.id === entry.id);

  if (existingIndex >= 0) {
    currentEntries[existingIndex] = entry;
  } else {
    currentEntries.unshift(entry);
  }

  // Encrypt sensitive content for storage
  const serialized = [];
  for (const item of currentEntries) {
    const rawTextCipher = await encryptData(item.rawText);
    const reflectionCipher = item.reflection
      ? await encryptData(JSON.stringify(item.reflection))
      : undefined;

    serialized.push({
      id: item.id,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      mood: item.mood,
      title: item.title,
      hasReflection: item.hasReflection,
      rawTextCipher,
      reflectionCipher,
      isEncrypted: true
    });
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(serialized));
}

export async function deleteEntry(id: string): Promise<void> {
  const currentEntries = await getStoredEntries();
  const filtered = currentEntries.filter((e) => e.id !== id);

  const serialized = [];
  for (const item of filtered) {
    const rawTextCipher = await encryptData(item.rawText);
    const reflectionCipher = item.reflection
      ? await encryptData(JSON.stringify(item.reflection))
      : undefined;

    serialized.push({
      id: item.id,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      mood: item.mood,
      title: item.title,
      hasReflection: item.hasReflection,
      rawTextCipher,
      reflectionCipher,
      isEncrypted: true
    });
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(serialized));
}

function getInitialDemoEntries(): JournalEntry[] {
  return [
    {
      id: 'demo-welcome-entry',
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      title: 'Late night text silence & deadline worry',
      mood: 'Worried',
      rawText: 'I texted my team lead 5 hours ago about the deliverable, and she has not responded. Did I say something rude? What if she thinks I cannot handle this project? On top of that, my final submission is due tomorrow evening and I feel frozen just staring at the laptop.',
      hasReflection: true,
      isEncrypted: true,
      reflection: {
        summary: 'Worry about team communication delay combined with paralysis over tomorrow’s submission.',
        whatHappened: [
          'Sent a message to the team lead 5 hours ago regarding the deliverable.',
          'No reply has arrived yet.',
          'Final submission is scheduled for tomorrow evening.'
        ],
        feelings: [
          { emotion: 'Worry', explanation: 'It sounds like you may be feeling anxious about how you were perceived.' },
          { emotion: 'Overwhelm', explanation: 'It sounds like feeling frozen when facing the upcoming deadline.' }
        ],
        factVsFear: {
          whatIKnow: [
            'A message was sent 5 hours ago.',
            'The submission deadline is tomorrow evening.'
          ],
          whatIThink: [
            'She might be unhappy with what I wrote.',
            'She might think I am incapable.'
          ],
          whatIFear: [
            'Losing credibility or failing to deliver the project in time.'
          ],
          whatIDontKnow: [
            'Whether she is simply away, in meetings, or attending to urgent personal priorities.'
          ]
        },
        controlCircle: {
          withinControl: [
            'Your current effort on your part of the deliverable.',
            'How you speak to yourself right now.',
            'Setting a timer for 25 minutes of focused work without checking messages.'
          ],
          outsideControl: [
            'When other people check or reply to messages.',
            'Other people’s thoughts and internal evaluations.',
            'The speed at which the clock moves.'
          ]
        },
        oneSmallStep: {
          action: 'Close your messaging tab for 25 minutes, take three slow breaths, and write just the opening outline for tomorrow’s task.',
          rationale: 'Action dissolves the anxiety loop. You don’t need an immediate reply to write the next sentence.',
          alternativeAction: 'Drink a glass of water, step away from the screen for 5 minutes, then return to draft the first bullet point.'
        },
        islamicGrounding: {
          theme: 'Tawakkul',
          category: 'HADITH',
          arabicText: 'احْرِصْ عَلَى مَا يَنْفَعُكَ، وَاسْتَعِنْ بِاللَّهِ وَلاَ تَعْجِزْ',
          translation: 'Strive for that which benefits you, seek help from Allah, and do not lose heart.',
          reference: 'Sahih Muslim, Hadith 2664 [Grading: Sahih]',
          spiritualReflection: 'Perhaps this is a moment to focus on what is beneficial and within your hands right now, ask Allah for assistance, and leave what other people are doing in Allah’s care.',
          scholarlyNote: 'Imam an-Nawawi (may Allah have mercy on him) noted that striving for what benefits includes taking constructive worldly means while seeking Allah’s assistance.'
        }
      }
    }
  ];
}

const GRATITUDE_STORAGE_KEY = 'khayal_gratitude_entries_v1';

export async function getStoredGratitudes(): Promise<import('../types').GratitudeEntry[]> {
  try {
    const raw = localStorage.getItem(GRATITUDE_STORAGE_KEY);
    if (!raw) {
      return [
        {
          id: 'demo-gratitude-1',
          createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
          prompt: 'What blessings have you noticed?',
          content: 'A quiet morning with fresh cool air after Fajr, my mother’s smile, and clean water to drink.',
          category: 'Everyday Provision',
          isEncrypted: true
        },
        {
          id: 'demo-gratitude-2',
          createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
          prompt: 'What is one quiet mercy that arrived unnoticed today?',
          content: 'I was worried about a difficult conversation, but Allah softened their heart and we found an easy solution.',
          category: 'A Relief',
          isEncrypted: true
        }
      ];
    }

    const parsed = JSON.parse(raw) as (Omit<import('../types').GratitudeEntry, 'content'> & {
      contentCipher?: string;
      content?: string;
    })[];

    const result: import('../types').GratitudeEntry[] = [];
    for (const item of parsed) {
      let content = item.content || '';
      if (item.contentCipher) {
        content = await decryptData(item.contentCipher);
      }
      result.push({
        ...item,
        content,
        isEncrypted: true
      });
    }

    return result;
  } catch (err) {
    console.error('Error loading stored gratitudes', err);
    return [];
  }
}

export async function saveGratitudeEntry(entry: import('../types').GratitudeEntry): Promise<void> {
  const current = await getStoredGratitudes();
  const index = current.findIndex((g) => g.id === entry.id);

  if (index >= 0) {
    current[index] = entry;
  } else {
    current.unshift(entry);
  }

  const serialized = [];
  for (const item of current) {
    const contentCipher = await encryptData(item.content);
    serialized.push({
      id: item.id,
      createdAt: item.createdAt,
      prompt: item.prompt,
      category: item.category,
      contentCipher,
      isEncrypted: true
    });
  }

  localStorage.setItem(GRATITUDE_STORAGE_KEY, JSON.stringify(serialized));
}

export async function deleteGratitudeEntry(id: string): Promise<void> {
  const current = await getStoredGratitudes();
  const filtered = current.filter((g) => g.id !== id);

  const serialized = [];
  for (const item of filtered) {
    const contentCipher = await encryptData(item.content);
    serialized.push({
      id: item.id,
      createdAt: item.createdAt,
      prompt: item.prompt,
      category: item.category,
      contentCipher,
      isEncrypted: true
    });
  }

  localStorage.setItem(GRATITUDE_STORAGE_KEY, JSON.stringify(serialized));
}

