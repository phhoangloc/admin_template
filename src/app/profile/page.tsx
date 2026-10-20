'use client';

import { useState } from 'react';
import AvatarPicker from '@/components/AvatarPicker';
import { initials, useProfile, type Profile } from '@/lib/profile';

const ROLES = ['Admin', 'Staff', 'Customer'];

export default function ProfilePage() {
  const { profile, setProfile } = useProfile();
  const [draft, setDraft] = useState<Profile | null>(null); // null = viewing

  const details: [string, string][] = [
    ['Full name', profile.name],
    ['Email', profile.email],
    ['Role', profile.role],
    ['Location', profile.location],
    ['Member since', profile.joined],
  ];

  const set = (key: keyof Profile, value: string) => setDraft((d) => d && { ...d, [key]: value });
  const save = () => {
    if (!draft) return;
    setProfile({ ...draft, name: draft.name.trim() || profile.name, email: draft.email.trim() || profile.email });
    setDraft(null);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Profile</h1>
        {!draft && <button className="btn btn-primary" onClick={() => setDraft(profile)}>Edit profile</button>}
      </div>

      <div className="card profile-card">
        <AvatarPicker
          src={(draft ?? profile).avatar}
          initials={initials((draft ?? profile).name)}
          // Outside edit mode a new avatar is saved right away.
          onChange={(avatar) => (draft ? set('avatar', avatar) : setProfile({ ...profile, avatar }))}
        />
        <div>
          <h2>{(draft ?? profile).name || '—'}</h2>
          <p>{(draft ?? profile).email}</p>
        </div>
      </div>

      {draft ? (
        <form className="card form-card" onSubmit={(e) => { e.preventDefault(); save(); }}>
          <label className="field">
            Full name
            <input value={draft.name} onChange={(e) => set('name', e.target.value)} />
          </label>
          <label className="field">
            Email
            <input type="email" value={draft.email} onChange={(e) => set('email', e.target.value)} />
          </label>
          <label className="field">
            Role
            <select value={draft.role} onChange={(e) => set('role', e.target.value)}>
              {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </label>
          <label className="field">
            Location
            <input value={draft.location} onChange={(e) => set('location', e.target.value)} />
          </label>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Save</button>
            <button type="button" className="btn btn-ghost" onClick={() => setDraft(null)}>Cancel</button>
          </div>
        </form>
      ) : (
        <div className="card">
          <div className="card-title" style={{ marginBottom: 16 }}>Account details</div>
          <div className="detail-grid">
            {details.map(([label, value]) => (
              <div key={label}>
                <div className="detail-label">{label}</div>
                <div className="detail-value">{value}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
