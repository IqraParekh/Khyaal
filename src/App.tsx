import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { BrainDumpPage } from './pages/BrainDumpPage';
import { JournalHistoryPage } from './pages/JournalHistoryPage';
import { GratitudePage } from './pages/GratitudePage';
import { PatternsPage } from './pages/PatternsPage';
import { DailyReflectionModal } from './components/DailyReflectionModal';
import { PrivacyModal } from './components/PrivacyModal';
import { AuthModal } from './components/AuthModal';
import { testFirestoreConnection } from './firebase';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'dump' | 'journal' | 'patterns' | 'gratitude'>('home');
  const [dailyModalOpen, setDailyModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [activePrompt, setActivePrompt] = useState<string | undefined>();
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);

  useEffect(() => {
    // Validate connection to Firestore on initial boot per skill requirements
    testFirestoreConnection();
  }, []);

  const handleStartWithPrompt = (promptText: string) => {
    setActivePrompt(promptText);
    setActiveTab('dump');
  };

  const handleSavedEntry = (entryId: string) => {
    setSelectedEntryId(entryId);
    setActiveTab('journal');
  };

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-[#F6F2EA] text-[#3F4039] selection:bg-[#E9E1D5] selection:text-[#3F4039]">
        {/* Top Navigation */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenDaily={() => setDailyModalOpen(true)}
          onOpenPrivacy={() => setPrivacyModalOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6">
          {activeTab === 'home' && (
            <HomePage
              onStartJournal={() => {
                setActivePrompt(undefined);
                setActiveTab('dump');
              }}
              onViewJournal={() => setActiveTab('journal')}
              onOpenDaily={() => setDailyModalOpen(true)}
              onOpenPrivacy={() => setPrivacyModalOpen(true)}
            />
          )}

          {activeTab === 'dump' && (
            <BrainDumpPage
              initialPrompt={activePrompt}
              onSaved={handleSavedEntry}
              onGoBack={() => setActiveTab('home')}
            />
          )}

          {activeTab === 'journal' && (
            <JournalHistoryPage
              selectedEntryId={selectedEntryId}
              onNewReflection={() => {
                setActivePrompt(undefined);
                setActiveTab('dump');
              }}
            />
          )}

          {activeTab === 'gratitude' && <GratitudePage />}

          {activeTab === 'patterns' && (
            <PatternsPage
              onStartReflection={(prompt) => {
                setActivePrompt(prompt);
                setActiveTab('dump');
              }}
            />
          )}
        </main>

        {/* Footer */}
        <Footer
          onOpenDaily={() => setDailyModalOpen(true)}
          onOpenPrivacy={() => setPrivacyModalOpen(true)}
        />

        {/* Global Modals */}
        <AuthModal />

        <DailyReflectionModal
          isOpen={dailyModalOpen}
          onClose={() => setDailyModalOpen(false)}
          onStartWithPrompt={handleStartWithPrompt}
        />

        <PrivacyModal
          isOpen={privacyModalOpen}
          onClose={() => setPrivacyModalOpen(false)}
        />
      </div>
    </AuthProvider>
  );
}
