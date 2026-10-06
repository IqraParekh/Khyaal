import React, { useState, useEffect } from 'react';
import { PatternInsight } from '../types';
import { getStoredEntries } from '../utils/storage';
import { Compass, Sparkles, RefreshCw, BookOpen, ArrowRight, Lightbulb } from 'lucide-react';

interface PatternsPageProps {
  onStartReflection: (prompt?: string) => void;
}

export const PatternsPage: React.FC<PatternsPageProps> = ({ onStartReflection }) => {
  const [patterns, setPatterns] = useState<PatternInsight[]>([]);
  const [loading, setLoading] = useState(false);
  const [entryCount, setEntryCount] = useState(0);

  const fetchPatterns = async () => {
    setLoading(true);
    const entries = await getStoredEntries();
    setEntryCount(entries.length);

    if (entries.length === 0) {
      setPatterns([]);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/patterns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entries }),
      });

      if (response.ok) {
        const data = await response.json();
        setPatterns(data.patterns || []);
      }
    } catch (err) {
      console.error('Failed to load patterns', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatterns();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B49A68]">
            Gentle Themes
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#3F4039] font-normal mt-0.5">
            Patterns in the Quiet
          </h1>
          <p className="text-xs sm:text-sm text-[#786A5B] mt-1 font-light">
            Recurring thoughts observed across your saved reflections—never diagnostic, always grounded.
          </p>
        </div>

        <button
          onClick={fetchPatterns}
          disabled={loading || entryCount === 0}
          className="self-start sm:self-auto px-4 py-2 rounded-full border border-[#E9E1D5] text-xs font-medium text-[#786A5B] hover:text-[#3F4039] hover:bg-[#E9E1D5]/60 flex items-center gap-1.5 transition disabled:opacity-40"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Patterns</span>
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center bg-[#FAF7F2] rounded-3xl border border-[#E9E1D5] space-y-3">
          <Sparkles className="w-6 h-6 text-[#B49A68] mx-auto animate-pulse" />
          <p className="font-serif text-base text-[#3F4039]">
            Reviewing your reflections gently...
          </p>
          <p className="text-xs text-[#786A5B]">
            Identifying thoughtful themes without labeling or diagnosing.
          </p>
        </div>
      ) : entryCount === 0 ? (
        <div className="text-center py-16 bg-[#FAF7F2] rounded-3xl border border-[#E9E1D5] p-8 space-y-4">
          <Compass className="w-10 h-10 text-[#786A5B]/40 mx-auto" />
          <h3 className="font-serif text-xl text-[#3F4039]">No patterns yet</h3>
          <p className="text-xs sm:text-sm text-[#786A5B] max-w-sm mx-auto">
            Patterns emerge as you write more entries in Khayal. Start by pouring your thoughts down in your first reflection.
          </p>
          <button
            onClick={() => onStartReflection()}
            className="px-5 py-2.5 rounded-full bg-[#3F4039] text-[#F6F2EA] text-xs font-medium hover:bg-[#2F3029] inline-flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B49A68]" />
            <span>Write a Reflection</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {patterns.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#E9E1D5] shadow-xs flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#B49A68]/15 flex items-center justify-center text-[#786A5B]">
                      <Compass className="w-4 h-4 text-[#B49A68]" />
                    </div>
                    <h3 className="font-serif text-lg text-[#3F4039]">
                      {item.themeTitle}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#786A5B] leading-relaxed">
                    {item.observation}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-[#E9E1D5]">
                  <div className="p-3.5 rounded-2xl bg-[#E9E1D5]/40 border border-[#E9E1D5]">
                    <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#786A5B] mb-1">
                      <Lightbulb className="w-3 h-3 text-[#B49A68]" />
                      <span>What Might Help?</span>
                    </div>
                    <p className="text-xs text-[#3F4039] font-serif italic leading-relaxed">
                      "{item.groundingPrompt}"
                    </p>
                  </div>

                  <p className="text-[11px] text-[#786A5B] pl-1">
                    <strong>Suggested Action:</strong> {item.suggestedAction}
                  </p>

                  <button
                    onClick={() => onStartReflection(item.groundingPrompt)}
                    className="w-full mt-2 py-2 rounded-xl text-xs font-medium text-[#3F4039] bg-[#E9E1D5]/60 hover:bg-[#E9E1D5] transition flex items-center justify-center gap-1.5"
                  >
                    <span>Reflect on this question</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-[#E9E1D5]/30 border border-[#E9E1D5] text-center text-xs text-[#786A5B]">
            Khayal notes recurring topics to help you observe your habits of mind.
            It does not evaluate mental health, and it never assumes emotional strain is due to weak faith.
          </div>
        </div>
      )}
    </div>
  );
};
