const pwdCommand = {
  name: "pwd",
  description: "Affiche le repertoire courant",
  usage: "pwd",
  execute: (args, flags, fs) => {
    return [{ type: "text", content: fs.pwd() }];
  },
};

export default pwdCommand;
