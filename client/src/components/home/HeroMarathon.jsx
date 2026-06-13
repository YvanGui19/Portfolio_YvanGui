/**
 * HeroMarathon - Style MARATHON V2 (le fond Canvas est rendu en fixed au niveau Home)
 */

function HeroMarathon() {
  return (
    <section className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Artefacts Marathon décoratifs */}
      <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
        {/* Grid patterns */}
        <div className="marathon-grid marathon-grid-lime absolute top-12 right-24 w-12 h-12 opacity-20" />
        <div className="marathon-grid marathon-grid-cyan absolute bottom-20 left-24 w-8 h-8 opacity-20" />

        {/* CRT lines subtle */}
        <div className="hero-crt-lines absolute inset-0 opacity-[0.03]" />
      </div>

      {/* Zone de contenu — le voile est appliqué globalement au niveau layout */}
      <div className="flex-1 flex items-center relative z-10 w-full">
        <div className="w-full px-4 sm:px-12 lg:px-[190px] pb-12 sm:pb-20 pt-12 sm:pt-16">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 sm:gap-8">
            {/* Nom - Big Shoulders Display */}
            <h1 className="leading-[0.88]">
              <span
                className="block text-[clamp(54px,16vw,90px)] sm:text-[clamp(88px,13vw,196px)] text-[#f0f0ec] uppercase"
                style={{
                  fontFamily: '"Big Shoulders Display", sans-serif',
                  textShadow: '0 4px 30px rgba(0, 0, 0, 0.6)',
                  fontWeight: 900,
                }}
              >
                YVAN
              </span>
              <span
                className="block text-[clamp(54px,16vw,90px)] sm:text-[clamp(88px,13vw,196px)] uppercase text-[#C2FE0B]"
                style={{
                  fontFamily: '"Big Shoulders Display", sans-serif',
                  fontWeight: 900,
                  textShadow: '0 4px 30px rgba(0, 0, 0, 0.6)',
                }}
              >
                GUI
              </span>
            </h1>

            {/* Description - Style VerrouPass avec coins coupés et glow */}
            <div className="relative max-w-[400px] lg:mt-[clamp(40px,6vw,95px)]">
              {/* Container principal */}
              <div
                className="bg-lime/10 backdrop-blur-md p-6 sm:p-8 shadow-[0_0_30px_rgba(194,254,11,0.3)]"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))'
                }}
              >
                <p
                  style={{ fontFamily: '"Big Shoulders Display", sans-serif' }}
                  className="text-white text-[20px] sm:text-[24px] font-bold uppercase leading-[1.1] mb-3"
                >
                  Développeur Web Full Stack
                </p>
                <p className="font-mono text-[13px] sm:text-[14px] leading-[1.7] text-white/80">
                  Ancien expert technique dans l'aéronautique, j'ai choisi de mettre mes compétences d'analyse, de rigueur et de résolution de problèmes au service du développement web.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

export default HeroMarathon;
