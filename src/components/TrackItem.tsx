import { useAudio } from '@/hooks';
import { Track } from '@/interfaces';
import React from 'react';

interface TrackItemProps {
  track: Track;
  className?: string;
}

const TrackItem: React.FC<TrackItemProps> = ({ className, ...props }) => {
  const { play, pause } = useAudio(props.track.preview_url || '', 0.5);
  return (
    <div
      onMouseEnter={play}
      onMouseLeave={pause}
      className={`focus:shadow-lg hover:shadow-lg ${
        className ? className : ''
      }`}
    >
      <img
        className="w-full h-full"
        src={props.track.album?.images[0].url}
        alt={props.track.name}
      />
    </div>
  );
};

export default TrackItem;
