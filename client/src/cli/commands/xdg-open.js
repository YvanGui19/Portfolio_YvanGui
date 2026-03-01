const xdgOpenCommand = {
  name: "xdg-open",
  description: "Ouvre une URL dans le navigateur",
  usage: "xdg-open <url>",
  execute: (args) => {
    if (args.length === 0) {
      return [{ type: "error", content: "xdg-open: opérande manquant" }];
    }

    const target = args[0];

    // Vérifier si c'est une URL
    if (target.match(/^https?:\/\//)) {
      window.open(target, "_blank");
      return [{ type: "success", content: `Ouverture: ${target}` }];
    }

    // Pour les fichiers, on simule le comportement Linux
    return [
      {
        type: "error",
        content: `xdg-open: aucune application enregistrée pour '${target}'`,
      },
    ];
  },
};

export default xdgOpenCommand;
