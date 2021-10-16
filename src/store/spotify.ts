import {
  createEntityAdapter,
  createSlice,
  EntityState,
  PayloadAction,
  Update,
} from '@reduxjs/toolkit';
import { Track } from '@/interfaces';
import {
  getRecommendations,
  getSavedTracks,
  getUserTopArtitsTopTracks,
  getUserTopTracks,
  saveTrack,
} from './spotify.thunks';
import { RootState } from '@/store';

const recommendedTracksAdapter = createEntityAdapter<Track>();

interface SpotifyState {
  tracks: Track[];
  artistsTopTracks: Track[];
  volume: number;
  recommendedTracks: EntityState<Track>;
}

const initialState: SpotifyState = {
  tracks: [],
  artistsTopTracks: [],
  volume: 80,
  recommendedTracks: recommendedTracksAdapter.getInitialState(),
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
      .addCase(
        getUserTopTracks.fulfilled,
        (state, action: PayloadAction<Track[]>) => {
          state.tracks = action.payload;
        }
      )
      .addCase(
        getUserTopArtitsTopTracks.fulfilled,
        (state, action: PayloadAction<Track[]>) => {
          state.artistsTopTracks = action.payload;
        }
      )
      .addCase(
        getRecommendations.fulfilled,
        (state, action: PayloadAction<Track[]>) => {
          recommendedTracksAdapter.removeAll(state.recommendedTracks);
          recommendedTracksAdapter.upsertMany(
            state.recommendedTracks,
            action.payload
          );
        }
      )
      .addCase(
        getSavedTracks.fulfilled,
        (state, action: PayloadAction<Update<Track>[]>) => {
          recommendedTracksAdapter.updateMany(
            state.recommendedTracks,
            action.payload
          );
        }
      )
      .addCase(
        saveTrack.fulfilled,
        (state, action: PayloadAction<Update<Track>>) => {
          recommendedTracksAdapter.updateOne(
            state.recommendedTracks,
            action.payload
          );
        }
      );
  },
});

export const spotifyActions = spotifySlice.actions;
export const { selectAll: selectAllRecommendedTracks } =
  recommendedTracksAdapter.getSelectors(
    (state: RootState) => state.spotify.recommendedTracks
  );
export default spotifySlice.reducer;
