import { useAudio } from '@/hooks';
import { Track } from '@/interfaces';
import React from 'react';

interface TrackItemProps {
  track: Track;
  className?: string;
}

const TrackItem: React.FC<TrackItemProps> = ({ className, ...props }) => {
  const { play, pause } = useAudio(props.track.preview_url || '');
  return (
    <div onMouseEnter={play} onMouseLeave={pause} className={className}>
      <img
        className="w-full h-full"
        src={props.track.album?.images[0].url}
        alt={props.track.name}
      />
    </div>
  );
};

export default TrackItem;
