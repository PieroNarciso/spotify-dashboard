import {
  createEntityAdapter,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Track } from '@/interfaces';
import {
  getRecommendations,
  getSavedTracks,
  getUserTopArtitsTopTracks,
  getUserTopTracks,
  removeSavedTrack,
  saveTrack,
} from './spotify.thunks';
import { RootState } from '@/store';

const tracksAdapter = createEntityAdapter<Track>();

export interface SpotifyState {
  topTracks: EntityState<Track>;
  artistsTopTracks: EntityState<Track>;
  volume: number;
  recommendedTracks: EntityState<Track>;
}

const initialState: SpotifyState = {
  topTracks: tracksAdapter.getInitialState(),
  artistsTopTracks: tracksAdapter.getInitialState(),
  volume: 80,
  recommendedTracks: tracksAdapter.getInitialState(),
};

const spotifySlice = createSlice({
  name: 'spotify',
  initialState,
  reducers: {
    changeVolume(state, action: PayloadAction<number>) {
      state.volume = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserTopTracks.fulfilled, (state, action) => {
        tracksAdapter.removeAll(state.topTracks);
        tracksAdapter.upsertMany(state.topTracks, action.payload);
      })
      .addCase(getUserTopArtitsTopTracks.fulfilled, (state, action) => {
        tracksAdapter.removeAll(state.artistsTopTracks);
        tracksAdapter.upsertMany(
          state.artistsTopTracks,
          action.payload
        );
      })
      .addCase(getRecommendations.fulfilled, (state, action) => {
        tracksAdapter.removeAll(state.recommendedTracks);
        tracksAdapter.upsertMany(
          state.recommendedTracks,
          action.payload
        );
      })
      .addCase(getSavedTracks.fulfilled, (state, action) => {
        tracksAdapter.updateMany(
          state[action.payload.key],
          action.payload.update
        );
      })
      .addCase(saveTrack.fulfilled, (state, action) => {
        tracksAdapter.updateOne(
          state[action.payload.key],
          action.payload.update
        );
      })
      .addCase(removeSavedTrack.fulfilled, (state, action) => {
        tracksAdapter.updateOne(
          state[action.payload.key],
          action.payload.update
        );
      });
  },
});

export const spotifyActions = spotifySlice.actions;
export const {
  selectAll: selectAllRecommendedTracks,
  selectIds: selectAllIdsRecommendedTracks,
} = tracksAdapter.getSelectors(
  (state: RootState) => state.spotify.recommendedTracks
);
export const {
  selectAll: selectAllTopTracks,
  selectIds: selectAllTopTracksIds,
} = tracksAdapter.getSelectors(
  (state: RootState) => state.spotify.topTracks
);
export const {
  selectAll: selectAllArtistsTopTracks,
  selectIds: selectAllArtistsTopTracksIds,
} = tracksAdapter.getSelectors(
  (state: RootState) => state.spotify.artistsTopTracks
);
export default spotifySlice.reducer;
