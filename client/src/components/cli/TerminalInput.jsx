import { useState, useRef, useEffect } from "react";

function TerminalInput({
  currentPath,
  onSubmit,
  commandHistory,
  onComplete,
}) {
  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [cursorVisible, setCursorVisible] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Clignotement du curseur
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (input.trim()) {
        onSubmit(input);
        setInput("");
        setHistoryIndex(-1);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex]);
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (onComplete) {
        const completed = onComplete(input);
        if (completed) {
          setInput(completed);
        }
      }
    } else if (e.key === "c" && e.ctrlKey) {
      setInput("");
      setHistoryIndex(-1);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      onSubmit("clear");
      setInput("");
    }
  };

  // Afficher le chemin relatif au home
  const displayPath = currentPath.replace("/home/yvan", "~");

  // Focus sur l'input au clic n'importe où dans la zone
  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className="flex items-center p-4 font-mono text-sm cursor-text"
      onClick={handleContainerClick}
    >
      <span className="text-[#269f66] font-bold">yvan@portfolio</span>
      <span className="text-text">:</span>
      <span className="text-[#5daaff] font-bold">{displayPath}</span>
      <span className="text-text">$ </span>
      <div className="flex-1 flex items-center ml-1 relative">
        <span className="text-text whitespace-pre">{input}</span>
        <span
          className={`w-2.5 h-5 bg-text ${cursorVisible ? "opacity-100" : "opacity-0"}`}
        />
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="absolute inset-0 opacity-0 cursor-text"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </div>
    </div>
  );
}

export default TerminalInput;
