import { useEffect, useRef, useState } from 'react';

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      // Reset the video source
      videoRef.current.src = '/hero-video.mp4';
      
      videoRef.current.load();
      
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Video playing successfully');
          })
          .catch(e => {
            console.error('Error playing video:', e);
            setVideoError(true);
          });
      }
    }
  }, []);

  if (videoError) {
    return (
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary to-secondary"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <video 
        ref={videoRef}
        className="absolute h-full w-full object-cover"
        playsInline
        muted
        loop
        preload="auto"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/60 via-secondary/50 to-secondary/70"></div>
    </div>
  );
};

export default Hero; 