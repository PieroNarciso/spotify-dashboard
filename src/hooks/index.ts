import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useHashQuery = () => {
  return new URLSearchParams(useLocation().hash.substring(1));
};

export const useAudio = (url: string, volume = 0.1) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);
  const pause = () => setPlaying(false);
  const play = () => setPlaying(true);

  useEffect(() => {
    if (playing) {
      audio.play();
      audio.volume = volume;
    } else audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return {
    playing,
    toggle,
    pause,
    play
  };
};
