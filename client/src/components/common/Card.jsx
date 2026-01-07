function Card({ children, className = "", hover = false, onClick, ...props }) {
  const baseStyles =
    "bg-gradient-to-br from-surface-light to-surface border border-border rounded-xl";

  const hoverStyles = hover
    ? "transition-all duration-300 hover:border-primary hover:shadow-glow-lg hover:-translate-y-1"
    : "";

  const focusStyles = onClick
    ? "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
    : "";

  const handleKeyDown = (e) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick(e);
    }
  };

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
}

function CardHeader({ children, className = "" }) {
  return (
    <div className={`p-6 border-b border-border ${className}`}>{children}</div>
  );
}

function CardContent({ children, className = "" }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

Card.Header = CardHeader;
Card.Content = CardContent;

export default Card;
