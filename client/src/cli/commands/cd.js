const cdCommand = {
  name: "cd",
  description: "Change le repertoire courant",
  usage: "cd [chemin|ID]",
  execute: (args, flags, fs) => {
    let path = args[0] || "~";

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

        if (!entry.isDirectory) {
          return [{ type: "error", content: `cd: ${entry.name}: n'est pas un répertoire` }];
        }

        path = entry.path;
      } else {
        return [{ type: "error", content: `cd: ID '${id}' non trouvé dans ce répertoire` }];
      }
    }

    const result = fs.changeDir(path);

    if (result.error) {
      return [{ type: "error", content: result.error }];
    }

    return [];
  },
};

export default cdCommand;
