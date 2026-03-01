import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import TerminalHeader from "./TerminalHeader";
import TerminalOutput from "./TerminalOutput";
import TerminalInput from "./TerminalInput";
import virtualFS from "../../cli/virtualFileSystem";
import { parseCommand } from "../../cli/commandParser";
import { executeCommand, getCommandNames } from "../../cli/commands";
import { useAppMode } from "../../context/AppModeContext";
import projectService from "../../services/projectService";
import skillService from "../../services/skillService";
import experienceService from "../../services/experienceService";

const WELCOME_MESSAGE = [
  { type: "text", content: "" },
  {
    type: "text",
    content: "  ╦ ╦╦  ╦╔═╗╔╗╔  ╔═╗╦ ╦╦",
    className: "text-[#269f66]",
  },
  {
    type: "text",
    content: "  ╚╦╝╚╗╔╝╠═╣║║║  ║ ╦║ ║║",
    className: "text-[#269f66]",
  },
  {
    type: "text",
    content: "   ╩  ╚╝ ╩ ╩╝╚╝  ╚═╝╚═╝╩",
    className: "text-[#269f66]",
  },
  { type: "text", content: "" },
  {
    type: "text",
    content: "  Portfolio Terminal v1.0.0",
    className: "text-[#ffffff80]",
  },
  {
    type: "text",
    content: "  Tapez 'help' pour voir les commandes disponibles.",
    className: "text-[#ffffff80]",
  },
  { type: "text", content: "" },
];

function TerminalInterface() {
  const [history, setHistory] = useState([{ lines: WELCOME_MESSAGE }]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toggleMode } = useAppMode();

  // Utilitaire pour extraire un tableau depuis différents formats de réponse API
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

  // Charger les données du portfolio au montage
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

    // Ajouter le prompt à l'historique
    const promptEntry = {
      type: "prompt",
      user: "yvan",
      host: "portfolio",
      path: displayPath,
      command: input,
    };

    // Parser et exécuter la commande
    const parsed = parseCommand(input);
    const result = executeCommand(parsed, virtualFS);

    // Gérer la commande clear
    if (result.some((r) => r.type === "clear")) {
      setHistory([{ lines: WELCOME_MESSAGE }]);
      setCommandHistory((prev) => [...prev, input]);
      return;
    }

    // Gérer la commande exit
    if (result.some((r) => r.type === "exit")) {
      toggleMode();
      return;
    }

    // Ajouter à l'historique
    setHistory((prev) => [...prev, promptEntry, { lines: result }]);

    setCommandHistory((prev) => [...prev, input]);
  }, [toggleMode]);

  const handleComplete = useCallback((input) => {
    const parts = input.split(" ");
    const lastPart = parts[parts.length - 1];

    if (parts.length === 1) {
      // Compléter le nom de la commande
      const commands = getCommandNames();
      const matches = commands.filter((c) => c.startsWith(lastPart));
      if (matches.length === 1) {
        return matches[0] + " ";
      }
    } else {
      // Compléter le chemin
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
      className="h-screen bg-[#300a24] flex flex-col overflow-hidden"
    >
      {/* Barre de navigation fixe en haut */}
      <div className="flex-shrink-0">
        <TerminalHeader />
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-primary font-mono">
            Chargement des données...
          </div>
        </div>
      ) : (
        <>
          {/* Zone de sortie scrollable */}
          <TerminalOutput history={history} />

          {/* Ligne de commande fixe en bas */}
          <div className="flex-shrink-0 border-t border-[#4d1f3a]">
            <TerminalInput
              currentPath={virtualFS.pwd()}
              onSubmit={handleCommand}
              commandHistory={commandHistory}
              onComplete={handleComplete}
            />
          </div>
        </>
      )}
    </motion.div>
  );
}

export default TerminalInterface;
