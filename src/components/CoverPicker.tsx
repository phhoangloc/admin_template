'use client';

import { useRef } from 'react';

interface Props {
  src?: string;
  onChange: (url: string) => void;
}

/** Wide 16:9 cover slot: click to choose an image, with a remove button once set. */
export default function CoverPicker({ src, onChange }: Props) {
  const input = useRef<HTMLInputElement>(null);

  return (
    <div className="cover">
      <button type="button" className="cover-slot" onClick={() => input.current?.click()}>
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt="Cover" />
        ) : (
          <span className="cover-empty">
            <svg width="22" height="22" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
              <rect x="1.5" y="2.5" width="13" height="11" rx="2" /><circle cx="5.5" cy="6.5" r="1.2" /><path d="M2 12l4-3.5 3 2.5 2-1.5 3 2.5" />
            </svg>
            Click to add a cover image
          </span>
        )}
        {src && <span className="avatar-overlay cover-overlay">Change cover</span>}
      </button>
      {src && <button type="button" className="btn btn-ghost btn-sm" onClick={() => onChange('')}>Remove cover</button>}
      <input
        ref={input}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f?.type.startsWith('image/')) onChange(URL.createObjectURL(f));
          e.target.value = '';
        }}
      />
    </div>
  );
}
