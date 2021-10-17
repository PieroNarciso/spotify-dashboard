import axios from 'axios';

const urlParams = new URLSearchParams({
  client_id: import.meta.env.VITE_CLIENT_ID as string,
  response_type: 'token',
  redirect_uri: import.meta.env.VITE_REDIRECT_URL as string,
  state: '988',
  scope: [
    'user-read-private',
    'user-top-read',
    'user-library-modify',
    'user-library-read',
  ].join(' '),
}).toString();

export const AUTH_LINK = `https://accounts.spotify.com/authorize?${urlParams}`;

export const api = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
});
