import TrackItem from '@/components/TrackItem';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getUserTopTracks } from '@/store/spotify.thunks';
import React, { useEffect } from 'react';

import InitialModal from '@/components/InitialModal';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(state => state.spotify.tracks);
  useEffect(() => {
    dispatch(getUserTopTracks(null));
  }, [])

  return (
    <div>
      <InitialModal />
      <ul className="mt-10">
      {tracks.map(track => (
        <TrackItem key={track.id} track={track} />
        ))}
      </ul>
    </div>
  )
};

export default Home;
