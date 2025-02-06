import { useEffect, useRef, useState } from 'react';

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          videoRef.current.src = '/hero-video.mp4';
          videoRef.current.load();
          await videoRef.current.play();
          
          // Add event listeners for mobile
          document.addEventListener('touchstart', () => {
            videoRef.current?.play();
          }, { once: true });

          // Handle when the video is paused by the browser
          videoRef.current.addEventListener('pause', () => {
            videoRef.current?.play();
          });

        } catch (e) {
          console.error('Error playing video:', e);
          setVideoError(true);
        }
      }
    };

    playVideo();

    // Cleanup
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('pause', () => {
          videoRef.current?.play();
        });
      }
    };
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
      <div className="absolute inset-0 flex justify-end overflow-hidden">
        <video 
          ref={videoRef}
          className="absolute h-full w-[150vw] object-cover origin-right translate-x-[25%] scale-125"
          playsInline
          muted
          loop
          preload="auto"
          autoPlay
          webkit-playsinline="true"
          x5-playsinline="true"
          x5-video-player-type="h5"
          x5-video-player-fullscreen="true"
          x5-video-orientation="portraint"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/60 via-secondary/50 to-secondary/70"></div>
    </div>
  );
};

export default Hero; 