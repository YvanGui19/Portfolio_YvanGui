const helpCommand = {
  name: "help",
  description: "Affiche l'aide",
  usage: "help [commande]",
  execute: (args, flags, fs, commands) => {
    if (args.length > 0) {
      const cmdName = args[0].toLowerCase();
      const cmd = commands[cmdName];
      if (cmd) {
        return [
          { type: "text", content: `${cmd.name} - ${cmd.description}` },
          { type: "text", content: `Usage: ${cmd.usage}` },
        ];
      }
      return [{ type: "error", content: `help: commande inconnue: ${cmdName}` }];
    }

    const lines = [
      { type: "text", content: "Commandes disponibles:", className: "text-[#269f66] font-bold" },
      { type: "text", content: "" },
    ];

    Object.values(commands).forEach((cmd) => {
      lines.push({
        type: "text",
        content: `  ${cmd.name.padEnd(12)} ${cmd.description}`,
      });
    });

    lines.push({ type: "text", content: "" });
    lines.push({
      type: "text",
      content: "Tapez 'help <commande>' pour plus de details.",
      className: "text-[#ffffff80]",
    });

    return lines;
  },
};

export default helpCommand;
