import React, { useState } from 'react';
import { OneSmallStepData } from '../types';
import { Footprints, CheckCircle, RefreshCw, Sparkles } from 'lucide-react';

interface OneSmallStepCardProps {
  data: OneSmallStepData;
}

export const OneSmallStepCard: React.FC<OneSmallStepCardProps> = ({ data }) => {
  const [useAlternative, setUseAlternative] = useState(false);
  const [completed, setCompleted] = useState(false);

  const currentAction = useAlternative && data.alternativeAction
    ? data.alternativeAction
    : data.action;

  return (
    <section className="bg-[#FAF7F2] p-6 sm:p-7 rounded-3xl border border-[#B49A68]/30 shadow-xs relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-[#B49A68]/20 flex items-center justify-center text-[#786A5B]">
            <Footprints className="w-5 h-5 text-[#B49A68]" />
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B49A68]">
              Immediate Focus
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-[#3F4039] font-normal">
              One Small Step
            </h3>
          </div>
        </div>

        {data.alternativeAction && (
          <button
            type="button"
            onClick={() => {
              setUseAlternative(!useAlternative);
              setCompleted(false);
            }}
            className="self-start sm:self-auto flex items-center gap-1.5 text-xs text-[#786A5B] hover:text-[#3F4039] px-3 py-1.5 rounded-full bg-[#E9E1D5]/60 hover:bg-[#E9E1D5] transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{useAlternative ? 'Original step' : 'Give me another step'}</span>
          </button>
        )}
      </div>

      <div className="my-5 p-5 rounded-2xl bg-[#E9E1D5]/40 border border-[#E9E1D5] transition">
        <p className="text-base sm:text-lg text-[#3F4039] font-serif leading-relaxed">
          "{currentAction}"
        </p>

        {data.rationale && (
          <p className="text-xs sm:text-sm text-[#786A5B] mt-2.5 leading-relaxed flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B49A68] shrink-0" />
            <span>{data.rationale}</span>
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={() => setCompleted(!completed)}
          className={`w-full sm:w-auto px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition ${
            completed
              ? 'bg-[#A8B5A0] text-[#3F4039]'
              : 'bg-[#3F4039] text-[#F6F2EA] hover:bg-[#2F3029]'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          <span>{completed ? 'I am doing this ✓' : "I'll do this"}</span>
        </button>

        <p className="text-[11px] text-[#786A5B] text-center sm:text-right">
          You don’t need to solve the whole road tonight. Just take the immediate step.
        </p>
      </div>
    </section>
  );
};
