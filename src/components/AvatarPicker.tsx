'use client';

import { useRef } from 'react';
import Avatar from './Avatar';
import { fileToAvatarDataUrl } from '@/lib/image';

interface Props {
  src?: string;
  initials: string;
  onChange: (dataUrl: string) => void;
}

/** Avatar that opens an image picker when clicked. */
export default function AvatarPicker({ src, initials, onChange }: Props) {
  const input = useRef<HTMLInputElement>(null);

  const pick = async (file?: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    try { onChange(await fileToAvatarDataUrl(file)); } catch {}
  };

  return (
    <>
      <button type="button" className="avatar-pick" onClick={() => input.current?.click()} aria-label="Change avatar">
        <Avatar src={src} initials={initials} />
        <span className="avatar-overlay">Change</span>
      </button>
      <input
        ref={input}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => { pick(e.target.files?.[0]); e.target.value = ''; }}
      />
    </>
  );
}
