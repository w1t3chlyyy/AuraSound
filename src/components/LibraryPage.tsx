import { useState } from 'react';
import { Play, Heart, Clock, ListMusic, Disc3 } from 'lucide-react';
import { Track } from '../types';
import TrackCard from './TrackCard';

interface LibraryPageProps {
  tracks: Track[];
  onPlay: (track: Track) => void;
}

export default function LibraryPage({ tracks, onPlay }: LibraryPageProps) {
  const [activeTab, setActiveTab] = useState<'liked' | 'recent' | 'playlists'>('liked');

  const likedTracks = tracks.filter((t) => t.liked);
  const recentTracks = [...tracks].reverse();

  const tabs = [
    { key: 'liked' as const, label: 'Понравилось', icon: Heart, count: likedTracks.length },
    { key: 'recent' as const, label: 'Недавнее', icon: Clock, count: recentTracks.length },
    { key: 'playlists' as const, label: 'Плейлисты', icon: ListMusic, count: 4 },
  ];

  const playlists = [
    { name: 'Ночной дрон', tracks: 12, color: 'from-blue-900/40 to-slate-900' },
    { name: 'Лесные прогулки', tracks: 15, color: 'from-emerald-900/40 to-slate-900' },
    { name: 'Дождевые сессии', tracks: 8, color: 'from-cyan-900/40 to-slate-900' },
    { name: 'Утренний статик', tracks: 18, color: 'from-amber-900/40 to-slate-900' },
  ];

  const displayTracks = activeTab === 'liked' ? likedTracks : activeTab === 'recent' ? recentTracks : [];

  return (
    <div className="relative z-10 h-full overflow-y-auto bg-black pt-20 pb-28 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <h2 className="animate-fade-up delay-1 text-3xl sm:text-4xl text-white mb-6">
          Салон воспроизведения
        </h2>

        <div className="animate-fade-up delay-2 flex gap-2 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm transition-all duration-300 ${
                  activeTab === tab.key
                    ? 'bg-white text-gray-900 shadow-lg shadow-white/5'
                    : 'liquid-glass text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={14} />
                {tab.label}
                <span className={`text-xs ${activeTab === tab.key ? 'text-gray-500' : 'text-white/30'}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {activeTab === 'playlists' ? (
          <div className="animate-fade-up delay-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {playlists.map((playlist, i) => (
              <button
                key={playlist.name}
                className="group relative aspect-square overflow-hidden rounded-2xl card-lift"
                style={{ animationDelay: `${0.3 + i * 0.08}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${playlist.color}`} />
                <div className="absolute inset-0 bg-black/20" />

                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <Disc3 
                    size={40} 
                    className="text-white/20 mb-3 transition-all duration-500 group-hover:rotate-180 group-hover:text-white/40" 
                  />
                  <span className="text-sm font-medium text-white text-center">{playlist.name}</span>
                  <span className="text-xs text-white/40 mt-1">{playlist.tracks} треков</span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <Play size={22} className="text-gray-900 fill-gray-900 ml-1" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            {displayTracks.map((track, i) => (
              <TrackCard key={track.id} track={track} index={i} onPlay={onPlay} variant="list" />
            ))}

            {displayTracks.length === 0 && (
              <div className="animate-scale-in py-16 text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/5 mb-4 animate-float">
                  <Heart size={24} className="text-white/20" />
                </div>
                <p className="text-white/40 text-sm">Здесь пока пусто.</p>
                <p className="text-white/20 text-xs mt-1">Начните исследовать и отмечайте понравившееся</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
