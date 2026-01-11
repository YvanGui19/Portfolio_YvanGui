import { useMemo, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import DitheredAvatar from "../../components/DitheredAvatar";
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

  // Taille responsive pour avatar
  const [avatarSize, setAvatarSize] = useState(320);

  useEffect(() => {
    const handleResize = () => {
      setAvatarSize(window.innerWidth < 640 ? 256 : 320);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Grouper les skills par catégorie
  const skillsByCategory = useMemo(() =>
    skills?.reduce((acc, skill) => {
      const category = skill.category || "Autres";
      if (!acc[category]) acc[category] = [];
      acc[category].push(skill);
      return acc;
    }, {}) || {}, [skills]);

  return (
    <div className="pt-24 pb-20">
      <Helmet>
        <title>À propos | Yvan Gui - Développeur Web Full Stack</title>
        <meta name="description" content="Découvrez le parcours de Yvan Gui, développeur web full stack à Toulouse. De l'aéronautique au développement web, une expertise technique et une rigueur éprouvée." />
        <meta property="og:title" content="À propos | Yvan Gui - Développeur Web" />
        <meta property="og:description" content="Découvrez le parcours de Yvan Gui, développeur web full stack à Toulouse." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://portfolio-yvan-gui.vercel.app/about" />
        <meta property="og:image" content="https://res.cloudinary.com/dox09mso9/image/upload/v1768128857/portfolio/projects/ve8qft3jnbzz1bonocvv.webp" />
        <meta property="og:site_name" content="Yvan Gui - Portfolio" />
        <meta property="og:locale" content="fr_FR" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="À propos | Yvan Gui" />
        <meta name="twitter:description" content="Découvrez le parcours de Yvan Gui, développeur web full stack." />
        <link rel="canonical" href="https://portfolio-yvan-gui.vercel.app/about" />
      </Helmet>
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

          {/* Avatar avec effet dithering */}
          <div className="flex justify-center">
            <DitheredAvatar
              src="/images/profile.png"
              color="#00ff88"
              pixelSize={4}
              flickerIntensity={8}
              flickerSpeed={60}
              size={avatarSize}
              className="rounded-2xl"
            />
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
