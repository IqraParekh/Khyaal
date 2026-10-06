import React from 'react';
import { Shield, Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenDaily: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenDaily }) => {
  return (
    <footer className="mt-20 border-t border-[#E9E1D5] py-12 text-[#786A5B] bg-[#F6F2EA]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-serif text-lg font-medium text-[#3F4039]">Khayal</span>
              <span className="font-arabic text-sm text-[#786A5B]">خيال</span>
            </div>
            <p className="text-xs text-[#786A5B] mt-1 max-w-sm">
              "Untangle your thoughts. Return your heart to Allah."
              A quiet, private sanctuary for overthinking and reflection.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <button
              onClick={onOpenPrivacy}
              className="flex items-center gap-1.5 hover:text-[#3F4039] transition underline-offset-4 hover:underline"
            >
              <Shield className="w-3.5 h-3.5 text-[#A8B5A0]" />
              <span>Private & Locally Encrypted</span>
            </button>
            <span className="text-[#E9E1D5]">•</span>
            <button
              onClick={onOpenDaily}
              className="flex items-center gap-1.5 hover:text-[#3F4039] transition underline-offset-4 hover:underline"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B49A68]" />
              <span>Today's Reflection</span>
            </button>
            <span className="text-[#E9E1D5]">•</span>
            <span className="text-[11px] text-[#786A5B]/80">
              Authentic Qur'an & Sunnah Sourcing
            </span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#E9E1D5]/60 text-center text-[11px] text-[#786A5B]/70 space-y-1">
          <p>
            Khayal is not a diagnostic tool, therapist, or mufti. It does not replace medical or psychological care.
          </p>
          <p>
            Spiritual reminders follow verified Ahl al-Hadith sourcing to bring calmness and perspective alongside practical action.
          </p>
        </div>
      </div>
    </footer>
  );
};
