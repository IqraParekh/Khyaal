import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Shield,
  Cloud,
  CheckCircle2,
  X,
  LogOut,
  RefreshCw,
  Lock,
  Smartphone,
  AlertCircle
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    user,
    cloudConsent,
    setCloudConsent,
    signInWithGoogle,
    signOutUser,
    syncStatus,
    lastSyncedAt,
    syncEntriesWithCloud,
    showAuthModal,
    setShowAuthModal,
  } = useAuth();

  const [consentChecked, setConsentChecked] = useState(cloudConsent);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  if (!showAuthModal) return null;

  const handleSignIn = async () => {
    setErrorMsg(null);
    setIsSigningIn(true);
    try {
      await signInWithGoogle();
      if (consentChecked !== cloudConsent) {
        await setCloudConsent(consentChecked);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Authentication was cancelled or failed.');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleToggleConsent = async (val: boolean) => {
    setConsentChecked(val);
    if (user) {
      await setCloudConsent(val);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3F4039]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] max-w-md w-full rounded-3xl p-6 sm:p-8 border border-[#E9E1D5] shadow-2xl relative">
        <button
          onClick={() => setShowAuthModal(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-[#786A5B] hover:text-[#3F4039] hover:bg-[#E9E1D5]/60 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full bg-[#B49A68]/20 flex items-center justify-center text-[#786A5B]">
            <Cloud className="w-5 h-5 text-[#B49A68]" />
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B49A68]">
              Account & Sync
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-[#3F4039]">
              {user ? 'Cloud Synchronization' : 'Secure Cloud Access'}
            </h3>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {!user ? (
          /* Not Signed In State */
          <div className="space-y-5">
            <p className="text-xs sm:text-sm text-[#786A5B] leading-relaxed">
              Sign in to securely synchronize your reflections across your phone, tablet, and computer so you never lose your progress.
            </p>

            {/* Privacy Promise */}
            <div className="p-4 rounded-2xl bg-[#E9E1D5]/40 border border-[#E9E1D5] space-y-2 text-xs text-[#3F4039]">
              <div className="flex items-center gap-2 font-medium">
                <Lock className="w-3.5 h-3.5 text-[#A8B5A0]" />
                <span>Our Privacy Promise</span>
              </div>
              <ul className="space-y-1.5 text-[#786A5B] text-[11px]">
                <li>• Your reflections are never public, shared, or indexed.</li>
                <li>• No social feed, followers, or likes.</li>
                <li>• Stored strictly in your personal, isolated database vault.</li>
              </ul>
            </div>

            {/* Explicit Consent Checkbox */}
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#3F4039] p-3 rounded-xl bg-[#F6F2EA] border border-[#E9E1D5]">
              <input
                type="checkbox"
                checked={consentChecked}
                onChange={(e) => handleToggleConsent(e.target.checked)}
                className="mt-0.5 rounded text-[#3F4039] focus:ring-[#B49A68]"
              />
              <span className="leading-snug">
                I explicitly consent to synchronize and store my private reflections in my secure cloud vault.
              </span>
            </label>

            <button
              onClick={handleSignIn}
              disabled={isSigningIn}
              className="w-full py-3 rounded-full bg-[#3F4039] text-[#F6F2EA] text-sm font-medium hover:bg-[#2F3029] flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              {isSigningIn ? (
                <span>Connecting...</span>
              ) : (
                <>
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </>
              )}
            </button>
          </div>
        ) : (
          /* Signed In State */
          <div className="space-y-5">
            <div className="p-4 rounded-2xl bg-[#E9E1D5]/50 border border-[#E9E1D5]">
              <div className="text-xs text-[#786A5B]">Connected Account</div>
              <div className="font-medium text-sm text-[#3F4039] mt-0.5">
                {user.displayName || user.email}
              </div>
              <div className="text-[11px] text-[#786A5B] font-mono mt-0.5">
                {user.email}
              </div>
            </div>

            {/* Sync Consent Toggle */}
            <div className="p-4 rounded-2xl bg-[#F6F2EA] border border-[#E9E1D5] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-[#3F4039]">
                    Cloud Synchronization
                  </h4>
                  <p className="text-[11px] text-[#786A5B]">
                    Keep your journal synchronized across devices
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={cloudConsent}
                  onChange={(e) => handleToggleConsent(e.target.checked)}
                  className="rounded text-[#3F4039] focus:ring-[#B49A68] w-4 h-4"
                />
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-[#E9E1D5]">
                <span className="text-[#786A5B]">Status:</span>
                <span className="font-medium capitalize text-[#3F4039]">
                  {syncStatus === 'syncing'
                    ? 'Syncing reflections...'
                    : syncStatus === 'synced'
                    ? 'All reflections synced ✓'
                    : syncStatus === 'error'
                    ? 'Sync error'
                    : cloudConsent
                    ? 'Active'
                    : 'Disabled by user'}
                </span>
              </div>

              {lastSyncedAt && (
                <div className="text-[10px] text-[#786A5B] text-right">
                  Last synced: {lastSyncedAt.toLocaleTimeString()}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={syncEntriesWithCloud}
                disabled={!cloudConsent || syncStatus === 'syncing'}
                className="flex-1 py-2.5 rounded-full bg-[#3F4039] text-[#F6F2EA] text-xs font-medium hover:bg-[#2F3029] flex items-center justify-center gap-2 transition disabled:opacity-40"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${
                    syncStatus === 'syncing' ? 'animate-spin' : ''
                  }`}
                />
                <span>Sync Now</span>
              </button>

              <button
                onClick={signOutUser}
                className="px-4 py-2.5 rounded-full border border-[#E9E1D5] text-[#786A5B] hover:text-[#3F4039] hover:bg-[#E9E1D5]/60 text-xs font-medium flex items-center gap-1.5 transition"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
