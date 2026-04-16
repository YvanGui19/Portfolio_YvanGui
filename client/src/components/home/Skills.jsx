import { useCallback } from "react";
import { motion } from "framer-motion";
import skillService from "../../services/skillService";
import useFetch from "../../hooks/useFetch";
import { SkillsReveal } from "../canvas";
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

// Couleurs par catégorie - Style Marathon
const categoryColors = {
  Frontend: {
    text: "group-hover:text-[#c8f000]",
    glow: "0 0 20px 3px rgba(200, 240, 0, 0.4)",
  },
  Backend: {
    text: "group-hover:text-[#c8f000]",
    glow: "0 0 20px 3px rgba(200, 240, 0, 0.4)",
  },
  Tools: {
    text: "group-hover:text-[#c8f000]",
    glow: "0 0 20px 3px rgba(200, 240, 0, 0.4)",
  },
  Other: {
    text: "group-hover:text-[#c8f000]",
    glow: "0 0 20px 3px rgba(200, 240, 0, 0.4)",
  },
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
      return <IconComponent className="w-8 h-8 sm:w-10 sm:h-10" />;
    }
    // Fallback selon la catégorie
    const CategoryIcon = categoryIcons[skill.category] || BiCodeAlt;
    return <CategoryIcon className="w-8 h-8 sm:w-10 sm:h-10" />;
  }, []);

  return (
    <section className="bg-[#080906] relative overflow-hidden">
      {/* Header de section */}
      <div className="py-24 sm:py-28 px-8 sm:px-12 lg:px-14">
        <h2
          style={{ fontFamily: '"Big Shoulders Display", sans-serif' }}
          className="font-black text-[clamp(50px,7vw,96px)] uppercase leading-[0.9]"
        >
          <span className="text-[#f0f0ec]">TECH </span>
          <span
            style={{
              color: 'transparent',
              WebkitTextStroke: '2px #f0f0ec',
            }}
          >
            STACK
          </span>
        </h2>
      </div>

      <div className="px-8 sm:px-12 lg:px-14 pb-24 sm:pb-28">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <span className="font-mono text-[12px] tracking-[0.2em] text-[#f0f0ec] uppercase">
              Chargement...
            </span>
          </div>
        ) : (
          <div className="relative">
            {/* Animation de révélation - wrapper autour des skills uniquement */}
            <SkillsReveal duration={4} />

            <div className="flex flex-wrap justify-center gap-4 sm:gap-5 py-2">
              {(skills || []).map((skill, index) => {
                const colors = categoryColors[skill.category] || categoryColors.Other;
                return (
                  <motion.div
                    key={skill._id || skill.name}
                    initial={{ opacity: 1, scale: 1 }}
                    whileHover={{
                      boxShadow: colors.glow,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className="group bg-[#0f100c] border border-[#1c1d14] transition-all duration-300 hover:border-[#c8f000]/50 w-20 h-20 sm:w-24 sm:h-24 relative"
                    style={{
                      clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
                    }}
                  >
                    <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:-translate-y-4 text-[#f0f0ec] ${colors.text}`}>
                      {getIcon(skill)}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-[10px] sm:text-[11px] font-mono text-[#f0f0ec] absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-6 truncate px-1"
                    >
                      {skill.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Skills;
