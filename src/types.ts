export type MoodType =
  | 'Calm'
  | 'Heavy'
  | 'Worried'
  | 'Overwhelmed'
  | 'Sad'
  | 'Frustrated'
  | 'Confused'
  | 'Hopeful'
  | 'Grateful'
  | 'Numb';

export interface FeelingItem {
  emotion: string;
  explanation: string;
}

export interface FactVsFearData {
  whatIKnow: string[];
  whatIThink: string[];
  whatIFear: string[];
  whatIDontKnow: string[];
}

export interface ControlCircleData {
  withinControl: string[];
  outsideControl: string[];
}

export interface OneSmallStepData {
  action: string;
  rationale: string;
  alternativeAction?: string;
}

export interface IslamicGroundingData {
  theme: 'Tawakkul' | 'Sabr' | 'Dua' | 'Dhikr' | 'Raja\'' | 'Rida' | 'Akhirah Perspective' | 'Taking Means';
  category: 'QUR\'AN' | 'HADITH' | 'SCHOLAR STATEMENT';
  arabicText?: string;
  translation: string;
  reference: string;
  spiritualReflection: string;
  scholarlyNote?: string;
}

export interface CrisisSupportData {
  title: string;
  compassionateMessage: string;
  guidance: string[];
  resources: { name: string; contact: string; note: string }[];
}

export interface ReflectionResult {
  isHighRisk?: boolean;
  crisisSupport?: CrisisSupportData;
  summary: string;
  whatHappened: string[];
  feelings: FeelingItem[];
  factVsFear: FactVsFearData;
  controlCircle: ControlCircleData;
  oneSmallStep: OneSmallStepData;
  islamicGrounding?: IslamicGroundingData | null;
}

export interface JournalEntry {
  id: string;
  createdAt: string;
  updatedAt: string;
  rawText: string;
  mood?: MoodType;
  title: string;
  hasReflection: boolean;
  reflection?: ReflectionResult;
  isEncrypted?: boolean;
}

export interface PatternInsight {
  themeTitle: string;
  observation: string;
  groundingPrompt: string;
  suggestedAction: string;
}
