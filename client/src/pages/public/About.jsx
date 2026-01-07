import { motion } from "framer-motion";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import skillService from "../../services/skillService";
import experienceService from "../../services/experienceService";
import useFetch from "../../hooks/useFetch";

function About() {
  const { data: skills, loading: loadingSkills } = useFetch(() =>
    skillService.getAll()
  );
  const { data: experiences, loading: loadingExp } = useFetch(() =>
    experienceService.getAll()
  );

  // Grouper les skills par catégorie
  const skillsByCategory =
    skills?.reduce((acc, skill) => {
      const category = skill.category || "Autres";
      if (!acc[category]) acc[category] = [];
      acc[category].push(skill);
      return acc;
    }, {}) || {};

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            À <span className="text-primary">Propos</span>
          </h1>
          <p className="text-text-muted max-w-2xl mx-auto">
            De l&apos;aéronautique a l&apos;informatique
          </p>
        </motion.div>

        {/* Mon Histoire */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-20"
        >
          <div>
            <h2 className="text-2xl font-bold mb-6 lg:ml-20">
              Mon <span className="text-primary">Histoire</span>
            </h2>
            <div className="space-y-4 text-text-light lg:ml-20">
              <p>
                Passionné par la technologie depuis toujours, j&apos;ai
                d&apos;abord construit ma carrière dans l&apos;aéronautique.
                Pendant plus de dix ans, j&apos;ai travaillé sur des
                hélicoptères et des avions, avant d&apos;évoluer vers le support
                et l&apos;expertise technique.
              </p>
              <p>
                Ces expériences m&apos;ont appris la précision, la rigueur et la
                fiabilité opérationnelle dans des environnements exigeants.
              </p>
              <p>
                Aujourd&apos;hui, je conçois des solutions web fiables et
                orientées utilisateur, avec la même rigueur et le même sens du
                service qui m&apos;ont guidé dans l&apos;aéronautique.
              </p>
            </div>
            <div className="flex gap-4 mt-8 lg:ml-20">
              <Button to="/contact">Me contacter</Button>
              <Button variant="outline" href="/CV_GUIHÉNEUF_YVAN_DEV_WEB.pdf">
                Télécharger mon CV
              </Button>
            </div>
          </div>

          {/* Avatar */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center">
                <span className="text-6xl lg:text-8xl font-bold text-primary">
                  YG
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Expériences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold mb-8 text-center">
            Mon <span className="text-primary">Parcours</span>
          </h2>

          {loadingExp ? (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : (
            <div className="space-y-6">
              {experiences?.map((exp, index) => (
                <motion.div
                  key={exp._id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {exp.type === "experience" ? "💼" : "🎓"}
                        </span>
                        <h3 className="text-lg font-semibold">{exp.title}</h3>
                      </div>
                      <span className="text-primary text-sm">
                        {exp.startDate && new Date(exp.startDate).getFullYear()}
                        {" - "}
                        {exp.endDate
                          ? new Date(exp.endDate).getFullYear()
                          : "Présent"}
                      </span>
                    </div>
                    <p className="text-text-muted ml-11">{exp.company}</p>
                    {exp.description && (
                      <p className="text-text-light text-sm mt-2 ml-11">
                        {exp.description}
                      </p>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Compétences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-8 text-center">
            Mes <span className="text-primary">Compétences</span>
          </h2>

          {loadingSkills ? (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(skillsByCategory).map(
                ([category, categorySkills], index) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="p-6 h-full">
                      <h3 className="text-lg font-semibold text-primary mb-4">
                        {category}
                      </h3>
                      <div className="space-y-3">
                        {categorySkills.map((skill) => (
                          <div key={skill._id}>
                            <div className="flex justify-between text-sm mb-1">
                              <span>{skill.name}</span>
                              <span className="text-text-muted">
                                {skill.level}%
                              </span>
                            </div>
                            <div className="h-2 bg-surface-light rounded-full">
                              <div
                                className="h-full bg-primary rounded-full transition-all duration-500"
                                style={{ width: `${skill.level}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                )
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default About;
