import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import projectService from "../../services/projectService";
import useFetch from "../../hooks/useFetch";
import { getImageUrl } from "../../utils/imageUrl";

const categories = ["Tous", "Full Stack", "Frontend", "Backend"];

function Projects() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("Tous");
  const { data: projects, loading, error } = useFetch(() => projectService.getAll());

  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    if (activeFilter === "Tous") return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [projects, activeFilter]);

  if (loading) {
    return (
      <div className="pt-24 pb-20 flex justify-center items-center min-h-screen bg-[#000000]">
        <span className="font-mono text-[10px] tracking-[0.2em] text-[#f0f0ec] uppercase">
          LOADING...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 pb-20 flex justify-center items-center min-h-screen bg-[#000000]">
        <span className="font-mono text-[10px] tracking-[0.2em] text-[#FF3030] uppercase">
          ERROR
        </span>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-24 min-h-screen relative">
      <Helmet>
        <title>Projets | Yvan Gui</title>
        <meta name="description" content="Decouvrez les projets web realises par Yvan Gui." />
      </Helmet>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
        {/* Header avec artefacts Marathon */}
        <div className="mb-12 sm:mb-16 pt-8 relative">
          {/* Artefacts décoratifs */}
          <div className="marathon-diagonal-stripes-lime absolute -left-4 top-0 w-2 h-24 opacity-60" />
          <div className="marathon-grid marathon-grid-lime absolute -right-4 top-4 w-16 h-16 opacity-30" />

          {/* Numéro de section */}
          <span className="font-mono text-[10px] tracking-[0.3em] text-lime/60 block mb-2">
            [ 01 / PORTFOLIO ]
          </span>

          <h1
            style={{ fontFamily: '"Big Shoulders Display", sans-serif' }}
            className="font-black text-[clamp(50px,10vw,120px)] text-[#f0f0ec] uppercase leading-[0.9] mb-4"
          >
            PROJETS
          </h1>

          {/* Ligne décorative */}
          <div className="flex items-center gap-4 mt-4">
            <div className="h-[2px] w-16 bg-lime" />
            <span className="text-[#f0f0ec]/60 text-lg leading-relaxed">
              Réalisations & Expériences
            </span>
          </div>
        </div>

        {/* Filters - Style terminal */}
        <div className="relative mb-12 sm:mb-16 p-4 border border-cyan/20 bg-[#000000]/80">
          {/* Décoration coin */}
          <div className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-cyan" />
          <div className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 border-cyan" />
          <div className="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-cyan" />
          <div className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-cyan" />

          <div className="flex items-center gap-2 mb-3">
            <span className="text-cyan font-mono text-[10px]">▸</span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#f0f0ec]/60 uppercase">
              Filtrer par catégorie
            </span>
          </div>

          <div className="flex flex-wrap gap-4 sm:gap-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                aria-pressed={activeFilter === category}
                className={`font-mono text-[12px] sm:text-[14px] tracking-[0.15em] uppercase transition-all cursor-pointer px-3 py-1 border ${
                  activeFilter === category
                    ? "text-[#000000] bg-cyan border-cyan shadow-[0_0_15px_rgba(1,255,255,0.4)]"
                    : "text-[#f0f0ec] border-[#f0f0ec]/20 hover:border-cyan/60 hover:text-cyan"
                }`}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filteredProjects.length === 0 ? (
          <div className="py-16 text-center">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#f0f0ec] uppercase">
              AUCUN PROJET TROUVE
            </span>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-[3px]">
            {filteredProjects.map((project, index) => (
              <article
                key={project._id}
                onClick={() => navigate(`/projects/${project._id}`)}
                onKeyDown={(e) => e.key === "Enter" && navigate(`/projects/${project._id}`)}
                tabIndex={0}
                role="link"
                aria-label={`Voir le projet ${project.title}`}
                className="group relative cursor-pointer overflow-hidden h-[58vh] border border-lime/10 hover:border-lime/40 transition-all duration-300"
              >
                {/* Fond */}
                <div className="absolute inset-0 bg-[#000000]" />

                {/* Image si disponible */}
                {project.images?.[0] && (
                  <div className="absolute inset-0 z-[1]">
                    <img
                      src={getImageUrl(project.images[0])}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-30 transition-all duration-500 group-hover:opacity-50 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                )}

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

                {/* CRT lines subtle effect */}
                <div className="absolute inset-0 z-[3] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 hero-crt-lines" />

                {/* Coins Marathon */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-lime/40 group-hover:border-lime transition-colors z-[4]" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-lime/40 group-hover:border-lime transition-colors z-[4]" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-lime/40 group-hover:border-lime transition-colors z-[4]" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-lime/40 group-hover:border-lime transition-colors z-[4]" />

                {/* Data strip décorative */}
                <div className="absolute top-4 left-4 z-[4] opacity-60 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan" />
                    <span className="font-mono text-[8px] tracking-[0.3em] text-cyan/80 uppercase">
                      {project.category || "Project"}
                    </span>
                  </div>
                </div>

                {/* Contenu */}
                <div className="absolute bottom-0 left-0 right-0 z-[5] p-8 sm:p-10">
                  <div>
                    {/* Titre */}
                    <h2
                      style={{ fontFamily: '"Big Shoulders Display", sans-serif' }}
                      className="font-black text-[clamp(28px,3.5vw,58px)] text-[#f0f0ec] uppercase leading-[0.92] group-hover:text-lime transition-colors duration-300"
                    >
                      {project.title}
                    </h2>

                    {/* Ligne de séparation */}
                    <div className="w-12 h-[2px] bg-lime/40 group-hover:bg-lime group-hover:w-24 transition-all duration-300 mt-3" />

                    {/* Description */}
                    <p className="font-mono text-[11px] text-[#f0f0ec]/80 mt-3 max-w-md line-clamp-2 leading-[1.8]">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex gap-2 mt-4 flex-wrap">
                      {project.technologies?.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="font-mono text-[9px] tracking-[0.15em] text-lime/70 border border-lime/30 px-3 py-1 uppercase transition-all duration-200 group-hover:border-lime group-hover:text-lime group-hover:shadow-[0_0_10px_rgba(194,254,11,0.2)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Numero decoratif - style Marathon */}
                <span
                  style={{ fontFamily: '"Big Shoulders Display", sans-serif' }}
                  className="absolute top-6 right-6 font-black text-[80px] text-lime/5 group-hover:text-lime/10 leading-none pointer-events-none z-[4] transition-colors"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Flèche indicative au hover */}
                <div className="absolute bottom-8 right-8 z-[5] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <span className="font-mono text-lime text-lg">→</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;
