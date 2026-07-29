import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Track } from '../types';
import TrackCard from './TrackCard';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface SearchPageProps {
  tracks: Track[];
  onPlay: (track: Track) => void;
}

export default function SearchPage({ tracks, onPlay }: SearchPageProps) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'ambient' | 'drone' | 'field' | 'experimental'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const resultsRef = useScrollReveal<HTMLDivElement>();

  const filtered = useMemo(() => {
    return tracks.filter((t) => {
      const matchesQuery =
        query === '' ||
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.artist.toLowerCase().includes(query.toLowerCase()) ||
        t.album.toLowerCase().includes(query.toLowerCase());
      const matchesFilter =
        filter === 'all' ||
        t.genre.toLowerCase().includes(filter === 'field' ? 'field' : filter);
      return matchesQuery && matchesFilter;
    });
  }, [tracks, query, filter]);

  const filters = [
    { key: 'all', label: 'Все' },
    { key: 'ambient', label: 'Ambient' },
    { key: 'drone', label: 'Drone' },
    { key: 'field', label: 'Field' },
    { key: 'experimental', label: 'Exp.' },
  ] as const;

  return (
    <div className="relative z-10 h-full overflow-y-auto bg-black pt-20 pb-28 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <h2 className="animate-fade-up delay-1 text-3xl sm:text-4xl text-white mb-2">
          Дневник звука
        </h2>
        <p className="animate-fade-up delay-2 text-white/40 text-sm mb-6">
          {filtered.length} {filtered.length === 1 ? 'запись' : filtered.length < 5 ? 'записи' : 'записей'} найдено
        </p>

        <div className="animate-fade-up delay-2 liquid-glass liquid-glass-shimmer rounded-2xl flex items-center gap-3 px-4 py-3 mb-6 focus-within:ring-2 focus-within:ring-blue-700/50 transition-all duration-300">
          <Search size={18} className="text-white/60" />
          <input
            type="text"
            placeholder="Поиск треков, артистов, альбомов..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder-white/40 outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-white/40 hover:text-white transition-colors text-xs"
            >
              Очистить
            </button>
          )}
        </div>

        <div className="animate-fade-up delay-3 flex items-center justify-between mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm transition-all duration-300 ${
                  filter === f.key
                    ? 'bg-white text-gray-900 shadow-lg shadow-white/5'
                    : 'liquid-glass text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
            className="liquid-glass rounded-xl p-2 text-white/60 hover:text-white transition-colors"
          >
            <SlidersHorizontal size={16} />
          </button>
        </div>

        <div ref={resultsRef} className="reveal">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filtered.map((track, i) => (
                <TrackCard key={track.id} track={track} index={i} onPlay={onPlay} variant="grid" />
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              {filtered.map((track, i) => (
                <TrackCard key={track.id} track={track} index={i} onPlay={onPlay} variant="list" />
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <div className="animate-scale-in py-16 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/5 mb-4">
                <Search size={24} className="text-white/30" />
              </div>
              <p className="text-white/40 text-sm">Ничего не найдено.</p>
              <p className="text-white/20 text-xs mt-1">Попробуйте другой запрос</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
