import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Track } from '@/interfaces';
import { getUserTopTracks } from './spotify.thunks';

interface SpotifyState {
  tracks: Track[];
}

const initialState: SpotifyState = {
  tracks: [],
};

const spotifySlice = createSlice({
  name: 'spotify',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getUserTopTracks.fulfilled,
      (state, action: PayloadAction<Track[]>) => {
        state.tracks = action.payload;
      }
    );
  },
});

export const spotifyActions = spotifySlice.actions;
export default spotifySlice.reducer;
