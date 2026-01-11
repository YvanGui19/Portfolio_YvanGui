import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import projectService from "../../services/projectService";
import useFetch from "../../hooks/useFetch";
import { getImageUrl } from "../../utils/imageUrl";

function Projects() {
  const {
    data: projects,
    loading,
    error,
    refetch,
  } = useFetch(() => projectService.getAll());
  const [deleting, setDeleting] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce projet ?")) return;

    setDeleting(id);
    try {
      await projectService.delete(id);
      refetch();
    } catch {
      alert("Erreur lors de la suppression");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-text">Projets</h1>
          <p className="text-text-muted">
            Gérez vos projets portfolio ({projects?.length || 0})
          </p>
        </div>
        <Button to="/admin/projects/new">+ Nouveau projet</Button>
      </motion.div>

      {error && (
        <Card className="p-4 mb-6 border-danger">
          <p className="text-danger">{error}</p>
        </Card>
      )}

      <div className="grid gap-4">
        {projects?.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-text-muted mb-4">Aucun projet pour le moment</p>
            <Button to="/admin/projects/new">Créer votre premier projet</Button>
          </Card>
        ) : (
          projects?.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-surface-light rounded-lg flex items-center justify-center overflow-hidden">
                      {project.images?.[0] ? (
                        <img
                          src={getImageUrl(project.images[0])}
                          alt={`Miniature du projet ${project.title}`}
                          className="w-full h-full object-cover" loading="lazy"
                        />
                      ) : (
                        <span>📁</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-text">
                        {project.title}
                      </h3>
                      <p className="text-sm text-text-muted">
                        {project.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        project.featured
                          ? "bg-primary/10 text-primary"
                          : "bg-surface-light text-text-muted"
                      }`}
                    >
                      {project.featured ? "Featured" : "Normal"}
                    </span>
                    <Link
                      to={`/admin/projects/${project._id}/edit`}
                      className="p-2 hover:bg-primary/10 rounded-lg text-text-muted hover:text-primary"
                    >
                      ✏️
                    </Link>
                    <button
                      onClick={() => handleDelete(project._id)}
                      disabled={deleting === project._id}
                      className="p-2 hover:bg-danger/10 rounded-lg text-text-muted hover:text-danger disabled:opacity-50 cursor-pointer"
                    >
                      {deleting === project._id ? "..." : "🗑️"}
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

export default Projects;
