// Parseur de commandes - analyse l'entrée utilisateur en commande et arguments

export function parseCommand(input) {
  const trimmed = input.trim();
  if (!trimmed) return null;

  // Découper par espaces en respectant les chaînes entre guillemets
  const tokens = [];
  let current = "";
  let inQuotes = false;
  let quoteChar = null;

  for (let i = 0; i < trimmed.length; i++) {
    const char = trimmed[i];

    if ((char === '"' || char === "'") && !inQuotes) {
      inQuotes = true;
      quoteChar = char;
    } else if (char === quoteChar && inQuotes) {
      inQuotes = false;
      quoteChar = null;
    } else if (char === " " && !inQuotes) {
      if (current) {
        tokens.push(current);
        current = "";
      }
    } else {
      current += char;
    }
  }

  if (current) {
    tokens.push(current);
  }

  if (tokens.length === 0) return null;

  const command = tokens[0].toLowerCase();
  const args = tokens.slice(1);

  // Parser les flags et arguments positionnels
  const flags = {};
  const positional = [];

  for (const arg of args) {
    if (arg.startsWith("--")) {
      const [key, value] = arg.slice(2).split("=");
      flags[key] = value || true;
    } else if (arg.startsWith("-") && arg.length > 1) {
      // Gérer les flags combinés comme -la
      for (const char of arg.slice(1)) {
        flags[char] = true;
      }
    } else {
      positional.push(arg);
    }
  }

  return {
    command,
    args: positional,
    flags,
    raw: trimmed,
  };
}
