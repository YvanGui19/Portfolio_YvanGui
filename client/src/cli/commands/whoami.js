const whoamiCommand = {
  name: "whoami",
  description: "Affiche l'utilisateur courant",
  usage: "whoami",
  execute: () => {
    return [{ type: "text", content: "Yvan Gui " }];
  },
};

export default whoamiCommand;
