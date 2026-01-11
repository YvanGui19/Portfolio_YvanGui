import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BiChevronLeft, BiChevronRight, BiX } from "react-icons/bi";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
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
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            {isEdit ? "Modifier le projet" : "Nouveau projet"}
          </h1>
          <Button variant="outline" onClick={() => navigate("/admin/projects")}>
            Annuler
          </Button>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Titre */}
            <Input
              label="Titre *"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Nom du projet"
              required
            />

            {/* Description courte */}
            <Input
              label="Description courte *"
              name="description"
              type="textarea"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Description courte du projet (min. 20 caractères)"
              required
            />

            {/* Description longue */}
            <Input
              label="Description détaillée"
              name="longDescription"
              type="textarea"
              rows={5}
              value={formData.longDescription}
              onChange={handleChange}
              placeholder="Description complète du projet, contexte, objectifs..."
            />

            {/* Catégorie et Technologies */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-text">
                  Catégorie
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-surface-light border border-border rounded-lg px-4 py-3 text-text text-sm hover:border-primary hover:shadow-glow transition-all duration-300 cursor-pointer"
                >
                  <option value="Full Stack">Full Stack</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                </select>
              </div>
              <Input
                label="Technologies"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB (séparées par des virgules)"
              />
            </div>

            {/* Défis et Solutions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Défis relevés"
                name="challenges"
                type="textarea"
                rows={4}
                value={formData.challenges}
                onChange={handleChange}
                placeholder="Un défi par ligne (Entrée pour passer à la ligne)"
              />
              <Input
                label="Solutions apportées"
                name="solutions"
                type="textarea"
                rows={4}
                value={formData.solutions}
                onChange={handleChange}
                placeholder="Une solution par ligne (Entrée pour passer à la ligne)"
              />
            </div>

            {/* URLs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="URL GitHub"
                name="githubUrl"
                type="url"
                value={formData.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/..."
              />
              <Input
                label="URL Live"
                name="liveUrl"
                type="url"
                value={formData.liveUrl}
                onChange={handleChange}
                placeholder="https://monsite.com"
              />
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
                  className="w-5 h-5 rounded border-border bg-surface text-primary focus:ring-primary"
                />
                <label htmlFor="featured" className="text-sm text-text">
                  Projet mis en avant (affiché sur la page d&apos;accueil)
                </label>
              </div>
              <Input
                label="Ordre d'affichage"
                name="order"
                type="number"
                value={formData.order}
                onChange={handleChange}
                min="0"
              />
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium mb-2 text-text">
                Images
                {images.length > 0 && (
                  <span className="text-text-muted font-normal ml-2">
                    (la première image sera affichée sur l&apos;accueil)
                  </span>
                )}
              </label>

              {/* Preview des images */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className={`relative group ${
                        index === 0 ? "ring-2 ring-primary ring-offset-2 ring-offset-surface" : ""
                      }`}
                    >
                      {index === 0 && (
                        <span className="absolute -top-2 -left-2 z-10 bg-primary text-background text-xs px-2 py-0.5 rounded-full font-medium">
                          Accueil
                        </span>
                      )}
                      <img
                        src={getImageUrl(img)}
                        alt={`Image ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg" loading="lazy"
                      />
                      {/* Contrôles */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-1">
                        {/* Déplacer à gauche */}
                        <button
                          type="button"
                          onClick={() => moveImage(index, -1)}
                          disabled={index === 0}
                          className="w-7 h-7 bg-surface rounded-full text-text hover:bg-primary hover:text-background transition-colors flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          title="Déplacer à gauche"
                        >
                          <BiChevronLeft className="w-5 h-5" />
                        </button>
                        {/* Déplacer à droite */}
                        <button
                          type="button"
                          onClick={() => moveImage(index, 1)}
                          disabled={index === images.length - 1}
                          className="w-7 h-7 bg-surface rounded-full text-text hover:bg-primary hover:text-background transition-colors flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          title="Déplacer à droite"
                        >
                          <BiChevronRight className="w-5 h-5" />
                        </button>
                        {/* Supprimer */}
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="w-7 h-7 bg-danger rounded-full text-white hover:bg-danger/80 transition-colors flex items-center justify-center cursor-pointer"
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
              <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                <div className="text-center">
                  {uploading ? (
                    <p className="text-text-muted">Upload en cours...</p>
                  ) : (
                    <>
                      <p className="text-text-muted mb-1">
                        Cliquez pour ajouter des images
                      </p>
                      <p className="text-xs text-text-muted">
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
              <p className="text-danger text-sm text-center">{error}</p>
            )}

            {/* Bouton submit */}
            <div className="flex gap-4">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading
                  ? "Enregistrement..."
                  : isEdit
                  ? "Mettre à jour"
                  : "Créer le projet"}
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}

export default ProjectForm;
