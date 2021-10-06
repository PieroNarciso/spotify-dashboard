import { useAudio } from '@/hooks';
import { Track } from '@/interfaces';
import React from 'react';

interface TrackItemProps {
  track: Track;
  className?: string;
}

const TrackItem: React.FC<TrackItemProps> = ({ className, ...props }) => {
  const { play, pause } = useAudio(props.track.preview_url);
  return (
    <div onMouseEnter={play} onMouseLeave={pause} className={className}>
      <img src={props.track.album?.images[0].url} />
    </div>
  );
};

export default TrackItem;
