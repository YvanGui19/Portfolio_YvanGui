// Mapping des technologies vers leur catégorie
const techCategories = {
  // Frontend
  HTML: "frontend",
  HTML5: "frontend",
  CSS: "frontend",
  CSS3: "frontend",
  JavaScript: "frontend",
  JS: "frontend",
  TypeScript: "frontend",
  TS: "frontend",
  React: "frontend",
  "React.js": "frontend",
  ReactJS: "frontend",
  Vue: "frontend",
  "Vue.js": "frontend",
  VueJS: "frontend",
  Angular: "frontend",
  Svelte: "frontend",
  "Next.js": "frontend",
  NextJS: "frontend",
  Nuxt: "frontend",
  "Nuxt.js": "frontend",
  Gatsby: "frontend",
  Tailwind: "frontend",
  TailwindCSS: "frontend",
  "Tailwind CSS": "frontend",
  Sass: "frontend",
  SCSS: "frontend",
  Bootstrap: "frontend",
  "Material UI": "frontend",
  MUI: "frontend",
  "Chakra UI": "frontend",
  "Styled Components": "frontend",
  Redux: "frontend",
  Zustand: "frontend",
  "Framer Motion": "frontend",

  // Backend
  Node: "backend",
  "Node.js": "backend",
  NodeJS: "backend",
  Express: "backend",
  "Express.js": "backend",
  ExpressJS: "backend",
  NestJS: "backend",
  Fastify: "backend",
  Python: "backend",
  Django: "backend",
  Flask: "backend",
  FastAPI: "backend",
  PHP: "backend",
  Laravel: "backend",
  Symfony: "backend",
  Ruby: "backend",
  Rails: "backend",
  "Ruby on Rails": "backend",
  Java: "backend",
  Spring: "backend",
  "Spring Boot": "backend",
  Go: "backend",
  Golang: "backend",
  Rust: "backend",
  C: "backend",
  "C++": "backend",
  "C#": "backend",
  ".NET": "backend",
  GraphQL: "backend",
  REST: "backend",
  "REST API": "backend",
  API: "backend",

  // Databases (considered as backend/tools)
  MongoDB: "backend",
  MySQL: "backend",
  PostgreSQL: "backend",
  Postgres: "backend",
  SQLite: "backend",
  Redis: "backend",
  Firebase: "backend",
  Firestore: "backend",
  Supabase: "backend",
  Prisma: "backend",
  Mongoose: "backend",
  SQL: "backend",

  // Tools / DevOps
  Git: "tools",
  GitHub: "tools",
  GitLab: "tools",
  Docker: "tools",
  Kubernetes: "tools",
  K8s: "tools",
  AWS: "tools",
  "Amazon Web Services": "tools",
  Azure: "tools",
  GCP: "tools",
  "Google Cloud": "tools",
  Netlify: "tools",
  Heroku: "tools",
  Linux: "tools",
  Nginx: "tools",
  Apache: "tools",
  Jenkins: "tools",
  "CI/CD": "tools",
  Webpack: "tools",
  Vite: "tools",
  Babel: "tools",
  ESLint: "tools",
  Prettier: "tools",
  Jest: "tools",
  Vitest: "tools",
  Cypress: "tools",
  Playwright: "tools",
  Figma: "tools",
  Postman: "tools",
  Insomnia: "tools",
  npm: "tools",
  yarn: "tools",
  pnpm: "tools",
};

// Couleurs par catégorie - Alignées avec les catégories de projets
// Frontend = Violet, Backend = Lime, Tools = Cyan
const categoryColors = {
  frontend: "text-violet border-violet/30",
  backend: "text-lime border-lime/30",
  tools: "text-cyan border-cyan/30",
  default: "text-grey border-grey/30",
};

/**
 * Retourne la catégorie d'une technologie
 * @param {string} tech - Nom de la technologie
 * @returns {string} - Catégorie (frontend, backend, tools, default)
 */
export function getTechCategory(tech) {
  // Recherche exacte
  if (techCategories[tech]) {
    return techCategories[tech];
  }

  // Recherche insensible à la casse
  const lowerTech = tech.toLowerCase();
  for (const [key, category] of Object.entries(techCategories)) {
    if (key.toLowerCase() === lowerTech) {
      return category;
    }
  }

  return "default";
}

/**
 * Retourne les classes de couleur pour une technologie
 * @param {string} tech - Nom de la technologie
 * @returns {string} - Classes Tailwind pour la couleur
 */
export function getTechColorClasses(tech) {
  const category = getTechCategory(tech);
  return categoryColors[category];
}

// ============================================
// COULEURS DES CATÉGORIES DE PROJETS
// ============================================

// Couleurs par catégorie de projet
// Style "filled" = comme les boutons de filtre actifs (fond plein)
// Style "outline" = comme les tags de technologies (bordure uniquement)
const projectCategoryColors = {
  "Full Stack": {
    text: "text-cyan",
    border: "border-cyan/30",
    bg: "bg-cyan",
    bgHover: "hover:border-cyan hover:text-cyan",
    outline: "text-cyan border-cyan/30",
    filled: "bg-cyan text-black",
  },
  Frontend: {
    text: "text-violet",
    border: "border-violet/30",
    bg: "bg-violet",
    bgHover: "hover:border-violet hover:text-violet",
    outline: "text-violet border-violet/30",
    filled: "bg-violet text-black",
  },
  Backend: {
    text: "text-lime",
    border: "border-lime/30",
    bg: "bg-lime",
    bgHover: "hover:border-lime hover:text-lime",
    outline: "text-lime border-lime/30",
    filled: "bg-lime text-black",
  },
  default: {
    text: "text-grey",
    border: "border-grey/30",
    bg: "bg-grey",
    bgHover: "hover:border-grey hover:text-grey",
    outline: "text-grey border-grey/30",
    filled: "bg-grey text-black",
  },
};

/**
 * Retourne les classes de couleur pour une catégorie de projet
 * @param {string} category - Catégorie du projet (Full Stack, Frontend, Backend)
 * @returns {object} - Objet avec les différentes classes de couleur
 */
export function getCategoryColors(category) {
  return projectCategoryColors[category] || projectCategoryColors.default;
}

/**
 * Retourne les classes pour le tag de catégorie d'un projet (style filled)
 * @param {string} category - Catégorie du projet
 * @returns {string} - Classes Tailwind pour le tag
 */
export function getCategoryTagClasses(category) {
  const colors = getCategoryColors(category);
  return colors.filled;
}

/**
 * Retourne les classes pour le tag de catégorie en style outline
 * @param {string} category - Catégorie du projet
 * @returns {string} - Classes Tailwind pour le tag outline
 */
export function getCategoryOutlineClasses(category) {
  const colors = getCategoryColors(category);
  return colors.outline;
}

/**
 * Retourne la classe de hover pour une catégorie de projet
 * @param {string} category - Catégorie du projet
 * @returns {string} - Classe Tailwind pour le hover
 */
export function getCategoryHoverClass(category) {
  const hoverMap = {
    "Full Stack": "hover:text-cyan",
    Frontend: "hover:text-violet",
    Backend: "hover:text-lime",
  };
  return hoverMap[category] || "hover:text-lime";
}

export default { getTechCategory, getTechColorClasses, getCategoryColors, getCategoryTagClasses, getCategoryHoverClass };
