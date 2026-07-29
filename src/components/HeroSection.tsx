import { Page } from '../types';
import BoomerangVideoBg from './BoomerangVideoBg';
import AnimatedText from './AnimatedText';

interface HeroSectionProps {
  onNavigate: (page: Page) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <BoomerangVideoBg />

      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-black/20 to-black/50" />

      <div className="relative z-10 flex h-full flex-col items-center px-4 sm:px-6 pt-[14vh] sm:pt-[16vh] md:pt-[18vh] lg:pt-[20vh] pb-24 text-center">
        <div
          className="animate-fade-up delay-1 liquid-glass liquid-glass-shimmer mb-5 sm:mb-6 inline-flex rounded-lg px-4 py-1.5 text-xs sm:text-sm text-white"
          style={{ background: 'rgba(255, 255, 255, 0.16)' }}
        >
          <span className="mr-2 inline-flex items-center">
            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
            Выпуск 04
          </span>
          <span className="text-white/50">·</span>
          <span className="ml-2">Весенние леса</span>
        </div>

        <h1 className="max-w-3xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-white">
          <AnimatedText text="Тишина. Звук." delay={0.2} splitBy="word" />
          <br />
          <AnimatedText text="Чувство." delay={0.4} splitBy="word" />
        </h1>

        <p className="animate-fade-up delay-3 mt-5 sm:mt-6 max-w-md text-sm sm:text-base md:text-lg leading-relaxed text-white/90">
           Уютная коллекция треков для работы, отдыха и душевных вечеров. Музыка, которая обнимает.
        </p>

        <div className="animate-fade-up delay-4 mt-8 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => onNavigate('search')}
            className="magnetic-btn rounded-full bg-white px-7 py-2.5 text-sm text-gray-900 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-white/10 active:scale-95"
          >
            Искать на полках
          </button>
          <button
            onClick={() => onNavigate('charts')}
            className="magnetic-btn liquid-glass liquid-glass-shimmer rounded-full px-7 py-2.5 text-sm text-white transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Новые поступления
          </button>
        </div>
      </div>
    </section>
  );
}
