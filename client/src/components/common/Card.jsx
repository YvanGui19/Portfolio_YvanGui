import { memo, useCallback } from "react";

// Couleur de hover unifiée lime
const hoverColorStyles = {
  lime: "hover:border-lime/30 hover:shadow-[0_0_20px_rgba(194,254,11,0.1)]",
  cyan: "hover:border-lime/30 hover:shadow-[0_0_20px_rgba(194,254,11,0.1)]",
  violet: "hover:border-lime/30 hover:shadow-[0_0_20px_rgba(194,254,11,0.1)]",
};

const focusColorStyles = {
  lime: "focus:ring-lime",
  cyan: "focus:ring-lime",
  violet: "focus:ring-lime",
};

const Card = memo(function Card({ children, className = "", hover = false, hoverColor = "lime", onClick, ...props }) {
  // Marathon style - no rounded corners, subtle border
  const baseStyles =
    "bg-mid-navy border border-white/5";

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
