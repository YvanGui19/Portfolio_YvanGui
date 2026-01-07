// Système de fichiers virtuel pour le mode CLI
// Mappe les données du portfolio vers une arborescence Unix

const FILE_TYPE = {
  FILE: "file",
  DIRECTORY: "dir",
};

class VirtualFileSystem {
  constructor() {
    this.root = this.createEmptyFS();
    this.currentPath = "/home/yvan";
  }

  createEmptyFS() {
    return {
      type: FILE_TYPE.DIRECTORY,
      name: "/",
      children: {
        home: {
          type: FILE_TYPE.DIRECTORY,
          name: "home",
          children: {
            yvan: {
              type: FILE_TYPE.DIRECTORY,
              name: "yvan",
              children: {
                "about.txt": {
                  type: FILE_TYPE.FILE,
                  name: "about.txt",
                  content: "Chargement...",
                },
                "contact.txt": {
                  type: FILE_TYPE.FILE,
                  name: "contact.txt",
                  content:
                    "Email: contact@yvan-gui.dev\nLinkedIn: linkedin.com/in/yvan-gui",
                },
                projects: {
                  type: FILE_TYPE.DIRECTORY,
                  name: "projects",
                  children: {},
                },
                skills: {
                  type: FILE_TYPE.DIRECTORY,
                  name: "skills",
                  children: {},
                },
                experiences: {
                  type: FILE_TYPE.DIRECTORY,
                  name: "experiences",
                  children: {},
                },
              },
            },
          },
        },
      },
    };
  }

  // Remplir le système de fichiers avec les données du portfolio
  populate(data) {
    const { projects, skills, experiences, about } = data;
    const homeDir = this.root.children.home.children.yvan;

    // Mettre à jour about.txt
    if (about) {
      homeDir.children["about.txt"].content = this.formatAbout(about);
    }

    // Ajouter les projets
    if (projects && projects.length > 0) {
      homeDir.children.projects.children = {};
      projects.forEach((project) => {
        const slug = this.slugify(project.title || project.name || "untitled");
        homeDir.children.projects.children[slug] = {
          type: FILE_TYPE.DIRECTORY,
          name: slug,
          children: {
            "README.md": {
              type: FILE_TYPE.FILE,
              name: "README.md",
              content: this.formatProjectReadme(project),
            },
            "tech.txt": {
              type: FILE_TYPE.FILE,
              name: "tech.txt",
              content: this.formatTechnologies(project.technologies),
            },
            "links.txt": {
              type: FILE_TYPE.FILE,
              name: "links.txt",
              content: this.formatLinks(project),
              links: {
                demo: project.demoUrl || project.liveUrl,
                github: project.githubUrl,
              },
            },
          },
        };
      });
    }

    // Ajouter les compétences par catégorie
    if (skills && skills.length > 0) {
      const skillsByCategory = skills.reduce((acc, skill) => {
        const cat = (skill.category || "other").toLowerCase();
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(skill);
        return acc;
      }, {});

      homeDir.children.skills.children = {};
      Object.entries(skillsByCategory).forEach(([category, catSkills]) => {
        homeDir.children.skills.children[`${category}.txt`] = {
          type: FILE_TYPE.FILE,
          name: `${category}.txt`,
          content: this.formatSkills(catSkills),
        };
      });
    }

    // Ajouter les expériences
    if (experiences && experiences.length > 0) {
      homeDir.children.experiences.children = {};
      experiences.forEach((exp, index) => {
        const filename = `${index + 1}-${this.slugify(
          exp.company || exp.title
        )}.txt`;
        homeDir.children.experiences.children[filename] = {
          type: FILE_TYPE.FILE,
          name: filename,
          content: this.formatExperience(exp),
        };
      });
    }
  }

  // Résoudre un chemin (relatif ou absolu) en chemin absolu
  resolvePath(path) {
    if (!path) return this.currentPath;

    // Gérer le raccourci ~
    if (path === "~") return "/home/yvan";
    if (path.startsWith("~/")) return "/home/yvan" + path.slice(1);

    // Chemin absolu
    if (path.startsWith("/")) {
      return this.normalizePath(path);
    }

    // Chemin relatif
    return this.normalizePath(this.currentPath + "/" + path);
  }

  // Normaliser le chemin (résoudre . et ..)
  normalizePath(path) {
    const parts = path.split("/").filter(Boolean);
    const result = [];

    for (const part of parts) {
      if (part === "..") {
        result.pop();
      } else if (part !== ".") {
        result.push(part);
      }
    }

    return "/" + result.join("/");
  }

  // Obtenir le noeud à un chemin donné
  getNode(path) {
    const resolvedPath = this.resolvePath(path);
    if (resolvedPath === "/") return this.root;

    const parts = resolvedPath.split("/").filter(Boolean);
    let current = this.root;

    for (const part of parts) {
      if (!current.children || !current.children[part]) {
        return null;
      }
      current = current.children[part];
    }

    return current;
  }

  // Lister le contenu d'un répertoire
  listDir(path = ".") {
    const node = this.getNode(path);
    if (!node) return null;
    if (node.type !== FILE_TYPE.DIRECTORY) return null;

    return Object.keys(node.children).map((name) => ({
      name,
      type: node.children[name].type,
      isDirectory: node.children[name].type === FILE_TYPE.DIRECTORY,
    }));
  }

  // Lire le contenu d'un fichier
  readFile(path) {
    const node = this.getNode(path);
    if (!node) return { error: `cat: ${path}: No such file or directory` };
    if (node.type === FILE_TYPE.DIRECTORY) {
      return { error: `cat: ${path}: Is a directory` };
    }
    return { content: node.content, links: node.links };
  }

  // Changer de répertoire
  changeDir(path) {
    const resolvedPath = this.resolvePath(path);
    const node = this.getNode(resolvedPath);

    if (!node) {
      return { error: `cd: ${path}: No such file or directory` };
    }
    if (node.type !== FILE_TYPE.DIRECTORY) {
      return { error: `cd: ${path}: Not a directory` };
    }

    this.currentPath = resolvedPath;
    return { success: true, path: resolvedPath };
  }

  // Obtenir le répertoire courant
  pwd() {
    return this.currentPath;
  }

  // Utilitaire: transformer le texte en slug pour les noms de fichiers
  slugify(text) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  // Formateurs pour le contenu des fichiers
  formatAbout(about) {
    return `=== À propos de Yvan Gui ===

${about.description || "Développeur Web Full-Stack"}

Ancien expert technique dans l'aéronautique, j'ai choisi de mettre
mes compétences d'analyse, de rigueur et de résolution de problèmes
au service du développement web.

Contact: contact@yvan-gui.dev
`;
  }

  formatProjectReadme(project) {
    let content = `# ${project.title}\n\n`;
    content += `${project.description || "Pas de description disponible."}\n\n`;

    if (project.challenges) {
      content += `## Défis relevés\n${project.challenges}\n\n`;
    }
    if (project.solutions) {
      content += `## Solutions apportées\n${project.solutions}\n\n`;
    }

    return content;
  }

  formatTechnologies(technologies) {
    if (!technologies || technologies.length === 0) {
      return "Aucune technologie spécifiée.";
    }
    return `Technologies utilisées:\n${technologies
      .map((t) => `  - ${t}`)
      .join("\n")}`;
  }

  formatLinks(project) {
    let content = "";
    if (project.demoUrl) {
      content += `Demo: ${project.demoUrl}\n`;
    }
    if (project.githubUrl) {
      content += `GitHub: ${project.githubUrl}\n`;
    }
    if (!content) {
      content = "Aucun lien disponible.";
    }
    return content;
  }

  formatSkills(skills) {
    return skills
      .map((s) => {
        const bar =
          "█".repeat(Math.floor(s.level / 10)) +
          "░".repeat(10 - Math.floor(s.level / 10));
        return `${s.name.padEnd(15)} [${bar}] ${s.level}%`;
      })
      .join("\n");
  }

  formatExperience(exp) {
    let content = `=== ${exp.title || exp.position} ===\n`;
    content += `Entreprise: ${exp.company}\n`;
    if (exp.location) content += `Lieu: ${exp.location}\n`;
    if (exp.startDate) {
      content += `Période: ${exp.startDate} - ${exp.endDate || "Présent"}\n`;
    }
    content += `\n${exp.description || "Pas de description disponible."}\n`;
    return content;
  }

  // Obtenir les complétions pour un chemin partiel (autocomplétion)
  getCompletions(partialPath) {
    const lastSlash = partialPath.lastIndexOf("/");
    let dirPath, prefix;

    if (lastSlash === -1) {
      dirPath = ".";
      prefix = partialPath;
    } else {
      dirPath = partialPath.slice(0, lastSlash) || "/";
      prefix = partialPath.slice(lastSlash + 1);
    }

    const items = this.listDir(dirPath);
    if (!items) return [];

    return items
      .filter((item) => item.name.startsWith(prefix))
      .map((item) => {
        const basePath =
          lastSlash === -1 ? "" : partialPath.slice(0, lastSlash + 1);
        return basePath + item.name + (item.isDirectory ? "/" : "");
      });
  }
}

// Instance unique (singleton)
const virtualFS = new VirtualFileSystem();
export default virtualFS;
