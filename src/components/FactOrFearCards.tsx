import React from 'react';
import { FactVsFearData } from '../types';
import { CheckCircle2, HelpCircle, Eye, AlertCircle } from 'lucide-react';

interface FactOrFearCardsProps {
  data: FactVsFearData;
}

export const FactOrFearCards: React.FC<FactOrFearCardsProps> = ({ data }) => {
  return (
    <section className="space-y-4">
      <div className="text-center max-w-xl mx-auto mb-6">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B49A68]">
          Signature Reflection
        </span>
        <h3 className="font-serif text-2xl text-[#3F4039] mt-1 font-normal">
          Fact or Fear?
        </h3>
        <p className="text-xs sm:text-sm text-[#786A5B] mt-1.5 leading-relaxed">
          Sometimes the mind fills uncertainty with frightening possibilities.
          Let’s separate what you know from what you fear—with gentleness, not judgment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* WHAT I KNOW */}
        <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E9E1D5] hover:border-[#A8B5A0] transition shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-full bg-[#A8B5A0]/20 text-[#3F4039] flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-[#A8B5A0]" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#3F4039]">
                What I Know
              </h4>
              <p className="text-[10px] text-[#786A5B]">Facts directly supported by reality</p>
            </div>
          </div>
          <ul className="space-y-2">
            {data.whatIKnow.map((item, idx) => (
              <li
                key={idx}
                className="text-xs sm:text-sm text-[#3F4039] bg-[#E9E1D5]/30 rounded-xl p-3 border border-[#E9E1D5]/50 flex items-start gap-2"
              >
                <span className="text-[#A8B5A0] font-bold">•</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* WHAT I THINK */}
        <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E9E1D5] hover:border-[#B49A68]/40 transition shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-full bg-[#B49A68]/20 text-[#3F4039] flex items-center justify-center">
              <Eye className="w-4 h-4 text-[#B49A68]" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#3F4039]">
                What I Think
              </h4>
              <p className="text-[10px] text-[#786A5B]">Interpretations & current thoughts</p>
            </div>
          </div>
          <ul className="space-y-2">
            {data.whatIThink.map((item, idx) => (
              <li
                key={idx}
                className="text-xs sm:text-sm text-[#3F4039] bg-[#E9E1D5]/30 rounded-xl p-3 border border-[#E9E1D5]/50 flex items-start gap-2"
              >
                <span className="text-[#B49A68] font-bold">•</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* WHAT I FEAR */}
        <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E9E1D5] hover:border-[#786A5B]/40 transition shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-full bg-[#786A5B]/15 text-[#3F4039] flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-[#786A5B]" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#3F4039]">
                What I Fear
              </h4>
              <p className="text-[10px] text-[#786A5B]">Anticipated worst-case scenarios</p>
            </div>
          </div>
          <ul className="space-y-2">
            {data.whatIFear.map((item, idx) => (
              <li
                key={idx}
                className="text-xs sm:text-sm text-[#3F4039] bg-[#E9E1D5]/30 rounded-xl p-3 border border-[#E9E1D5]/50 flex items-start gap-2"
              >
                <span className="text-[#786A5B] font-bold">•</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* WHAT I DON'T KNOW */}
        <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E9E1D5] hover:border-[#A8B5A0]/60 transition shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-full bg-[#A8B5A0]/20 text-[#3F4039] flex items-center justify-center">
              <HelpCircle className="w-4 h-4 text-[#A8B5A0]" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#3F4039]">
                What I Don't Know
              </h4>
              <p className="text-[10px] text-[#786A5B]">Uncertainties outside your present sight</p>
            </div>
          </div>
          <ul className="space-y-2">
            {data.whatIDontKnow.map((item, idx) => (
              <li
                key={idx}
                className="text-xs sm:text-sm text-[#3F4039] bg-[#E9E1D5]/30 rounded-xl p-3 border border-[#E9E1D5]/50 flex items-start gap-2"
              >
                <span className="text-[#A8B5A0] font-bold">•</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
