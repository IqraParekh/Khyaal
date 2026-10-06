import React from 'react';
import { PenLine, BookOpen, Sparkles, Shield, ArrowRight, CheckCircle2 } from 'lucide-react';
import { VERIFIED_ISLAMIC_SOURCES } from '../data/islamicGroundings';

interface HomePageProps {
  onStartJournal: () => void;
  onViewJournal: () => void;
  onOpenDaily: () => void;
  onOpenPrivacy: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onStartJournal,
  onViewJournal,
  onOpenDaily,
  onOpenPrivacy
}) => {
  // Today's Khayal featured authentic reflection
  const featuredReminder = VERIFIED_ISLAMIC_SOURCES[0]; // Surah Ar-Ra'd 13:28

  return (
    <div className="space-y-16 sm:space-y-24 py-4 sm:py-8">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto px-4 sm:px-6 pt-6 sm:pt-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E9E1D5]/60 border border-[#E9E1D5] text-[#786A5B] text-xs font-medium mb-6 animate-in fade-in duration-700">
          <span className="font-arabic text-sm text-[#3F4039]" dir="rtl">خيال</span>
          <span>·</span>
          <span>A quiet room after Fajr</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#3F4039] font-normal tracking-tight leading-tight mb-5">
          Untangle your thoughts. <br />
          <span className="italic font-light text-[#786A5B]">
            Return your heart to Allah.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-[#786A5B] max-w-2xl mx-auto leading-relaxed font-light mb-8">
          When your thoughts feel tangled, Khayal gives them somewhere to land.
          Write freely, understand what is within your control, and reconnect with what matters.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8">
          <button
            onClick={onStartJournal}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#3F4039] text-[#F6F2EA] text-sm sm:text-base font-medium hover:bg-[#2F3029] shadow-sm flex items-center justify-center gap-2.5 transition active:scale-[0.99]"
          >
            <PenLine className="w-4 h-4" />
            <span>Begin Journaling</span>
          </button>

          <button
            onClick={onViewJournal}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#E9E1D5]/50 text-[#3F4039] text-sm sm:text-base font-medium hover:bg-[#E9E1D5] border border-[#E9E1D5] flex items-center justify-center gap-2 transition"
          >
            <BookOpen className="w-4 h-4 text-[#786A5B]" />
            <span>View My Journal</span>
          </button>

          <button
            onClick={onOpenDaily}
            className="w-full sm:w-auto px-5 py-3.5 rounded-full text-[#786A5B] hover:text-[#3F4039] text-sm font-medium hover:bg-[#E9E1D5]/40 flex items-center justify-center gap-2 transition"
          >
            <Sparkles className="w-4 h-4 text-[#B49A68]" />
            <span>Today's Reflection</span>
          </button>
        </div>

        {/* Local Encryption & Privacy Reassurance */}
        <div className="inline-flex items-center gap-2 text-xs text-[#786A5B] bg-[#FAF7F2] px-4 py-2 rounded-full border border-[#E9E1D5]/80">
          <Shield className="w-3.5 h-3.5 text-[#A8B5A0]" />
          <span>Local client-side encryption · Reflections stay private on this device</span>
        </div>
      </section>

      {/* Subtle Verified Qur'an Foundation */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="bg-[#FAF7F2] p-8 sm:p-10 rounded-3xl border border-[#E9E1D5] shadow-xs text-center relative overflow-hidden">
          <span className="text-[10px] font-semibold tracking-widest uppercase text-[#B49A68] mb-3 block">
            FOUNDATION
          </span>

          <p className="font-arabic text-2xl sm:text-3xl text-[#3F4039] leading-loose mb-4" dir="rtl">
            {featuredReminder.arabicText}
          </p>

          <p className="font-serif text-lg sm:text-xl text-[#3F4039] italic leading-relaxed">
            "{featuredReminder.translation}"
          </p>

          <p className="text-xs text-[#786A5B] font-medium tracking-wide mt-3">
            {featuredReminder.reference}
          </p>
        </div>
      </section>

      {/* Philosophy Section: "Your mind doesn't need another lecture" */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#786A5B]">
            HOW KHAYAL WORKS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#3F4039] mt-2 font-normal leading-snug">
            Your mind doesn’t need another lecture. <br />
            <span className="text-[#786A5B] italic">
              Sometimes it needs a quiet place to put everything down.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-[#FAF7F2] p-7 rounded-3xl border border-[#E9E1D5] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#E9E1D5] flex items-center justify-center text-[#786A5B] font-serif font-bold text-sm mb-4">
                1
              </div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#3F4039] mb-2">
                EMPTY YOUR MIND
              </h3>
              <p className="text-sm text-[#786A5B] leading-relaxed">
                Write without editing, filtering, or organizing. Pour out your worries in English, Urdu, or Roman Urdu.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E9E1D5] text-[11px] text-[#A8B5A0] font-medium">
              Free uninhibited expression
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#FAF7F2] p-7 rounded-3xl border border-[#E9E1D5] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#E9E1D5] flex items-center justify-center text-[#786A5B] font-serif font-bold text-sm mb-4">
                2
              </div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#3F4039] mb-2">
                SEE CLEARLY
              </h3>
              <p className="text-sm text-[#786A5B] leading-relaxed">
                Distinguish verifiable facts from quiet assumptions. Explore what is inside your control and what belongs to Allah.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E9E1D5] text-[11px] text-[#B49A68] font-medium">
              Fact or Fear · Control Circle
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#FAF7F2] p-7 rounded-3xl border border-[#E9E1D5] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#E9E1D5] flex items-center justify-center text-[#786A5B] font-serif font-bold text-sm mb-4">
                3
              </div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#3F4039] mb-2">
                RETURN TO WHAT MATTERS
              </h3>
              <p className="text-sm text-[#786A5B] leading-relaxed">
                Receive ONE realistic practical step to act on today, anchored with verified Qur'an and authentic Sunnah reminders.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E9E1D5] text-[11px] text-[#786A5B] font-medium">
              One Small Step · Ahl al-Hadith Sourcing
            </div>
          </div>
        </div>
      </section>

      {/* "Today's Khayal" Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-[#E9E1D5]/40 p-8 sm:p-10 rounded-3xl border border-[#E9E1D5] relative overflow-hidden">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B49A68]" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#786A5B]">
                TODAY'S KHAYAL
              </h3>
            </div>
            <span className="text-[11px] text-[#786A5B] bg-[#F6F2EA] px-3 py-1 rounded-full border border-[#E9E1D5]">
              Theme: Tawakkul & Means
            </span>
          </div>

          <p className="font-serif text-lg sm:text-xl text-[#3F4039] leading-relaxed mb-3">
            "Your responsibility is to take the means available to you. The outcome belongs to Allah."
          </p>

          <p className="text-xs sm:text-sm text-[#786A5B] leading-relaxed">
            The Prophet ﷺ said: <span className="italic">"Strive for that which benefits you, seek help from Allah, and do not lose heart..."</span> (Sahih Muslim, 2664). You are only held accountable for your lawful effort and sincerity today—not for the uncertainty of tomorrow.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={onStartJournal}
              className="px-5 py-2.5 rounded-full bg-[#3F4039] text-[#F6F2EA] text-xs sm:text-sm font-medium hover:bg-[#2F3029] flex items-center gap-2 transition"
            >
              <span>Reflect on this now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onOpenPrivacy}
              className="text-xs text-[#786A5B] hover:text-[#3F4039] underline underline-offset-4 transition"
            >
              Learn about our verified sourcing standards
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
