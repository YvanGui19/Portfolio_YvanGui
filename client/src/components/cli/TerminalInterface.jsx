import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { BiWindow } from "react-icons/bi";
import TerminalHeader from "./TerminalHeader";

// Spinner ASCII |/-\
function Spinner() {
  const [frame, setFrame] = useState(0);
  const frames = ['|', '/', '-', '\\'];

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(f => (f + 1) % frames.length);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return <span className="text-lime font-mono">{frames[frame]}</span>;
}
import TerminalStatusBar from "./TerminalStatusBar";
import TerminalOutput from "./TerminalOutput";
import TerminalInput from "./TerminalInput";
import virtualFS from "../../cli/virtualFileSystem";
import { parseCommand } from "../../cli/commandParser";
import { executeCommand, getCommandNames } from "../../cli/commands";
import { useAppMode } from "../../context/AppModeContext";
import projectService from "../../services/projectService";
import skillService from "../../services/skillService";
import experienceService from "../../services/experienceService";

// ASCII art pour YVAN. (2 espaces entre chaque lettre)
const YVAN_ASCII = [
  "██╗   ██╗  ██╗   ██╗   █████╗   ███╗   ██╗    ",
  "╚██╗ ██╔╝  ██║   ██║  ██╔══██╗  ████╗  ██║    ",
  " ╚████╔╝   ██║   ██║  ███████║  ██╔██╗ ██║    ",
  "  ╚██╔╝    ╚██╗ ██╔╝  ██╔══██║  ██║╚██╗██║    ",
  "   ██║      ╚████╔╝   ██║  ██║  ██║ ╚████║ ██╗",
  "   ╚═╝       ╚═══╝    ╚═╝  ╚═╝  ╚═╝  ╚═══╝ ╚═╝",
];

// ASCII art pour GUI (alignement U et I sur toutes les lignes)
const GUI_ASCII = [
  "███████╗   ██╗   ██╗  ██╗",
  "██╔════╝   ██║   ██║  ██║",
  "██║  ███╗  ██║   ██║  ██║",
  "██║   ██║  ██║   ██║  ██║",
  "╚██████╔╝  ╚██████╔╝  ██║",
  " ╚════╝     ╚═════╝   ╚═╝",
];

// ASCII art pour CLI (1 espace entre chaque lettre, le C a déjà son espace naturel)
const CLI_ASCII = [
  " ██████╗ ██╗      ██╗",
  "██╔════╝ ██║      ██║",
  "██║      ██║      ██║",
  "██║      ██║      ██║",
  "╚██████╗ ███████╗ ██║",
  " ╚═════╝ ╚══════╝ ╚═╝",
];

// Footer desktop (large) - lignes horizontales uniquement
const WelcomeFooterDesktop = () => (
  <div className="my-4 font-mono whitespace-pre">
    <div className="text-white/20">  ════════════════════════════════════════════════════════════════════════</div>
    <div className="text-cyan/60">    YVAN.GUI TERMINAL v2.0.0                           [PORTFOLIO_SYSTEM]</div>
    <div className="text-grey/60">    Type 'help' for available commands                Status: OPERATIONAL</div>
    <div className="text-white/20">  ════════════════════════════════════════════════════════════════════════</div>
  </div>
);

// Footer mobile (compact)
const WELCOME_FOOTER_MOBILE = [
  { type: "text", content: "" },
  {
    type: "text",
    content: "┌───────────────────────────┐",
    className: "text-white/20",
  },
  {
    type: "text",
    content: "│ YVAN.GUI TERMINAL v2.0.0 │",
    className: "text-cyan/60",
  },
  {
    type: "text",
    content: "│ Type 'help' for commands │",
    className: "text-grey/60",
  },
  {
    type: "text",
    content: "└───────────────────────────┘",
    className: "text-white/20",
  },
  { type: "text", content: "" },
];

// ASCII art compact pour mobile
const YVAN_ASCII_MOBILE = [
  "██╗   ██╗██╗   ██╗ █████╗ ███╗  ██╗",
  "╚██╗ ██╔╝██║   ██║██╔══██╗████╗ ██║",
  " ╚████╔╝ ██║   ██║███████║██╔██╗██║",
  "  ╚██╔╝  ╚██╗ ██╔╝██╔══██║██║╚████║",
  "   ██║    ╚████╔╝ ██║  ██║██║ ╚███║",
  "   ╚═╝     ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚══╝",
];

// Composant fenêtre d'aide draggable
function HelpWindow({ isVisible, setIsVisible, onFirstEnter }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const windowRef = useRef(null);

  // Détecter mobile et gérer le resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Garder la fenêtre dans les limites lors du resize
  useEffect(() => {
    const handleResize = () => {
      if (windowRef.current && !isMobile) {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const rect = windowRef.current.getBoundingClientRect();

        let newX = position.x;
        let newY = position.y;

        // Si la fenêtre sort à droite
        if (position.x + rect.width > windowWidth) {
          newX = Math.max(10, windowWidth - rect.width - 10);
        }
        // Si la fenêtre sort en bas
        if (position.y + rect.height > windowHeight) {
          newY = Math.max(50, windowHeight - rect.height - 10);
        }

        if (newX !== position.x || newY !== position.y) {
          setPosition({ x: newX, y: newY });
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [position, isMobile]);

  // Fermer quand la première commande est tapée
  useEffect(() => {
    if (onFirstEnter) {
      setIsVisible(false);
    }
  }, [onFirstEnter, setIsVisible]);

  // Position initiale (en haut à droite, une seule fois)
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    if (!initialized && !isMobile) {
      const windowWidth = window.innerWidth;
      setPosition({
        x: windowWidth - 340,
        y: 50,
      });
      setInitialized(true);
    }
  }, [initialized, isMobile]);

  const handleMouseDown = (e) => {
    if (isMobile) return;
    if (e.target.closest('.close-btn')) return;
    setIsDragging(true);
    const rect = windowRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y,
    });
  }, [isDragging, dragOffset]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  if (!isVisible) return null;

  // Version mobile : centrée en bas
  if (isMobile) {
    return (
      <div className="fixed z-40 inset-x-4 bottom-20 font-mono text-sm font-bold">
        <div style={{ backgroundColor: '#3601FB' }}>
          <div className="flex items-center justify-between px-3 py-1.5 bg-black">
            <span className="text-white">// AIDE</span>
            <button
              className="close-btn text-white hover:bg-white/20 px-2 py-1 transition-colors font-bold cursor-pointer"
              onClick={() => setIsVisible(false)}
            >
              ✕
            </button>
          </div>
          <div className="p-3 space-y-3">
            <p className="text-white leading-relaxed">
              Vous êtes en mode CLI (Command Line Interface).
            </p>
            <div className="space-y-2 text-white">
              <p>Pour revenir en mode graphique :</p>
              <p><span className="text-black text-lg">▸</span> Tapez exit dans le prompt puis appuyez sur la touche Entrée de votre clavier</p>
              <p className="text-center text-black text-base font-bold">OU</p>
              <p className="flex items-center gap-2">
                <span className="text-black text-lg">▸</span>
                <span>Cliquez sur le bouton</span>
                <span className="inline-flex items-center gap-1 bg-cyan/20 px-1.5 py-0.5 text-cyan border-l border-cyan/30">
                  <BiWindow className="w-3 h-3" />
                  <span>GUI</span>
                </span>
              </p>
              <p>(Graphical User Interface)</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Version desktop : draggable
  return (
    <div
      ref={windowRef}
      className="fixed z-40 w-80 font-mono text-sm font-bold select-none"
      style={{
        left: position.x,
        top: position.y,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Window frame */}
      <div style={{ backgroundColor: '#3601FB' }}>
        {/* Title bar */}
        <div className="flex items-center justify-between px-3 py-2 bg-black">
          <span className="text-white">// AIDE</span>
          <button
            className="close-btn text-white hover:bg-white/20 px-1.5 py-0.5 transition-colors font-bold cursor-pointer"
            onClick={() => setIsVisible(false)}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <p className="text-white leading-relaxed">
            Perdu ? Vous êtes en mode CLI (Command Line Interface).
          </p>

          <div className="space-y-2 text-white">
            <p>Pour revenir en mode graphique :</p>
            <p><span className="text-black text-lg">▸</span> Tapez exit dans le prompt puis appuyez sur la touche Entrée de votre clavier</p>
            <p className="text-center text-black text-base font-bold">OU</p>
            <p className="flex items-center gap-2">
              <span className="text-black text-lg">▸</span>
              <span>Cliquez sur le bouton</span>
              <span className="inline-flex items-center gap-1 bg-cyan/20 px-2 py-0.5 text-cyan border-l border-cyan/30">
                <BiWindow className="w-3 h-3" />
                <span>GUI</span>
              </span>
            </p>
            <p>(Graphical User Interface)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Composant pour l'ASCII art interactif
function WelcomeAscii() {
  const [showCli, setShowCli] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const suffixAscii = showCli ? CLI_ASCII : GUI_ASCII;
  const opacityClasses = ["opacity-100", "opacity-100", "opacity-80", "opacity-60", "opacity-40", "opacity-30"];

  // Version mobile : ASCII simplifié sans GUI/CLI
  if (isMobile) {
    return (
      <div className="select-none overflow-x-auto">
        <div className="h-2" />
        {YVAN_ASCII_MOBILE.map((line, i) => (
          <div key={i} className={`text-lime whitespace-pre font-mono text-[0.6rem] leading-[1.15] ${opacityClasses[i]}`}>
            {line}
          </div>
        ))}
        <div className="h-2" />
        {WELCOME_FOOTER_MOBILE.map((line, i) => (
          <div key={`footer-${i}`} className={`${line.className || ""} whitespace-pre text-[0.65rem]`}>
            {line.content}
          </div>
        ))}
      </div>
    );
  }

  // Version desktop : ASCII complet avec Easter egg
  return (
    <div className="select-none">
      <div className="h-4" />
      {YVAN_ASCII.map((line, i) => (
        <div key={i} className={`text-lime whitespace-pre font-mono leading-[1.15] ${opacityClasses[i]}`}>
          {line}<span onClick={() => setShowCli(!showCli)} className="cursor-pointer">{suffixAscii[i]}</span>
        </div>
      ))}
      <WelcomeFooterDesktop />
    </div>
  );
}

function TerminalInterface() {
  const [history, setHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({ projects: 0, skills: 0, experiences: 0 });
  const [showHelp, setShowHelp] = useState(true);
  const { toggleMode } = useAppMode();

  const extractArray = (response) => {
    if (Array.isArray(response)) return response;
    if (response?.data && Array.isArray(response.data)) return response.data;
    if (response?.projects && Array.isArray(response.projects))
      return response.projects;
    if (response?.skills && Array.isArray(response.skills))
      return response.skills;
    if (response?.experiences && Array.isArray(response.experiences))
      return response.experiences;
    return [];
  };

  useEffect(() => {
    async function loadData() {
      try {
        const [projectsRes, skillsRes, experiencesRes] = await Promise.all([
          projectService.getAll(),
          skillService.getAll(),
          experienceService.getAll(),
        ]);

        const projects = extractArray(projectsRes);
        const skills = extractArray(skillsRes);
        const experiences = extractArray(experiencesRes);

        setStats({
          projects: projects.length,
          skills: skills.length,
          experiences: experiences.length,
        });

        virtualFS.populate({
          projects,
          skills,
          experiences,
          about: {
            description:
              "Développeur Web Full-Stack passionné par les technologies modernes.",
          },
        });
      } catch (error) {
        console.error("Error loading data for CLI:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  const handleCommand = useCallback((input) => {
    const currentPath = virtualFS.pwd();
    const displayPath = currentPath.replace("/home/yvan", "~");

    const promptEntry = {
      type: "prompt",
      user: "yvan",
      host: "portfolio",
      path: displayPath,
      command: input,
    };

    const parsed = parseCommand(input);
    const result = executeCommand(parsed, virtualFS);

    if (result.some((r) => r.type === "clear")) {
      setHistory([]);
      setCommandHistory((prev) => [...prev, input]);
      return;
    }

    if (result.some((r) => r.type === "exit")) {
      toggleMode();
      return;
    }

    setHistory((prev) => [...prev, promptEntry, { lines: result }]);
    setCommandHistory((prev) => [...prev, input]);
  }, [toggleMode]);

  const handleComplete = useCallback((input) => {
    const parts = input.split(" ");
    const lastPart = parts[parts.length - 1];

    if (parts.length === 1) {
      const commands = getCommandNames();
      const matches = commands.filter((c) => c.startsWith(lastPart));
      if (matches.length === 1) {
        return matches[0] + " ";
      }
    } else {
      const completions = virtualFS.getCompletions(lastPart);
      if (completions.length === 1) {
        parts[parts.length - 1] = completions[0];
        return parts.join(" ");
      }
    }

    return null;
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen bg-dark-navy flex flex-col overflow-hidden relative"
    >
      {/* Top status bar (tmux style) */}
      <div className="flex-shrink-0">
        <TerminalHeader onShowHelp={() => setShowHelp(true)} helpVisible={showHelp} />
      </div>

      {/* Main terminal area with border */}
      <div className="flex-1 flex flex-col min-h-0 border-x border-lime/10">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="font-mono text-[0.9rem] text-lime/80 flex items-center gap-2">
              <Spinner /> LOADING_SYSTEM_DATA...
            </div>
          </div>
        ) : (
          <>
            {/* Output area */}
            <TerminalOutput history={history} welcomeComponent={<WelcomeAscii />} />

            {/* Input area */}
            <div className="flex-shrink-0 border-t border-lime/20 bg-black/30">
              <TerminalInput
                currentPath={virtualFS.pwd()}
                onSubmit={handleCommand}
                commandHistory={commandHistory}
                onComplete={handleComplete}
              />
            </div>
          </>
        )}
      </div>

      {/* Bottom status bar (tmux style) */}
      <div className="flex-shrink-0">
        <TerminalStatusBar
          stats={stats}
          commandCount={commandHistory.length}
        />
      </div>

      {/* Draggable Help Window - Desktop only */}
      <HelpWindow
        isVisible={showHelp}
        setIsVisible={setShowHelp}
        onFirstEnter={commandHistory.length > 0}
      />
    </motion.div>
  );
}

export default TerminalInterface;
