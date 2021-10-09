import TrackItem from '@/components/TrackItem';
import TrackItemsGrid from '@/components/TrackItemsGrid';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getRecommendations } from '@/store/spotify.thunks';
import React, { useState } from 'react';
import { MdSearch } from 'react-icons/md';

const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState('');
  const recommendedTracks = useAppSelector(
    (state) => state.spotify.recommendedTracks
  );

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(getRecommendations(text));
  };

  return (
    <div className="flex flex-col gap-y-4">
      <form className="flex" onSubmit={submitHandler}>
        <input
          className="input input-primary flex-grow"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Search by track"
          type="text"
        />
        <button type="submit" className="btn btn-primary ml-2 flex-grow-0">
          <MdSearch />
        </button>
      </form>
      <TrackItemsGrid>
        {recommendedTracks.map(
          (track) =>
            track.preview_url && <TrackItem className="hover:shadow-lg" key={track.id} track={track} />
        )}
      </TrackItemsGrid>
    </div>
  );
};

export default Search;
