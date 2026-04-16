import { useState, useEffect, useCallback, useRef } from "react";

// Sélecteurs des éléments avec effet glitch
const GLITCH_SELECTORS = [
  ".scramble-text",
  ".cli-glitch-hover",
  ".hero-glitch-name",
  ".hero-glitch-lime",
  ".glitch",
  ".hero-warning-text",
  ".hero-danger-symbol",
  ".danger-icon"
];

// Configuration de la taille
const MIN_SIZE = 6;
const MAX_SIZE = 200;
const GROWTH_SPEED = 0.6;
const CURSOR_COOLDOWN_MS = 10000; // 10 secondes avant que le curseur réapparaisse
const CIRCLE_COOLDOWN_MS = 5000; // 5 secondes avant que le cercle puisse se former
const WARNING_THRESHOLD = 0.5; // 50% de la taille max

// Textes d'avertissement
const WARNING_TEXTS = ["WARNING", "ERROR", "CAUTION", "/!\\", "DANGER", "ALERT", "CRITICAL"];
const WARNING_SIZES = ["size-sm", "size-md", "size-lg", "size-xl"];

// Warnings en positions fixes centrales
const FIXED_WARNINGS = [
  { id: 0, text: "WARNING", size: "size-xl" },
  { id: 1, text: "DANGER", size: "size-lg" },
  { id: 2, text: "ERROR", size: "size-lg" },
  { id: 3, text: "CRITICAL", size: "size-md" },
  { id: 4, text: "/!\\", size: "size-xl" },
  { id: 5, text: "ALERT", size: "size-md" },
];

function GlitchCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false); // Survole un élément glitch
  const [isGlitching, setIsGlitching] = useState(false); // Cercle peut grossir
  const [size, setSize] = useState(MIN_SIZE);
  const [isExploding, setIsExploding] = useState(false);
  const [isCursorCooldown, setIsCursorCooldown] = useState(false); // Curseur invisible
  const [warningMode, setWarningMode] = useState(false);
  const [warnings, setWarnings] = useState([]);
  const [showSplash, setShowSplash] = useState(false); // Effet goutte d'eau au retour
  const animationRef = useRef(null);
  const cursorCooldownRef = useRef(null);
  const circleDelayRef = useRef(null); // Délai avant que le cercle puisse grossir

  const isGlitchElement = useCallback((target) => {
    return GLITCH_SELECTORS.some(selector => target.closest(selector));
  }, []);

  // Fonction d'explosion
  const triggerExplosion = useCallback(() => {
    setIsExploding(true);
    setIsGlitching(false);
    setIsHovering(false);
    setWarningMode(false);
    setWarnings([]);

    // Annuler le délai du cercle si en cours
    if (circleDelayRef.current) {
      clearTimeout(circleDelayRef.current);
      circleDelayRef.current = null;
    }

    // Cacher le curseur système et désactiver les hovers
    document.body.classList.add("cursor-exploded");
    document.body.classList.add("cursor-hover-disabled");

    // Après l'animation d'explosion, démarrer le cooldown
    setTimeout(() => {
      setIsExploding(false);
      setSize(MIN_SIZE);
      setIsCursorCooldown(true);

      // Cooldown curseur: 10 secondes (curseur invisible, hovers désactivés)
      cursorCooldownRef.current = setTimeout(() => {
        setIsCursorCooldown(false);
        document.body.classList.remove("cursor-exploded");
        document.body.classList.remove("cursor-hover-disabled");

        // Déclencher l'effet splash au retour du curseur
        setShowSplash(true);
        setTimeout(() => setShowSplash(false), 1800);
      }, CURSOR_COOLDOWN_MS);
    }, 500); // Durée de l'animation d'explosion
  }, []);

  // Gérer la visibilité du curseur système quand le cercle est actif
  useEffect(() => {
    if (isGlitching) {
      document.body.classList.add("cursor-glitching");
    } else {
      document.body.classList.remove("cursor-glitching");
    }

    return () => {
      document.body.classList.remove("cursor-glitching");
    };
  }, [isGlitching]);

  // Animation de croissance
  useEffect(() => {
    if (isGlitching) {
      const grow = () => {
        setSize(prevSize => {
          const newSize = prevSize + GROWTH_SPEED;

          // Activer le mode warning à 50%
          const progress = (newSize - MIN_SIZE) / (MAX_SIZE - MIN_SIZE);
          if (progress >= WARNING_THRESHOLD && !warningMode) {
            setWarningMode(true);
            setWarnings(FIXED_WARNINGS);
          }

          if (newSize >= MAX_SIZE) {
            triggerExplosion();
            return MAX_SIZE;
          }
          return newSize;
        });
        animationRef.current = requestAnimationFrame(grow);
      };
      animationRef.current = requestAnimationFrame(grow);
    } else if (!isGlitching && !isExploding) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      setSize(MIN_SIZE);
      // Désactiver le mode warning si on quitte
      if (warningMode) {
        setWarningMode(false);
        setWarnings([]);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isGlitching, isExploding, triggerExplosion, warningMode]);

  // Gérer le délai de 5 secondes avant que le cercle puisse grossir
  useEffect(() => {
    if (isHovering && !isCursorCooldown && !isExploding) {
      // Démarrer le délai de 5 secondes
      circleDelayRef.current = setTimeout(() => {
        setIsGlitching(true);
      }, CIRCLE_COOLDOWN_MS);
    } else {
      // Annuler le délai et arrêter le glitch
      if (circleDelayRef.current) {
        clearTimeout(circleDelayRef.current);
        circleDelayRef.current = null;
      }
      if (!isExploding) {
        setIsGlitching(false);
      }
    }

    return () => {
      if (circleDelayRef.current) {
        clearTimeout(circleDelayRef.current);
      }
    };
  }, [isHovering, isCursorCooldown, isExploding]);

  useEffect(() => {
    const handleMouseOver = (e) => {
      if (isGlitchElement(e.target) && !isCursorCooldown && !isExploding) {
        setIsHovering(true);
        setPosition({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseOut = (e) => {
      if (isGlitchElement(e.target)) {
        const relatedTarget = e.relatedTarget;
        if (!relatedTarget || !isGlitchElement(relatedTarget)) {
          setIsHovering(false);
        }
      }
    };

    const handleMouseMoveGlobal = (e) => {
      // Toujours mettre à jour la position pour le splash au retour du curseur
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mousemove", handleMouseMoveGlobal);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mousemove", handleMouseMoveGlobal);
      if (cursorCooldownRef.current) {
        clearTimeout(cursorCooldownRef.current);
      }
    };
  }, [isGlitchElement, isHovering, isGlitching, isExploding, isCursorCooldown]);

  // Ne pas afficher sur mobile/tactile
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  // Afficher le splash même si pas de glitch actif
  if (!isGlitching && !isExploding && !showSplash) {
    return null;
  }

  // Calculer l'intensité du glitch (0 à 1)
  const glitchIntensity = (size - MIN_SIZE) / (MAX_SIZE - MIN_SIZE);
  const dotClass = isExploding ? "glitch-cursor-dot exploding" : "glitch-cursor-dot";

  return (
    <>
      {/* Effet splash au retour du curseur */}
      {showSplash && (
        <>
          <div
            className="cursor-splash"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
            }}
          />
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="cursor-splash-ring"
              style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
              }}
            />
          ))}
        </>
      )}

      {/* Cadre de rayures diagonales */}
      {warningMode && (
        <div className="warning-stripe-frame" />
      )}

      {/* Warnings overlay - centrés */}
      {warningMode && (
        <div className="cursor-warning-container">
          {warnings.map((warning) => (
            <div
              key={warning.id}
              className={`cursor-warning-text ${warning.size}`}
            >
              {warning.text}
            </div>
          ))}
        </div>
      )}

      {/* Point principal */}
      <div
        className={dotClass}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${size}px`,
          height: `${size}px`,
          "--glitch-intensity": glitchIntensity,
        }}
      />
      {/* Couche cyan */}
      <div
        className={`${dotClass} glitch-cursor-dot-cyan`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${size}px`,
          height: `${size}px`,
          "--glitch-intensity": glitchIntensity,
        }}
      />
      {/* Couche violet */}
      <div
        className={`${dotClass} glitch-cursor-dot-red`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${size}px`,
          height: `${size}px`,
          "--glitch-intensity": glitchIntensity,
        }}
      />
    </>
  );
}

export default GlitchCursor;
