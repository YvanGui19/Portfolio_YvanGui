import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import skillService from "../../services/skillService";
import useFetch from "../../hooks/useFetch";
import {
  SiHtml5,
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
import { FaCss3Alt, FaAws, FaVideo, FaPaintBrush } from "react-icons/fa";
import { BsWindow } from "react-icons/bs";

// Icône représentant chaque catégorie (au centre de la grosse bulle)
const categoryIcons = {
  Frontend: BsWindow,
  Backend: BiServer,
  Tools: BiWrench,
  Other: BiLayer,
};

// Libellé affiché sous la grosse bulle
const categoryLabels = {
  Frontend: "FRONTEND",
  Backend: "BACKEND",
  Tools: "OUTILS",
  Other: "AUTRES",
};

// Thème (couleur principale) par catégorie
const categoryTheme = {
  Frontend: { hex: "#01FFFF", glow: "rgba(1,255,255,0.45)" },
  Backend: { hex: "#C2FE0B", glow: "rgba(194,254,11,0.45)" },
  Tools: { hex: "#E8763A", glow: "rgba(232,118,58,0.45)" },
  Other: { hex: "#3601FB", glow: "rgba(54,1,251,0.45)" },
};

// Mapping nom de skill → icône
const skillIcons = {
  HTML5: SiHtml5,
  HTML: SiHtml5,
  "HTML/CSS": SiHtml5,
  CSS3: FaCss3Alt,
  CSS: FaCss3Alt,
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
  Vite: BiCodeAlt,
  Vue: SiVuedotjs,
  "Vue.js": SiVuedotjs,
  VueJS: SiVuedotjs,
  Angular: SiAngular,
  Docker: SiDocker,
  AWS: FaAws,
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
  Photoshop: FaPaintBrush,
  Filmora: FaVideo,
};

function CategoryBubble({ category, skills, isActive, onToggle, floatDelay }) {
  const [isHovered, setIsHovered] = useState(false);
  const isOpen = isHovered || isActive;
  const CategoryIcon = categoryIcons[category] || BiLayer;
  const theme = categoryTheme[category] || categoryTheme.Other;
  const label = categoryLabels[category] || category.toUpperCase();

  // Distance des petites bulles depuis le centre
  const radius = 130;

  const resolveSkillIcon = (skill) =>
    skillIcons[skill.name] || categoryIcons[skill.category] || BiCodeAlt;

  return (
    <div
      data-bubble
      className="relative w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 m-20 sm:m-24"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Grosse bulle (catégorie) */}
      <motion.button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        animate={{ y: [0, -10, 0] }}
        transition={{
          y: {
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: floatDelay,
          },
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="absolute inset-0 rounded-full backdrop-blur-md border-2 flex flex-col items-center justify-center cursor-pointer transition-shadow"
        style={{
          backgroundColor: `${theme.hex}1A`,
          borderColor: `${theme.hex}66`,
          color: theme.hex,
          boxShadow: isOpen ? `0 0 35px ${theme.glow}` : undefined,
        }}
        aria-expanded={isOpen}
        aria-label={`Catégorie ${label}`}
      >
        <CategoryIcon className="w-10 h-10 sm:w-12 sm:h-12" />
        <span className="mt-1.5 text-[10px] sm:text-xs uppercase font-mono font-bold tracking-wider">
          {label}
        </span>
      </motion.button>

      {/* Petites bulles (skills) en orbite */}
      <AnimatePresence>
        {isOpen &&
          skills.map((skill, i) => {
            const angle = (i / skills.length) * 2 * Math.PI - Math.PI / 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const SkillIcon = resolveSkillIcon(skill);

            return (
              <motion.div
                key={skill._id || skill.name}
                initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                animate={{ x, y, scale: 1, opacity: 1 }}
                exit={{
                  x: x * 1.7,
                  y: y * 1.7,
                  scale: 1.3,
                  opacity: 0,
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.04,
                  ease: "backOut",
                }}
                className="absolute top-1/2 left-1/2 w-16 h-16 sm:w-20 sm:h-20 -mt-8 -ml-8 sm:-mt-10 sm:-ml-10 rounded-full backdrop-blur-md border flex flex-col items-center justify-center pointer-events-none"
                style={{
                  backgroundColor: `${theme.hex}26`,
                  borderColor: `${theme.hex}80`,
                  color: theme.hex,
                }}
              >
                <SkillIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="mt-0.5 text-[8px] sm:text-[9px] uppercase font-mono truncate max-w-full px-1">
                  {skill.name}
                </span>
              </motion.div>
            );
          })}
      </AnimatePresence>
    </div>
  );
}

function Skills() {
  const { data: skills, loading } = useFetch(() => skillService.getAll());
  const [activeCategory, setActiveCategory] = useState(null);

  const groupedSkills = useMemo(() => {
    if (!skills) return [];
    const grouped = {};
    skills.forEach((s) => {
      const cat = s.category || "Other";
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(s);
    });
    const order = ["Frontend", "Backend", "Tools", "Other"];
    return order
      .filter((c) => grouped[c]?.length > 0)
      .map((c) => [c, grouped[c]]);
  }, [skills]);

  // Tap en dehors d'une bulle ferme la bulle active (utile sur mobile)
  useEffect(() => {
    const handleOutside = (e) => {
      if (!e.target.closest("[data-bubble]")) {
        setActiveCategory(null);
      }
    };
    document.addEventListener("click", handleOutside);
    return () => document.removeEventListener("click", handleOutside);
  }, []);

  return (
    <section className="relative">
      <div className="py-24 sm:py-28 px-8 sm:px-12 lg:px-14 relative">
        <h2
          style={{ fontFamily: '"Big Shoulders Display", sans-serif' }}
          className="font-black text-[clamp(50px,7vw,96px)] uppercase leading-[0.9]"
        >
          <span className="text-[#f0f0ec]">COMPÉTENCES</span>
        </h2>
      </div>

      <div className="px-4 sm:px-12 lg:px-14 pb-24 sm:pb-28">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <span className="font-mono text-[12px] tracking-[0.2em] text-[#f0f0ec] uppercase">
              Chargement...
            </span>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center items-center py-10 sm:py-16">
            {groupedSkills.map(([category, items], idx) => (
              <CategoryBubble
                key={category}
                category={category}
                skills={items}
                isActive={activeCategory === category}
                onToggle={() =>
                  setActiveCategory((prev) =>
                    prev === category ? null : category
                  )
                }
                floatDelay={idx * 0.7}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Skills;
