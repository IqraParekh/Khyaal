import React, { useState, useEffect } from 'react';
import { GratitudeEntry } from '../types';
import { getStoredGratitudes, saveGratitudeEntry, deleteGratitudeEntry } from '../utils/storage';
import { VERIFIED_ISLAMIC_SOURCES } from '../data/islamicGroundings';
import { useAuth } from '../context/AuthContext';
import {
  Heart,
  Sparkles,
  BookOpen,
  Plus,
  Trash2,
  Lock,
  RefreshCw,
  CheckCircle2,
  Sun,
  ShieldCheck
} from 'lucide-react';

const GRATITUDE_PROMPTS = [
  'What are you thankful for today?',
  'What blessings have you noticed?',
  'What is one quiet mercy that arrived unnoticed today?',
  'Who is someone whose presence made your day a little lighter?',
  'What simple physical blessing (warm food, cold water, a steady breath) sustained you?',
  'What difficulty or worry did Allah spare you from today?',
];

const CATEGORIES: ('Hidden Mercy' | 'Peace of Heart' | 'A Person' | 'Everyday Provision' | 'A Relief')[] = [
  'Hidden Mercy',
  'Everyday Provision',
  'Peace of Heart',
  'A Person',
  'A Relief',
];

export const GratitudePage: React.FC = () => {
  const { user, cloudConsent, syncEntriesWithCloud } = useAuth();
  const [gratitudes, setGratitudes] = useState<GratitudeEntry[]>([]);
  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const [customContent, setCustomContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<
    'Hidden Mercy' | 'Peace of Heart' | 'A Person' | 'Everyday Provision' | 'A Relief'
  >('Everyday Provision');
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  // Verified Islamic sources for gratitude (Shukr)
  const quranGratitude = VERIFIED_ISLAMIC_SOURCES.find((s) => s.id === 'quran-14-7');
  const hadithGratitude = VERIFIED_ISLAMIC_SOURCES.find((s) => s.id === 'hadith-tirmidhi-2346');

  const loadData = async () => {
    setLoading(true);
    const data = await getStoredGratitudes();
    setGratitudes(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleNextPrompt = () => {
    setActivePromptIndex((prev) => (prev + 1) % GRATITUDE_PROMPTS.length);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customContent.trim()) return;

    const newEntry: GratitudeEntry = {
      id: 'gratitude-' + Date.now(),
      createdAt: new Date().toISOString(),
      prompt: GRATITUDE_PROMPTS[activePromptIndex],
      content: customContent.trim(),
      category: selectedCategory,
      isEncrypted: true,
    };

    await saveGratitudeEntry(newEntry);
    setCustomContent('');
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
    await loadData();

    if (user && cloudConsent) {
      syncEntriesWithCloud();
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this recorded blessing?')) {
      await deleteGratitudeEntry(id);
      await loadData();
      if (user && cloudConsent) {
        syncEntriesWithCloud();
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-10 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9E1D5]/60 text-[#786A5B] text-xs font-medium mb-3">
          <Heart className="w-3.5 h-3.5 text-[#B49A68]" />
          <span>Shukr & Contentment · الشكر والرضا</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#3F4039] font-normal">
          Gratitude Practice
        </h1>
        <p className="text-xs sm:text-sm text-[#786A5B] mt-2 font-light leading-relaxed">
          Before measuring what you fear is missing, pause and count what is silently sustaining you.
          Gratitude transforms what you have into enough.
        </p>
      </div>

      {/* Subtle Verified Islamic Anchor Card */}
      {quranGratitude && (
        <section className="bg-[#FAF7F2] p-6 sm:p-7 rounded-3xl border border-[#B49A68]/30 shadow-xs relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
            <span className="text-[10px] font-semibold tracking-widest uppercase text-[#B49A68]">
              FOUNDATION OF SHUKR
            </span>
            <span className="text-xs text-[#786A5B] font-medium">
              {quranGratitude.reference}
            </span>
          </div>

          <p className="font-arabic text-xl sm:text-2xl text-[#3F4039] leading-loose mb-3 text-right" dir="rtl">
            {quranGratitude.arabicText}
          </p>

          <p className="font-serif text-base sm:text-lg text-[#3F4039] italic leading-relaxed">
            "{quranGratitude.translation}"
          </p>

          <p className="text-xs text-[#786A5B] mt-2 leading-relaxed">
            {quranGratitude.spiritualReflection}
          </p>
        </section>
      )}

      {/* Record a Blessing Form */}
      <section className="bg-[#FAF7F2] p-6 sm:p-8 rounded-3xl border border-[#E9E1D5] shadow-xs space-y-5">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-[#B49A68]" />
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#3F4039]">
              Pause & Reflect
            </h2>
          </div>

          <button
            type="button"
            onClick={handleNextPrompt}
            className="flex items-center gap-1.5 text-xs text-[#786A5B] hover:text-[#3F4039] px-3 py-1 rounded-full bg-[#E9E1D5]/50 hover:bg-[#E9E1D5] transition"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Another prompt</span>
          </button>
        </div>

        {/* Current Prompt */}
        <div className="p-4 rounded-2xl bg-[#E9E1D5]/40 border border-[#E9E1D5]">
          <p className="font-serif text-lg sm:text-xl text-[#3F4039]">
            "{GRATITUDE_PROMPTS[activePromptIndex]}"
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <textarea
              value={customContent}
              onChange={(e) => setCustomContent(e.target.value)}
              placeholder="Name something you notice right now... A warm cup, a breath free of pain, a quiet room, or kindness from someone..."
              rows={3}
              className="w-full bg-[#F6F2EA] p-4 rounded-2xl border border-[#E9E1D5] text-sm text-[#3F4039] focus:outline-none focus:border-[#B49A68] placeholder:text-[#786A5B]/50 leading-relaxed font-light"
            />
          </div>

          {/* Category selection */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] text-[#786A5B] mr-1">Category:</span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs transition ${
                  selectedCategory === cat
                    ? 'bg-[#3F4039] text-[#F6F2EA]'
                    : 'bg-[#E9E1D5]/40 hover:bg-[#E9E1D5] text-[#786A5B]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1 text-[11px] text-[#786A5B]">
              <Lock className="w-3 h-3 text-[#A8B5A0]" />
              <span>Locally encrypted & private</span>
            </div>

            <button
              type="submit"
              disabled={!customContent.trim()}
              className="px-6 py-2.5 rounded-full bg-[#3F4039] text-[#F6F2EA] text-xs sm:text-sm font-medium hover:bg-[#2F3029] flex items-center gap-2 transition disabled:opacity-40"
            >
              {isSaved ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#A8B5A0]" />
                  <span>Recorded in Peace</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 text-[#B49A68]" />
                  <span>Save Blessing</span>
                </>
              )}
            </button>
          </div>
        </form>
      </section>

      {/* Sunnah Hadith on Foundational Contentment */}
      {hadithGratitude && (
        <section className="bg-[#FAF7F2] p-5 sm:p-6 rounded-3xl border border-[#E9E1D5] flex items-start gap-3.5">
          <BookOpen className="w-5 h-5 text-[#A8B5A0] shrink-0 mt-1" />
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] uppercase font-semibold text-[#786A5B]">
              <span>AUTHENTIC SUNNAH</span>
              <span>·</span>
              <span>{hadithGratitude.reference}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#3F4039] font-serif italic leading-relaxed">
              "{hadithGratitude.translation}"
            </p>
            <p className="text-[11px] text-[#786A5B] leading-relaxed pt-1">
              {hadithGratitude.spiritualReflection}
            </p>
          </div>
        </section>
      )}

      {/* Gratitude Log List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl sm:text-2xl text-[#3F4039]">
            Recorded Blessings
          </h3>
          <span className="text-xs text-[#786A5B]">
            {gratitudes.length} blessings recorded
          </span>
        </div>

        {loading ? (
          <div className="text-center py-8 text-xs text-[#786A5B]">
            Loading your recorded blessings...
          </div>
        ) : gratitudes.length === 0 ? (
          <div className="p-8 text-center rounded-3xl bg-[#FAF7F2] border border-[#E9E1D5] text-xs text-[#786A5B]">
            No blessings recorded yet. Use the prompt above to record your first one.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {gratitudes.map((item) => (
              <div
                key={item.id}
                className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E9E1D5] shadow-xs flex flex-col justify-between space-y-3 group hover:border-[#B49A68]/40 transition"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] text-[#786A5B] mb-1.5">
                    <span className="bg-[#E9E1D5]/60 px-2 py-0.5 rounded-md font-medium text-[#3F4039]">
                      {item.category || 'Blessing'}
                    </span>
                    <span>
                      {new Date(item.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>

                  <p className="text-xs text-[#786A5B] italic mb-1 font-serif line-clamp-1">
                    "{item.prompt}"
                  </p>

                  <p className="text-xs sm:text-sm text-[#3F4039] leading-relaxed font-light">
                    {item.content}
                  </p>
                </div>

                <div className="flex justify-end pt-2 border-t border-[#E9E1D5]/60">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1 rounded text-[#786A5B] hover:text-red-700 transition opacity-0 group-hover:opacity-100"
                    title="Delete"
                    aria-label="Delete blessing"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
