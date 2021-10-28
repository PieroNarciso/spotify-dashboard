import { api } from '@/api';
import { Artist, Track } from '@/interfaces';
import { createAsyncThunk, EntityId, Update } from '@reduxjs/toolkit';
import { RootState } from './';
import { SpotifyTracksKey } from '@/types';

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
  { update: Update<Track>[], key: SpotifyTracksKey},
  { ids: EntityId[], key: SpotifyTracksKey},
  { state: RootState }
>('/saved/tracks', async ({ ids, key }, thunkApi) => {
  const token = thunkApi.getState().user.accessToken;
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
  return { update: data, key };
});

export const saveTrack = createAsyncThunk<
  { update: Update<Track>, key: SpotifyTracksKey },
  { id: string, key: SpotifyTracksKey },
  { state: RootState }
>('/track/save', async ({ id, key }, thunkApi) => {
  const token = thunkApi.getState().user.accessToken;
  await api.put(
    '/me/tracks',
    { ids: [id] },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const update = { id, changes: { saved: true } };
  return { update, key };
});

export const removeSavedTrack = createAsyncThunk<
  { update: Update<Track>, key: SpotifyTracksKey },
  { id: string, key: SpotifyTracksKey },
  { state: RootState }
>('/track/unsave', async ({ id, key }, thunkApi) => {
  const token = thunkApi.getState().user.accessToken;
  await api.delete('/me/tracks', {
    headers: { Authorization: `Bearer ${token}` },
    params: { ids: id },
  });
  const update = { id, changes: { saved: false } };
  return { update, key };
});
