import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import projectService from "../../services/projectService";
import useFetch from "../../hooks/useFetch";
import { getImageUrl } from "../../utils/imageUrl";
import { MarathonLetter } from "../marathon/MarathonLetters";
import { SymbolSquareDot, SymbolRing, SymbolBullseye, SymbolStar4 } from "../marathon/HeroSymbols";

/**
 * FeaturedProjects - Style MARATHON comme la maquette
 * - Premier projet : pleine largeur
 * - Projets 2 & 3 : côte à côte
 * - Lettres Marathon en filigrane subtil
 */

function FeaturedProjects() {
  const navigate = useNavigate();
  const { data: projects, loading } = useFetch(() => projectService.getAll());

  const featuredProjects = useMemo(
    () => projects?.filter((p) => p.featured).slice(0, 3) || projects?.slice(0, 3) || [],
    [projects]
  );

  // Carte projet réutilisable
  const ProjectCard = ({ project, index }) => (
    <article
      onClick={() => navigate(`/projects/${project._id}`)}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/projects/${project._id}`)}
      tabIndex={0}
      role="link"
      aria-label={`Voir le projet ${project.title}`}
      className="group cursor-pointer relative overflow-hidden h-[400px] border border-lime/10 hover:border-lime/40 transition-all duration-300"
    >
      {/* Fond noir */}
      <div className="absolute inset-0 bg-[#0A0E1A]" />

      {/* Image du projet si disponible */}
      {project.images?.[0] && (
        <div className="absolute inset-0 z-[1]">
          <img
            src={getImageUrl(project.images[0])}
            alt={project.title}
            className="w-full h-full object-cover opacity-60 transition-all duration-500 group-hover:opacity-80 group-hover:scale-[1.02]"
            loading="lazy"
          />
        </div>
      )}

      {/* Lettre Marathon en filigrane */}
      <MarathonLetter
        index={index}
        className="absolute z-0 text-[#C2FE0B] opacity-[0.05] transition-opacity duration-500 group-hover:opacity-[0.09] pointer-events-none"
        style={{
          right: '-6%',
          top: '8%',
          width: '72%',
          height: 'auto',
        }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: `linear-gradient(to top,
            rgba(10, 14, 26, 0.98) 0%,
            rgba(10, 14, 26, 0.7) 40%,
            rgba(10, 14, 26, 0.2) 70%
          )`,
        }}
      />

      {/* Coins Marathon */}
      <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-lime/30 group-hover:border-lime transition-colors z-[4]" />
      <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-lime/30 group-hover:border-lime transition-colors z-[4]" />
      <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-lime/30 group-hover:border-lime transition-colors z-[4]" />
      <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-lime/30 group-hover:border-lime transition-colors z-[4]" />

      {/* Catégorie indicator */}
      <div className="absolute top-4 left-4 z-[4] opacity-60 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-cyan" />
          <span className="font-mono text-[8px] tracking-[0.3em] text-cyan/80 uppercase">
            {project.category || "Project"}
          </span>
        </div>
      </div>

      {/* Contenu */}
      <div className="absolute bottom-0 left-0 right-0 z-[3] p-6">
        <div>
          {/* Titre */}
          <h3
            style={{ fontFamily: '"Big Shoulders Display", sans-serif' }}
            className="font-black uppercase leading-[0.92] text-[clamp(24px,2.5vw,36px)] text-[#f0f0ec] group-hover:text-lime transition-colors"
          >
            {project.title.split(' ').map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h3>

          {/* Ligne de séparation */}
          <div className="w-10 h-[2px] bg-lime/40 group-hover:bg-lime group-hover:w-16 transition-all duration-300 mt-3" />

          {/* Tags */}
          <div className="flex gap-2 mt-4 flex-wrap">
            {project.technologies?.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className="font-mono text-[9px] tracking-[0.15em] text-lime/70 border border-lime/30 px-3 py-1 uppercase transition-all duration-200 group-hover:border-lime group-hover:text-lime"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Flèche indicative */}
        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <span className="font-mono text-lime text-lg">→</span>
        </div>
      </div>
    </article>
  );

  return (
    <section className="bg-[#0A0E1A] relative overflow-hidden pb-24 sm:pb-32">
      {/* Symboles du hero en arrière-plan - grands et statiques */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <SymbolSquareDot
          className="absolute -left-[3%] top-[8%] w-[250px] sm:w-[350px] h-auto text-lime opacity-[0.04]"
        />
        <SymbolRing
          className="absolute right-[8%] top-[20%] w-[280px] sm:w-[400px] h-auto text-cyan opacity-[0.03]"
        />
        <SymbolBullseye
          className="absolute left-[20%] bottom-[5%] w-[200px] sm:w-[280px] h-auto text-lime opacity-[0.03]"
        />
        <SymbolStar4
          className="absolute right-[5%] bottom-[10%] w-[180px] sm:w-[250px] h-auto text-cyan opacity-[0.04]"
        />
      </div>

      {/* Header de section */}
      <div className="pt-24 pb-8 sm:pt-28 sm:pb-10 px-8 sm:px-12 lg:px-14 relative">
        {/* Numéro de section */}
        <span className="font-mono text-[10px] tracking-[0.3em] text-lime/50 block mb-4">
          [ 02 / RÉALISATIONS ]
        </span>

        <div className="flex justify-between items-end">
          <h2
            style={{ fontFamily: '"Big Shoulders Display", sans-serif' }}
            className="font-black text-[clamp(50px,7vw,96px)] uppercase leading-[0.9]"
          >
            <span className="text-[#f0f0ec]">PRO</span>
            <span
              style={{
                color: 'transparent',
                WebkitTextStroke: '2px #f0f0ec',
              }}
            >
              JETS
            </span>
          </h2>
          <button
            onClick={() => navigate('/projects')}
            className="hidden sm:flex items-center gap-2 font-mono text-[12px] tracking-[0.15em] text-[#f0f0ec] uppercase px-4 py-2 border border-lime/30 transition-all hover:text-lime hover:border-lime hover:shadow-[0_0_15px_rgba(194,254,11,0.2)] cursor-pointer"
          >
            Tous les projets
            <span className="text-lime">→</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <span className="font-mono text-[12px] tracking-[0.2em] text-[#f0f0ec] uppercase">
            Chargement...
          </span>
        </div>
      ) : featuredProjects.length === 0 ? (
        <div className="py-20 text-center">
          <span className="font-mono text-[12px] tracking-[0.2em] text-[#f0f0ec] uppercase">
            Aucun projet
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3px] px-8 sm:px-12 lg:px-14">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project._id} project={project} index={index} />
          ))}
        </div>
      )}

      {/* Bouton mobile */}
      <div className="sm:hidden py-8 text-center border-t border-lime/20">
        <button
          onClick={() => navigate('/projects')}
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-[#f0f0ec] uppercase px-4 py-2 border border-lime/30 transition-all hover:text-lime hover:border-lime cursor-pointer"
        >
          Tous les projets
          <span className="text-lime">→</span>
        </button>
      </div>
    </section>
  );
}

export default FeaturedProjects;
