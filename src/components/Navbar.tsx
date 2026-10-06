import React from 'react';
import { BookOpen, Sparkles, Compass, ShieldCheck, PenLine, HeartHandshake } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'dump' | 'journal' | 'patterns';
  setActiveTab: (tab: 'home' | 'dump' | 'journal' | 'patterns') => void;
  onOpenDaily: () => void;
  onOpenPrivacy: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenDaily,
  onOpenPrivacy
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#F6F2EA]/90 backdrop-blur-md border-b border-[#E9E1D5]/80 transition-all">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-full bg-[#E9E1D5] border border-[#B49A68]/30 flex items-center justify-center text-[#786A5B] font-serif text-lg font-bold group-hover:border-[#B49A68] transition">
            خ
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-xl font-medium tracking-tight text-[#3F4039]">
                Khayal
              </span>
              <span className="font-arabic text-sm text-[#786A5B] opacity-80" dir="rtl">
                خيال
              </span>
            </div>
            <p className="hidden sm:block text-[10px] text-[#786A5B] tracking-wider uppercase">
              Untangle thoughts · Return to Allah
            </p>
          </div>
        </button>

        {/* Navigation links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveTab('dump')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition ${
              activeTab === 'dump'
                ? 'bg-[#3F4039] text-[#F6F2EA]'
                : 'text-[#786A5B] hover:text-[#3F4039] hover:bg-[#E9E1D5]/60'
            }`}
          >
            <PenLine className="w-3.5 h-3.5" />
            <span>Reflect</span>
          </button>

          <button
            onClick={() => setActiveTab('journal')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition ${
              activeTab === 'journal'
                ? 'bg-[#3F4039] text-[#F6F2EA]'
                : 'text-[#786A5B] hover:text-[#3F4039] hover:bg-[#E9E1D5]/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Journal</span>
          </button>

          <button
            onClick={() => setActiveTab('patterns')}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition ${
              activeTab === 'patterns'
                ? 'bg-[#3F4039] text-[#F6F2EA]'
                : 'text-[#786A5B] hover:text-[#3F4039] hover:bg-[#E9E1D5]/60'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Patterns</span>
          </button>

          <button
            onClick={onOpenDaily}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium text-[#786A5B] hover:text-[#3F4039] hover:bg-[#E9E1D5]/60 transition"
            title="Today's Reflection Prompt"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B49A68]" />
            <span className="hidden sm:inline">Daily</span>
          </button>

          <button
            onClick={onOpenPrivacy}
            className="p-2 rounded-full text-[#786A5B] hover:text-[#3F4039] hover:bg-[#E9E1D5]/60 transition"
            title="Privacy & Sourcing Principles"
            aria-label="Privacy and Sourcing Principles"
          >
            <ShieldCheck className="w-4 h-4 text-[#A8B5A0]" />
          </button>
        </nav>
      </div>
    </header>
  );
};
