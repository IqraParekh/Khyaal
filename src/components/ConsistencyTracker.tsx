import React from 'react';
import { StreakStats } from '../utils/streak';
import { Sparkles, Calendar, BookOpen, Check, Feather, ArrowRight } from 'lucide-react';

interface ConsistencyTrackerProps {
  stats: StreakStats;
  onStartJournal: () => void;
}

export const ConsistencyTracker: React.FC<ConsistencyTrackerProps> = ({
  stats,
  onStartJournal,
}) => {
  return (
    <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-3xl border border-[#E9E1D5] shadow-xs relative overflow-hidden transition">
      {/* Background calm glow */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-[#A8B5A0]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left: Streak & Total Stats */}
        <div className="space-y-4 max-w-md">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#B49A68]">
              DAILY HABIT · WITHOUT PRESSURE
            </span>
          </div>

          <div className="flex items-baseline gap-6">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-3xl sm:text-4xl text-[#3F4039] font-normal">
                  {stats.currentStreak}
                </span>
                <span className="text-xs sm:text-sm text-[#786A5B] font-light">
                  {stats.currentStreak === 1 ? 'day streak' : 'days streak'}
                </span>
              </div>
              <p className="text-[11px] text-[#786A5B] mt-0.5">
                {stats.journaledToday ? 'Preserved for today ✓' : 'Awaiting today’s thoughts'}
              </p>
            </div>

            <div className="h-10 w-[1px] bg-[#E9E1D5]" />

            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-3xl sm:text-4xl text-[#3F4039] font-normal">
                  {stats.totalEntries}
                </span>
                <span className="text-xs sm:text-sm text-[#786A5B] font-light">
                  {stats.totalEntries === 1 ? 'reflection' : 'reflections'}
                </span>
              </div>
              <p className="text-[11px] text-[#786A5B] mt-0.5">
                Saved in your private journal
              </p>
            </div>
          </div>

          {/* Gentle Prophetic Reminder */}
          <div className="p-3.5 rounded-2xl bg-[#E9E1D5]/40 border border-[#E9E1D5] space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-semibold text-[#786A5B]">
              <Feather className="w-3 h-3 text-[#A8B5A0]" />
              <span>Sahih al-Bukhari 6464 · Sahih Muslim 783</span>
            </div>
            <p className="font-serif text-xs text-[#3F4039] italic leading-relaxed">
              "The most beloved of deeds to Allah are those that are most consistent, even if they are small."
            </p>
          </div>
        </div>

        {/* Right: 7-Day Calm Indicator & Quick Action */}
        <div className="flex flex-col items-start md:items-end justify-between space-y-4">
          <div className="space-y-2">
            <span className="text-[11px] text-[#786A5B] block text-left md:text-right">
              Past 7 days
            </span>
            <div className="flex items-center gap-2">
              {stats.last7Days.map((day, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition ${
                      day.hasEntry
                        ? 'bg-[#A8B5A0] text-[#3F4039] font-bold shadow-xs'
                        : 'bg-[#E9E1D5]/50 text-[#786A5B]/60 border border-[#E9E1D5]'
                    }`}
                    title={`${day.date.toLocaleDateString()}: ${day.hasEntry ? 'Reflected' : 'Rest day'}`}
                  >
                    {day.hasEntry ? <Check className="w-3.5 h-3.5" /> : '·'}
                  </div>
                  <span className="text-[10px] text-[#786A5B] uppercase font-medium">
                    {day.dayName}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {!stats.journaledToday ? (
            <button
              onClick={onStartJournal}
              className="px-5 py-2.5 rounded-full bg-[#3F4039] text-[#F6F2EA] text-xs font-medium hover:bg-[#2F3029] flex items-center gap-2 transition shadow-xs"
            >
              <span>Journal today</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="text-xs text-[#786A5B] bg-[#E9E1D5]/60 px-4 py-2 rounded-full flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#A8B5A0]" />
              <span>You untangled thoughts today</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
