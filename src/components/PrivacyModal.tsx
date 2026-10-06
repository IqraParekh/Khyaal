import React from 'react';
import { Shield, Lock, EyeOff, CheckCircle2, Feather, X } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3F4039]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] max-w-xl w-full max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border border-[#E9E1D5] shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#786A5B] hover:text-[#3F4039] hover:bg-[#E9E1D5]/60 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full bg-[#A8B5A0]/20 flex items-center justify-center text-[#786A5B]">
            <Shield className="w-5 h-5 text-[#A8B5A0]" />
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A8B5A0]">
              Sanctuary of Trust
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-[#3F4039]">
              Privacy & Ethical Grounding
            </h3>
          </div>
        </div>

        {/* Core Reassurance */}
        <div className="p-5 rounded-2xl bg-[#E9E1D5]/40 border border-[#E9E1D5] mb-6">
          <p className="font-serif text-base text-[#3F4039] italic leading-relaxed">
            "Your journal is yours. What you write in the quiet stays in your hands."
          </p>
          <p className="text-xs text-[#786A5B] mt-2 leading-relaxed">
            Khayal is intentionally designed as an intimate space of solitude.
            There are no social feeds, public profiles, public shares, or tracking algorithms.
          </p>
        </div>

        {/* Pillars */}
        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F6F2EA] border border-[#E9E1D5]">
            <Lock className="w-4 h-4 text-[#B49A68] mt-0.5 shrink-0" />
            <div>
              <h4 className="text-xs font-semibold text-[#3F4039]">
                Local Hardware-Level Encryption (AES-GCM 256-bit)
              </h4>
              <p className="text-xs text-[#786A5B] mt-0.5 leading-relaxed">
                All journal entries and reflections are encrypted using the Web Crypto API on your local browser before being saved. Your reflections remain private on this device.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F6F2EA] border border-[#E9E1D5]">
            <EyeOff className="w-4 h-4 text-[#A8B5A0] mt-0.5 shrink-0" />
            <div>
              <h4 className="text-xs font-semibold text-[#3F4039]">
                Zero Socialization or Public Exposure
              </h4>
              <p className="text-xs text-[#786A5B] mt-0.5 leading-relaxed">
                We do not have followers, likes, public profiles, or sharing links. We will never sell, publish, or use your reflections for public feeds.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F6F2EA] border border-[#E9E1D5]">
            <Feather className="w-4 h-4 text-[#786A5B] mt-0.5 shrink-0" />
            <div>
              <h4 className="text-xs font-semibold text-[#3F4039]">
                Strict Islamic Sourcing & Distinction
              </h4>
              <p className="text-xs text-[#786A5B] mt-0.5 leading-relaxed">
                We adhere to an authentic Ahl al-Hadith methodology. We never fabricate verses, narrations, or scholar statements. Qur'an, Hadith, Scholarly statements, and AI reflections are explicitly distinguished.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F6F2EA] border border-[#E9E1D5]">
            <CheckCircle2 className="w-4 h-4 text-[#786A5B] mt-0.5 shrink-0" />
            <div>
              <h4 className="text-xs font-semibold text-[#3F4039]">
                Non-Diagnostic Clinical & Religious Boundary
              </h4>
              <p className="text-xs text-[#786A5B] mt-0.5 leading-relaxed">
                Khayal does not diagnose mental health disorders, issue fatwas, or claim that anxiety is caused by "weak iman". Spiritual reminders complement reflection and medical/psychological care; they do not replace them.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-[#3F4039] text-[#F6F2EA] text-xs sm:text-sm font-medium hover:bg-[#2F3029] transition"
          >
            I understand
          </button>
        </div>
      </div>
    </div>
  );
};
