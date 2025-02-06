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
    <div className="fixed inset-0 -z-10">
      <video 
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay 
        muted 
        loop 
        playsInline
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/95 via-secondary/90 to-secondary"></div>
    </div>
  );
};

export default Hero; 