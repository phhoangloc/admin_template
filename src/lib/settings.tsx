'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';
export type FontKey = 'manrope' | 'inter' | 'dm-sans' | 'lora' | 'mono';

export interface Settings {
  theme: Theme;
  font: FontKey;
  accent: string; // key into ACCENTS
}

export const ACCENTS: { key: string; label: string; hue: number }[] = [
  { key: 'green', label: 'Green', hue: 155 },
  { key: 'teal', label: 'Teal', hue: 195 },
  { key: 'blue', label: 'Blue', hue: 250 },
  { key: 'purple', label: 'Purple', hue: 300 },
  { key: 'pink', label: 'Pink', hue: 355 },
  { key: 'orange', label: 'Orange', hue: 50 },
];

export const FONTS: { key: FontKey; label: string; css: string }[] = [
  { key: 'manrope', label: 'Manrope', css: 'var(--font-manrope), sans-serif' },
  { key: 'inter', label: 'Inter', css: 'var(--font-inter), sans-serif' },
  { key: 'dm-sans', label: 'DM Sans', css: 'var(--font-dm-sans), sans-serif' },
  { key: 'lora', label: 'Lora (serif)', css: 'var(--font-lora), Georgia, serif' },
  { key: 'mono', label: 'JetBrains Mono', css: 'var(--font-mono), ui-monospace, monospace' },
];

export const DEFAULT_SETTINGS: Settings = { theme: 'system', font: 'manrope', accent: 'green' };
export const STORAGE_KEY = 'admin-settings';

/**
 * Runs in <head> before first paint so a saved theme/font/accent doesn't flash.
 * Keep in sync with `apply` below.
 */
export const NO_FLASH_SCRIPT = `(function(){try{var s=JSON.parse(localStorage.getItem('${STORAGE_KEY}')||'{}');var d=document.documentElement;var t=s.theme||'system';var dark=t==='dark'||(t==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);d.dataset.theme=dark?'dark':'light';if(s.font)d.dataset.font=s.font;if(s.hue)d.style.setProperty('--hue',s.hue);}catch(e){}})();`;

function apply(s: Settings) {
  const root = document.documentElement;
  const dark = s.theme === 'dark' || (s.theme === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
  root.dataset.theme = dark ? 'dark' : 'light';
  root.dataset.font = s.font;
  const hue = ACCENTS.find((a) => a.key === s.accent)?.hue ?? 155;
  root.style.setProperty('--hue', String(hue));
}

interface Ctx {
  settings: Settings;
  update: (patch: Partial<Settings>) => void;
  reset: () => void;
}

const SettingsContext = createContext<Ctx | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  // Load after mount so the first client render matches the server.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(saved) });
    } catch {}
  }, []);

  useEffect(() => {
    apply(settings);
    // `hue` is stored too so the no-flash script doesn't need the ACCENTS table.
    const hue = ACCENTS.find((a) => a.key === settings.accent)?.hue ?? 155;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...settings, hue })); } catch {}

    if (settings.theme !== 'system') return;
    const mq = matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => apply(settings);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [settings]);

  const value: Ctx = {
    settings,
    update: (patch) => setSettings((s) => ({ ...s, ...patch })),
    reset: () => setSettings(DEFAULT_SETTINGS),
  };
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used inside <SettingsProvider>');
  return ctx;
}
