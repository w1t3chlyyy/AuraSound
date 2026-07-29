import { useState } from 'react';
import { Play, TrendingUp, Heart, Crown } from 'lucide-react';
import { Track } from '../types';
import { chartTracks } from '../data';

interface ChartsPageProps {
  tracks: Track[];
  onPlay: (track: Track) => void;
}

export default function ChartsPage({ tracks, onPlay }: ChartsPageProps) {
  const [hoveredRank, setHoveredRank] = useState<number | null>(null);

  return (
    <div className="relative z-10 h-full overflow-y-auto bg-black pt-20 pb-28 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="animate-fade-up delay-1 flex items-center gap-3 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700/20">
            <TrendingUp size={22} className="text-blue-700" />
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl text-white">Топ чарт</h2>
            <p className="text-white/40 text-xs">Самые популярные на этой неделе</p>
          </div>
        </div>

        {chartTracks[0] && (
          <div className="animate-fade-up-scale delay-2 relative mb-10 overflow-hidden rounded-3xl group">
            <div
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, rgba(29,78,216,0.25) 0%, rgba(15,23,42,0.8) 50%, rgba(0,0,0,0.9) 100%)',
              }}
            />
            <div className="absolute inset-0 opacity-30">
              <img
                src={chartTracks[0].cover}
                alt=""
                className="h-full w-full object-cover blur-2xl scale-110"
              />
            </div>
            <div className="relative flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-10">
              <div className="relative h-36 w-36 sm:h-48 sm:w-48 shrink-0">
                <div className="absolute inset-0 rounded-2xl bg-blue-700/20 animate-pulse-glow" />
                <img
                  src={chartTracks[0].cover}
                  alt={chartTracks[0].title}
                  className="relative h-full w-full object-cover rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white shadow-lg">
                  <Crown size={14} />
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-700/20 px-3 py-1 text-xs text-blue-400 mb-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
                  #1 На этой неделе
                </div>
                <h3 className="text-2xl sm:text-4xl text-white mb-1 font-medium">{chartTracks[0].title}</h3>
                <p className="text-white/60 mb-2">{chartTracks[0].artist}</p>
                <p className="text-white/30 text-xs mb-5">
                  {(chartTracks[0].plays / 1000).toFixed(0)}k прослушиваний · {chartTracks[0].genre} · {chartTracks[0].year}
                </p>
                <button
                  onClick={() => onPlay(tracks.find((t) => t.id === chartTracks[0].id)!)}
                  className="magnetic-btn inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3 text-sm text-gray-900 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-white/10 active:scale-95"
                >
                  <Play size={14} className="fill-gray-900" />
                  Слушать
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-1">
          {chartTracks.map((track, i) => {
            if (i === 0) return null;
            const original = tracks.find((t) => t.id === track.id)!;
            const isHovered = hoveredRank === i;

            return (
              <div
                key={track.id}
                className="animate-fade-up group flex items-center gap-4 rounded-xl p-3 transition-all duration-300 hover:bg-white/5 cursor-pointer"
                style={{ animationDelay: `${0.3 + i * 0.06}s` }}
                onMouseEnter={() => setHoveredRank(i)}
                onMouseLeave={() => setHoveredRank(null)}
                onClick={() => onPlay(original)}
              >
                <span
                  className={`w-8 text-center text-sm font-bold transition-all duration-300 ${
                    i < 3 ? 'text-blue-700' : 'text-white/30'
                  } ${isHovered ? 'scale-125' : ''}`}
                >
                  {track.rank}
                </span>

                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                  <img
                    src={track.cover}
                    alt={track.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-300 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <Play size={16} className="text-white fill-white" />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white transition-colors duration-200 group-hover:text-blue-400">
                    {track.title}
                  </p>
                  <p className="truncate text-xs text-white/50">{track.artist}</p>
                </div>

                <div className="hidden sm:flex items-center gap-4">
                  <div className="w-24 h-1 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-blue-700/60 transition-all duration-700"
                      style={{ width: `${Math.min(100, (track.plays / 250000) * 100)}%` }}
                    />
                  </div>
                  <span className="text-xs text-white/30 w-16 text-right">
                    {(track.plays / 1000).toFixed(0)}k
                  </span>
                </div>

                <button
                  onClick={(e) => e.stopPropagation()}
                  className="transition-all duration-300 hover:scale-125"
                >
                  <Heart
                    size={14}
                    className={`transition-colors duration-300 ${
                      track.liked ? 'fill-blue-700 text-blue-700' : 'text-white/30 group-hover:text-white/60'
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
