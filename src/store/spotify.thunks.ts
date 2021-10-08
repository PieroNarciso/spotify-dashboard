import { api } from '@/api';
import { Artist, Track } from '@/interfaces';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './';

export const getUserTopTracks = createAsyncThunk<
  Track[],
  void,
  { state: RootState }
>('/user/tracks', async (_, thunkApi) => {
  const state = thunkApi.getState();
  const response = await api.get<{ items: Track[] }>('/me/top/tracks', {
    headers: {
      Authorization: `Bearer ${state.user.accessToken}`,
    },
  });
  return response.data.items;
});

export const getUserTopArtitsTopTracks = createAsyncThunk<
  Track[],
  void,
  { state: RootState }
>('/user/artists', async (_, thunkApi) => {
  const state = thunkApi.getState();
  const response = await api.get<{ items: Artist[] }>('/me/top/artists', {
    headers: {
      Authorization: `Bearer ${state.user.accessToken}`,
    },
  });
  const tracks: Track[] = [];
  for (const artist of response.data.items) {
    const response = await api.get<{ tracks: Track[] }>(
      `/artists/${artist.id}/top-tracks`,
      {
        headers: {
          Authorization: `Bearer ${state.user.accessToken}`,
        },
        params: {
          market: 'US',
        },
      }
    );
    tracks.push(response.data.tracks[0]);
  }
  return tracks;
});
