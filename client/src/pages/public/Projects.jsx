import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { HiPhotograph } from "react-icons/hi";
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
      <div className="pt-24 pb-20 flex justify-center items-center min-h-screen bg-[#080906]">
        <span className="font-mono text-[10px] tracking-[0.2em] text-[#f0f0ec] uppercase">
          LOADING...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 pb-20 flex justify-center items-center min-h-screen bg-[#080906]">
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
        {/* Header */}
        <div className="mb-12 sm:mb-16 pt-8">
          <h1
            style={{ fontFamily: '"Big Shoulders Display", sans-serif' }}
            className="font-black text-[clamp(50px,10vw,120px)] text-[#f0f0ec] uppercase leading-[0.9] mb-4"
          >
            PROJETS
          </h1>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 sm:gap-8 mb-12 sm:mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              aria-pressed={activeFilter === category}
              className={`font-mono text-[14px] sm:text-[16px] tracking-[0.15em] uppercase transition-colors cursor-pointer ${
                activeFilter === category
                  ? "text-[#c8f000]"
                  : "text-[#f0f0ec] hover:text-[#f0f0ec]"
              }`}
            >
              {category.toUpperCase()}
            </button>
          ))}

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
                className="group relative cursor-pointer overflow-hidden h-[58vh] border-b-2 border-transparent hover:border-[#c8f000] transition-colors duration-300"
              >
                {/* Fond */}
                <div className="absolute inset-0 bg-[#080906]" />

                {/* Image si disponible */}
                {project.images?.[0] && (
                  <div className="absolute inset-0 z-[1]">
                    <img
                      src={getImageUrl(project.images[0])}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-40 transition-all duration-500 group-hover:opacity-60 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                )}

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
                <div className="absolute bottom-0 left-0 right-0 z-[3] p-8 sm:p-10 flex justify-between items-end">
                  <div>
                    {/* Titre */}
                    <h2
                      style={{ fontFamily: '"Big Shoulders Display", sans-serif' }}
                      className="font-black text-[clamp(28px,3.5vw,58px)] text-[#f0f0ec] uppercase leading-[0.92]"
                    >
                      {project.title}
                    </h2>

                    {/* Description */}
                    <p className="font-mono text-[12px] text-[#f0f0ec] mt-3 max-w-md line-clamp-2 leading-[1.8]">
                      {project.description}
                    </p>

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

                {/* Numero decoratif */}
                <span
                  style={{ fontFamily: '"Big Shoulders Display", sans-serif' }}
                  className="absolute top-6 right-6 font-black text-[64px] text-[#f0f0ec]/5 leading-none pointer-events-none z-[2]"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;
