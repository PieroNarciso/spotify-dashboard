import TrackItem from '@/components/TrackItem';
import TrackItemsGrid from '@/components/TrackItemsGrid';
import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  selectAllRecommendedTracks,
  selectAllIdsRecommendedTracks,
} from '@/store/spotify';
import { getRecommendations, getSavedTracks } from '@/store/spotify.thunks';
import React, { useState } from 'react';
import { MdSearch } from 'react-icons/md';

const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const recommendedTracks = useAppSelector(selectAllRecommendedTracks);
  const recommendedTracksIds = useAppSelector(selectAllIdsRecommendedTracks);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsloading(true);
    try {
      await dispatch(getRecommendations(text)).unwrap();
      await dispatch(
        getSavedTracks({ ids: recommendedTracksIds, key: 'recommendedTracks' })
      ).unwrap();
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <form className="flex justify-center" onSubmit={submitHandler}>
        <input
          className="input input-primary flex-grow max-w-lg"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Search by track"
          type="text"
        />
        <button
          type="submit"
          className={`btn btn-primary ml-2 flex-grow-0 ${
            isLoading ? 'loading opacity-75' : ''
          }`}
        >
          {!isLoading && <MdSearch />}
        </button>
      </form>
      <TrackItemsGrid>
        {recommendedTracks.map(
          (track) =>
            track.preview_url && (
              <TrackItem
                key={track.id}
                track={track}
                typeKey="recommendedTracks"
              />
            )
        )}
      </TrackItemsGrid>
    </div>
  );
};

export default Search;
