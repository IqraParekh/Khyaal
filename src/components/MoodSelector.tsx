import React from 'react';
import { MoodType } from '../types';

interface MoodSelectorProps {
  selectedMood?: MoodType;
  onSelectMood: (mood: MoodType) => void;
}

const MOODS: { type: MoodType; label: string; desc: string }[] = [
  { type: 'Calm', label: 'Calm', desc: 'At peace, settled' },
  { type: 'Heavy', label: 'Heavy', desc: 'Carrying a weight' },
  { type: 'Worried', label: 'Worried', desc: 'Racing or fearful' },
  { type: 'Overwhelmed', label: 'Overwhelmed', desc: 'Too many things' },
  { type: 'Sad', label: 'Sad', desc: 'Grieving or low' },
  { type: 'Frustrated', label: 'Frustrated', desc: 'Blocked, annoyed' },
  { type: 'Confused', label: 'Confused', desc: 'Unsure of the path' },
  { type: 'Hopeful', label: 'Hopeful', desc: 'Glimpse of light' },
  { type: 'Grateful', label: 'Grateful', desc: 'Recognizing blessings' },
  { type: 'Numb', label: 'Numb', desc: 'Disconnected, exhausted' },
];

export const MoodSelector: React.FC<MoodSelectorProps> = ({
  selectedMood,
  onSelectMood,
}) => {
  return (
    <div className="bg-[#F6F2EA] rounded-2xl p-5 border border-[#E9E1D5] transition">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-3">
        <h3 className="font-serif text-lg text-[#3F4039] font-normal">
          How does your heart feel right now?
        </h3>
        <span className="text-[11px] text-[#786A5B]/80 italic">
          Optional gentle check-in · not a clinical assessment
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {MOODS.map((item) => {
          const isSelected = selectedMood === item.type;
          return (
            <button
              key={item.type}
              type="button"
              onClick={() => onSelectMood(item.type)}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all text-left flex flex-col ${
                isSelected
                  ? 'bg-[#3F4039] text-[#F6F2EA] shadow-xs'
                  : 'bg-[#E9E1D5]/40 hover:bg-[#E9E1D5] text-[#3F4039] border border-transparent hover:border-[#B49A68]/30'
              }`}
            >
              <span className="font-medium">{item.label}</span>
              <span
                className={`text-[10px] ${
                  isSelected ? 'text-[#F6F2EA]/75' : 'text-[#786A5B]'
                }`}
              >
                {item.desc}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
