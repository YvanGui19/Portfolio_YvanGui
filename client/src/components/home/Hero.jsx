function Hero() {
  return (
    <section className="min-h-screen bg-black flex items-center relative overflow-hidden">
      {/* Main content */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 w-full">
        {/* Name */}
        <div className="relative">
          <h1 className="text-editorial-giant text-white leading-[0.85]">
            <span className="block">YVAN</span>
            <span className="block text-[#C2FE0B] md:ml-[12vw]">GUI</span>
          </h1>

          {/* Role */}
          <div className="mt-12 md:mt-0 md:absolute md:right-0 md:bottom-0 md:translate-y-full md:pt-8 max-w-xs md:text-right">
            <p className="text-white/90 text-xl sm:text-2xl font-light leading-relaxed">
              Développeur<br className="hidden sm:block" /> Full Stack
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
