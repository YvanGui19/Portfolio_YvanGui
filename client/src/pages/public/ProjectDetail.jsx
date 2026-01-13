import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiPhotograph, HiGlobeAlt } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import projectService from "../../services/projectService";
import useFetch from "../../hooks/useFetch";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import { getImageUrl } from "../../utils/imageUrl";

function ProjectDetail() {
  const { id } = useParams();
  const {
    data: project,
    loading,
    error,
  } = useFetch(() => projectService.getById(id), [id]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (loading) {
    return (
      <div className="pt-24 pb-20 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-muted">Chargement du projet...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="pt-24 pb-20 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">404</h1>
          <p className="text-text-muted mb-8">Projet non trouvé</p>
          <Button to="/projects">Retour aux projets</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <Helmet>
        <title>{`${project.title} | Yvan Gui - Développeur Web`}</title>
        <meta name="description" content={project.description} />
        <meta property="og:title" content={`${project.title} | Yvan Gui`} />
        <meta property="og:description" content={project.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://portfolio-yvan-gui.vercel.app/projects/${id}`} />
        <meta property="og:site_name" content="Yvan Gui - Portfolio" />
        <meta property="og:locale" content="fr_FR" />
        {project.images?.[0] && (
          <meta property="og:image" content={getImageUrl(project.images[0])} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={project.title} />
        <meta name="twitter:description" content={project.description} />
        {project.images?.[0] && (
          <meta name="twitter:image" content={getImageUrl(project.images[0])} />
        )}
              <link rel="canonical" href={`https://portfolio-yvan-gui.vercel.app/projects/${id}`} />
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold">{project.title}</h1>
            <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full">
              {project.category}
            </span>
          </div>
          <p className="text-text-muted text-lg">{project.description}</p>
        </motion.div>

        {/* Galerie d'images */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          {/* Image principale */}
          <Card className="overflow-hidden mb-4">
            <div className="relative h-64 md:h-96 bg-surface-light flex items-center justify-center">
              {project.images?.length > 0 ? (
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    src={getImageUrl(project.images[activeImageIndex])}
                    alt={`${project.title} - Image ${activeImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
              ) : (
                <HiPhotograph className="w-20 h-20 text-text-muted" />
              )}

              {/* Navigation flèches */}
              {project.images?.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev === 0 ? project.images.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 hover:bg-background rounded-full flex items-center justify-center text-text hover:text-primary transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label="Image précédente"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev === project.images.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 hover:bg-background rounded-full flex items-center justify-center text-text hover:text-primary transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label="Image suivante"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                  {/* Compteur */}
                  <div className="absolute bottom-4 right-4 px-3 py-1 bg-background/80 rounded-full text-sm text-text">
                    {activeImageIndex + 1} / {project.images.length}
                  </div>
                </>
              )}
            </div>
          </Card>

          {/* Miniatures */}
          {project.images?.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {project.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  aria-label={`Afficher image ${index + 1}`}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${
                    index === activeImageIndex
                      ? "border-primary shadow-glow"
                      : "border-transparent hover:border-primary/50"
                  }`}
                >
                  <img
                    src={getImageUrl(image)}
                    alt={`${project.title} - Miniature ${index + 1}`}
                    className="w-full h-full object-cover" loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Contenu */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Description longue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2"
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">À propos du projet</h2>
              <div className="text-text-light leading-relaxed space-y-4">
                <p>{project.longDescription || project.description}</p>
              </div>

              {project.challenges?.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold mt-6 mb-3">
                    Défis relevés
                  </h3>
                  <ul className="list-disc list-inside text-text-light space-y-2">
                    {project.challenges.map((challenge, index) => (
                      <li key={index}>{challenge}</li>
                    ))}
                  </ul>
                </>
              )}

              {project.solutions?.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold mt-6 mb-3">
                    Solutions apportées
                  </h3>
                  <ul className="list-disc list-inside text-text-light space-y-2">
                    {project.solutions.map((solution, index) => (
                      <li key={index}>{solution}</li>
                    ))}
                  </ul>
                </>
              )}
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Technologies */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm text-primary border border-primary/50 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Card>

            {/* Liens */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Liens</h3>
              <div className="space-y-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-text-muted hover:text-primary transition-colors"
                  >
                    <FaGithub className="w-5 h-5" />
                    <span>Code source (GitHub)</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-text-muted hover:text-primary transition-colors"
                  >
                    <HiGlobeAlt className="w-5 h-5" />
                    <span>Voir le site</span>
                  </a>
                )}
                {!project.githubUrl && !project.liveUrl && (
                  <p className="text-text-muted text-sm">
                    Aucun lien disponible
                  </p>
                )}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Retour aux projets */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-end mt-8"
        >
          <Link
            to="/projects"
            className="text-text-muted hover:text-primary transition-colors"
          >
            Retour aux projets →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default ProjectDetail;
