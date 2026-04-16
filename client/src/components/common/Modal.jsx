import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiX } from "react-icons/hi";

const variantColors = {
  default: {
    border: "border-white/20",
    accent: "border-t-cyan",
    title: "text-cyan",
    tag: "text-cyan/60",
  },
  danger: {
    border: "border-red/30",
    accent: "border-t-red",
    title: "text-red",
    tag: "text-red/60",
  },
  success: {
    border: "border-lime/30",
    accent: "border-t-lime",
    title: "text-lime",
    tag: "text-lime/60",
  },
  warning: {
    border: "border-orange/30",
    accent: "border-t-orange",
    title: "text-orange",
    tag: "text-orange/60",
  },
  info: {
    border: "border-violet/30",
    accent: "border-t-violet",
    title: "text-violet",
    tag: "text-violet/60",
  },
};

function Modal({
  isOpen,
  onClose,
  title,
  tag,
  children,
  actions,
  variant = "default",
  size = "md",
  closeOnOverlay = true,
  showClose = true,
}) {
  const colors = variantColors[variant] || variantColors.default;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-4xl",
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeOnOverlay ? onClose : undefined}
            className="absolute inset-0 bg-dark-navy/90 backdrop-blur-sm"
          />

          {/* Scanlines effect on overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`relative w-full ${sizeClasses[size]}`}
          >
            {/* Corner decorations */}
            <div className={`absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 ${colors.accent} border-l-white/20`} />
            <div className={`absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 ${colors.accent} border-r-white/20`} />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-white/20" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-white/20" />

            {/* Main container */}
            <div className={`border ${colors.border} bg-dark-navy shadow-2xl`}>
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-black/30">
                <div>
                  {tag && (
                    <div className={`font-mono text-[0.65rem] ${colors.tag} tracking-[0.2em] uppercase mb-1`}>
                      // {tag}
                    </div>
                  )}
                  <h2 className={`font-mono text-[1rem] ${colors.title} font-medium tracking-wide`}>
                    {title}
                  </h2>
                </div>
                {showClose && (
                  <button
                    onClick={onClose}
                    className="p-2 text-grey hover:text-off-white hover:bg-white/10 transition-colors cursor-pointer"
                    aria-label="Fermer la modal"
                  >
                    <HiX className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Content */}
              <div className="px-5 py-5 font-mono text-[0.85rem] text-grey leading-relaxed">
                {children}
              </div>

              {/* Actions */}
              {actions && (
                <div className="flex justify-end gap-3 px-5 py-4 border-t border-white/10 bg-black/20">
                  {actions}
                </div>
              )}
            </div>

            {/* Glitch line decoration */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1">
              <div className="w-8 h-px bg-white/20" />
              <div className={`w-2 h-2 border ${colors.border} rotate-45`} />
              <div className="w-8 h-px bg-white/20" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Composant Button pour les actions de la modal
function ModalButton({ onClick, variant = "default", children, disabled = false }) {
  const variants = {
    default: "border border-white/20 text-grey hover:text-off-white hover:border-white/40",
    primary: "bg-cyan text-dark-navy font-semibold hover:bg-cyan/90",
    success: "bg-lime text-dark-navy font-semibold hover:bg-lime/90",
    danger: "bg-red text-white font-semibold hover:bg-red/90",
    warning: "bg-orange text-dark-navy font-semibold hover:bg-orange/90",
    ghost: "text-grey hover:text-off-white hover:bg-white/10",
  };

  // Style avec coins coupés pour danger
  const clipStyle = variant === "danger" ? {
    clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))"
  } : {};

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={clipStyle}
      className={`px-5 py-2.5 font-mono text-[0.75rem] tracking-wider uppercase transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]}`}
    >
      {children}
    </button>
  );
}

// Hook pour utiliser les modales de confirmation
export function useConfirmModal() {
  // Ce hook peut être étendu pour gérer l'état des modales
  return {
    Modal,
    ModalButton,
  };
}

export { Modal, ModalButton };
export default Modal;
