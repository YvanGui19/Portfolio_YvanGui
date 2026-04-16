import { useState, useEffect, useRef, useCallback } from "react";

// Symboles Marathon pour l'effet de scramble
const SCRAMBLE_CHARS = "É⁖⁘⁛⁜⇱⇲⊡⊹⋰⋱░▒▣<>/\\|-";

function ScrambleText({
  text,
  className = "",
  as: Tag = "span",
  autoGlitch = false,
  glitchInterval = 10000,
  glitchDuration = 3000
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isAutoGlitching, setIsAutoGlitching] = useState(false);
  const intervalRef = useRef(null);
  const frameRef = useRef(0);
  const autoGlitchRef = useRef(null);

  // Auto glitch effect
  useEffect(() => {
    if (!autoGlitch) return;

    const startGlitch = () => {
      setIsAutoGlitching(true);
      setTimeout(() => {
        setIsAutoGlitching(false);
      }, glitchDuration);
    };

    // Start first glitch after interval
    autoGlitchRef.current = setInterval(startGlitch, glitchInterval);

    return () => {
      if (autoGlitchRef.current) {
        clearInterval(autoGlitchRef.current);
      }
    };
  }, [autoGlitch, glitchInterval, glitchDuration]);

  const isActive = isHovering || isAutoGlitching;

  const scramble = useCallback(() => {
    if (!isActive) {
      setDisplayText(text);
      return;
    }

    const textLength = text.length;
    const revealSpeed = 2; // Nombre de frames pour révéler un caractère
    const totalFrames = textLength * revealSpeed + 10; // Frames supplémentaires pour le scramble final

    frameRef.current += 1;

    // Calculer combien de caractères sont révélés
    const revealedCount = Math.floor(frameRef.current / revealSpeed);

    let result = "";
    for (let i = 0; i < textLength; i++) {
      if (text[i] === " ") {
        // Garder les espaces
        result += " ";
      } else if (i < revealedCount) {
        // Caractère révélé
        result += text[i];
      } else {
        // Caractère en scramble
        result += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
    }

    setDisplayText(result);

    // Réinitialiser quand l'animation est terminée
    if (frameRef.current >= totalFrames) {
      setDisplayText(text);
      frameRef.current = 0;
    }
  }, [isActive, text]);

  useEffect(() => {
    if (isActive) {
      frameRef.current = 0;
      intervalRef.current = setInterval(scramble, 40);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setDisplayText(text);
      frameRef.current = 0;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, scramble, text]);

  return (
    <Tag
      className={`scramble-text ${isActive ? "scramble-active" : ""} ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      data-text={text}
    >
      {displayText}
    </Tag>
  );
}

export default ScrambleText;
