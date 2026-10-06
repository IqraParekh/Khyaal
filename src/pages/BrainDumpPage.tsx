import React, { useState, useEffect } from 'react';
import { MoodType, ReflectionResult, JournalEntry } from '../types';
import { MoodSelector } from '../components/MoodSelector';
import { FactOrFearCards } from '../components/FactOrFearCards';
import { ControlCircle } from '../components/ControlCircle';
import { OneSmallStepCard } from '../components/OneSmallStepCard';
import { IslamicGroundingCard } from '../components/IslamicGroundingCard';
import { CrisisModal } from '../components/CrisisModal';
import { saveEntry } from '../utils/storage';
import {
  Sparkles,
  Save,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Heart,
  Loader2,
  ArrowLeft,
  RotateCcw,
  Languages
} from 'lucide-react';

interface BrainDumpPageProps {
  initialPrompt?: string;
  onSaved: (entryId: string) => void;
  onGoBack: () => void;
}

export const BrainDumpPage: React.FC<BrainDumpPageProps> = ({
  initialPrompt,
  onSaved,
  onGoBack,
}) => {
  const [text, setText] = useState(initialPrompt || '');
  const [mood, setMood] = useState<MoodType | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [reflection, setReflection] = useState<ReflectionResult | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  const [crisisData, setCrisisData] = useState<any>(null);

  useEffect(() => {
    if (initialPrompt) {
      setText(initialPrompt + '\n\n');
    }
  }, [initialPrompt]);

  const characterCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const handleReflect = async () => {
    if (!text.trim()) return;

    setIsLoading(true);
    setReflection(null);

    try {
      const response = await fetch('/api/reflect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, mood }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze entry');
      }

      const data: ReflectionResult = await response.json();

      if (data.isHighRisk && data.crisisSupport) {
        setCrisisData(data.crisisSupport);
        setShowCrisisModal(true);
        setIsLoading(false);
        return;
      }

      setReflection(data);
    } catch (err) {
      console.error('Reflection request error', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToJournal = async (withReflection: boolean) => {
    if (!text.trim()) return;

    const newId = 'entry-' + Date.now();
    const firstLine = text.trim().split('\n')[0] || 'Reflection';
    const title = firstLine.slice(0, 50) + (firstLine.length > 50 ? '...' : '');

    const newEntry: JournalEntry = {
      id: newId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      rawText: text,
      mood,
      title,
      hasReflection: withReflection && !!reflection,
      reflection: withReflection && reflection ? reflection : undefined,
      isEncrypted: true,
    };

    await saveEntry(newEntry);
    setSavedSuccess(true);
    setTimeout(() => {
      onSaved(newId);
    }, 900);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 animate-in fade-in duration-300">
      {/* Crisis Modal */}
      {showCrisisModal && crisisData && (
        <CrisisModal
          data={crisisData}
          onClose={() => setShowCrisisModal(false)}
        />
      )}

      {/* Back button & top status */}
      <div className="flex items-center justify-between">
        <button
          onClick={onGoBack}
          className="flex items-center gap-1.5 text-xs sm:text-sm text-[#786A5B] hover:text-[#3F4039] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs text-[#786A5B] bg-[#E9E1D5]/40 px-3 py-1 rounded-full">
          <Languages className="w-3.5 h-3.5 text-[#B49A68]" />
          <span>English · Urdu · Roman Urdu</span>
        </div>
      </div>

      {/* Main Journal Writing Box */}
      {!reflection && (
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h1 className="font-serif text-3xl sm:text-4xl text-[#3F4039] font-normal">
              What's on your mind?
            </h1>
            <p className="text-sm sm:text-base text-[#786A5B] mt-2 font-light">
              Don't organize it. Don't edit it. Just write.
            </p>
          </div>

          {/* Mood Check-In */}
          <MoodSelector selectedMood={mood} onSelectMood={setMood} />

          {/* Textarea */}
          <div className="bg-[#FAF7F2] rounded-3xl p-5 sm:p-7 border border-[#E9E1D5] shadow-xs focus-within:border-[#B49A68]/60 transition">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write whatever is occupying your mind... A conversation that unsettled you, a fear of what's coming, a deadline, or feeling paralyzed..."
              rows={8}
              className="w-full bg-transparent border-0 resize-none focus:outline-none text-[#3F4039] text-base sm:text-lg leading-relaxed placeholder:text-[#786A5B]/40 font-light"
              disabled={isLoading}
            />

            <div className="mt-4 pt-3 border-t border-[#E9E1D5] flex flex-wrap items-center justify-between gap-3 text-xs text-[#786A5B]">
              <div className="flex items-center gap-3">
                <span>{wordCount} words</span>
                <span>·</span>
                <span>{characterCount} characters</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="italic text-[11px] text-[#786A5B]/80">
                  Encrypted locally before saving
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => handleSaveToJournal(false)}
              disabled={!text.trim() || isLoading}
              className="w-full sm:w-auto px-6 py-3 rounded-full text-xs sm:text-sm font-medium text-[#786A5B] hover:text-[#3F4039] hover:bg-[#E9E1D5] border border-[#E9E1D5] flex items-center justify-center gap-2 transition disabled:opacity-40"
            >
              <Save className="w-4 h-4" />
              <span>Save as Journal Entry</span>
            </button>

            <button
              type="button"
              onClick={handleReflect}
              disabled={!text.trim() || isLoading}
              className="w-full sm:w-auto px-7 py-3 rounded-full text-xs sm:text-sm font-medium bg-[#3F4039] text-[#F6F2EA] hover:bg-[#2F3029] shadow-xs flex items-center justify-center gap-2 transition disabled:opacity-40"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#B49A68]" />
                  <span>Untangling thoughts...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#B49A68]" />
                  <span>Reflect with Khayal</span>
                </>
              )}
            </button>
          </div>

          {/* Calming breathing guide while loading */}
          {isLoading && (
            <div className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#E9E1D5] text-center space-y-3 animate-pulse">
              <p className="font-serif text-lg text-[#3F4039]">
                Take a slow breath...
              </p>
              <p className="text-xs sm:text-sm text-[#786A5B] max-w-md mx-auto">
                Khayal is separating observable facts from quiet assumptions, organizing what belongs to you, and locating authentic guidance.
              </p>
            </div>
          )}
        </div>
      )}

      {/* AI Reflection Result Presentation */}
      {reflection && (
        <div className="space-y-10 animate-in fade-in duration-500">
          {/* Header & Retake / Save toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E9E1D5]">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A8B5A0]">
                Reflection Complete
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#3F4039] font-normal">
                Untangling the Thoughts
              </h2>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setReflection(null)}
                className="px-4 py-2 rounded-full text-xs text-[#786A5B] hover:text-[#3F4039] hover:bg-[#E9E1D5]/60 flex items-center gap-1.5 border border-[#E9E1D5] transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Adjust writing</span>
              </button>

              <button
                onClick={() => handleSaveToJournal(true)}
                disabled={savedSuccess}
                className="px-5 py-2 rounded-full text-xs sm:text-sm font-medium bg-[#3F4039] text-[#F6F2EA] hover:bg-[#2F3029] flex items-center gap-1.5 transition"
              >
                {savedSuccess ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#A8B5A0]" />
                    <span>Saved to Journal</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5 text-[#B49A68]" />
                    <span>Save Reflection</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Gentle Summary */}
          <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#E9E1D5]">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#786A5B] block mb-1">
              OBSERVATION
            </span>
            <p className="font-serif text-lg text-[#3F4039] leading-relaxed">
              "{reflection.summary}"
            </p>
          </div>

          {/* Section A: WHAT HAPPENED? & Section B: WHAT AM I FEELING? */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* What Happened */}
            <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#E9E1D5] shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-full bg-[#E9E1D5] flex items-center justify-center text-[#786A5B] text-xs font-serif font-bold">
                  A
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#3F4039]">
                    What Happened?
                  </h3>
                  <p className="text-[10px] text-[#786A5B]">Observable events without narrative</p>
                </div>
              </div>
              <ul className="space-y-2 mt-4">
                {reflection.whatHappened.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-xs sm:text-sm text-[#3F4039] bg-[#E9E1D5]/30 p-3 rounded-xl border border-[#E9E1D5]/40 flex items-start gap-2"
                  >
                    <span className="text-[#A8B5A0] font-bold">•</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What Am I Feeling? */}
            <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#E9E1D5] shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-full bg-[#E9E1D5] flex items-center justify-center text-[#786A5B] text-xs font-serif font-bold">
                  B
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#3F4039]">
                    What Am I Feeling?
                  </h3>
                  <p className="text-[10px] text-[#786A5B]">Gentle emotional observation</p>
                </div>
              </div>
              <ul className="space-y-2.5 mt-4">
                {reflection.feelings.map((f, idx) => (
                  <li
                    key={idx}
                    className="text-xs sm:text-sm bg-[#E9E1D5]/30 p-3 rounded-xl border border-[#E9E1D5]/40"
                  >
                    <div className="font-semibold text-[#3F4039] mb-0.5">
                      {f.emotion}
                    </div>
                    <div className="text-[#786A5B] text-xs leading-relaxed">
                      {f.explanation}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section C: SIGNATURE FEATURE - FACT OR FEAR */}
          <FactOrFearCards data={reflection.factVsFear} />

          {/* Section D: CONTROL CIRCLE */}
          <ControlCircle data={reflection.controlCircle} />

          {/* Section E: ONE SMALL STEP */}
          <OneSmallStepCard data={reflection.oneSmallStep} />

          {/* Section F: ISLAMIC GROUNDING */}
          {reflection.islamicGrounding && (
            <IslamicGroundingCard data={reflection.islamicGrounding} />
          )}

          {/* Bottom Save Bar */}
          <div className="pt-6 border-t border-[#E9E1D5] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#786A5B] text-center sm:text-left">
              "You don’t have to control everything. Take the means, and leave the outcome to Allah."
            </div>

            <button
              onClick={() => handleSaveToJournal(true)}
              className="px-6 py-3 rounded-full text-xs sm:text-sm font-medium bg-[#3F4039] text-[#F6F2EA] hover:bg-[#2F3029] flex items-center gap-2 transition"
            >
              <Save className="w-4 h-4 text-[#B49A68]" />
              <span>Save Reflection to My Journal</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
