import { useState, useEffect } from "react";

function TerminalStatusBar({ stats, commandCount }) {
  const [memUsage, setMemUsage] = useState(42);

  // Simulate memory usage fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setMemUsage((prev) => {
        const change = Math.random() * 4 - 2;
        return Math.max(35, Math.min(65, prev + change));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center h-5 bg-mid-navy border-t border-lime/30 font-mono text-[0.55rem] sm:text-[0.65rem]">
      {/* Left section - Mode indicator */}
      <div className="flex items-center h-full">
        <div className="px-1.5 sm:px-2 h-full flex items-center bg-lime/20 text-lime border-r border-lime/30">
          <span className="hidden xs:inline">NORMAL</span>
          <span className="xs:hidden">NRM</span>
        </div>
      </div>

      {/* Center spacer */}
      <div className="flex-1" />

      {/* Right section - Stats */}
      <div className="flex items-center h-full">
        {/* Data counts - hidden on mobile */}
        <div className="hidden sm:flex items-center gap-3 px-2 h-full border-l border-white/10 text-grey/50">
          <span>
            <span className="text-lime">◆</span> PRJ:{stats.projects}
          </span>
          <span>
            <span className="text-violet">◆</span> SKL:{stats.skills}
          </span>
          <span>
            <span className="text-orange">◆</span> EXP:{stats.experiences}
          </span>
        </div>

        {/* System stats - simplified on mobile */}
        <div className="hidden sm:flex items-center gap-2 px-2 h-full border-l border-white/10 text-grey/40">
          <span>CMD:{commandCount}</span>
          <span className="text-white/20">│</span>
          <span>MEM:{memUsage.toFixed(0)}%</span>
        </div>

        {/* Position indicator */}
        <div className="px-1.5 sm:px-2 h-full flex items-center bg-cyan/20 text-cyan border-l border-cyan/30">
          <span className="hidden xs:inline">UTF-8</span>
          <span className="xs:hidden">U8</span>
        </div>
      </div>
    </div>
  );
}

export default TerminalStatusBar;
