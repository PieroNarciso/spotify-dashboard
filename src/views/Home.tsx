import TrackItem from '@/components/TrackItem';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getSavedTracks, getUserTopTracks } from '@/store/spotify.thunks';
import React, { useEffect } from 'react';

import InitialModal from '@/components/InitialModal';
import TrackItemsGrid from '@/components/TrackItemsGrid';
import { selectAllTopTracks, selectAllTopTracksIds } from '@/store/spotify';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const firstTime = useAppSelector((state) => state.user.firstTime);
  const tracks = useAppSelector(selectAllTopTracks);
  const tracksId = useAppSelector(selectAllTopTracksIds);

  useEffect(() => {
    dispatch(getUserTopTracks());
  }, []);
  useEffect(() => {
    dispatch(getSavedTracks({ ids: tracksId, key: 'topTracks' }));
  }, [tracksId]);

  return (
    <React.Fragment>
      {firstTime && <InitialModal />}
      <TrackItemsGrid>
        {tracks.map((track) => (
          <TrackItem
            className="col-span-1"
            key={track.id}
            track={track}
            typeKey="topTracks"
          />
        ))}
      </TrackItemsGrid>
    </React.Fragment>
  );
};

export default Home;
