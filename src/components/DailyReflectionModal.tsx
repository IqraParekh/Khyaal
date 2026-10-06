import React, { useState } from 'react';
import { DAILY_REFLECTIONS } from '../data/islamicGroundings';
import { Sparkles, ArrowRight, RefreshCw, X, BookOpen } from 'lucide-react';

interface DailyReflectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartWithPrompt: (promptText: string) => void;
}

export const DailyReflectionModal: React.FC<DailyReflectionModalProps> = ({
  isOpen,
  onClose,
  onStartWithPrompt,
}) => {
  const [index, setIndex] = useState(0);

  if (!isOpen) return null;

  const current = DAILY_REFLECTIONS[index % DAILY_REFLECTIONS.length];

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % DAILY_REFLECTIONS.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3F4039]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] max-w-lg w-full rounded-3xl p-6 sm:p-8 border border-[#E9E1D5] shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#786A5B] hover:text-[#3F4039] hover:bg-[#E9E1D5]/60 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B49A68]" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B49A68]">
              Daily Inquiry
            </span>
          </div>

          <button
            onClick={handleNext}
            className="flex items-center gap-1 text-xs text-[#786A5B] hover:text-[#3F4039] px-2.5 py-1 rounded-full bg-[#E9E1D5]/50 transition"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Another prompt</span>
          </button>
        </div>

        <div className="my-4 p-6 rounded-2xl bg-[#E9E1D5]/40 border border-[#E9E1D5]">
          <h3 className="font-serif text-xl sm:text-2xl text-[#3F4039] font-normal leading-snug">
            "{current.prompt}"
          </h3>
          <p className="text-xs sm:text-sm text-[#786A5B] mt-2.5 leading-relaxed">
            {current.subtext}
          </p>
        </div>

        {/* Verified subtle reminder */}
        <div className="p-4 rounded-xl bg-[#F6F2EA] border border-[#E9E1D5]/80 mb-6">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-3 h-3 text-[#A8B5A0]" />
            <span className="text-[10px] uppercase font-semibold text-[#786A5B]">
              {current.reminder.category} · {current.reminder.reference}
            </span>
          </div>
          <p className="text-xs text-[#3F4039] font-serif italic">
            "{current.reminder.translation}"
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <button
            onClick={() => {
              onStartWithPrompt(current.prompt);
              onClose();
            }}
            className="w-full sm:w-auto flex-1 px-5 py-2.5 rounded-full bg-[#3F4039] text-[#F6F2EA] text-xs sm:text-sm font-medium hover:bg-[#2F3029] flex items-center justify-center gap-2 transition"
          >
            <span>Journal on this prompt</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-full text-xs sm:text-sm text-[#786A5B] hover:text-[#3F4039] hover:bg-[#E9E1D5]/60 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
