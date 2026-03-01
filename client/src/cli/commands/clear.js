const clearCommand = {
  name: "clear",
  description: "Efface le terminal",
  usage: "clear",
  execute: () => {
    return [{ type: "clear" }];
  },
};

export default clearCommand;
