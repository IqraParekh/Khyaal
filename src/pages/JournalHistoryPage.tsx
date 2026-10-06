import React, { useState, useEffect } from 'react';
import { JournalEntry, MoodType } from '../types';
import { getStoredEntries, deleteEntry, saveEntry } from '../utils/storage';
import { FactOrFearCards } from '../components/FactOrFearCards';
import { ControlCircle } from '../components/ControlCircle';
import { OneSmallStepCard } from '../components/OneSmallStepCard';
import { IslamicGroundingCard } from '../components/IslamicGroundingCard';
import { useAuth } from '../context/AuthContext';
import {
  Search,
  Calendar,
  Trash2,
  Edit3,
  BookOpen,
  Sparkles,
  Lock,
  ArrowRight,
  X,
  Save,
  Filter,
  Cloud
} from 'lucide-react';

interface JournalHistoryPageProps {
  onNewReflection: () => void;
  selectedEntryId?: string | null;
}

export const JournalHistoryPage: React.FC<JournalHistoryPageProps> = ({
  onNewReflection,
  selectedEntryId,
}) => {
  const { user, cloudConsent, syncStatus, syncEntriesWithCloud } = useAuth();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMoodFilter, setSelectedMoodFilter] = useState<string>('all');
  const [activeEntry, setActiveEntry] = useState<JournalEntry | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState('');
  const [loading, setLoading] = useState(true);

  const loadEntries = async () => {
    setLoading(true);
    const data = await getStoredEntries();
    setEntries(data);
    if (selectedEntryId) {
      const match = data.find((e) => e.id === selectedEntryId);
      if (match) setActiveEntry(match);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadEntries();
  }, [selectedEntryId]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this reflection?')) {
      await deleteEntry(id);
      if (activeEntry?.id === id) {
        setActiveEntry(null);
      }
      await loadEntries();
      if (user && cloudConsent) {
        syncEntriesWithCloud();
      }
    }
  };

  const handleStartEdit = () => {
    if (!activeEntry) return;
    setEditText(activeEntry.rawText);
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    if (!activeEntry) return;
    const updated: JournalEntry = {
      ...activeEntry,
      rawText: editText,
      updatedAt: new Date().toISOString(),
    };
    await saveEntry(updated);
    setActiveEntry(updated);
    setIsEditing(false);
    await loadEntries();
    if (user && cloudConsent) {
      syncEntriesWithCloud();
    }
  };

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.rawText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (entry.reflection?.summary &&
        entry.reflection.summary.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesMood =
      selectedMoodFilter === 'all' || entry.mood === selectedMoodFilter;

    return matchesSearch && matchesMood;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#3F4039] font-normal">
            My Journal
          </h1>
          <p className="text-xs sm:text-sm text-[#786A5B] mt-1 font-light flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-[#A8B5A0]" />
            <span>Locally encrypted and stored private to your device</span>
            {user && cloudConsent && (
              <>
                <span>·</span>
                <span className="flex items-center gap-1 text-[#3F4039]">
                  <Cloud className="w-3.5 h-3.5 text-[#B49A68]" />
                  <span>Cloud Synced</span>
                </span>
              </>
            )}
          </p>
        </div>

        <button
          onClick={onNewReflection}
          className="self-start sm:self-auto px-5 py-2.5 rounded-full bg-[#3F4039] text-[#F6F2EA] text-xs sm:text-sm font-medium hover:bg-[#2F3029] flex items-center gap-2 transition"
        >
          <Sparkles className="w-4 h-4 text-[#B49A68]" />
          <span>New Reflection</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2 relative">
          <Search className="w-4 h-4 text-[#786A5B] absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search through your entries & thoughts..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E9E1D5] text-xs sm:text-sm text-[#3F4039] focus:outline-none focus:border-[#B49A68]"
          />
        </div>

        <div className="relative">
          <Filter className="w-3.5 h-3.5 text-[#786A5B] absolute left-3.5 top-3.5" />
          <select
            value={selectedMoodFilter}
            onChange={(e) => setSelectedMoodFilter(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E9E1D5] text-xs sm:text-sm text-[#3F4039] focus:outline-none focus:border-[#B49A68] appearance-none"
          >
            <option value="all">All Moods</option>
            <option value="Calm">Calm</option>
            <option value="Heavy">Heavy</option>
            <option value="Worried">Worried</option>
            <option value="Overwhelmed">Overwhelmed</option>
            <option value="Sad">Sad</option>
            <option value="Frustrated">Frustrated</option>
            <option value="Confused">Confused</option>
            <option value="Hopeful">Hopeful</option>
            <option value="Grateful">Grateful</option>
            <option value="Numb">Numb</option>
          </select>
        </div>
      </div>

      {/* Entries List */}
      {loading ? (
        <div className="text-center py-12 text-[#786A5B] text-sm">
          Loading your journal entries...
        </div>
      ) : filteredEntries.length === 0 ? (
        <div className="text-center py-16 bg-[#FAF7F2] rounded-3xl border border-[#E9E1D5] p-8 space-y-4">
          <BookOpen className="w-10 h-10 text-[#786A5B]/40 mx-auto" />
          <h3 className="font-serif text-xl text-[#3F4039]">No reflections found</h3>
          <p className="text-xs sm:text-sm text-[#786A5B] max-w-sm mx-auto">
            {searchQuery
              ? 'Try adjusting your search keywords or mood filter.'
              : 'Your journal is completely empty. Begin whenever you feel ready to put your thoughts down.'}
          </p>
          <button
            onClick={onNewReflection}
            className="px-5 py-2.5 rounded-full bg-[#3F4039] text-[#F6F2EA] text-xs font-medium hover:bg-[#2F3029] inline-flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B49A68]" />
            <span>Write a Reflection</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredEntries.map((entry) => {
            const dateStr = new Date(entry.createdAt).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div
                key={entry.id}
                onClick={() => {
                  setActiveEntry(entry);
                  setIsEditing(false);
                }}
                className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E9E1D5] hover:border-[#B49A68]/50 cursor-pointer transition shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap text-xs text-[#786A5B]">
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <Calendar className="w-3 h-3 text-[#B49A68]" />
                      {dateStr}
                    </span>
                    {entry.mood && (
                      <span className="px-2 py-0.5 rounded-md bg-[#E9E1D5] text-[#3F4039] text-[11px] font-medium">
                        {entry.mood}
                      </span>
                    )}
                    {entry.hasReflection ? (
                      <span className="px-2 py-0.5 rounded-md bg-[#A8B5A0]/20 text-[#3F4039] text-[10px] font-medium flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 text-[#A8B5A0]" />
                        Untangled
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-[#E9E1D5]/60 text-[#786A5B] text-[10px]">
                        Raw entry
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-lg text-[#3F4039] group-hover:text-[#786A5B] transition truncate">
                    {entry.title || 'Quiet Reflection'}
                  </h3>

                  <p className="text-xs text-[#786A5B] line-clamp-2 leading-relaxed">
                    {entry.reflection?.summary || entry.rawText}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={(e) => handleDelete(entry.id, e)}
                    className="p-2 rounded-xl text-[#786A5B] hover:text-red-700 hover:bg-red-50/60 transition"
                    title="Delete entry"
                    aria-label="Delete entry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="p-2 rounded-xl text-[#786A5B] group-hover:text-[#3F4039] group-hover:bg-[#E9E1D5]/60 transition">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detailed Full Entry Modal */}
      {activeEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3F4039]/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FAF7F2] max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border border-[#E9E1D5] shadow-2xl relative space-y-6">
            <button
              onClick={() => {
                setActiveEntry(null);
                setIsEditing(false);
              }}
              className="absolute top-5 right-5 p-2 rounded-full text-[#786A5B] hover:text-[#3F4039] hover:bg-[#E9E1D5]/60 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div>
              <div className="flex items-center gap-2 text-xs text-[#786A5B] mb-1">
                <span>
                  {new Date(activeEntry.createdAt).toLocaleDateString(undefined, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
                {activeEntry.mood && (
                  <span className="px-2 py-0.5 rounded-full bg-[#E9E1D5] text-[#3F4039] text-[11px] font-medium">
                    {activeEntry.mood}
                  </span>
                )}
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#3F4039]">
                {activeEntry.title}
              </h2>
            </div>

            {/* Raw Text / Edit Mode */}
            <div className="bg-[#F6F2EA] p-5 rounded-2xl border border-[#E9E1D5]">
              <div className="flex items-center justify-between mb-3 text-xs text-[#786A5B]">
                <span className="font-semibold uppercase tracking-wider text-[10px]">
                  What You Wrote
                </span>
                {!isEditing ? (
                  <button
                    onClick={handleStartEdit}
                    className="flex items-center gap-1 hover:text-[#3F4039] text-[11px]"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit entry</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="hover:text-[#3F4039] text-[11px]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      className="px-3 py-1 rounded-full bg-[#3F4039] text-[#F6F2EA] text-[11px] flex items-center gap-1"
                    >
                      <Save className="w-3 h-3" />
                      <span>Save</span>
                    </button>
                  </div>
                )}
              </div>

              {isEditing ? (
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  rows={6}
                  className="w-full bg-[#FAF7F2] p-3 rounded-xl border border-[#E9E1D5] text-sm text-[#3F4039] focus:outline-none focus:border-[#B49A68]"
                />
              ) : (
                <p className="text-xs sm:text-sm text-[#3F4039] leading-relaxed whitespace-pre-wrap font-light">
                  {activeEntry.rawText}
                </p>
              )}
            </div>

            {/* Reflection details if untangled */}
            {activeEntry.reflection && (
              <div className="space-y-8 pt-4 border-t border-[#E9E1D5]">
                <div className="p-5 rounded-2xl bg-[#E9E1D5]/40 border border-[#E9E1D5]">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#786A5B] block mb-1">
                    REFLECTION SUMMARY
                  </span>
                  <p className="font-serif text-base text-[#3F4039] leading-relaxed">
                    "{activeEntry.reflection.summary}"
                  </p>
                </div>

                <FactOrFearCards data={activeEntry.reflection.factVsFear} />
                <ControlCircle data={activeEntry.reflection.controlCircle} />
                <OneSmallStepCard data={activeEntry.reflection.oneSmallStep} />

                {activeEntry.reflection.islamicGrounding && (
                  <IslamicGroundingCard
                    data={activeEntry.reflection.islamicGrounding}
                  />
                )}
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-[#E9E1D5]">
              <button
                onClick={(e) => handleDelete(activeEntry.id, e)}
                className="text-xs text-red-700 hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete this reflection</span>
              </button>

              <button
                onClick={() => {
                  setActiveEntry(null);
                  setIsEditing(false);
                }}
                className="px-5 py-2 rounded-full bg-[#E9E1D5] text-[#3F4039] text-xs font-medium hover:bg-[#E9E1D5]/80 transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
