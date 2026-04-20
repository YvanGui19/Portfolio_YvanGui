import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import projectService from "../../services/projectService";
import useFetch from "../../hooks/useFetch";
import { getImageUrl } from "../../utils/imageUrl";
import { MarathonLetter } from "../marathon/MarathonLetters";

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
      className="group cursor-pointer relative overflow-hidden h-[400px] border-b-2 border-transparent hover:border-[#C2FE0B] transition-colors duration-300"
    >
      {/* Fond noir */}
      <div className="absolute inset-0 bg-[#0A0E1A]" />

      {/* Image du projet si disponible */}
      {project.images?.[0] && (
        <div className="absolute inset-0 z-[1]">
          <img
            src={getImageUrl(project.images[0])}
            alt={project.title}
            className="w-full h-full object-cover opacity-80 transition-all duration-500 group-hover:opacity-95 group-hover:scale-[1.02]"
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
            rgba(8, 9, 6, 0.97) 0%,
            rgba(8, 9, 6, 0.6) 38%,
            rgba(8, 9, 6, 0.05) 72%
          )`,
        }}
      />

      {/* Contenu */}
      <div className="absolute bottom-0 left-0 right-0 z-[3] p-6 flex justify-between items-end">
        <div>
          {/* Titre */}
          <h3
            style={{ fontFamily: '"Big Shoulders Display", sans-serif' }}
            className="font-black uppercase leading-[0.92] text-[clamp(24px,2.5vw,36px)] text-[#f0f0ec]"
          >
            {project.title.split(' ').map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h3>

          {/* Tags */}
          <div className="flex gap-2 mt-4 flex-wrap">
            {project.technologies?.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className="font-mono text-[9px] tracking-[0.15em] text-[#f0f0ec] border border-[#1c1d14] px-3 py-1 uppercase transition-all duration-200 group-hover:border-[#6a7f00] group-hover:text-[#f0f0ec]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

              </div>
    </article>
  );

  return (
    <section className="bg-[#0A0E1A] relative overflow-hidden pb-24 sm:pb-32">
      {/* Header de section */}
      <div className="pt-24 pb-8 sm:pt-28 sm:pb-10 px-8 sm:px-12 lg:px-14 flex justify-between items-end">
        <div>
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
        </div>
        <button
          onClick={() => navigate('/projects')}
          className="hidden sm:block font-mono text-[14px] tracking-[0.15em] text-[#f0f0ec] uppercase border-b border-[#1c1d14] pb-1 transition-colors hover:text-[#C2FE0B] hover:border-[#C2FE0B] cursor-pointer"
        >
          Tous les projets →
        </button>
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
      <div className="sm:hidden py-8 text-center border-t border-[#1c1d14]">
        <button
          onClick={() => navigate('/projects')}
          className="font-mono text-[10px] tracking-[0.22em] text-[#f0f0ec] uppercase border-b border-[#1c1d14] pb-1 transition-colors hover:text-[#C2FE0B] hover:border-[#C2FE0B] cursor-pointer"
        >
          Tous les projets →
        </button>
      </div>
    </section>
  );
}

export default FeaturedProjects;
