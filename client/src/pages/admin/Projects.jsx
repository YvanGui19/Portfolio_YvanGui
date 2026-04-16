import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiFolder, HiPencil, HiTrash } from "react-icons/hi";
import projectService from "../../services/projectService";
import useFetch from "../../hooks/useFetch";
import { getImageUrl } from "../../utils/imageUrl";
import ConfirmModal from "../../components/common/ConfirmModal";

function Projects() {
  const {
    data: projects,
    loading,
    error,
    refetch,
  } = useFetch(() => projectService.getAll());
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const [deleting, setDeleting] = useState(false);

  const openDeleteModal = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, id: null });
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await projectService.delete(deleteModal.id);
      refetch();
      closeDeleteModal();
    } catch {
      alert("Erreur lors de la suppression");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-lime border-t-transparent rounded-full animate-spin mb-3" />
        <p className="font-mono text-[0.8rem] text-grey">Chargement...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
      >
        <div>
          {/* Tag */}
          <div className="font-mono text-[0.7rem] text-lime tracking-[0.25em] uppercase mb-2">
            // PROJECTS
          </div>

          {/* Title */}
          <h1 className="font-display text-[clamp(1.5rem,4vw,2rem)] font-bold text-off-white tracking-wide">
            Projets
          </h1>

          {/* Counter */}
          <p className="font-mono text-[0.8rem] text-grey">
            &gt; {projects?.length || 0} projet{projects?.length > 1 ? "s" : ""} enregistré{projects?.length > 1 ? "s" : ""}
          </p>
        </div>

        <Link
          to="/admin/projects/new"
          className="inline-flex items-center px-5 py-2.5 font-mono text-[0.75rem] bg-lime text-dark-navy font-semibold tracking-wider uppercase hover:bg-lime/90 transition-colors"
        >
          + Nouveau projet
        </Link>
      </motion.div>

      {/* Error */}
      {error && (
        <div className="border border-red/30 bg-red/10 px-5 py-4 mb-6">
          <p className="font-mono text-[0.8rem] text-red">// Erreur: {error}</p>
        </div>
      )}

      {/* Projects list */}
      <div className="space-y-3">
        {projects?.length === 0 ? (
          <div className="border border-white/10 bg-black/20 p-12 text-center">
            <HiFolder className="w-12 h-12 text-grey/30 mx-auto mb-4" />
            <p className="font-mono text-[0.9rem] text-grey mb-4">
              // Aucun projet pour le moment
            </p>
            <Link
              to="/admin/projects/new"
              className="inline-flex items-center px-5 py-2.5 font-mono text-[0.75rem] bg-lime text-dark-navy font-semibold tracking-wider uppercase hover:bg-lime/90 transition-colors"
            >
              Créer votre premier projet
            </Link>
          </div>
        ) : (
          projects?.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="group border border-white/10 bg-black/20 hover:border-lime/30 hover:bg-lime/5 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4">
                  {/* Project info */}
                  <div className="flex items-center gap-4">
                    {/* Thumbnail */}
                    <div className="w-14 h-14 border border-white/10 bg-black/30 flex items-center justify-center overflow-hidden flex-shrink-0">
                      {project.images?.[0] ? (
                        <img
                          src={getImageUrl(project.images[0])}
                          alt={`Miniature du projet ${project.title}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <HiFolder className="w-6 h-6 text-grey/50" />
                      )}
                    </div>

                    {/* Title and category */}
                    <div>
                      <h3 className="font-mono text-[0.9rem] text-off-white font-medium mb-1">
                        {project.title}
                      </h3>
                      <p className="font-mono text-[0.7rem] text-grey">
                        // {project.category}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    {/* Featured badge */}
                    <span
                      className={`px-3 py-1 font-mono text-[0.65rem] tracking-wider uppercase ${
                        project.featured
                          ? "border border-lime/30 text-lime bg-lime/10"
                          : "border border-white/10 text-grey"
                      }`}
                    >
                      {project.featured ? "Featured" : "Normal"}
                    </span>

                    {/* Edit button */}
                    <Link
                      to={`/admin/projects/${project._id}/edit`}
                      className="p-2 border border-white/10 text-grey hover:text-lime hover:border-lime/30 hover:bg-lime/10 transition-all"
                      title="Modifier"
                    >
                      <HiPencil className="w-4 h-4" />
                    </Link>

                    {/* Delete button */}
                    <button
                      onClick={() => openDeleteModal(project._id)}
                      className="p-2 border border-white/10 text-grey hover:text-red hover:border-red/30 hover:bg-red/10 transition-all cursor-pointer"
                      title="Supprimer"
                    >
                      <HiTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Modal de confirmation de suppression */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title="Supprimer le projet"
        message="Voulez-vous vraiment supprimer ce projet ? Cette action est irréversible."
        confirmText="Supprimer"
        variant="danger"
        loading={deleting}
      />
    </div>
  );
}

export default Projects;
