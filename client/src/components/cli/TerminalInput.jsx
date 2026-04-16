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
  const [isMobile, setIsMobile] = useState(false);
  const inputRef = useRef(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Cursor blink
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

  const displayPath = currentPath.replace("/home/yvan", "~");

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className="flex items-center px-2 sm:px-4 py-2 sm:py-3 font-mono text-[0.75rem] sm:text-[0.85rem] cursor-text"
      onClick={handleContainerClick}
    >
      {/* Prompt prefix - compact on mobile */}
      {isMobile ? (
        <div className="flex items-center gap-0.5 mr-1.5">
          <span className="text-lime font-bold">~</span>
          <span className="text-lime">$</span>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-0.5 mr-2">
            <span className="text-lime font-bold">yvan</span>
            <span className="text-grey/40">@</span>
            <span className="text-cyan font-bold">portfolio</span>
          </div>

          {/* Path */}
          <div className="flex items-center mr-2">
            <span className="text-grey/40">:</span>
            <span className="text-violet font-bold">{displayPath}</span>
          </div>

          {/* Prompt symbol */}
          <span className="text-lime mr-2">$</span>
        </>
      )}

      {/* Input area */}
      <div className="flex-1 flex items-center relative min-w-0">
        <span className="text-off-white whitespace-pre overflow-hidden">{input}</span>
        <span
          className={`w-1.5 sm:w-2 h-4 sm:h-5 bg-lime ml-px flex-shrink-0 ${cursorVisible ? "opacity-100" : "opacity-0"}`}
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
