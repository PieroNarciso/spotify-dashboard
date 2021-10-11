import { useAppDispatch, useAppSelector } from '@/hooks';
import { spotifyActions } from '@/store/spotify';
import React, { useEffect, useRef, useState } from 'react';

interface VolumeSwitcherProps {
  onClose: () => void;
}

const VolumeSwitcher: React.FC<VolumeSwitcherProps> = (props) => {
  const volume = useAppSelector((state) => state.spotify.volume);
  const dispatch = useAppDispatch();
  const [switchValue, setSwitchValue] = useState(volume);
  const switchHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSwitchValue(parseInt(event.target.value));


  const switcherRef = useRef<HTMLInputElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (!switcherRef.current?.contains(event.target as Node)) {
      props.onClose();
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(spotifyActions.changeVolume(switchValue));
    }, 150);
    return () => clearTimeout(timeoutId);
  }, [switchValue]);

  return (
    <input
      type="range"
      min={0}
      max={100}
      step={5}
      className="range range-primary"
      value={switchValue}
      onChange={switchHandler}
      ref={switcherRef}
    />
  );
};

export default VolumeSwitcher;
