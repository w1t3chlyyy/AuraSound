import { useRef, useEffect, useState } from 'react';

export default function BoomerangVideoBg() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<'video' | 'canvas'>('video');
  const framesRef = useRef<ImageData[]>([]);
  const frameIndexRef = useRef(0);
  const directionRef = useRef<1 | -1>(1);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const MAX_WIDTH = 640; // reduced for performance
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const captureFrame = () => {
      if (video.readyState < 2) return;
      const scale = Math.min(1, MAX_WIDTH / video.videoWidth);
      const w = Math.floor(video.videoWidth * scale);
      const h = Math.floor(video.videoHeight * scale);

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      ctx.drawImage(video, 0, 0, w, h);
      const frame = ctx.getImageData(0, 0, w, h);
      framesRef.current.push(frame);
    };

    const scheduleCapture = () => {
      if (typeof video.requestVideoFrameCallback === 'function') {
        video.requestVideoFrameCallback(() => {
          captureFrame();
          if (mode === 'video') scheduleCapture();
        });
      } else {
        rafRef.current = requestAnimationFrame(() => {
          captureFrame();
          if (mode === 'video') scheduleCapture();
        });
      }
    };

    const handleEnded = () => {
      setMode('canvas');
      if (framesRef.current.length === 0) return;

      const first = framesRef.current[0];
      canvas.width = first.width;
      canvas.height = first.height;

      const FPS = 24; // reduced from 30
      const interval = 1000 / FPS;
      let lastTime = performance.now();

      const playLoop = (now: number) => {
        const frames = framesRef.current;
        if (frames.length === 0) return;

        if (now - lastTime >= interval) {
          let idx = frameIndexRef.current;
          idx += directionRef.current;

          if (idx >= frames.length - 1) {
            directionRef.current = -1;
            idx = frames.length - 1;
          } else if (idx <= 0) {
            directionRef.current = 1;
            idx = 0;
          }

          frameIndexRef.current = idx;
          ctx.putImageData(frames[idx], 0, 0);
          lastTime = now;
        }

        rafRef.current = requestAnimationFrame(playLoop);
      };

      rafRef.current = requestAnimationFrame(playLoop);
    };

    video.addEventListener('ended', handleEnded);
    scheduleCapture();

    return () => {
      video.removeEventListener('ended', handleEnded);
      cancelAnimationFrame(rafRef.current);
    };
  }, [mode]);

  return (
    <div className="absolute inset-0 z-0 scale-[1.08] origin-center overflow-hidden will-change-transform">
      <video
        ref={videoRef}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260611_183632_c311af08-e4b7-458f-81e7-79847a49b3d3.mp4"
        muted
        playsInline
        crossOrigin="anonymous"
        autoPlay
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          mode === 'canvas' ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          mode === 'canvas' ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
