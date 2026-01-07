import helpCommand from "./help";
import pwdCommand from "./pwd";
import clearCommand from "./clear";
import whoamiCommand from "./whoami";
import lsCommand from "./ls";
import cdCommand from "./cd";
import catCommand from "./cat";
import xdgOpenCommand from "./xdg-open";
import exitCommand from "./exit";
import neofetchCommand from "./neofetch";

// Registre des commandes
const commands = {
  help: helpCommand,
  pwd: pwdCommand,
  clear: clearCommand,
  whoami: whoamiCommand,
  ls: lsCommand,
  cd: cdCommand,
  cat: catCommand,
  "xdg-open": xdgOpenCommand,
  exit: exitCommand,
  neofetch: neofetchCommand,
};

// Exécuter une commande parsée
export function executeCommand(parsed, fs) {
  if (!parsed) {
    return [];
  }

  const { command, args, flags } = parsed;

  // Vérifier si la commande existe
  const cmd = commands[command];
  if (!cmd) {
    return [
      {
        type: "error",
        content: `bash: ${command}: commande introuvable`,
      },
    ];
  }

  // Exécuter la commande
  try {
    return cmd.execute(args, flags, fs, commands);
  } catch (error) {
    return [
      {
        type: "error",
        content: `${command}: error: ${error.message}`,
      },
    ];
  }
}

// Obtenir les noms de commandes pour l'autocomplétion
export function getCommandNames() {
  return Object.keys(commands);
}

export default commands;
