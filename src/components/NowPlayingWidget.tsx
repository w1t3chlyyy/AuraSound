import { useState } from 'react';
import { BarChart3, Heart } from 'lucide-react';
import Equalizer from './Equalizer';

export default function NowPlayingWidget() {
  const [liked, setLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="animate-fade-up delay-5 w-[270px] sm:w-72">
      {/* Track card */}
      <div className="rounded-2xl bg-white p-2.5 pr-4 shadow-lg card-lift">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-700">
            <Equalizer isPlaying={isPlaying} barCount={4} color="bg-white" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900">
              Helia Marsh — Fern Light
            </p>
            <div className="mt-1.5 h-1 w-full rounded-full bg-gray-200 overflow-hidden">
              <div className="progress-shine h-full w-[30%] rounded-full" />
            </div>
            <div className="mt-1 flex justify-between">
              <span className="text-[10px] text-gray-500 tabular-nums">0:33</span>
              <span className="text-[10px] text-gray-500 tabular-nums">-1:21</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-2 flex items-center gap-2">
        <button className="magnetic-btn flex-1 rounded-2xl bg-white py-2 text-sm text-gray-900 shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95">
          Prev
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="magnetic-btn flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-blue-700/30 active:scale-95"
        >
          {isPlaying ? (
            <span className="flex gap-[3px] items-end h-3">
              <span className="w-[3px] h-3 bg-white rounded-full eq-bar" style={{ animationPlayState: 'running' }} />
              <span className="w-[3px] h-2 bg-white rounded-full eq-bar" style={{ animationPlayState: 'running' }} />
              <span className="w-[3px] h-3 bg-white rounded-full eq-bar" style={{ animationPlayState: 'running' }} />
            </span>
          ) : (
            <BarChart3 size={16} className="text-white" />
          )}
        </button>
        <button
          onClick={() => setLiked(!liked)}
          className={`magnetic-btn flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl active:scale-95 ${
            liked ? 'animate-heart-burst' : ''
          }`}
        >
          <Heart
            size={16}
            className={`transition-colors duration-300 ${
              liked ? 'fill-blue-700 text-blue-700' : 'text-blue-700'
            }`}
          />
        </button>
        <button className="magnetic-btn flex-1 rounded-2xl bg-white py-2 text-sm text-gray-900 shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95">
          Next
        </button>
      </div>
    </div>
  );
}
