const neofetchCommand = {
  name: "neofetch",
  description: "Affiche les infos systeme",
  usage: "neofetch",
  execute: () => {
    return [
      { type: "text", content: "" },
      { type: "text", content: "  yvan@portfolio" },
      { type: "text", content: "  ─────────────────────────" },
      { type: "text", content: "  OS: Portfolio Linux x86_64" },
      { type: "text", content: "  Host: React 19 + Vite" },
      { type: "text", content: "  Kernel: Node.js + Express" },
      { type: "text", content: "  Shell: portfolio-bash 1.0" },
      { type: "text", content: "  Terminal: Ubuntu Style" },
      { type: "text", content: "  CPU: MERN Stack @ 100%" },
      { type: "text", content: "  Memory: MongoDB" },
      { type: "text", content: "" },
    ];
  },
};

export default neofetchCommand;
