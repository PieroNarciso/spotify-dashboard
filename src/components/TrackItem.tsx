import { useAudio } from '@/hooks';
import { Track } from '@/interfaces';
import React from 'react';

interface TrackItemProps {
  track: Track;
}

const TrackItem: React.FC<TrackItemProps> = (props) => {
  const { play, pause } = useAudio(props.track.preview_url);
  return (
    <div onMouseEnter={play} onMouseLeave={pause}>
      <div data-tip={props.track.name} className="tooltip">
        <img src={props.track.album?.images[0].url}></img>
      </div>
    </div>
  )
};

export default TrackItem;
