const Hero = () => {
    return (
      <div className="relative h-screen w-full overflow-hidden">
        <video 
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="/src/files/hero-video.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-shimmer bg-[length:200%_100%]">
            Get Work Ready
          </h1>
        </div>
      </div>
    );
  };
  
  export default Hero; 