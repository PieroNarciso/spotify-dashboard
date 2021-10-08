import { UserProfile } from '@/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserProfile } from './user.thunks';

interface UserState {
  authenticated: boolean;
  accessToken: string;
  firstTime: boolean;
  profile?: UserProfile;
}

const initialState: UserState = {
  authenticated: false,
  accessToken: '',
  firstTime: true,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authenticate(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
      state.authenticated = true;
    },
    logout(state) {
      state.accessToken = '';
      state.authenticated = false;
    },
    toogleFirstTime(state) {
      state.firstTime = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUserProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
    });
  }
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
