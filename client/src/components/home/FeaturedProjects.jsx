import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Card from "../common/Card";
import Button from "../common/Button";
import projectService from "../../services/projectService";
import useFetch from "../../hooks/useFetch";
import { getImageUrl } from "../../utils/imageUrl";

function FeaturedProjects() {
  const navigate = useNavigate();
  const { data: projects, loading } = useFetch(() => projectService.getAll());

  // Prendre les 3 premiers projets "featured"
  const featuredProjects =
    projects?.filter((p) => p.featured).slice(0, 3) ||
    projects?.slice(0, 3) ||
    [];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Mes principaux <span className="text-primary">projets</span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Découvrez mes dernières réalisations
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : featuredProjects.length === 0 ? (
          <p className="text-center text-text-muted py-12">
            Aucun projet pour le moment
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card
                  hover
                  className="h-full flex flex-col cursor-pointer"
                  onClick={() => navigate(`/projects/${project._id}`)}
                >
                  {/* Image */}
                  <div className="h-48 bg-surface-light rounded-t-xl flex items-center justify-center border-b border-border overflow-hidden">
                    {project.images?.[0] ? (
                      <img
                        src={getImageUrl(project.images[0])}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-4xl">🖼️</span>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-semibold mb-2">
                      {project.title}
                    </h3>
                    <p className="text-text-muted text-sm mb-4 flex-1 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies?.slice(0, 3).map((tech) => (
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

        <div className="text-center">
          <Button to="/projects" variant="outline">
            Voir tous les projets
          </Button>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProjects;
