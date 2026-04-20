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
        <div className="mb-12">
          <span className="text-editorial-label text-[#C2FE0B] block mb-4">
            {project.category}
          </span>
          <h1 className="text-editorial-display text-white mb-6">
            {project.title}
          </h1>
          <p className="text-[#f0f0ec] text-lg max-w-2xl leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Gallery */}
        <div className="mb-12 bg-[#0A0A0A]">
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
                  className="w-full aspect-video object-cover"
                />
              </AnimatePresence>
            ) : (
              <div className="w-full aspect-video flex items-center justify-center">
                <HiPhotograph className="w-16 h-16 text-[#222222]" />
              </div>
            )}

            {project.images?.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/80 text-white flex items-center justify-center cursor-pointer hover:bg-[#C2FE0B] hover:text-black transition-colors"
                  aria-label="Image précédente"
                >
                  ←
                </button>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/80 text-white flex items-center justify-center cursor-pointer hover:bg-[#C2FE0B] hover:text-black transition-colors"
                  aria-label="Image suivante"
                >
                  →
                </button>
                <div className="absolute bottom-4 right-4 text-editorial-label text-white bg-black/80 px-3 py-1">
                  {activeImageIndex + 1} / {project.images.length}
                </div>
              </>
            )}
          </div>

          {project.images?.length > 1 && (
            <div className="flex gap-2 p-4 overflow-x-auto">
              {project.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-14 overflow-hidden cursor-pointer border-2 transition-all ${
                    index === activeImageIndex
                      ? "border-[#C2FE0B]"
                      : "border-transparent opacity-50 hover:opacity-100"
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

        {/* Content grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="md:col-span-2 space-y-10">
            {/* Description */}
            <div className="border-l-2 border-[#C2FE0B] pl-6">
              <h2 className="text-editorial-label text-[#C2FE0B] mb-4">DESCRIPTION</h2>
              <p className="text-[#f0f0ec] leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Challenges & Solutions */}
            {project.challenges?.length > 0 && (
              <div>
                <div className="grid grid-cols-2 gap-8 mb-6">
                  <h3 className="text-editorial-label text-[#C2FE0B]">CHALLENGES</h3>
                  <h3 className="text-editorial-label text-[#C2FE0B]">SOLUTIONS</h3>
                </div>
                <div className="space-y-4">
                  {project.challenges.map((c, i) => (
                    <div key={i} className="grid grid-cols-2 gap-8">
                      <p className="text-[#d0d0cc]">{c}</p>
                      <p className="text-[#d0d0cc]">{project.solutions?.[i] || "—"}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Technologies */}
            <div className="border-l-2 border-[#C2FE0B] pl-6">
              <h3 className="text-editorial-label text-[#C2FE0B] mb-4">TECH STACK</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-[#1a1a1a] text-[#d0d0cc] text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h3 className="text-editorial-label text-[#f0f0ec] mb-4">LINKS</h3>
              <div className="space-y-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[#f0f0ec] hover:text-[#C2FE0B] transition-colors"
                  >
                    <FaGithub className="w-5 h-5" />
                    <span className="text-sm">GITHUB</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[#f0f0ec] hover:text-[#C2FE0B] transition-colors"
                  >
                    <HiGlobeAlt className="w-5 h-5" />
                    <span className="text-sm">LIVE DEMO</span>
                  </a>
                )}
                {!project.githubUrl && !project.liveUrl && (
                  <p className="text-[#f0f0ec] text-sm">No links available</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
          {prevProject ? (
            <Link
              to={`/projects/${prevProject._id}`}
              className="group flex items-center gap-3 text-[#f0f0ec] hover:text-[#C2FE0B] transition-colors"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              <span className="text-editorial-label hidden sm:inline">{prevProject.title}</span>
              <span className="text-editorial-label sm:hidden">PREV</span>
            </Link>
          ) : (
            <span />
          )}

          <Link
            to="/projects"
            className="text-editorial-label text-[#f0f0ec] hover:text-white transition-colors"
          >
            ALL PROJECTS
          </Link>

          {nextProject ? (
            <Link
              to={`/projects/${nextProject._id}`}
              className="group flex items-center gap-3 text-[#C2FE0B] hover:text-white transition-colors"
            >
              <span className="text-editorial-label hidden sm:inline">{nextProject.title}</span>
              <span className="text-editorial-label sm:hidden">NEXT</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
