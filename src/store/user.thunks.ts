import { api } from '@/api';
import { UserProfile } from '@/interfaces';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '.';

export const getUserProfile = createAsyncThunk<
  UserProfile,
  void,
  { state: RootState }
>('/user/profile', async (_, thunkApi) => {
  const state = thunkApi.getState();
  const response = await api.get<UserProfile>('/me', {
    headers: {
      Authorization: `Bearer ${state.user.accessToken}`,
    },
  });
  return response.data;
});
