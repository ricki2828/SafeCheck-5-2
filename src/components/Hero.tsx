export default function Hero() {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
          <div className="absolute inset-0 -z-10">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            >
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-dark to-dark/50" />
          </div>

          <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            The fastest official criminal check in Canada
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Get your criminal record check in minutes, not weeks. Trusted by employers across Canada.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-green-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
            >
              Get your check now
            </a>
          </div>
        </div>

        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="mt-8 bg-white/5 p-6 rounded-lg">
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
    </div>
  );
} 