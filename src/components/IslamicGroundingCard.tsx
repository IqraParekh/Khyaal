import React from 'react';
import { IslamicGroundingData } from '../types';
import { BookOpen, Sparkles, Feather } from 'lucide-react';

interface IslamicGroundingCardProps {
  data: IslamicGroundingData;
}

export const IslamicGroundingCard: React.FC<IslamicGroundingCardProps> = ({ data }) => {
  const getBadgeColor = (category: string) => {
    switch (category) {
      case 'QUR\'AN':
        return 'bg-[#B49A68]/20 text-[#786A5B] border-[#B49A68]/40';
      case 'HADITH':
        return 'bg-[#A8B5A0]/25 text-[#3F4039] border-[#A8B5A0]/50';
      default:
        return 'bg-[#E9E1D5] text-[#786A5B] border-[#E9E1D5]';
    }
  };

  return (
    <section className="bg-[#FAF7F2] p-6 sm:p-8 rounded-3xl border border-[#B49A68]/30 shadow-xs relative overflow-hidden">
      {/* Decorative calm background accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#B49A68]/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#B49A68]/20 flex items-center justify-center text-[#786A5B]">
            <BookOpen className="w-4 h-4 text-[#B49A68]" />
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B49A68]">
              Spiritual Perspective
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-[#3F4039] font-normal">
              Islamic Grounding
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Distinct Category Tag */}
          <span
            className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border uppercase tracking-wider ${getBadgeColor(
              data.category
            )}`}
          >
            {data.category}
          </span>
          <span className="text-[11px] text-[#786A5B] bg-[#E9E1D5]/60 px-2.5 py-1 rounded-full">
            Theme: {data.theme}
          </span>
        </div>
      </div>

      {/* Arabic Script if present */}
      {data.arabicText && (
        <div className="mb-5 p-4 sm:p-5 rounded-2xl bg-[#F6F2EA] border border-[#E9E1D5] text-right">
          <p
            className="font-arabic text-xl sm:text-2xl text-[#3F4039] leading-loose sm:leading-loose"
            dir="rtl"
          >
            {data.arabicText}
          </p>
        </div>
      )}

      {/* Authentic Translation & Reference */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#E9E1D5]/40 border border-[#E9E1D5] mb-5">
        <div className="text-[10px] uppercase tracking-wider text-[#786A5B] font-semibold mb-1">
          {data.category === 'QUR\'AN' ? 'Qur\'anic Verse' : data.category === 'HADITH' ? 'Authentic Narration' : 'Scholar Statement'}
        </div>
        <p className="text-sm sm:text-base text-[#3F4039] italic font-serif leading-relaxed">
          "{data.translation}"
        </p>
        <div className="mt-3 flex items-center justify-between text-xs font-medium text-[#786A5B]">
          <span className="underline decoration-[#B49A68]/50 underline-offset-4">
            {data.reference}
          </span>
          <span className="text-[10px] text-[#786A5B]/80 font-normal">
            Verified Source
          </span>
        </div>
      </div>

      {/* Spiritual Reflection */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#B49A68]" />
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#3F4039]">
            AI Reflection & Application
          </h4>
        </div>
        <p className="text-xs sm:text-sm text-[#3F4039] leading-relaxed pl-5 border-l-2 border-[#B49A68]/40">
          {data.spiritualReflection}
        </p>
      </div>

      {/* Scholarly note if present */}
      {data.scholarlyNote && (
        <div className="mt-4 pt-3 border-t border-[#E9E1D5] flex items-start gap-2 text-xs text-[#786A5B]">
          <Feather className="w-3.5 h-3.5 text-[#A8B5A0] shrink-0 mt-0.5" />
          <p className="italic leading-relaxed">
            <strong className="not-italic text-[#3F4039]">Scholarly Note:</strong>{' '}
            {data.scholarlyNote}
          </p>
        </div>
      )}

      {/* Ethical note */}
      <div className="mt-5 pt-3 border-t border-[#E9E1D5]/60 text-center">
        <p className="text-[11px] text-[#786A5B]/75">
          Spiritual reflection provides solace and perspective to accompany practical action; it does not replace medical or psychological care.
        </p>
      </div>
    </section>
  );
};
