import TrackItem from '@/components/TrackItem';
import TrackItemsGrid from '@/components/TrackItemsGrid';
import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  selectAllArtistsTopTracks,
  selectAllArtistsTopTracksIds,
} from '@/store/spotify';
import {
  getSavedTracks,
  getUserTopArtitsTopTracks,
} from '@/store/spotify.thunks';
import React, { useEffect } from 'react';

const Artist: React.FC = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectAllArtistsTopTracks);
  const tracksId = useAppSelector(selectAllArtistsTopTracksIds);

  useEffect(() => {
    if (tracks.length === 0) {
      dispatch(getUserTopArtitsTopTracks()).unwrap();
    }
  }, []);
  useEffect(() => {
    dispatch(getSavedTracks({ ids: tracksId, key: 'artistsTopTracks' }));
  }, [tracksId]);

  return (
    <TrackItemsGrid>
      {tracks.map((track) => (
        <TrackItem key={track.id} track={track} typeKey="artistsTopTracks" />
      ))}
    </TrackItemsGrid>
  );
};

export default Artist;
