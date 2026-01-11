import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Card from "../../components/common/Card";
import projectService from "../../services/projectService";
import useFetch from "../../hooks/useFetch";
import { getImageUrl } from "../../utils/imageUrl";

const categories = ["Tous", "Full Stack", "Frontend", "Backend"];

function Projects() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("Tous");
  const {
    data: projects,
    loading,
    error,
  } = useFetch(() => projectService.getAll());

  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    if (activeFilter === "Tous") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [projects, activeFilter]);

  if (loading) {
    return (
      <div className="pt-24 pb-20 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-muted">Chargement des projets...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 pb-20 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-danger mb-4">{error}</p>
          <p className="text-text-muted">Impossible de charger les projets</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <Helmet>
        <title>Projets | Yvan Gui - Développeur Web</title>
        <meta name="description" content="Découvrez les projets web réalisés par Yvan Gui : applications React, Node.js, MongoDB. Portfolio de développeur full stack." />
        <meta property="og:title" content="Projets | Yvan Gui - Développeur Web" />
        <meta property="og:description" content="Portfolio des projets de développement web de Yvan Gui." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://portfolio-yvan-gui.vercel.app/projects" />
        <meta property="og:image" content="https://res.cloudinary.com/dox09mso9/image/upload/v1768128857/portfolio/projects/ve8qft3jnbzz1bonocvv.webp" />
        <meta property="og:site_name" content="Yvan Gui - Portfolio" />
        <meta property="og:locale" content="fr_FR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Projets | Yvan Gui" />
        <meta name="twitter:description" content="Découvrez les projets web réalisés par Yvan Gui." />
        <link rel="canonical" href="https://portfolio-yvan-gui.vercel.app/projects" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Mes <span className="text-primary">Projets</span>
          </h1>
          <p className="text-text-muted max-w-2xl mx-auto">
            Découvrez les projets que j&apos;ai réalisés durant ma formation et en
            freelance
          </p>
        </motion.div>

        {/* Filtres */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              aria-pressed={activeFilter === category}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === category
                  ? "bg-primary text-background shadow-glow"
                  : "bg-surface-light text-text-muted border border-border hover:border-primary hover:text-primary cursor-pointer"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Grille de projets */}
        {filteredProjects.length === 0 ? (
          <p className="text-center text-text-muted">Aucun projet trouvé</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                layout
              >
                <Card
                  hover
                  className="h-full cursor-pointer"
                  onClick={() => navigate(`/projects/${project._id}`)}
                >
                  {/* Image */}
                  <div className="h-56 bg-surface-light rounded-t-xl flex items-center justify-center border-b border-border overflow-hidden">
                    {project.images?.[0] ? (
                      <img
                        src={getImageUrl(project.images[0])}
                        alt={`Capture d'écran du projet ${project.title}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-5xl">🖼️</span>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-xl font-semibold">{project.title}</h2>
                      <span className="text-xs text-primary bg-primary/10 px-3 py-1 rounded-full select-none">
                        {project.category}
                      </span>
                    </div>

                    <p className="text-text-muted text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies?.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs text-primary border border-primary/50 rounded-full select-none"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;
