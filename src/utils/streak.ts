import { JournalEntry } from '../types';

export interface StreakStats {
  currentStreak: number;
  totalEntries: number;
  journaledToday: boolean;
  last7Days: { date: Date; dayName: string; hasEntry: boolean }[];
}

export function calculateStreakStats(entries: JournalEntry[]): StreakStats {
  const totalEntries = entries.length;
  if (totalEntries === 0) {
    const emptyDays = getPast7Days();
    return {
      currentStreak: 0,
      totalEntries: 0,
      journaledToday: false,
      last7Days: emptyDays.map((d) => ({ date: d, dayName: getDayInitial(d), hasEntry: false })),
    };
  }

  // Set of formatted date strings (YYYY-MM-DD)
  const entryDateSet = new Set<string>();
  entries.forEach((e) => {
    try {
      const d = new Date(e.createdAt);
      entryDateSet.add(d.toISOString().slice(0, 10));
    } catch {
      // ignore invalid date
    }
  });

  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const journaledToday = entryDateSet.has(todayStr);

  // Calculate streak backwards from today or yesterday
  let streak = 0;
  const checkDate = new Date(now);

  if (!journaledToday) {
    // If not journaled today, check if yesterday was journaled to keep streak alive
    checkDate.setDate(checkDate.getDate() - 1);
  }

  while (true) {
    const dateStr = checkDate.toISOString().slice(0, 10);
    if (entryDateSet.has(dateStr)) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  // 7-day overview
  const past7 = getPast7Days();
  const last7Days = past7.map((d) => {
    const ds = d.toISOString().slice(0, 10);
    return {
      date: d,
      dayName: getDayInitial(d),
      hasEntry: entryDateSet.has(ds),
    };
  });

  return {
    currentStreak: streak,
    totalEntries,
    journaledToday,
    last7Days,
  };
}

function getPast7Days(): Date[] {
  const days: Date[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d);
  }
  return days;
}

function getDayInitial(date: Date): string {
  return date.toLocaleDateString(undefined, { weekday: 'narrow' });
}
