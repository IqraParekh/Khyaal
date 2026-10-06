import React, { useState } from 'react';
import { ControlCircleData } from '../types';
import { ShieldCheck, CloudOff, Check } from 'lucide-react';

interface ControlCircleProps {
  data: ControlCircleData;
}

export const ControlCircle: React.FC<ControlCircleProps> = ({ data }) => {
  const [selectedActionIndex, setSelectedActionIndex] = useState<number | null>(0);

  return (
    <section className="space-y-4">
      <div className="text-center max-w-xl mx-auto mb-6">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#786A5B]">
          Inner Boundaries
        </span>
        <h3 className="font-serif text-2xl text-[#3F4039] mt-1 font-normal">
          What Belongs to You?
        </h3>
        <p className="text-xs sm:text-sm text-[#786A5B] mt-1.5 leading-relaxed">
          The heart tires when it attempts to carry what does not belong to it.
          Distinguish what you can influence from what you must entrust to Allah.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* I CAN CONTROL */}
        <div className="bg-[#FAF7F2] p-6 rounded-3xl border-2 border-[#A8B5A0]/40 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#A8B5A0]/10 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none" />

          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#A8B5A0]/25 text-[#3F4039] flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-[#786A5B]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold tracking-wide text-[#3F4039]">
                  I CAN CONTROL
                </h4>
                <p className="text-[11px] text-[#786A5B]">Your effort, words, pauses, and choices</p>
              </div>
            </div>

            <ul className="space-y-2.5">
              {data.withinControl.map((item, idx) => {
                const isSelected = selectedActionIndex === idx;
                return (
                  <li
                    key={idx}
                    onClick={() => setSelectedActionIndex(idx)}
                    className={`cursor-pointer text-xs sm:text-sm p-3 rounded-xl border transition flex items-start gap-3 ${
                      isSelected
                        ? 'bg-[#E9E1D5] border-[#B49A68] text-[#3F4039] font-medium shadow-xs'
                        : 'bg-[#E9E1D5]/40 border-transparent text-[#3F4039] hover:bg-[#E9E1D5]/70'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full mt-0.5 flex items-center justify-center shrink-0 border ${
                        isSelected
                          ? 'bg-[#3F4039] border-[#3F4039] text-[#F6F2EA]'
                          : 'border-[#786A5B]/40'
                      }`}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5" />}
                    </div>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-5 pt-4 border-t border-[#E9E1D5] text-[11px] text-[#786A5B] flex items-center justify-between">
            <span>Tap an item you will act on today</span>
            <span className="text-[#3F4039] font-medium">Your circle</span>
          </div>
        </div>

        {/* I CANNOT CONTROL */}
        <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#E9E1D5] shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#E9E1D5]/40 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none" />

          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#E9E1D5] text-[#786A5B] flex items-center justify-center">
                <CloudOff className="w-4 h-4 text-[#786A5B]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold tracking-wide text-[#786A5B]">
                  I CANNOT CONTROL
                </h4>
                <p className="text-[11px] text-[#786A5B]/80">Other hearts, outcomes, the past, the unseen</p>
              </div>
            </div>

            <ul className="space-y-2.5">
              {data.outsideControl.map((item, idx) => (
                <li
                  key={idx}
                  className="text-xs sm:text-sm p-3 rounded-xl bg-[#E9E1D5]/20 border border-[#E9E1D5]/40 text-[#786A5B] flex items-start gap-2.5"
                >
                  <span className="text-[#B49A68] mt-0.5 text-xs font-semibold">✕</span>
                  <span className="leading-relaxed italic">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 pt-4 border-t border-[#E9E1D5] text-[11px] text-[#786A5B] flex items-center justify-between">
            <span>Release these with tawakkul</span>
            <span className="text-[#786A5B] font-medium">Leave with Allah</span>
          </div>
        </div>
      </div>

      <div className="text-center p-3 rounded-xl bg-[#E9E1D5]/30 text-xs text-[#786A5B] max-w-md mx-auto">
        "Choose one thing you can act on today, and entrust the rest."
      </div>
    </section>
  );
};
