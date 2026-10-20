'use client';

import { ACCENTS, FONTS, useSettings, type Theme } from '@/lib/settings';

const THEMES: { key: Theme; label: string; hint: string }[] = [
  { key: 'light', label: 'Light', hint: 'Bright surfaces' },
  { key: 'dark', label: 'Dark', hint: 'Easy on the eyes' },
  { key: 'system', label: 'System', hint: 'Match your device' },
];

/** Tiny page mock-up showing each theme option. */
function ThemePreview({ theme }: { theme: Theme }) {
  const swatch = (dark: boolean) => (
    <div className="tp-half" style={{ background: dark ? 'oklch(0.17 0.008 150)' : 'oklch(0.965 0.006 150)' }}>
      <span style={{ background: dark ? 'oklch(0.22 0.008 150)' : '#fff' }} />
      <span style={{ background: dark ? 'oklch(0.22 0.008 150)' : '#fff' }} />
      <i style={{ background: 'var(--brand)' }} />
    </div>
  );
  return (
    <div className="theme-preview">
      {theme === 'system' ? <>{swatch(false)}{swatch(true)}</> : swatch(theme === 'dark')}
    </div>
  );
}

export default function SettingsPage() {
  const { settings, update, reset } = useSettings();

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <button className="btn btn-ghost" onClick={reset}>Reset to defaults</button>
      </div>

      <section className="card">
        <div className="card-title">Appearance</div>
        <p className="setting-hint">Choose how the admin looks. System follows your device&apos;s light/dark setting.</p>
        <div className="option-grid" role="radiogroup" aria-label="Theme">
          {THEMES.map((t) => (
            <button
              key={t.key}
              role="radio"
              aria-checked={settings.theme === t.key}
              className={'option' + (settings.theme === t.key ? ' selected' : '')}
              onClick={() => update({ theme: t.key })}
            >
              <ThemePreview theme={t.key} />
              <span className="option-label">{t.label}</span>
              <span className="option-hint">{t.hint}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="card">
        <div className="card-title">Font</div>
        <p className="setting-hint">Applies to the whole interface.</p>
        <div className="option-grid" role="radiogroup" aria-label="Font">
          {FONTS.map((f) => (
            <button
              key={f.key}
              role="radio"
              aria-checked={settings.font === f.key}
              className={'option' + (settings.font === f.key ? ' selected' : '')}
              onClick={() => update({ font: f.key })}
            >
              <span className="font-sample" style={{ fontFamily: f.css }}>Aa</span>
              <span className="option-label" style={{ fontFamily: f.css }}>{f.label}</span>
              <span className="option-hint" style={{ fontFamily: f.css }}>The quick brown fox</span>
            </button>
          ))}
        </div>
      </section>

      <section className="card">
        <div className="card-title">Accent color</div>
        <p className="setting-hint">Used for the sidebar highlight, buttons, charts and links.</p>
        <div className="swatches" role="radiogroup" aria-label="Accent color">
          {ACCENTS.map((a) => (
            <button
              key={a.key}
              role="radio"
              aria-checked={settings.accent === a.key}
              aria-label={a.label}
              title={a.label}
              className={'swatch' + (settings.accent === a.key ? ' selected' : '')}
              style={{ background: `oklch(0.5 0.14 ${a.hue})` }}
              onClick={() => update({ accent: a.key })}
            >
              {settings.accent === a.key && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 7.5l2.6 2.6L11 4.5" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </section>

      <p className="setting-hint">Saved automatically in this browser.</p>
    </div>
  );
}
