interface EqualizerProps {
  isPlaying: boolean;
  barCount?: number;
  color?: string;
}

export default function Equalizer({ isPlaying, barCount = 4, color = 'bg-blue-700' }: EqualizerProps) {
  return (
    <div className="flex items-end gap-[2px] h-4">
      {Array.from({ length: barCount }).map((_, i) => (
        <div
          key={i}
          className={`w-1 rounded-full ${color} eq-bar ${isPlaying ? '' : '!scale-y-[0.2]'}`}
          style={{
            height: '100%',
            animationPlayState: isPlaying ? 'running' : 'paused',
          }}
        />
      ))}
    </div>
  );
}
