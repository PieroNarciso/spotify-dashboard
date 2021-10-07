import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  authenticated: boolean;
  accessToken: string;
  firstTime: boolean;
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
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
