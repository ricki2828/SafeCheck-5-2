import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const { t, language, toggleLanguage } = useLanguage();

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
    <div className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            The fastest official criminal check in Canada
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Get your criminal record check in minutes, not weeks. Trusted by employers across Canada.
          </p>
          <div className="mt-10 bg-white/5 p-6 rounded-lg flex items-start gap-4">
            <img
              src="/images/hockey-coach.png"
              alt="Mike Thompson - Hockey Coach"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <blockquote className="text-white/80 italic">
                "As a hockey coach, I need my background check done quickly. Got mine in minutes and was back on the ice the same day!"
              </blockquote>
              <div className="mt-4">
                <p className="text-white font-medium">Mike Thompson</p>
                <p className="text-white/60 text-sm">Minor League Hockey Coach</p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
        <div className="flex items-center space-x-4">
          <img
            src="/Testimonial.png"
            alt="Hockey coach testimonial"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="text-white/80 text-sm">{t('hero.testimonial.quote')}</p>
            <p className="text-white font-medium mt-1">
              {t('hero.testimonial.name')} · <span className="text-white/60">{t('hero.testimonial.role')}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 