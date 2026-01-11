import { useCallback } from "react";
import { motion } from "framer-motion";
import skillService from "../../services/skillService";
import useFetch from "../../hooks/useFetch";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiGit,
  SiTypescript,
  SiPython,
  SiSass,
  SiTailwindcss,
  SiVuedotjs,
  SiAngular,
  SiDocker,
  SiAmazonwebservices,
  SiNextdotjs,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiGraphql,
  SiFigma,
  SiGithub,
  SiLinux,
  SiPhp,
  SiLaravel,
  SiSymfony,
} from "react-icons/si";
import { BiCodeAlt, BiServer, BiWrench, BiLayer } from "react-icons/bi";
import { BsWindow } from "react-icons/bs";

// Icônes par défaut selon la catégorie
const categoryIcons = {
  Frontend: BsWindow,
  Backend: BiServer,
  Tools: BiWrench,
  Other: BiLayer,
};

// Mapping des noms de skills vers les icônes officielles
const skillIcons = {
  HTML5: SiHtml5,
  HTML: SiHtml5,
  CSS3: SiCss3,
  CSS: SiCss3,
  JavaScript: SiJavascript,
  JS: SiJavascript,
  React: SiReact,
  "Node.js": SiNodedotjs,
  Node: SiNodedotjs,
  NodeJS: SiNodedotjs,
  Express: SiExpress,
  "Express.js": SiExpress,
  MongoDB: SiMongodb,
  Git: SiGit,
  GitHub: SiGithub,
  TypeScript: SiTypescript,
  TS: SiTypescript,
  Python: SiPython,
  Sass: SiSass,
  SCSS: SiSass,
  Tailwind: SiTailwindcss,
  TailwindCSS: SiTailwindcss,
  "Tailwind CSS": SiTailwindcss,
  Vue: SiVuedotjs,
  "Vue.js": SiVuedotjs,
  VueJS: SiVuedotjs,
  Angular: SiAngular,
  Docker: SiDocker,
  AWS: SiAmazonwebservices,
  "Next.js": SiNextdotjs,
  NextJS: SiNextdotjs,
  PostgreSQL: SiPostgresql,
  Postgres: SiPostgresql,
  MySQL: SiMysql,
  Redis: SiRedis,
  GraphQL: SiGraphql,
  Figma: SiFigma,
  Linux: SiLinux,
  PHP: SiPhp,
  Laravel: SiLaravel,
  Symfony: SiSymfony,
};

function Skills() {
  const { data: skills, loading } = useFetch(() => skillService.getAll());

  const getIcon = useCallback((skill) => {
    const IconComponent = skillIcons[skill.name];
    if (IconComponent) {
      return <IconComponent className="w-8 h-8" />;
    }
    // Fallback selon la catégorie
    const CategoryIcon = categoryIcons[skill.category] || BiCodeAlt;
    return <CategoryIcon className="w-8 h-8" />;
  }, []);

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Technologies que{" "}
            <span className="text-primary">j&apos;utilise</span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Les outils et technologies que j&apos;utilise pour créer des
            applications web modernes
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
            {(skills || []).map((skill, index) => (
              <motion.div
                key={skill._id || skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  boxShadow: [
                    "0 0 0px rgba(34, 197, 94, 0)",
                    "0 0 20px 3px rgba(34, 197, 94, 1)",
                    "0 0 0px rgba(34, 197, 94, 0)",
                  ],
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.08,
                  boxShadow: {
                    duration: 0.3,
                    delay: index * 0.08,
                    times: [0, 1, 0.5],
                  },
                }}
                className="group bg-surface-light border border-border rounded-lg hover:border-primary hover:shadow-glow transition-all duration-300 w-20 sm:w-24 h-20 sm:h-24 relative overflow-hidden"
              >
                <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:-translate-y-3 text-text group-hover:text-primary">
                  {getIcon(skill)}
                </span>
                <span aria-hidden="true" className="text-xs text-text-light absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-5 truncate px-1">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Skills;
