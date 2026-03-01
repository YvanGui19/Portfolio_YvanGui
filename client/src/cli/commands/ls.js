const lsCommand = {
  name: "ls",
  description: "Liste le contenu d'un répertoire",
  usage: "ls [-l] [-a] [chemin]",
  execute: (args, flags, fs) => {
    const path = args[0] || ".";
    const items = fs.listDir(path);

    if (!items) {
      return [{ type: "error", content: `ls: impossible d'accéder à '${path}': Aucun fichier ou dossier de ce type` }];
    }

    if (items.length === 0) {
      return [];
    }

    const showHidden = flags.a;
    const longFormat = flags.l;

    // Ajouter les entrées cachées pour le flag -a
    let entries = [...items];
    if (showHidden) {
      entries = [
        { name: ".", type: "dir", isDirectory: true },
        { name: "..", type: "dir", isDirectory: true },
        ...entries,
      ];
    }

    if (longFormat) {
      // Format long avec permissions, taille, etc.
      const lines = [
        { type: "text", content: `total ${entries.length}` },
      ];

      const now = new Date();
      const dateStr = `${now.toLocaleString("en", { month: "short" })} ${now.getDate().toString().padStart(2)} ${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

      entries.forEach((item) => {
        const perms = item.isDirectory ? "drwxr-xr-x" : "-rw-r--r--";
        const size = item.isDirectory ? "4096" : " 512";

        lines.push({
          type: "text",
          content: `${perms}  1 yvan yvan ${size.padStart(5)} ${dateStr} ${item.name}`,
          className: item.isDirectory ? "text-primary" : "",
          isDir: item.isDirectory,
          name: item.name,
        });
      });

      return lines;
    }

    // Format simple - affichage en colonnes
    const output = entries.map((item) => ({
      name: item.name,
      isDirectory: item.isDirectory,
    }));

    return [{
      type: "ls-grid",
      items: output,
    }];
  },
};

export default lsCommand;
