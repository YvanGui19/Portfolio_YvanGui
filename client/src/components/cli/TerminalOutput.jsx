import { useEffect, useRef } from "react";
import TerminalLine from "./TerminalLine";

function TerminalOutput({ history }) {
  const outputRef = useRef(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div
      ref={outputRef}
      className="flex-1 overflow-y-auto p-4 font-mono text-sm leading-relaxed"
    >
      {history.map((entry, index) => (
        <div key={index} className="mb-1">
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
