function TerminalLine({ line }) {
  if (line.type === "prompt") {
    return (
      <div className="flex flex-wrap">
        <span className="text-[#269f66] font-bold">{line.user}@{line.host}</span>
        <span className="text-text">:</span>
        <span className="text-[#5daaff] font-bold">{line.path}</span>
        <span className="text-text">$ </span>
        <span className="text-text">{line.command}</span>
      </div>
    );
  }

  if (line.type === "error") {
    return <div className="text-danger">{line.content}</div>;
  }

  if (line.type === "success") {
    return <div className="text-primary">{line.content}</div>;
  }

  if (line.type === "ls-grid") {
    return (
      <div className="flex flex-wrap gap-x-6 gap-y-1">
        {line.items.map((item, i) => (
          <span
            key={i}
            className={item.isDirectory ? "text-[#5daaff] font-bold" : "text-text"}
          >
            {item.name}{item.isDirectory ? "/" : ""}
          </span>
        ))}
      </div>
    );
  }

  // Gérer le format long de ls avec coloration des répertoires
  if (line.isDir && line.content) {
    // Extraire le nom du contenu et le coloriser
    const parts = line.content.split(line.name);
    if (parts.length === 2) {
      return (
        <div className="text-text whitespace-pre">
          {parts[0]}<span className="text-[#5daaff] font-bold">{line.name}</span>{parts[1]}
        </div>
      );
    }
  }

  // Ligne de texte par défaut
  return (
    <div className={`${line.className || "text-text"} whitespace-pre-wrap`}>
      {line.content}
    </div>
  );
}

export default TerminalLine;
