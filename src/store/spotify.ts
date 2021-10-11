import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Track } from '@/interfaces';
import {
  getRecommendations,
  getUserTopArtitsTopTracks,
  getUserTopTracks,
} from './spotify.thunks';

interface SpotifyState {
  tracks: Track[];
  artistsTopTracks: Track[];
  recommendedTracks: Track[];
  volume: number;
}

const initialState: SpotifyState = {
  tracks: [],
  artistsTopTracks: [],
  recommendedTracks: [],
  volume: 80,
};

const spotifySlice = createSlice({
  name: 'spotify',
  initialState,
  reducers: {
    changeVolume(state, action: PayloadAction<number>) {
      state.volume = action.payload;
    }
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
          state.recommendedTracks = action.payload;
        }
      );
  },
});

export const spotifyActions = spotifySlice.actions;
export default spotifySlice.reducer;
