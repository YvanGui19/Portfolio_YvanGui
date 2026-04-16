import { useEffect, useRef } from "react";
import TerminalLine from "./TerminalLine";

function TerminalOutput({ history, welcomeComponent }) {
  const outputRef = useRef(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div
      ref={outputRef}
      className="flex-1 overflow-y-auto overflow-x-hidden px-2 sm:px-4 py-2 sm:py-3 font-mono text-[0.75rem] sm:text-[0.85rem] leading-relaxed scrollbar-thin scrollbar-track-transparent scrollbar-thumb-lime/20 hover:scrollbar-thumb-lime/40"
    >
      {/* Welcome ASCII art interactif */}
      {welcomeComponent}

      {history.map((entry, index) => (
        <div key={index} className="mb-0.5">
          {entry.type === "prompt" ? (
            <TerminalLine line={entry} />
          ) : (
            entry.lines?.map((line, lineIndex) => (
              <TerminalLine key={lineIndex} line={line} />
            ))
          )}
        </div>
      ))}
    </div>
  );
}

export default TerminalOutput;
