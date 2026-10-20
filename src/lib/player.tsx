'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';

export const TRACK = { src: '/music/music_jazz.mp3', title: 'Jazz', subtitle: 'music_jazz.mp3' };
const SKIP = 10; // seconds for the back/forward buttons

interface Ctx {
  playing: boolean;
  time: number;
  duration: number;
  /** True once playback has been started, so the mini player knows to show up. */
  started: boolean;
  toggle: () => void;
  skip: (delta: number) => void;
  seekTo: (ratio: number) => void;
  skipBy: number;
}

const PlayerContext = createContext<Ctx | null>(null);

/**
 * Owns the one <audio> element. It lives in the root layout, which stays mounted while
 * navigating between pages, so the music keeps playing when the route changes.
 */
export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [started, setStarted] = useState(false);

  // The metadata can arrive before React attaches onLoadedMetadata (cached file), so read it on mount too.
  useEffect(() => {
    const a = audio.current;
    if (a && a.readyState >= 1) setDuration(a.duration);
  }, []);

  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) a.play().catch(() => setPlaying(false)); // the browser can reject play()
    else a.pause();
  };

  const skip = (delta: number) => {
    const a = audio.current;
    if (a) a.currentTime = Math.min(Math.max(0, a.currentTime + delta), a.duration || 0);
  };

  const seekTo = (ratio: number) => {
    const a = audio.current;
    if (a && a.duration) a.currentTime = Math.min(Math.max(0, ratio), 1) * a.duration;
  };

  return (
    <PlayerContext.Provider value={{ playing, time, duration, started, toggle, skip, seekTo, skipBy: SKIP }}>
      {/* preload="metadata": the file is large, so only fetch it once the user hits play */}
      <audio
        ref={audio}
        src={TRACK.src}
        preload="metadata"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onPlay={() => { setPlaying(true); setStarted(true); }}
        onPause={() => setPlaying(false)}
        onEnded={() => { setPlaying(false); setTime(0); setStarted(false); }}
      />
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used inside <PlayerProvider>');
  return ctx;
}

export const fmtTime = (s: number) => {
  if (!Number.isFinite(s)) return '0:00';
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
};
