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
      return [{ type: "text", content: "// Répertoire vide" }];
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

    // Résoudre le chemin complet pour stocker le mapping
    const resolvedPath = fs.resolvePath(path);

    // Stocker le mapping ID -> fichier pour la commande cat
    fs.lastLsResult = {};
    entries.forEach((item, index) => {
      const id = index + 1;
      fs.lastLsResult[id] = {
        path: `${resolvedPath}/${item.name}`.replace("//", "/"),
        name: item.name,
        isDirectory: item.isDirectory,
      };
    });

    if (longFormat) {
      // Format long avec permissions, taille, ID, etc. - colonnes alignées
      const now = new Date();
      const dateStr = `${now.toLocaleString("en", { month: "short" })} ${now.getDate().toString().padStart(2, "0")}`;

      // Calculer la largeur max du nom pour l'alignement
      const maxNameLen = Math.max(...entries.map(e => e.name.length), 10);
      const lineWidth = 6 + 10 + 6 + 7 + maxNameLen; // [ID] + perms + size + date + name

      const lines = [
        { type: "text", content: `total ${entries.length}`, className: "text-grey/60" },
        { type: "text", content: "-".repeat(lineWidth), className: "text-white/10" },
      ];

      entries.forEach((item, index) => {
        const id = (index + 1).toString().padStart(2, " ");
        const perms = item.isDirectory ? "drwxr-xr-x" : "-rw-r--r--";
        const size = (item.isDirectory ? "4096" : "512").padStart(5);

        lines.push({
          type: "text",
          content: `[${id}] ${perms}  ${size}  ${dateStr}  ${item.name}`,
          className: item.isDirectory ? "text-cyan" : "text-off-white",
          isDir: item.isDirectory,
          name: item.name,
        });
      });

      lines.push({ type: "text", content: "-".repeat(lineWidth), className: "text-white/10" });
      lines.push({ type: "text", content: "// [TIPS] tapez directement le numéro d'ID au lieu du nom complet après votre commande", className: "text-white/20" });

      return lines;
    }

    // Format avec numéros - style tableau ASCII pur pour alignement parfait
    const nameColWidth = 44;
    const lines = [
      { type: "text", content: `+------+${"-".repeat(nameColWidth + 2)}+`, className: "text-white/20" },
      { type: "text", content: `|  ID  | ${"Nom".padEnd(nameColWidth)} |`, className: "text-grey/60" },
      { type: "text", content: `+------+${"-".repeat(nameColWidth + 2)}+`, className: "text-white/20" },
    ];

    entries.forEach((item, index) => {
      const id = (index + 1).toString().padStart(2, " ");
      const name = item.name.length > nameColWidth ? item.name.substring(0, nameColWidth - 3) + "..." : item.name;
      const paddedName = name.padEnd(nameColWidth);

      lines.push({
        type: "text",
        content: `|  ${id}  | ${paddedName} |`,
        className: item.isDirectory ? "text-cyan" : "text-off-white",
      });
    });

    lines.push({ type: "text", content: `+------+${"-".repeat(nameColWidth + 2)}+`, className: "text-white/20" });
    lines.push({ type: "text", content: "// [TIPS] tapez directement le numéro d'ID au lieu du nom complet après votre commande", className: "text-white/20" });

    return lines;
  },
};

export default lsCommand;
