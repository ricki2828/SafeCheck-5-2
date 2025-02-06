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
    <div className="relative h-48 w-full overflow-hidden">
      <video 
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay 
        muted 
        loop 
        playsInline
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Get Work Ready
        </h1>
      </div>
    </div>
  );
};

export default Hero; 