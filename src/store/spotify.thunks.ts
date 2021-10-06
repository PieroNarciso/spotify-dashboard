import { api } from '@/api';
import { Artist, Track } from '@/interfaces';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '.';

export const getUserTopTracks = createAsyncThunk<
  Track[],
  null,
  { dispatch: AppDispatch; state: RootState }
>('/user/tracks', async (_, thunkApi) => {
  const state = thunkApi.getState();
  const response = await api.get<{ items: Track[] }>('/me/top/tracks', {
    headers: {
      Authorization: `Bearer ${state.user.access_token}`,
    },
  });
  return response.data.items;
});

export const getUserTopArtits = createAsyncThunk<Artist[], null, { dispatch: AppDispatch, state: RootState }>(
  '/user/artists' ,
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const response = await api.get<{ items: Artist[] }>('/me/top/artists', {
      headers: {
        Authorization: `Bearer ${state.user.access_token}`,
      }
    });
    return response.data.items;
  }
);
