import { useAppDispatch, useAppSelector, useAudio } from '@/hooks';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { Track } from '@/interfaces';
import React from 'react';
import { removeSavedTrack, saveTrack } from '@/store/spotify.thunks';
import { SpotifyTracksKey } from '@/types';

interface TrackItemProps {
  track: Track;
  typeKey: SpotifyTracksKey;
  className?: string;
}

const TrackItem: React.FC<TrackItemProps> = ({ className, ...props }) => {
  const volume = useAppSelector((state) => state.spotify.volume);
  const dispatch = useAppDispatch();
  const percentVolumen = volume / 100;
  const { play, pause } = useAudio(
    props.track.preview_url || '',
    percentVolumen
  );

  const toggleSaveTrack = async () => {
    if (props.track.saved) {
      await dispatch(
        removeSavedTrack({ id: props.track.id, key: props.typeKey })
      ).unwrap();
    } else {
      await dispatch(
        saveTrack({ id: props.track.id, key: props.typeKey })
      ).unwrap();
    }
  };

  return (
    <div
      onMouseEnter={play}
      onMouseLeave={pause}
      className={`focus:shadow-lg hover:shadow-lg group relative ${
        className ? className : ''
      }`}
    >
      <img
        className="w-full h-full"
        src={props.track.album?.images[0].url}
        alt={props.track.name}
      />
      <div className="bg-neutral-focus absolute opacity-90 top-0 left-0 w-full h-full hidden group-hover:flex flex-col justify-between p-2">
        <span className="text-accent font-semibold text-center self-center">
          {props.track.name}
        </span>
        <div className="flex justify-end">
          <button
            className="btn btn-circle btn-sm font-semibold"
            onClick={toggleSaveTrack}
          >
            {props.track.saved ? (
              <AiFillHeart className="text-secondary-focus w-6 h-6" />
            ) : (
              <AiOutlineHeart className="text-secondary-focus w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TrackItem);
