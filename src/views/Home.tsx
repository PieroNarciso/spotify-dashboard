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
    <React.Fragment>
      <InitialModal />
      <div className="mt-10 grid grid-cols-2 gap-2">
      {tracks.map(track => (
        <TrackItem className="col-span-1" key={track.id} track={track} />
        ))}
      </div>
    </React.Fragment>
  )
};

export default Home;
