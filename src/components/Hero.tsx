export default function Hero() {
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
    </div>
  );
} 