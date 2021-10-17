import { api } from '@/api';
import { Artist, Track } from '@/interfaces';
import { createAsyncThunk, Update } from '@reduxjs/toolkit';
import { RootState } from './';

const SONGS_LIMIT = 40;

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
    params: { limit: SONGS_LIMIT },
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
    params: { limit: SONGS_LIMIT },
  });

  const tracks: Track[] = [];
  await Promise.all(
    response.data.items.map(async (artist) => {
      const response = await api.get<{ tracks: Track[] }>(
        `/artists/${artist.id}/top-tracks`,
        {
          headers: {
            Authorization: `Bearer ${state.user.accessToken}`,
          },
          params: {
            country: 'US',
            limit: 1,
          },
        }
      );
      tracks.push(response.data.tracks[0]);
    })
  );
  return tracks;
});

export const getRecommendations = createAsyncThunk<
  Track[],
  string,
  { state: RootState }
>('track/recommendations', async (query, thunkApi) => {
  const state = thunkApi.getState();
  const responseTrack = await api.get<{ tracks: { items: Track[] } }>(
    '/search',
    {
      headers: {
        Authorization: `Bearer ${state.user.accessToken}`,
      },
      params: {
        q: query,
        type: 'track',
        limit: 1,
      },
    }
  );
  const response = await api.get<{ tracks: Track[] }>('/recommendations', {
    headers: {
      Authorization: `Bearer ${state.user.accessToken}`,
    },
    params: {
      seed_tracks: responseTrack.data.tracks.items[0].id,
      min_popularity: 50,
      limit: 50,
    },
  });
  return response.data.tracks;
});

export const getSavedTracks = createAsyncThunk<
  Update<Track>[],
  void,
  { state: RootState }
>('/saved/tracks', async (_, thunkApi) => {
  const token = thunkApi.getState().user.accessToken;
  const ids = thunkApi.getState().spotify.recommendedTracks.ids;
  const response = await api.get<boolean[]>('/me/tracks/contains', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ids: ids.join(','),
    },
  });
  const data: Update<Track>[] = [];
  ids.forEach((id, idx) => {
    data.push({ id: id, changes: { saved: response.data[idx] } });
  });
  return data;
});

export const saveTrack = createAsyncThunk<
  Update<Track>,
  string,
  { state: RootState }
>('/track/save', async (id, thunkApi) => {
  const token = thunkApi.getState().user.accessToken;
  await api.put(
    '/me/tracks',
    { ids: [id] },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return { id, changes: { saved: true } };
});

export const removeSavedTrack = createAsyncThunk<
  Update<Track>,
  string,
  { state: RootState }
>('/track/unsave', async (id, thunkApi) => {
  const token = thunkApi.getState().user.accessToken;
  await api.delete('/me/tracks', {
    headers: { Authorization: `Bearer ${token}` },
    params: { ids: id },
  });
  return { id, changes: { saved: false } };
});
