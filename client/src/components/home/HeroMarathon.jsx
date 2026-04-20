import { HeroBackground } from "../canvas";

/**
 * HeroMarathon - Style MARATHON V2 avec fond Canvas procedural
 */

function HeroMarathon() {
  return (
    <section className="min-h-screen bg-[#0A0E1A] relative overflow-hidden flex flex-col">
      {/* Fond Canvas procedural */}
      <HeroBackground className="opacity-90" />

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
            <div
              className="max-w-[400px] lg:mt-[clamp(77px,11.5vw,172px)] bg-[#C2FE0B] p-6 sm:p-8 shadow-[0_0_30px_rgba(194,254,11,0.3)]"
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroMarathon;
