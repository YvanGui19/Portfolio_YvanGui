const catCommand = {
  name: "cat",
  description: "Affiche le contenu d'un fichier",
  usage: "cat <fichier|ID>",
  execute: (args, flags, fs) => {
    if (args.length === 0) {
      return [{ type: "error", content: "cat: opérande manquant" }];
    }

    let path = args[0];

    // Vérifier si l'argument est un ID numérique
    const id = parseInt(path, 10);
    if (!isNaN(id)) {
      // Si pas de lastLsResult ou ID non trouvé, faire un ls automatique du répertoire courant
      if (!fs.lastLsResult || !fs.lastLsResult[id]) {
        const items = fs.listDir(".");
        if (items) {
          const resolvedPath = fs.pwd();
          fs.lastLsResult = {};
          items.forEach((item, index) => {
            const itemId = index + 1;
            fs.lastLsResult[itemId] = {
              path: `${resolvedPath}/${item.name}`.replace("//", "/"),
              name: item.name,
              isDirectory: item.isDirectory,
            };
          });
        }
      }

      if (fs.lastLsResult && fs.lastLsResult[id]) {
        const entry = fs.lastLsResult[id];

        if (entry.isDirectory) {
          return [{ type: "error", content: `cat: ${entry.name}: est un répertoire` }];
        }

        path = entry.path;
      } else {
        return [{ type: "error", content: `cat: ID '${id}' non trouvé dans ce répertoire` }];
      }
    }

    const result = fs.readFile(path);

    if (result.error) {
      return [{ type: "error", content: result.error }];
    }

    // Header avec le nom du fichier
    const filename = path.split("/").pop();
    const lines = [
      { type: "text", content: `// ${filename}`, className: "text-lime/60" },
      { type: "text", content: "", className: "text-grey" },
    ];

    // Contenu du fichier
    const contentLines = result.content.split("\n");
    contentLines.forEach((line) => {
      lines.push({
        type: "text",
        content: line,
        className: "text-grey",
      });
    });

    return lines;
  },
};

export default catCommand;
