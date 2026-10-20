'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Avatar from './Avatar';
import { SearchIcon, MailIcon, BellIcon } from './Icons';
import { initials, useProfile } from '@/lib/profile';

export default function Topbar() {
  const { profile } = useProfile();
  // Only matters below 768px, where the search bar collapses to an icon (see globals.css).
  const [searching, setSearching] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  // The input is display:none until `open`, so focus it after the re-render rather than in the click handler.
  useEffect(() => { if (searching) input.current?.focus(); }, [searching]);
  const openSearch = () => setSearching(true);

  return (
    <div className={'topbar' + (searching ? ' searching' : '')}>
      <div className={'search' + (searching ? ' open' : '')}>
        <button
          type="button"
          className="search-toggle"
          aria-label="Search"
          onMouseDown={(e) => e.preventDefault()} // don't blur the input when it is already open
          onClick={openSearch}
        >
          <SearchIcon />
        </button>
        <input
          ref={input}
          placeholder="Search"
          onBlur={() => setSearching(false)}
          onKeyDown={(e) => { if (e.key === 'Escape') e.currentTarget.blur(); }}
        />
        <span className="kbd">⌘F</span>
      </div>
      <Link href="/mail" className="icon-btn" aria-label="Mail"><MailIcon /></Link>
      <button className="icon-btn" aria-label="Notifications"><BellIcon /></button>
      <Link href="/profile" className="profile">
        <Avatar src={profile.avatar} initials={initials(profile.name)} />
        <div>
          <div className="profile-name">{profile.name}</div>
          <div className="profile-mail">{profile.email}</div>
        </div>
      </Link>
    </div>
  );
}
