import { useEffect, useRef } from 'react';

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Debug video loading
    if (videoRef.current) {
      videoRef.current.addEventListener('loadeddata', () => {
        console.log('Video loaded successfully');
      });
      videoRef.current.addEventListener('error', (e) => {
        console.error('Error loading video:', e);
      });
    }
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video 
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay 
        muted 
        loop 
        playsInline
        // Debug: add controls temporarily to see if video loads
        controls
      >
        <source src="/hero-video.mp4" type="video/mp4" />
        {/* Fallback text */}
        Your browser does not support the video tag.
      </video>
      
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
        <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-shimmer bg-[length:200%_100%] px-4 text-center max-w-[90%] md:max-w-[80%]">
          Get Work Ready
        </h1>
      </div>
    </div>
  );
};

export default Hero; 