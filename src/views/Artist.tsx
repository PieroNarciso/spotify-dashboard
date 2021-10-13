import TrackItem from '@/components/TrackItem';
import TrackItemsGrid from '@/components/TrackItemsGrid';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getUserTopArtitsTopTracks } from '@/store/spotify.thunks';
import React, { useEffect } from 'react';


const Artist: React.FC = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(state => state.spotify.artistsTopTracks);

  useEffect(() => {
    if (tracks.length === 0)
      dispatch(getUserTopArtitsTopTracks());
  }, []);

  return (
    <TrackItemsGrid>
      {tracks.map(track => (
        <TrackItem key={track.id} track={track} />
      ))}
    </TrackItemsGrid>
  );
};

export default Artist;
