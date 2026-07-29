export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  durationSec: number;
  cover: string;
  genre: string;
  year: number;
  plays: number;
  liked: boolean;
  isAd?: boolean;
}

export type Page = 'home' | 'search' | 'charts' | 'library' | 'subscriptions';

export interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number;
  liked: boolean;
  isAdPlaying: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
}
