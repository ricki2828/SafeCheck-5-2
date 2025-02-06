import { useEffect, useRef } from 'react';

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays
    if (videoRef.current) {
      videoRef.current.play().catch(e => {
        console.error('Error playing video:', e);
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <video 
        ref={videoRef}
        className="absolute h-full w-full object-cover"
        autoPlay 
        muted 
        loop 
        playsInline
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/60 via-secondary/50 to-secondary/70"></div>
    </div>
  );
};

export default Hero; 