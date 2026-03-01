import { BiWindow } from "react-icons/bi";
import { useAppMode } from "../../context/AppModeContext";

function TerminalHeader() {
  const { toggleMode } = useAppMode();

  return (
    <div className="flex items-center px-3 py-2 bg-[#1f1f1f] border-b border-[#4d1f3a]">
      {/* Espace pour equilibrer */}
      <div className="w-8" />

      {/* Titre - centre */}
      <span className="flex-1 text-center text-[#ffffff80] text-sm font-mono">
        yvan@portfolio: ~
      </span>

      {/* Bouton retour mode GUI */}
      <button
        onClick={toggleMode}
        className="p-1.5 text-[#ffffff80] hover:text-primary hover:bg-primary/10 rounded transition-all cursor-pointer"
        title="Passer en mode GUI"
      >
        <BiWindow className="w-4 h-4" />
      </button>
    </div>
  );
}

export default TerminalHeader;
