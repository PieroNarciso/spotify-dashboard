import { SpotifyState } from '@/store/spotify';

export type SpotifyTracksKey = keyof Omit<SpotifyState, 'volume'>;
