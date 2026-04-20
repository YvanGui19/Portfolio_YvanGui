import { HeroBackground } from "../canvas";

/**
 * HeroMarathon - Style MARATHON V2 avec fond Canvas procedural
 */

function HeroMarathon() {
  return (
    <section className="min-h-screen bg-[#0A0E1A] relative overflow-hidden flex flex-col">
      {/* Fond Canvas procedural */}
      <HeroBackground className="opacity-90" />

      {/* Artefacts Marathon décoratifs */}
      <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
        {/* Coins Marathon */}
        <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-lime/30" />
        <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-lime/30" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-lime/30" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-lime/30" />

        {/* Diagonal stripes */}
        <div className="marathon-diagonal-stripes-lime absolute top-24 left-8 w-2 h-32 opacity-40" />
        <div className="marathon-diagonal-stripes-cyan absolute bottom-24 right-8 w-2 h-32 opacity-40" />

        {/* Data strips */}
        <div className="marathon-data-strip absolute top-1/3 left-4 h-48 w-1 opacity-30" />
        <div className="marathon-data-strip absolute top-1/4 right-4 h-64 w-1 opacity-30" />

        {/* Grid patterns */}
        <div className="marathon-grid marathon-grid-lime absolute top-12 right-24 w-12 h-12 opacity-20" />
        <div className="marathon-grid marathon-grid-cyan absolute bottom-20 left-24 w-8 h-8 opacity-20" />

        {/* Lignes horizontales décoratives */}
        <div className="absolute top-1/2 left-0 w-24 h-[1px] bg-gradient-to-r from-lime/40 to-transparent" />
        <div className="absolute top-1/2 right-0 w-24 h-[1px] bg-gradient-to-l from-cyan/40 to-transparent" />

        {/* CRT lines subtle */}
        <div className="hero-crt-lines absolute inset-0 opacity-[0.03]" />
      </div>

      {/* Zone de contenu avec fond localisé style VerrouPass */}
      <div
        className="flex-1 flex items-center relative z-10 w-full"
        style={{
          background: `linear-gradient(to top,
            rgba(10, 14, 26, 0.95) 0%,
            rgba(10, 14, 26, 0.85) 40%,
            rgba(10, 14, 26, 0.4) 70%,
            transparent 100%
          )`,
        }}
      >
        <div className="w-full px-8 sm:px-12 lg:px-[190px] pb-16 sm:pb-20 pt-16">
          {/* Numéro de section */}
          <span className="font-mono text-[10px] tracking-[0.3em] text-lime/50 block mb-6">
            [ 00 / ACCUEIL ]
          </span>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            {/* Nom - Big Shoulders Display */}
            <h1 className="leading-[0.88]">
              <span
                className="block text-[clamp(88px,13vw,196px)] text-[#f0f0ec] uppercase"
                style={{
                  fontFamily: '"Big Shoulders Display", sans-serif',
                  textShadow: '0 4px 30px rgba(0, 0, 0, 0.6)',
                  fontWeight: 900,
                }}
              >
                YVAN
              </span>
              <span
                className="block text-[clamp(88px,13vw,196px)] uppercase"
                style={{
                  fontFamily: '"Big Shoulders Display", sans-serif',
                  color: 'transparent',
                  WebkitTextStroke: '2px #C2FE0B',
                  fontWeight: 900,
                }}
              >
                GUI
              </span>
            </h1>

            {/* Description - Style VerrouPass avec coins coupés et glow */}
            <div className="relative max-w-[400px] lg:mt-[clamp(77px,11.5vw,172px)]">
              {/* Container principal */}
              <div
                className="bg-[#C2FE0B] p-6 sm:p-8 shadow-[0_0_30px_rgba(194,254,11,0.3)]"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))'
                }}
              >
                <p
                  style={{ fontFamily: '"Big Shoulders Display", sans-serif' }}
                  className="text-[#0A0E1A] text-[20px] sm:text-[24px] font-bold uppercase leading-[1.1] mb-3"
                >
                  Développeur Web Full Stack
                </p>
                <p className="font-mono text-[13px] sm:text-[14px] leading-[1.7] text-[#0A0E1A]/80">
                  Ancien expert technique dans l'aéronautique, j'ai choisi de mettre mes compétences d'analyse, de rigueur et de résolution de problèmes au service du développement web.
                </p>
              </div>
              {/* Artefact décoratif */}
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border border-lime/30 hidden sm:block" />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

export default HeroMarathon;
