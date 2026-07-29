import { useState } from 'react';
import { Play, Heart, Clock } from 'lucide-react';
import { Track } from '../types';
import { useMagnetic } from '../hooks/useMagnetic';

interface TrackCardProps {
  track: Track;
  index: number;
  onPlay: (track: Track) => void;
  variant?: 'list' | 'grid';
}

export default function TrackCard({ track, index, onPlay, variant = 'list' }: TrackCardProps) {
  const [liked, setLiked] = useState(track.liked);
  const [isHovered, setIsHovered] = useState(false);
  const magnetic = useMagnetic<HTMLButtonElement>(0.15);

  if (variant === 'grid') {
    return (
      <div
        className="animate-fade-up group relative overflow-hidden rounded-2xl card-lift cursor-pointer"
        style={{ animationDelay: `${0.3 + index * 0.08}s` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="aspect-square overflow-hidden">
          <img
            src={track.cover}
            alt={track.title}
            className="h-full w-full object-cover img-zoom"
            loading="lazy"
          />
          <div
            className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <button
              onClick={() => onPlay(track)}
              className="magnetic-btn flex h-14 w-14 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white"
            >
              <Play size={22} className="text-gray-900 fill-gray-900 ml-1" />
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <p className="truncate text-sm font-medium text-white">{track.title}</p>
          <p className="truncate text-xs text-white/60">{track.artist}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
          className={`absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm transition-all duration-300 ${
            liked ? 'animate-heart-burst' : ''
          } ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
        >
          <Heart
            size={14}
            className={`transition-colors duration-300 ${
              liked ? 'fill-blue-500 text-blue-500' : 'text-white'
            }`}
          />
        </button>
      </div>
    );
  }

  return (
    <div
      className="animate-fade-up group flex items-center gap-3 rounded-xl p-2 transition-all duration-300 hover:bg-white/5"
      style={{ animationDelay: `${0.3 + index * 0.05}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={() => onPlay(track)}
        className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg"
      >
        <img
          src={track.cover}
          alt={track.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div
          className={`absolute inset-0 flex items-center justify-center bg-black/50 transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Play size={16} className="text-white fill-white" />
        </div>
      </button>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-white transition-colors duration-200 group-hover:text-blue-400">
          {track.title}
        </p>
        <p className="truncate text-xs text-white/50">
          {track.artist} — {track.album}
        </p>
      </div>

      <span className="hidden sm:block text-xs text-white/40 transition-colors duration-200 group-hover:text-white/60">
        {track.genre}
      </span>

      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1 text-xs text-white/40">
          <Clock size={12} />
          {track.duration}
        </span>
        <button
          {...magnetic}
          onClick={() => setLiked(!liked)}
          className={`magnetic-btn transition-all duration-300 hover:scale-125 ${
            liked ? 'animate-heart-burst' : ''
          }`}
        >
          <Heart
            size={14}
            className={`transition-colors duration-300 ${
              liked ? 'fill-blue-700 text-blue-700' : 'text-white/40 group-hover:text-white/70'
            }`}
          />
        </button>
      </div>
    </div>
  );
}
