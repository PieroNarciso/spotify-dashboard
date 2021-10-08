import TrackItem from '@/components/TrackItem';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getUserTopTracks } from '@/store/spotify.thunks';
import React, { useEffect } from 'react';

import InitialModal from '@/components/InitialModal';
import TrackItemsGrid from '@/components/TrackItemsGrid';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const firstTime = useAppSelector((state) => state.user.firstTime);
  const tracks = useAppSelector((state) => state.spotify.tracks);
  useEffect(() => {
    dispatch(getUserTopTracks());
  }, []);

  return (
    <React.Fragment>
      {firstTime && <InitialModal />}
      <TrackItemsGrid>
        {tracks.map((track) => (
          <TrackItem className="col-span-1" key={track.id} track={track} />
        ))}
      </TrackItemsGrid>
    </React.Fragment>
  );
};

export default Home;
