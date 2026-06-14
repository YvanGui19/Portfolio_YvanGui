const DEFAULTS = {
  os: "Portfolio Linux x86_64",
  host: "React 19 + Vite",
  kernel: "Node.js + Express",
  shell: "portfolio-bash 1.0",
  terminal: "Ubuntu Style",
  cpu: "MERN Stack @ 100%",
  memory: "MongoDB",
};

const neofetchCommand = {
  name: "neofetch",
  description: "Affiche les infos systeme",
  usage: "neofetch",
  execute: (args, flags, fs) => {
    const n = { ...DEFAULTS, ...(fs?.profile?.neofetch || {}) };
    const profile = fs?.profile;
    const userTag = profile?.firstName
      ? `${profile.firstName.toLowerCase()}@portfolio`
      : "yvan@portfolio";

    return [
      { type: "text", content: "" },
      { type: "text", content: `  ${userTag}` },
      { type: "text", content: "  ─────────────────────────" },
      { type: "text", content: `  OS: ${n.os}` },
      { type: "text", content: `  Host: ${n.host}` },
      { type: "text", content: `  Kernel: ${n.kernel}` },
      { type: "text", content: `  Shell: ${n.shell}` },
      { type: "text", content: `  Terminal: ${n.terminal}` },
      { type: "text", content: `  CPU: ${n.cpu}` },
      { type: "text", content: `  Memory: ${n.memory}` },
      { type: "text", content: "" },
    ];
  },
};

export default neofetchCommand;
