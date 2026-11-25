"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface AudioTrack {
  id: string;
  title: string;
  subtitle: string;
  duration: string; // e.g. "3:45"
  durationSeconds: number; // e.g. 225
  href: string; // e.g. "/artifact/didarganj-yakshi" or "/tours"
  image?: string;
}

interface AudioContextType {
  currentTrack: AudioTrack | null;
  isPlaying: boolean;
  currentTime: number; // seconds
  playbackSpeed: number; // 1, 1.25, 1.5, 2
  playTrack: (track: AudioTrack) => void;
  togglePlay: () => void;
  pauseAudio: () => void;
  skipForward: (seconds?: number) => void;
  skipBackward: (seconds?: number) => void;
  changeSpeed: () => void;
  closePlayer: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);

  // Simulated timer for audio playback
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentTrack) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= currentTrack.durationSeconds) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack, playbackSpeed]);

  const playTrack = (track: AudioTrack) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const pauseAudio = () => {
    setIsPlaying(false);
  };

  const skipForward = (seconds = 15) => {
    if (!currentTrack) return;
    setCurrentTime((prev) => Math.min(currentTrack.durationSeconds, prev + seconds));
  };

  const skipBackward = (seconds = 15) => {
    setCurrentTime((prev) => Math.max(0, prev - seconds));
  };

  const changeSpeed = () => {
    const speeds = [1.0, 1.25, 1.5, 2.0];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIndex]);
  };

  const closePlayer = () => {
    setIsPlaying(false);
    setCurrentTrack(null);
  };

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        currentTime,
        playbackSpeed,
        playTrack,
        togglePlay,
        pauseAudio,
        skipForward,
        skipBackward,
        changeSpeed,
        closePlayer,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
