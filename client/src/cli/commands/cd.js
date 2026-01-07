const cdCommand = {
  name: "cd",
  description: "Change le repertoire courant",
  usage: "cd [chemin]",
  execute: (args, flags, fs) => {
    const path = args[0] || "~";
    const result = fs.changeDir(path);

    if (result.error) {
      return [{ type: "error", content: result.error }];
    }

    return [];
  },
};

export default cdCommand;
