import { memo, useCallback } from "react";

// VerrouPass hover glow effects
const hoverColorStyles = {
  lime: "hover:border-lime/40 hover:shadow-[0_0_20px_rgba(194,254,11,0.15)]",
  cyan: "hover:border-cyan/40 hover:shadow-[0_0_20px_rgba(1,255,255,0.15)]",
  violet: "hover:border-violet/40 hover:shadow-[0_0_20px_rgba(167,139,250,0.15)]",
};

const focusColorStyles = {
  lime: "focus:ring-lime",
  cyan: "focus:ring-cyan",
  violet: "focus:ring-violet",
};

const Card = memo(function Card({ children, className = "", hover = false, hoverColor = "lime", onClick, ...props }) {
  // VerrouPass style - mid-navy background with lime/20 border
  const baseStyles =
    "bg-mid-navy border border-lime/20";

  const hoverStyles = hover
    ? `transition-all duration-300 ${hoverColorStyles[hoverColor] || hoverColorStyles.lime} hover:-translate-y-1`
    : "";

  const focusStyles = onClick
    ? `focus:outline-none focus:ring-2 ${focusColorStyles[hoverColor] || focusColorStyles.lime} focus:ring-offset-2 focus:ring-offset-dark-navy`
    : "";

  const handleKeyDown = useCallback((e) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick(e);
    }
  }, [onClick]);

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${focusStyles} ${className}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
      {...props}
    >
      {children}
    </div>
  );
});

const CardHeader = memo(function CardHeader({ children, className = "" }) {
  return (
    <div className={`p-6 border-b border-white/5 ${className}`}>{children}</div>
  );
});

const CardContent = memo(function CardContent({ children, className = "" }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
});

Card.Header = CardHeader;
Card.Content = CardContent;

export default Card;
