import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import spotifyReducer from './spotify';

export const store = configureStore({
  reducer: {
    user: userReducer,
    spotify: spotifyReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
