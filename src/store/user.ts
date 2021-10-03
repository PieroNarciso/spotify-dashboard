import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  authenticated: boolean;
  access_token: string;
}

const initialState: UserState = {
  authenticated: false,
  access_token: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authenticate(state, action: PayloadAction<string>) {
      state.access_token = action.payload;
      state.authenticated = true;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
