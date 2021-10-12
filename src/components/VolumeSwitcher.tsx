import { useAppDispatch, useAppSelector } from '@/hooks';
import { spotifyActions } from '@/store/spotify';
import React, { useEffect, useState } from 'react';
import { MdVolumeDown, MdVolumeMute, MdVolumeOff, MdVolumeUp } from 'react-icons/md';

interface VolumeSwitcherProps {
  className?: string;
}

const VolumeSwitcher: React.FC<VolumeSwitcherProps> = (props) => {
  const volume = useAppSelector((state) => state.spotify.volume);
  const dispatch = useAppDispatch();
  const [switchValue, setSwitchValue] = useState(volume);
  const switchHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSwitchValue(parseInt(event.target.value));

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(spotifyActions.changeVolume(switchValue));
    }, 150);
    return () => clearTimeout(timeoutId);
  }, [switchValue]);

  const iconClasses = 'w-6 h-6 ml-2 text-primary-focus'
  let iconWidget = <MdVolumeUp className={iconClasses} />
  if (volume === 0) iconWidget = <MdVolumeOff className={iconClasses} />
  else if (volume <= 15) iconWidget = <MdVolumeMute className={iconClasses} />
  else if (volume <= 65) iconWidget = <MdVolumeDown className={iconClasses} />

  return (
    <div
      className={`bg-base-200 flex items-center rounded-md py-1 px-1 shadow-lg ${
        props.className ? props.className : ''
      }`}
    >
      <input
        type="range"
        min={0}
        max={100}
        step={5}
        className="range range-primary"
        value={switchValue}
        onChange={switchHandler}
      />
      {iconWidget}
    </div>
  );
};

export default VolumeSwitcher;
