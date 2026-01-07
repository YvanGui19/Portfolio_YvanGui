const catCommand = {
  name: "cat",
  description: "Affiche le contenu d'un fichier",
  usage: "cat <fichier>",
  execute: (args, flags, fs) => {
    if (args.length === 0) {
      return [{ type: "error", content: "cat: opérande manquant" }];
    }

    const path = args[0];
    const result = fs.readFile(path);

    if (result.error) {
      return [{ type: "error", content: result.error }];
    }

    // Découper le contenu par lignes et retourner chaque ligne
    const lines = result.content.split("\n").map((line) => ({
      type: "text",
      content: line,
    }));

    return lines;
  },
};

export default catCommand;
