import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BiChevronLeft, BiChevronRight, BiX } from "react-icons/bi";
import projectService from "../../services/projectService";
import { getImageUrl } from "../../utils/imageUrl";

function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    longDescription: "",
    category: "Full Stack",
    technologies: "",
    challenges: "",
    solutions: "",
    githubUrl: "",
    liveUrl: "",
    featured: false,
    order: 0,
  });
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Charger le projet si mode édition
  useEffect(() => {
    if (isEdit) {
      loadProject();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadProject = async () => {
    try {
      const response = await projectService.getById(id);
      const project = response.data;
      setFormData({
        title: project.title || "",
        description: project.description || "",
        longDescription: project.longDescription || "",
        category: project.category || "Full Stack",
        technologies: project.technologies?.join(", ") || "",
        challenges: project.challenges?.join("\n") || "",
        solutions: project.solutions?.join("\n") || "",
        githubUrl: project.githubUrl || "",
        liveUrl: project.liveUrl || "",
        featured: project.featured || false,
        order: project.order || 0,
      });
      setImages(project.images || []);
    } catch {
      setError("Erreur lors du chargement du projet");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    setError("");

    try {
      for (const file of files) {
        const response = await projectService.uploadImage(file);
        setImages((prev) => [...prev, response.data.path]);
      }
    } catch (err) {
      setError("Erreur lors de l'upload de l'image");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const moveImage = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= images.length) return;

    setImages((prev) => {
      const newImages = [...prev];
      [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];
      return newImages;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const projectData = {
      ...formData,
      technologies: formData.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      challenges: formData.challenges
        .split("\n")
        .map((c) => c.trim())
        .filter(Boolean),
      solutions: formData.solutions
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      images,
    };

    try {
      if (isEdit) {
        await projectService.update(id, projectData);
      } else {
        await projectService.create(projectData);
      }
      navigate("/admin/projects");
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            {/* Tag */}
            <div className="font-mono text-[0.7rem] text-lime tracking-[0.25em] uppercase mb-2">
              // {isEdit ? "EDIT_PROJECT" : "NEW_PROJECT"}
            </div>

            {/* Title */}
            <h1 className="font-display text-[clamp(1.5rem,4vw,2rem)] font-bold text-off-white tracking-wide">
              {isEdit ? "Modifier le projet" : "Nouveau projet"}
            </h1>
          </div>

          <button
            onClick={() => navigate("/admin/projects")}
            className="px-4 py-2 font-mono text-[0.75rem] border border-white/20 text-grey hover:text-off-white hover:border-white/40 transition-all cursor-pointer tracking-wider uppercase"
          >
            Annuler
          </button>
        </div>

        {/* Form */}
        <div className="border border-white/10 bg-black/20">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Titre */}
            <div className="space-y-2">
              <label className="block font-mono text-[0.75rem] text-off-white tracking-wide uppercase">
                Titre <span className="text-red">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Nom du projet"
                required
                className="w-full bg-black/30 border border-white/10 px-4 py-3 font-mono text-[0.85rem] text-off-white placeholder:text-grey/50 focus:border-lime/50 focus:outline-none transition-colors"
              />
            </div>

            {/* Description courte */}
            <div className="space-y-2">
              <label className="block font-mono text-[0.75rem] text-off-white tracking-wide uppercase">
                Description courte <span className="text-red">*</span>
              </label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                placeholder="Description courte du projet (min. 20 caractères)"
                required
                className="w-full bg-black/30 border border-white/10 px-4 py-3 font-mono text-[0.85rem] text-off-white placeholder:text-grey/50 focus:border-lime/50 focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Description longue */}
            <div className="space-y-2">
              <label className="block font-mono text-[0.75rem] text-off-white tracking-wide uppercase">
                Description détaillée
              </label>
              <textarea
                name="longDescription"
                rows={5}
                value={formData.longDescription}
                onChange={handleChange}
                placeholder="Description complète du projet, contexte, objectifs..."
                className="w-full bg-black/30 border border-white/10 px-4 py-3 font-mono text-[0.85rem] text-off-white placeholder:text-grey/50 focus:border-lime/50 focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Catégorie et Technologies */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block font-mono text-[0.75rem] text-off-white tracking-wide uppercase">
                  Catégorie
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-black/30 border border-white/10 px-4 py-3 font-mono text-[0.85rem] text-off-white focus:border-lime/50 focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="Full Stack">Full Stack</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block font-mono text-[0.75rem] text-off-white tracking-wide uppercase">
                  Technologies
                </label>
                <input
                  type="text"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleChange}
                  placeholder="React, Node.js, MongoDB (virgules)"
                  className="w-full bg-black/30 border border-white/10 px-4 py-3 font-mono text-[0.85rem] text-off-white placeholder:text-grey/50 focus:border-lime/50 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Défis et Solutions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block font-mono text-[0.75rem] text-off-white tracking-wide uppercase">
                  Défis relevés
                </label>
                <textarea
                  name="challenges"
                  rows={4}
                  value={formData.challenges}
                  onChange={handleChange}
                  placeholder="Un défi par ligne"
                  className="w-full bg-black/30 border border-white/10 px-4 py-3 font-mono text-[0.85rem] text-off-white placeholder:text-grey/50 focus:border-lime/50 focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-mono text-[0.75rem] text-off-white tracking-wide uppercase">
                  Solutions apportées
                </label>
                <textarea
                  name="solutions"
                  rows={4}
                  value={formData.solutions}
                  onChange={handleChange}
                  placeholder="Une solution par ligne"
                  className="w-full bg-black/30 border border-white/10 px-4 py-3 font-mono text-[0.85rem] text-off-white placeholder:text-grey/50 focus:border-lime/50 focus:outline-none transition-colors resize-none"
                />
              </div>
            </div>

            {/* URLs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block font-mono text-[0.75rem] text-off-white tracking-wide uppercase">
                  URL GitHub
                </label>
                <input
                  type="url"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  placeholder="https://github.com/..."
                  className="w-full bg-black/30 border border-white/10 px-4 py-3 font-mono text-[0.85rem] text-off-white placeholder:text-grey/50 focus:border-lime/50 focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-mono text-[0.75rem] text-off-white tracking-wide uppercase">
                  URL Live
                </label>
                <input
                  type="url"
                  name="liveUrl"
                  value={formData.liveUrl}
                  onChange={handleChange}
                  placeholder="https://monsite.com"
                  className="w-full bg-black/30 border border-white/10 px-4 py-3 font-mono text-[0.85rem] text-off-white placeholder:text-grey/50 focus:border-lime/50 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-5 h-5 bg-black/30 border border-white/20 checked:bg-lime checked:border-lime focus:ring-0 cursor-pointer"
                />
                <label htmlFor="featured" className="font-mono text-[0.8rem] text-grey cursor-pointer">
                  Projet mis en avant (affiché sur la page d&apos;accueil)
                </label>
              </div>

              <div className="space-y-2">
                <label className="block font-mono text-[0.75rem] text-off-white tracking-wide uppercase">
                  Ordre d&apos;affichage
                </label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  min="0"
                  className="w-full bg-black/30 border border-white/10 px-4 py-3 font-mono text-[0.85rem] text-off-white focus:border-lime/50 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Images */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block font-mono text-[0.75rem] text-off-white tracking-wide uppercase">
                  Images
                </label>
                {images.length > 0 && (
                  <span className="font-mono text-[0.65rem] text-grey">
                    // La première image sera affichée sur l&apos;accueil
                  </span>
                )}
              </div>

              {/* Preview des images */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className={`relative group ${
                        index === 0 ? "ring-2 ring-lime ring-offset-2 ring-offset-dark-navy" : ""
                      }`}
                    >
                      {index === 0 && (
                        <span className="absolute -top-2 -left-2 z-10 bg-lime text-dark-navy font-mono text-[0.6rem] px-2 py-0.5 font-semibold uppercase">
                          Cover
                        </span>
                      )}
                      <img
                        src={getImageUrl(img)}
                        alt={`Image ${index + 1}`}
                        className="w-full h-20 object-cover border border-white/10"
                        loading="lazy"
                      />
                      {/* Contrôles */}
                      <div className="absolute inset-0 bg-dark-navy/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => moveImage(index, -1)}
                          disabled={index === 0}
                          className="w-7 h-7 border border-white/20 bg-black/50 text-off-white hover:border-cyan/50 hover:text-cyan transition-colors flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          title="Déplacer à gauche"
                        >
                          <BiChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveImage(index, 1)}
                          disabled={index === images.length - 1}
                          className="w-7 h-7 border border-white/20 bg-black/50 text-off-white hover:border-cyan/50 hover:text-cyan transition-colors flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          title="Déplacer à droite"
                        >
                          <BiChevronRight className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="w-7 h-7 border border-red/30 bg-red/20 text-red hover:bg-red/30 transition-colors flex items-center justify-center cursor-pointer"
                          title="Supprimer"
                        >
                          <BiX className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Input upload */}
              <label className="flex items-center justify-center w-full h-28 border-2 border-dashed border-white/20 cursor-pointer hover:border-lime/50 hover:bg-lime/5 transition-all">
                <div className="text-center">
                  {uploading ? (
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-6 border-2 border-lime border-t-transparent rounded-full animate-spin mb-2" />
                      <p className="font-mono text-[0.75rem] text-grey">Upload en cours...</p>
                    </div>
                  ) : (
                    <>
                      <p className="font-mono text-[0.8rem] text-grey mb-1">
                        + Ajouter des images
                      </p>
                      <p className="font-mono text-[0.65rem] text-grey/60">
                        PNG, JPG jusqu&apos;à 5MB
                      </p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            </div>

            {/* Erreur */}
            {error && (
              <div className="border border-red/30 bg-red/10 px-4 py-3">
                <p className="font-mono text-[0.8rem] text-red">// {error}</p>
              </div>
            )}

            {/* Bouton submit */}
            <div className="pt-4 border-t border-white/10">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 font-mono text-[0.85rem] bg-lime text-dark-navy font-semibold tracking-wider uppercase hover:bg-lime/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                {loading
                  ? "Enregistrement..."
                  : isEdit
                  ? "Mettre à jour"
                  : "Créer le projet"}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default ProjectForm;
