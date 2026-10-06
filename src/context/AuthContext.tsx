import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
} from 'firebase/firestore';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from '../firebase';
import { JournalEntry } from '../types';
import { getStoredEntries, saveEntry } from '../utils/storage';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  cloudConsent: boolean;
  setCloudConsent: (consent: boolean) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  syncStatus: 'idle' | 'syncing' | 'synced' | 'error' | 'disabled';
  lastSyncedAt: Date | null;
  syncEntriesWithCloud: () => Promise<void>;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const CONSENT_STORAGE_KEY = 'khayal_cloud_sync_consent_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [cloudConsent, setCloudConsentState] = useState<boolean>(() => {
    return localStorage.getItem(CONSENT_STORAGE_KEY) === 'true';
  });
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'error' | 'disabled'>('idle');
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch or initialize user profile and cloud consent
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const snap = await getDoc(userDocRef);
          if (snap.exists()) {
            const data = snap.data();
            const remoteConsent = !!data.cloudSyncConsent;
            setCloudConsentState(remoteConsent);
            localStorage.setItem(CONSENT_STORAGE_KEY, String(remoteConsent));
          } else {
            // First time profile creation
            const initialConsent = localStorage.getItem(CONSENT_STORAGE_KEY) === 'true';
            await setDoc(userDocRef, {
              id: currentUser.uid,
              email: currentUser.email || '',
              displayName: currentUser.displayName || '',
              cloudSyncConsent: initialConsent,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            });
          }
        } catch (err) {
          console.warn('Could not read user profile doc:', err);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateConsent = async (consent: boolean) => {
    setCloudConsentState(consent);
    localStorage.setItem(CONSENT_STORAGE_KEY, String(consent));

    if (user) {
      const userPath = `users/${user.uid}`;
      try {
        await setDoc(
          doc(db, 'users', user.uid),
          {
            id: user.uid,
            cloudSyncConsent: consent,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, userPath);
      }

      if (consent) {
        await syncEntriesWithCloud();
      } else {
        setSyncStatus('disabled');
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setShowAuthModal(false);
    } catch (err) {
      console.error('Google sign-in error:', err);
      throw err;
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setSyncStatus('idle');
    } catch (err) {
      console.error('Sign-out error:', err);
    }
  };

  const syncEntriesWithCloud = async () => {
    if (!user || !cloudConsent) {
      setSyncStatus('disabled');
      return;
    }

    setSyncStatus('syncing');
    const entriesPath = `users/${user.uid}/entries`;

    try {
      // 1. Fetch remote entries
      const entriesCol = collection(db, 'users', user.uid, 'entries');
      const snapshot = await getDocs(entriesCol);
      const remoteEntriesMap = new Map<string, any>();
      snapshot.forEach((docSnap) => {
        remoteEntriesMap.set(docSnap.id, docSnap.data());
      });

      // 2. Fetch local entries
      const localEntries = await getStoredEntries();

      // 3. Upload local entries that don't exist remotely or are newer
      for (const local of localEntries) {
        const remote = remoteEntriesMap.get(local.id);
        const shouldUpload =
          !remote || new Date(local.updatedAt) > new Date(remote.updatedAt || 0);

        if (shouldUpload) {
          const entryDocRef = doc(db, 'users', user.uid, 'entries', local.id);
          await setDoc(entryDocRef, {
            id: local.id,
            userId: user.uid,
            title: local.title,
            rawText: local.rawText,
            mood: local.mood || '',
            hasReflection: !!local.hasReflection,
            reflectionData: local.reflection ? JSON.stringify(local.reflection) : '',
            isEncrypted: !!local.isEncrypted,
            createdAt: local.createdAt,
            updatedAt: local.updatedAt,
          });
        }
      }

      // 4. Download remote entries that are missing locally
      for (const [id, remote] of remoteEntriesMap.entries()) {
        const existingLocal = localEntries.find((e) => e.id === id);
        if (!existingLocal) {
          let reflectionObj = undefined;
          if (remote.reflectionData) {
            try {
              reflectionObj = JSON.parse(remote.reflectionData);
            } catch {
              reflectionObj = undefined;
            }
          }

          const downloadedEntry: JournalEntry = {
            id: remote.id,
            title: remote.title,
            rawText: remote.rawText,
            mood: remote.mood || undefined,
            hasReflection: !!remote.hasReflection,
            reflection: reflectionObj,
            isEncrypted: !!remote.isEncrypted,
            createdAt: remote.createdAt,
            updatedAt: remote.updatedAt || remote.createdAt,
          };

          await saveEntry(downloadedEntry);
        }
      }

      setSyncStatus('synced');
      setLastSyncedAt(new Date());
    } catch (err) {
      console.error('Cloud sync error:', err);
      setSyncStatus('error');
      handleFirestoreError(err, OperationType.WRITE, entriesPath);
    }
  };

  // Auto sync on login if consent granted
  useEffect(() => {
    if (user && cloudConsent) {
      syncEntriesWithCloud();
    }
  }, [user, cloudConsent]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        cloudConsent,
        setCloudConsent: updateConsent,
        signInWithGoogle,
        signOutUser,
        syncStatus,
        lastSyncedAt,
        syncEntriesWithCloud,
        showAuthModal,
        setShowAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
