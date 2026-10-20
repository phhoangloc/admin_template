'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export interface Profile {
  name: string;
  email: string;
  role: string;
  location: string;
  joined: string;
  avatar: string; // data URL, empty = show initials
}

const DEFAULT_PROFILE: Profile = {
  name: 'Michael Chen',
  email: 'm.chen@projek.io',
  role: 'Admin',
  location: 'Ho Chi Minh City',
  joined: 'Jan 12, 2025',
  avatar: '',
};

const STORAGE_KEY = 'admin-profile';

export const initials = (name: string) =>
  name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? '').join('') || '?';

interface Ctx {
  profile: Profile;
  setProfile: (p: Profile) => void;
}

const ProfileContext = createContext<Ctx | null>(null);

/** Shares the signed-in user's profile between the header and the profile page. */
export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfileState] = useState<Profile>(DEFAULT_PROFILE);

  // Read after mount so server and first client render match.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setProfileState({ ...DEFAULT_PROFILE, ...JSON.parse(saved) });
    } catch {}
  }, []);

  const setProfile = (p: Profile) => {
    setProfileState(p);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch {}
  };

  return <ProfileContext.Provider value={{ profile, setProfile }}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used inside <ProfileProvider>');
  return ctx;
}
