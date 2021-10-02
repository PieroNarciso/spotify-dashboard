import axios from 'axios';

const urlParams = new URLSearchParams({
  client_id: import.meta.env.VITE_CLIENT_ID as string,
  response_type: 'token',
  redirect_uri: 'http://localhost:3000/callback',
  state: '988',
  scope: ['user-read-private'].join(' '),
}).toString();

export const AUTH_LINK = `https://accounts.spotify.com/authorize?${urlParams}`;

export const api = axios.create({
  baseURL: 'https://accounts.spotify.com/api/',
  withCredentials: true,
});

