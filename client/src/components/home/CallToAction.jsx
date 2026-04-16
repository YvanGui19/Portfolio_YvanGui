import { Link } from "react-router-dom";
import { GlyphWaves, GlyphReturn, GlyphArches, GlyphHorns, GlyphColumns } from "../marathon/MarathonGlyphs";

/**
 * CallToAction - Style MARATHON avec patterns complexes
 */

function CallToAction() {
  return (
    <section className="relative overflow-hidden">
      {/* Section principale - fond lime solide */}
      <div className="py-28 sm:py-36 bg-[#C2FE0B] relative">
        <div className="max-w-[900px] mx-auto px-8 sm:px-16 text-center relative z-10">
          {/* Tag discret */}
          <span className="inline-block font-mono text-[10px] tracking-[0.3em] text-[#0A0E1A]/50 uppercase mb-6">
            // DISPONIBLE
          </span>

          {/* Titre clean */}
          <h2 className="font-condensed font-black text-[#0A0E1A] text-[clamp(44px,9vw,100px)] leading-[0.9] uppercase mb-8">
            UN PROJET
            <br />
            EN TÊTE ?
          </h2>

          {/* Sous-titre */}
          <p className="font-mono text-[13px] sm:text-[14px] tracking-[0.08em] text-[#0A0E1A]/60 max-w-sm mx-auto mb-10">
            Disponible pour des collaborations freelance
            et des projets créatifs ambitieux.
          </p>

          {/* CTA Button clean */}
          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#0A0E1A] text-[#C2FE0B] font-condensed font-bold text-[13px] sm:text-[14px] tracking-[0.15em] uppercase transition-all duration-300 hover:bg-white hover:text-[#0A0E1A]"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
            }}
          >
            <span>Discutons</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>

      {/* Bande de glyphes en bas */}
      <div className="h-16 bg-[#0A0E1A] relative flex items-center justify-center gap-10 sm:gap-16 overflow-hidden">
        <GlyphColumns size={35} color="#C2FE0B" className="opacity-15" />
        <GlyphWaves size={40} color="#C2FE0B" className="opacity-15" />
        <GlyphHorns size={38} color="#C2FE0B" className="opacity-15" />
        <GlyphArches size={35} color="#C2FE0B" className="opacity-15 hidden sm:block" />
        <GlyphReturn size={40} color="#C2FE0B" className="opacity-15 hidden md:block" />
      </div>
    </section>
  );
}

export default CallToAction;
