import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { HiPhotograph, HiGlobeAlt } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import projectService from "../../services/projectService";
import useFetch from "../../hooks/useFetch";
import { getImageUrl } from "../../utils/imageUrl";

function ProjectDetail() {
  const { id } = useParams();
  const { data: project, loading, error } = useFetch(() => projectService.getById(id), [id]);
  const { data: allProjects } = useFetch(() => projectService.getAll());
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const nextProject = useMemo(() => {
    if (!allProjects || !id) return null;
    const currentIndex = allProjects.findIndex((p) => p._id === id);
    if (currentIndex === -1) return null;
    return allProjects[(currentIndex + 1) % allProjects.length];
  }, [allProjects, id]);

  const prevProject = useMemo(() => {
    if (!allProjects || !id) return null;
    const currentIndex = allProjects.findIndex((p) => p._id === id);
    if (currentIndex === -1) return null;
    return allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];
  }, [allProjects, id]);

  if (loading) {
    return (
      <div className="pt-24 pb-20 flex justify-center items-center min-h-screen bg-black">
        <span className="text-editorial-label text-[#f0f0ec]">LOADING...</span>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4">
        <span className="text-editorial-label text-[#FF3030] mb-4">ERROR 404</span>
        <h1 className="text-editorial-display text-white mb-8">NOT FOUND</h1>
        <Link
          to="/projects"
          className="text-editorial-label text-[#C2FE0B] border-b border-[#C2FE0B] pb-1"
        >
          ← BACK TO PROJECTS
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-24 min-h-screen relative">
      <Helmet>
        <title>{project.title} | Yvan Gui</title>
        <meta name="description" content={project.description} />
      </Helmet>

      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="mb-12 relative">
          <h1 className="text-editorial-display text-white">
            {project.title}
          </h1>
        </div>

        {/* Gallery - Style Marathon */}
        <div className="mb-12 relative">
          {/* Container glace */}
          <div className="relative bg-lime/10 backdrop-blur-md">
            {/* Coins décoratifs */}
            <div className="absolute -top-px -left-px w-6 h-6 border-t-2 border-l-2 border-lime z-10" />
            <div className="absolute -top-px -right-px w-6 h-6 border-t-2 border-r-2 border-lime z-10" />
            <div className="absolute -bottom-px -left-px w-6 h-6 border-b-2 border-l-2 border-lime z-10" />
            <div className="absolute -bottom-px -right-px w-6 h-6 border-b-2 border-r-2 border-lime z-10" />

            <div className="relative overflow-hidden">
              {project.images?.length > 0 ? (
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    src={getImageUrl(project.images[activeImageIndex])}
                    alt={project.title}
                    className="w-full aspect-video object-contain bg-black/40"
                  />
                </AnimatePresence>
              ) : (
                <div className="w-full aspect-video flex items-center justify-center bg-[#000000]">
                  <HiPhotograph className="w-16 h-16 text-lime/20" />
                </div>
              )}

              {project.images?.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-cyan/10 backdrop-blur-md text-cyan flex items-center justify-center cursor-pointer hover:bg-cyan/30 hover:shadow-[0_0_20px_rgba(1,255,255,0.4)] transition-all"
                    aria-label="Image précédente"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-cyan/10 backdrop-blur-md text-cyan flex items-center justify-center cursor-pointer hover:bg-cyan/30 hover:shadow-[0_0_20px_rgba(1,255,255,0.4)] transition-all"
                    aria-label="Image suivante"
                  >
                    →
                  </button>
                  <div className="absolute bottom-4 right-4 font-mono text-[10px] tracking-[0.2em] text-cyan bg-cyan/10 backdrop-blur-md px-4 py-2 uppercase">
                    {String(activeImageIndex + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}
                  </div>
                </>
              )}
            </div>

            {project.images?.length > 1 && (
              <div className="flex gap-2 p-4 overflow-x-auto border-t border-lime/20">
                {project.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative flex-shrink-0 w-20 h-14 overflow-hidden cursor-pointer border transition-all ${
                      index === activeImageIndex
                        ? "border-lime shadow-[0_0_15px_rgba(194,254,11,0.3)]"
                        : "border-lime/20 opacity-50 hover:opacity-100 hover:border-lime/60"
                    }`}
                    aria-label={`Voir image ${index + 1} sur ${project.images.length}`}
                    aria-current={index === activeImageIndex ? "true" : undefined}
                  >
                    <img src={getImageUrl(image)} alt={`${project.title} - Image ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Data strips décoratifs */}
          <div className="marathon-data-strip absolute -left-3 top-1/4 h-24 w-1 opacity-40" />
          <div className="marathon-data-strip absolute -right-3 top-1/3 h-32 w-1 opacity-40" />
        </div>

        {/* Content grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="md:col-span-2 space-y-10">
            {/* Description */}
            <div className="bg-lime/10 backdrop-blur-md p-6">
              <h2 className="text-editorial-label text-[#C2FE0B] mb-4">DESCRIPTION</h2>
              <p className="text-white leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Challenges & Solutions */}
            {project.challenges?.length > 0 && (
              <div className="bg-lime/10 backdrop-blur-md p-6">
                <div className="grid grid-cols-2 gap-8 mb-6">
                  <h3 className="text-editorial-label text-[#C2FE0B]">CHALLENGES</h3>
                  <h3 className="text-editorial-label text-[#C2FE0B]">SOLUTIONS</h3>
                </div>
                <div className="space-y-4">
                  {project.challenges.map((c, i) => (
                    <div key={i} className="grid grid-cols-2 gap-8">
                      <p className="text-white">{c}</p>
                      <p className="text-white">{project.solutions?.[i] || "—"}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Style terminal Marathon */}
          <div className="space-y-8">
            {/* Technologies */}
            <div className="relative bg-lime/10 backdrop-blur-md p-5">
              {/* Coins */}
              <div className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-lime" />
              <div className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 border-lime" />

              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-lime/20">
                <h3 className="font-mono text-[10px] tracking-[0.2em] text-lime uppercase">Stack technique</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 border border-lime/30 text-lime/80 text-xs font-mono uppercase tracking-wider hover:border-lime hover:text-lime hover:shadow-[0_0_10px_rgba(194,254,11,0.2)] transition-all cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="relative bg-cyan/10 backdrop-blur-md p-5">
              {/* Coins */}
              <div className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-cyan" />
              <div className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 border-cyan" />

              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-cyan/20">
                <h3 className="font-mono text-[10px] tracking-[0.2em] text-cyan uppercase">Liens</h3>
              </div>
              <div className="space-y-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[#f0f0ec] hover:text-lime transition-colors group"
                  >
                    <FaGithub className="w-5 h-5 group-hover:animate-pulse" />
                    <span className="text-xs font-mono tracking-wider uppercase">GitHub</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[#f0f0ec] hover:text-cyan transition-colors group"
                  >
                    <HiGlobeAlt className="w-5 h-5 group-hover:animate-pulse" />
                    <span className="text-xs font-mono tracking-wider uppercase">Live Demo</span>
                  </a>
                )}
                {!project.githubUrl && !project.liveUrl && (
                  <p className="text-[#f0f0ec]/50 text-xs font-mono">Aucun lien disponible</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation - Style Marathon */}
        <div className="mt-16 pt-8 border-t border-lime/20 relative">
          {/* Ligne décorative */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 bg-[#000000]">
            <div className="marathon-grid marathon-grid-lime w-6 h-6 opacity-40" />
          </div>

          <div className="flex justify-between items-center">
            {prevProject ? (
              <Link
                to={`/projects/${prevProject._id}`}
                className="group flex items-center gap-3 px-5 py-3 bg-lime/25 backdrop-blur-md hover:bg-lime/40 hover:shadow-[0_0_20px_rgba(194,254,11,0.3)] transition-all"
              >
                <span className="text-lime group-hover:-translate-x-1 transition-transform">←</span>
                <span className="font-mono text-[12px] tracking-[0.15em] text-lime hidden sm:inline uppercase">{prevProject.title}</span>
                <span className="font-mono text-[12px] tracking-[0.15em] text-lime sm:hidden uppercase">PREV</span>
              </Link>
            ) : (
              <span />
            )}

            <Link
              to="/projects"
              className="font-mono text-[12px] tracking-[0.2em] text-lime uppercase px-5 py-3 bg-lime/25 backdrop-blur-md hover:bg-lime/40 hover:shadow-[0_0_20px_rgba(194,254,11,0.3)] transition-all"
            >
              [ Tous les projets ]
            </Link>

            {nextProject ? (
              <Link
                to={`/projects/${nextProject._id}`}
                className="group flex items-center gap-3 px-5 py-3 bg-lime/25 backdrop-blur-md hover:bg-lime/40 hover:shadow-[0_0_20px_rgba(194,254,11,0.3)] transition-all"
              >
                <span className="font-mono text-[12px] tracking-[0.15em] text-lime hidden sm:inline uppercase">{nextProject.title}</span>
                <span className="font-mono text-[12px] tracking-[0.15em] text-lime sm:hidden uppercase">NEXT</span>
                <span className="text-lime group-hover:translate-x-1 transition-all">→</span>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
