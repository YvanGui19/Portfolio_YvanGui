import { useState, useEffect } from "react";
import { BiWindow, BiTerminal, BiHelpCircle } from "react-icons/bi";
import { useAppMode } from "../../context/AppModeContext";

function TerminalHeader({ onShowHelp, helpVisible }) {
  const { toggleMode } = useAppMode();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
    });
  };

  return (
    <div className="flex items-center h-9 bg-dark-navy border-b border-lime/30 font-mono text-[0.7rem] sm:text-[0.8rem]">
      {/* Left section - Session info (hidden on mobile) */}
      <div className="hidden sm:flex items-center h-full">
        <div className="flex items-center gap-1.5 px-3 h-full bg-lime text-dark-navy font-bold">
          <BiTerminal className="w-4 h-4" />
          <span>0:zsh</span>
        </div>
        <div className="flex items-center gap-1 px-3 h-full border-r border-white/10 text-grey">
          <span className="text-cyan">1:main</span>
          <span className="text-white/30">*</span>
        </div>
      </div>

      {/* Mobile: Simple terminal icon */}
      <div className="sm:hidden flex items-center h-full">
        <div className="flex items-center gap-1 px-2 h-full bg-lime text-dark-navy font-bold">
          <BiTerminal className="w-4 h-4" />
        </div>
      </div>

      {/* Center - Title */}
      <div className="flex-1 flex items-center justify-center text-grey/60">
        <span className="text-lime">yvan</span><span className="text-grey/40">@</span><span className="text-cyan hidden xs:inline">portfolio</span><span className="text-cyan xs:hidden">pf</span><span className="hidden sm:inline"><span className="text-grey/40">:</span><span className="text-violet">~</span><span className="text-lime">$</span></span>
      </div>

      {/* Right section - System info */}
      <div className="flex items-center h-full">
        {/* Help button - blue background when help is closed */}
        <button
          onClick={onShowHelp}
          className={`flex items-center gap-1 px-2 h-full transition-colors cursor-pointer border-l ${
            helpVisible
              ? 'text-white/50 hover:text-white hover:bg-white/10 border-white/10'
              : 'text-white hover:brightness-110 border-white/30'
          }`}
          style={!helpVisible ? { backgroundColor: '#3601FB' } : undefined}
          title="Aide"
        >
          <BiHelpCircle className="w-4 h-4" />
        </button>

        {/* Date/Time - hidden on small mobile */}
        <div className="hidden xs:flex items-center gap-2 sm:gap-3 px-2 sm:px-3 h-full border-l border-white/10 text-grey/60">
          <span className="hidden sm:inline text-cyan/60">{formatDate(time)}</span>
          <span className="text-lime">{formatTime(time)}</span>
        </div>

        {/* GUI Toggle */}
        <button
          onClick={toggleMode}
          className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 h-full bg-cyan/20 text-cyan hover:bg-cyan/30 transition-colors cursor-pointer border-l border-cyan/30"
          title="Mode GUI"
        >
          <BiWindow className="w-4 h-4" />
          <span className="hidden sm:inline">GUI</span>
        </button>
      </div>
    </div>
  );
}

export default TerminalHeader;
