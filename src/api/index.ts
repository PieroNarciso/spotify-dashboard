import { useAppSelector } from '@/hooks';
import axios from 'axios';

const urlParams = new URLSearchParams({
  client_id: import.meta.env.VITE_CLIENT_ID as string,
  response_type: 'token',
  redirect_uri: 'http://localhost:3000/login',
  state: '988',
  scope: ['user-read-private'].join(' '),
}).toString();

export const AUTH_LINK = `https://accounts.spotify.com/authorize?${urlParams}`;


export const useApi = () => {
  const token = useAppSelector(state => state.user.access_token);

  const api = axios.create({
    baseURL: 'https://accounts.spotify.com/api/',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return api;
};

