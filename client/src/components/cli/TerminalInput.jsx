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
  const [cursorPos, setCursorPos] = useState(0);
  const inputRef = useRef(null);

  const syncCursor = () => {
    if (inputRef.current) {
      setCursorPos(inputRef.current.selectionStart ?? 0);
    }
  };

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

  const replaceInput = (value) => {
    setInput(value);
    setCursorPos(value.length);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (input.trim()) {
        onSubmit(input);
        replaceInput("");
        setHistoryIndex(-1);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex);
          replaceInput(commandHistory[commandHistory.length - 1 - newIndex]);
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        replaceInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        replaceInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (onComplete) {
        const completed = onComplete(input);
        if (completed) {
          replaceInput(completed);
        }
      }
    } else if (e.key === "c" && e.ctrlKey) {
      replaceInput("");
      setHistoryIndex(-1);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      onSubmit("clear");
      replaceInput("");
    }
  };

  const displayPath = currentPath.replace("/home/yvan", "~");

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className="flex items-center px-2 sm:px-4 py-2 sm:py-3 font-mono text-[16px] sm:text-[0.85rem] cursor-text"
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
          <div className="flex items-center">
            <span className="text-lime font-bold">yvan</span>
            <span className="text-cyan">@</span>
            <span className="text-cyan font-bold">portfolio</span>
            <span className="text-white">:</span>
            <span className="text-violet font-bold">{displayPath}</span>
            <span className="text-lime mx-1">$</span>
          </div>
        </>
      )}

      {/* Input area */}
      <div className="flex-1 flex items-center relative min-w-0">
        <span className="text-off-white whitespace-pre overflow-hidden">{input.slice(0, cursorPos)}</span>
        <span
          className={`relative w-[0.6em] h-4 sm:h-5 bg-lime ml-px flex-shrink-0 ${cursorVisible ? "opacity-100" : "opacity-0"}`}
        >
          <span className="absolute inset-0 flex items-center justify-center text-dark-navy font-mono">
            {input[cursorPos] || ""}
          </span>
        </span>
        <span className="text-off-white whitespace-pre overflow-hidden">{input.slice(cursorPos + 1)}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setCursorPos(e.target.selectionStart ?? e.target.value.length);
          }}
          onKeyDown={handleKeyDown}
          onKeyUp={syncCursor}
          onClick={syncCursor}
          onSelect={syncCursor}
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
