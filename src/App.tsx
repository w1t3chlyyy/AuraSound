import { useState, useCallback, useEffect, useRef } from 'react';
import { Page, PlayerState, Track } from './types';
import { tracks, adTrack } from './data';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import SearchPage from './components/SearchPage';
import ChartsPage from './components/ChartsPage';
import LibraryPage from './components/LibraryPage';
import SubscriptionsPage from './components/SubscriptionsPage';
import PlayerBar from './components/PlayerBar';
import PageTransition from './components/PageTransition';

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [hasSubscription, setHasSubscription] = useState(false);
  const [player, setPlayer] = useState<PlayerState>({
    currentTrack: tracks[0],
    isPlaying: false,
    progress: 0,
    liked: tracks[0].liked,
    isAdPlaying: false,
  });

  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const nextTrackAfterAd = useRef<Track | null>(null);

  useEffect(() => {
    if (player.isPlaying && player.currentTrack) {
      progressInterval.current = setInterval(() => {
        setPlayer((p) => {
          if (!p.currentTrack) return p;
          const nextProgress = p.progress + (100 / p.currentTrack.durationSec);

          if (nextProgress >= 100) {
            // Track finished
            if (p.currentTrack.isAd) {
              // Ad finished — play the queued track
              const queued = nextTrackAfterAd.current;
              nextTrackAfterAd.current = null;
              if (queued) {
                return {
                  ...p,
                  currentTrack: queued,
                  progress: 0,
                  isPlaying: true,
                  liked: queued.liked,
                  isAdPlaying: false,
                };
              }
              return { ...p, isPlaying: false, progress: 0, isAdPlaying: false };
            }

            // Normal track finished — check if ad needed
            const currentIndex = tracks.findIndex((t) => t.id === p.currentTrack!.id);
            const nextTrack = tracks[(currentIndex + 1) % tracks.length];

            if (!hasSubscription) {
              // Insert ad before next track
              nextTrackAfterAd.current = nextTrack;
              return {
                ...p,
                currentTrack: adTrack,
                progress: 0,
                isPlaying: true,
                liked: false,
                isAdPlaying: true,
              };
            }

            // No ad for subscribers
            return {
              ...p,
              currentTrack: nextTrack,
              progress: 0,
              isPlaying: true,
              liked: nextTrack.liked,
              isAdPlaying: false,
            };
          }

          return { ...p, progress: nextProgress };
        });
      }, 1000);
    }
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [player.isPlaying, player.currentTrack?.id, hasSubscription]);

  const playTrack = useCallback((track: Track) => {
    setPlayer({
      currentTrack: track,
      isPlaying: true,
      progress: 0,
      liked: track.liked,
      isAdPlaying: false,
    });
  }, []);

  const togglePlay = useCallback(() => {
    setPlayer((p) => ({ ...p, isPlaying: !p.isPlaying }));
  }, []);

  const toggleLike = useCallback(() => {
    setPlayer((p) => ({ ...p, liked: !p.liked }));
  }, []);

  const playNext = useCallback(() => {
    setPlayer((p) => {
      if (!p.currentTrack) return p;
      if (p.currentTrack.isAd) {
        // Skip ad
        const queued = nextTrackAfterAd.current;
        nextTrackAfterAd.current = null;
        if (queued) {
          return { ...p, currentTrack: queued, progress: 0, isPlaying: true, liked: queued.liked, isAdPlaying: false };
        }
        return p;
      }
      const currentIndex = tracks.findIndex((t) => t.id === p.currentTrack!.id);
      const nextTrack = tracks[(currentIndex + 1) % tracks.length];
      return { ...p, currentTrack: nextTrack, progress: 0, isPlaying: true, liked: nextTrack.liked, isAdPlaying: false };
    });
  }, []);

  const playPrev = useCallback(() => {
    setPlayer((p) => {
      if (!p.currentTrack || p.currentTrack.isAd) return p;
      const currentIndex = tracks.findIndex((t) => t.id === p.currentTrack!.id);
      const prevTrack = tracks[(currentIndex - 1 + tracks.length) % tracks.length];
      return { ...p, currentTrack: prevTrack, progress: 0, isPlaying: true, liked: prevTrack.liked, isAdPlaying: false };
    });
  }, []);

  const navLinks = [
    { label: 'Главная', page: 'home' as Page },
    { label: 'Таланты', page: 'charts' as Page },
    { label: 'Дневник звука', page: 'search' as Page },
    { label: 'Салон', page: 'library' as Page },
    { label: 'Подписка', page: 'subscriptions' as Page },
  ];

  const handleNavigate = useCallback((newPage: Page) => {
    setPage(newPage);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const currentTime = player.currentTrack
    ? formatTime((player.progress / 100) * player.currentTrack.durationSec)
    : '0:00';
  const remainingTime = player.currentTrack
    ? formatTime(player.currentTrack.durationSec - (player.progress / 100) * player.currentTrack.durationSec)
    : '0:00';

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black font-helvetica">
      <PageTransition pageKey={page}>
        {page === 'home' && <HeroSection onNavigate={handleNavigate} />}
        {page === 'search' && <SearchPage tracks={tracks} onPlay={playTrack} />}
        {page === 'charts' && <ChartsPage tracks={tracks} onPlay={playTrack} />}
        {page === 'library' && <LibraryPage tracks={tracks} onPlay={playTrack} />}
        {page === 'subscriptions' && <SubscriptionsPage />}
      </PageTransition>

      <Header currentPage={page} navLinks={navLinks} onNavigate={handleNavigate} />

      <PlayerBar
        player={player}
        onTogglePlay={togglePlay}
        onToggleLike={toggleLike}
        onNext={playNext}
        onPrev={playPrev}
        currentTime={currentTime}
        remainingTime={remainingTime}
        hasSubscription={hasSubscription}
        onSubscribe={() => setHasSubscription(true)}
      />
    </div>
  );
}
