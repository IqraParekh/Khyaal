import React from 'react';
import { CrisisSupportData } from '../types';
import { PhoneCall, HeartHandshake, ShieldAlert, X } from 'lucide-react';

interface CrisisModalProps {
  data: CrisisSupportData;
  onClose: () => void;
}

export const CrisisModal: React.FC<CrisisModalProps> = ({ data, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3F4039]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] max-w-xl w-full rounded-3xl p-6 sm:p-8 border border-[#E9E1D5] shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#786A5B] hover:text-[#3F4039] hover:bg-[#E9E1D5]/60 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#B49A68]/20 flex items-center justify-center text-[#786A5B]">
            <HeartHandshake className="w-5 h-5 text-[#B49A68]" />
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#786A5B]">
              Compassionate Support
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-[#3F4039]">
              {data.title}
            </h3>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#E9E1D5]/50 border border-[#E9E1D5] mb-5">
          <p className="text-sm sm:text-base text-[#3F4039] leading-relaxed">
            {data.compassionateMessage}
          </p>
        </div>

        <div className="space-y-3 mb-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#786A5B]">
            Immediate Gentle Steps
          </h4>
          <ul className="space-y-2">
            {data.guidance.map((step, idx) => (
              <li
                key={idx}
                className="text-xs sm:text-sm text-[#3F4039] flex items-start gap-2.5 bg-[#F6F2EA] p-3 rounded-xl border border-[#E9E1D5]"
              >
                <span className="text-[#A8B5A0] font-bold">•</span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3 mb-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#786A5B]">
            Confidential Resources
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {data.resources.map((res, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E9E1D5] hover:border-[#A8B5A0] transition flex flex-col justify-between"
              >
                <div>
                  <h5 className="text-xs font-semibold text-[#3F4039]">{res.name}</h5>
                  <p className="text-xs font-mono font-medium text-[#786A5B] mt-0.5">
                    {res.contact}
                  </p>
                </div>
                <span className="text-[10px] text-[#786A5B]/80 mt-2">{res.note}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#E9E1D5]/30 text-center text-xs text-[#786A5B] leading-relaxed">
          Seeking emergency medical or psychological assistance is an act of preservation and courage.
          Faith does not require you to suffer in isolation.
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-[#3F4039] text-[#F6F2EA] text-xs sm:text-sm font-medium hover:bg-[#2F3029] transition"
          >
            I understand, return to quiet journal
          </button>
        </div>
      </div>
    </div>
  );
};
