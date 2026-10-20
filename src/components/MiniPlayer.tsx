'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PlayPauseIcon } from './MusicPlayer';
import { TRACK, fmtTime, usePlayer } from '@/lib/player';

/** Small floating controls shown on every page except the Dashboard, once music has been started. */
export default function MiniPlayer() {
  const pathname = usePathname();
  const { playing, started, time, duration, toggle } = usePlayer();

  if (pathname === '/' || !started) return null;

  return (
    <div className="mini-player" role="region" aria-label="Music player">
      <button className="play-btn" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>
        <PlayPauseIcon playing={playing} />
      </button>
      <Link href="/" className="mini-player-info" title="Open the full player">
        <span className="mini-player-title">{TRACK.title}</span>
        <span className="mini-player-time">{fmtTime(time)} / {fmtTime(duration)}</span>
      </Link>
      <div className="mini-player-bar"><div style={{ width: (duration ? (time / duration) * 100 : 0) + '%' }} /></div>
    </div>
  );
}
