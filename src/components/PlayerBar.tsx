import { Play, Pause, SkipBack, SkipForward, Heart, Zap } from 'lucide-react';
import { PlayerState } from '../types';
import Equalizer from './Equalizer';

interface PlayerBarProps {
  player: PlayerState;
  onTogglePlay: () => void;
  onToggleLike: () => void;
  onNext: () => void;
  onPrev: () => void;
  currentTime: string;
  remainingTime: string;
  hasSubscription: boolean;
  onSubscribe: () => void;
}

export default function PlayerBar({
  player,
  onTogglePlay,
  onToggleLike,
  onNext,
  onPrev,
  currentTime,
  remainingTime,
  hasSubscription,
  onSubscribe,
}: PlayerBarProps) {
  if (!player.currentTrack) return null;

  const progressPercent = Math.min(100, Math.max(0, player.progress));
  const isAd = player.currentTrack.isAd;

  return (
    <div className={`absolute bottom-0 left-0 right-0 z-30 border-t backdrop-blur-md ${
      isAd ? 'bg-amber-950/90 border-amber-700/30' : 'bg-black/90 border-white/[0.06]'
    }`}>
      {/* Ad banner */}
      {isAd && (
        <div className="flex items-center justify-center gap-2 py-1.5 bg-amber-700/20">
          <Zap size={14} className="text-amber-400" />
          <span className="text-[11px] text-amber-200">Реклама — осталось {remainingTime}</span>
          <button
            onClick={onSubscribe}
            className="ml-2 rounded-full bg-amber-600 px-3 py-0.5 text-[11px] font-medium text-white hover:bg-amber-500 transition-colors"
          >
            Убрать рекламу
          </button>
        </div>
      )}

      <div className="mx-auto flex h-16 max-w-screen-2xl items-center gap-4 px-4 sm:px-6">
        {/* LEFT — Track info */}
        <div className="flex w-[200px] min-w-[200px] items-center gap-3">
          <div className={`relative h-11 w-11 shrink-0 overflow-hidden rounded-lg shadow-lg ${
            isAd ? 'ring-2 ring-amber-500/50' : ''
          }`}>
            <img
              src={player.currentTrack.cover}
              alt={player.currentTrack.title}
              className={`h-full w-full object-cover ${player.isPlaying && !isAd ? 'animate-spin-slow' : ''}`}
              style={{ animationDuration: '10s' }}
            />
          </div>
          <div className="min-w-0">
            <p className={`truncate text-[13px] font-medium leading-tight ${
              isAd ? 'text-amber-200' : 'text-white'
            }`}>
              {player.currentTrack.title}
            </p>
            <p className="truncate text-[11px] leading-tight text-white/40">
              {player.currentTrack.artist}
            </p>
          </div>
        </div>

        {/* CENTER — Controls + Progress */}
        <div className="flex flex-1 flex-col items-center justify-center gap-1.5 px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={onPrev}
              disabled={isAd}
              className="rounded-full p-1.5 text-white/50 transition-colors hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <SkipBack size={18} />
            </button>
            <button
              onClick={onTogglePlay}
              className={`flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-150 hover:scale-105 active:scale-95 ${
                isAd ? 'bg-amber-600 text-white' : 'bg-white text-black'
              }`}
            >
              {player.isPlaying ? (
                <Pause size={15} fill="currentColor" />
              ) : (
                <Play size={15} fill="currentColor" className="ml-0.5" />
              )}
            </button>
            <button
              onClick={onNext}
              className="rounded-full p-1.5 text-white/50 transition-colors hover:text-white"
            >
              <SkipForward size={18} />
            </button>
          </div>

          <div className="flex w-full max-w-lg items-center gap-3">
            <span className="w-9 text-right text-[11px] tabular-nums text-white/40">
              {currentTime}
            </span>
            <div className="relative h-1 flex-1 cursor-pointer rounded-full bg-white/10">
              <div
                className={`absolute inset-y-0 left-0 rounded-full transition-[width] duration-1000 linear ${
                  isAd ? 'bg-amber-500' : 'bg-blue-600'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="w-9 text-left text-[11px] tabular-nums text-white/40">
              {isAd ? remainingTime : `-${remainingTime}`}
            </span>
          </div>
        </div>

        {/* RIGHT — Equalizer + Like */}
        <div className="flex w-[120px] min-w-[120px] items-center justify-end gap-3">
          {!isAd && (
            <>
              <Equalizer isPlaying={player.isPlaying} barCount={3} color="bg-blue-600" />
              <button
                onClick={onToggleLike}
                className={`rounded-full p-2 text-white/50 transition-all hover:text-white hover:bg-white/5 ${
                  player.liked ? 'animate-heart-burst' : ''
                }`}
              >
                <Heart
                  size={16}
                  className={player.liked ? 'fill-blue-600 text-blue-600' : ''}
                />
              </button>
            </>
          )}
          {isAd && (
            <span className="text-[11px] text-amber-400/60">Реклама</span>
          )}
        </div>
      </div>
    </div>
  );
}
