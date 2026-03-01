const exitCommand = {
  name: "exit",
  description: "Retourne en mode graphique",
  usage: "exit",
  execute: () => {
    // Signal pour revenir au mode GUI
    return [{ type: "exit" }];
  },
};

export default exitCommand;
