function TerminalLine({ line }) {
  if (line.type === "prompt") {
    return (
      <div className="flex flex-wrap items-center text-[0.75rem] sm:text-[0.85rem]">
        {/* User@host */}
        <span className="text-lime font-bold">{line.user}</span>
        <span className="text-grey/40">@</span>
        <span className="text-cyan font-bold">{line.host}</span>
        {/* Path */}
        <span className="text-grey/40">:</span>
        <span className="text-violet font-bold">{line.path}</span>
        {/* Prompt symbol */}
        <span className="text-lime mx-1">$</span>
        {/* Command */}
        <span className="text-off-white break-all">{line.command}</span>
      </div>
    );
  }

  if (line.type === "error") {
    return (
      <div className="flex items-center gap-2 text-red">
        <span className="text-red/60">[ERROR]</span>
        <span>{line.content}</span>
      </div>
    );
  }

  if (line.type === "success") {
    return (
      <div className="flex items-center gap-2 text-lime">
        <span className="text-lime/60">[OK]</span>
        <span>{line.content}</span>
      </div>
    );
  }

  if (line.type === "ls-grid") {
    return (
      <div className="flex flex-wrap gap-x-6 gap-y-1 pl-2">
        {line.items.map((item, i) => (
          <span
            key={i}
            className={item.isDirectory ? "text-cyan font-bold" : "text-off-white"}
          >
            {item.isDirectory && <span className="text-cyan/40 mr-1">📁</span>}
            {item.name}{item.isDirectory ? "/" : ""}
          </span>
        ))}
      </div>
    );
  }

  // Handle long format ls with directory coloring
  if (line.isDir && line.content) {
    const parts = line.content.split(line.name);
    if (parts.length === 2) {
      return (
        <div className="text-grey whitespace-pre">
          <span className="text-grey/60">{parts[0]}</span>
          <span className="text-cyan font-bold">{line.name}</span>
          <span className="text-grey/60">{parts[1]}</span>
        </div>
      );
    }
  }

  // Default text line
  return (
    <div className={`${line.className || "text-grey"} whitespace-pre-wrap`}>
      {line.content}
    </div>
  );
}

export default TerminalLine;
