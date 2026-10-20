'use client';

import { TRACK, fmtTime, usePlayer } from '@/lib/player';

const Back = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="#fff"><path d="M4 3v10l-3-5z" /><rect x="4" y="3" width="1.5" height="10" /></svg>;
const Forward = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="#fff"><path d="M12 3v10l3-5z" /><rect x="10.5" y="3" width="1.5" height="10" /></svg>;

export const PlayPauseIcon = ({ playing, color = '#22261f' }: { playing: boolean; color?: string }) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill={color}>
    {playing
      ? <><rect x="3" y="2" width="3.5" height="12" rx="1" /><rect x="9.5" y="2" width="3.5" height="12" rx="1" /></>
      : <path d="M4 2l10 6-10 6z" />}
  </svg>
);

/** Full player card (Dashboard). The audio itself lives in PlayerProvider so it survives page changes. */
export default function MusicPlayer() {
  const { playing, time, duration, toggle, skip, seekTo, skipBy } = usePlayer();
  const progress = duration ? (time / duration) * 100 : 0;

  return (
    <div className="player">
      <div className="player-art" />
      <div className="player-meta">
        <div className="player-title">{TRACK.title}</div>
        <div className="player-sub">{TRACK.subtitle}</div>
      </div>
      <div className="player-controls">
        <button className="player-skip" onClick={() => skip(-skipBy)} aria-label={`Back ${skipBy} seconds`}><Back /></button>
        <button className="play-btn" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>
          <PlayPauseIcon playing={playing} />
        </button>
        <button className="player-skip" onClick={() => skip(skipBy)} aria-label={`Forward ${skipBy} seconds`}><Forward /></button>
      </div>
      <div
        className="progress"
        role="slider"
        aria-label="Seek"
        aria-valuemin={0}
        aria-valuemax={Math.round(duration)}
        aria-valuenow={Math.round(time)}
        tabIndex={0}
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          seekTo((e.clientX - rect.left) / rect.width);
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') skip(5);
          if (e.key === 'ArrowLeft') skip(-5);
        }}
      >
        <div className="progress-fill" style={{ width: progress + '%' }} />
      </div>
      <div className="player-time">{fmtTime(time)} / {fmtTime(duration)}</div>
    </div>
  );
}
