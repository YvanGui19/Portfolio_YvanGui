import React, { memo } from 'react';
import { Designation } from './DataReadout';

/**
 * FrameWrapper - Conteneur avec crochets aux coins style Marathon
 *
 * @param {React.ReactNode} children - Contenu du frame
 * @param {string} designation - Code de designation (ex: "SEC.01", "MISSION.001")
 * @param {string} designationPosition - Position du code: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
 * @param {string} color - Couleur du theme: 'lime' | 'cyan' | 'violet' | 'slate'
 * @param {string} corners - Configuration des coins: 'default' (tl+br) | 'all' | 'top' | 'bottom' | 'left' | 'right'
 * @param {string} size - Taille des crochets: 'sm' | 'md' | 'lg'
 * @param {string} className - Classes CSS additionnelles
 * @param {boolean} glow - Ajouter un effet de lueur
 * @param {string} background - Type de fond: 'none' | 'subtle' | 'grid' | 'diagonal'
 */
const FrameWrapper = memo(function FrameWrapper({
  children,
  designation,
  designationPosition = 'top-left',
  color = 'lime',
  corners = 'default',
  size = 'md',
  className = '',
  glow = false,
  background = 'none',
}) {
  const colorMap = {
    lime: {
      border: 'border-lime',
      text: 'text-lime',
      glow: 'shadow-[0_0_20px_rgba(194,254,11,0.15)]',
      bg: 'rgba(194, 254, 11, 0.03)',
    },
    cyan: {
      border: 'border-cyan',
      text: 'text-cyan',
      glow: 'shadow-[0_0_20px_rgba(1,255,255,0.15)]',
      bg: 'rgba(1, 255, 255, 0.03)',
    },
    violet: {
      border: 'border-violet',
      text: 'text-violet',
      glow: 'shadow-[0_0_20px_rgba(167,139,250,0.15)]',
      bg: 'rgba(167, 139, 250, 0.03)',
    },
    slate: {
      border: 'border-slate',
      text: 'text-slate',
      glow: 'shadow-[0_0_20px_rgba(71,85,105,0.15)]',
      bg: 'rgba(71, 85, 105, 0.03)',
    },
  };

  const sizeMap = {
    sm: { bracket: 24, padding: 8, border: 1 },
    md: { bracket: 40, padding: 12, border: 2 },
    lg: { bracket: 56, padding: 16, border: 2 },
  };

  const { bracket, padding, border } = sizeMap[size];
  const colors = colorMap[color];

  const cornerStyle = {
    position: 'absolute',
    width: `${bracket}px`,
    height: `${bracket}px`,
    pointerEvents: 'none',
  };

  const borderStyle = `${border}px solid`;

  // Determine which corners to show
  const showCorners = {
    tl: ['default', 'all', 'top', 'left'].includes(corners),
    tr: ['all', 'top', 'right'].includes(corners),
    bl: ['all', 'bottom', 'left'].includes(corners),
    br: ['default', 'all', 'bottom', 'right'].includes(corners),
  };

  // Background patterns
  const backgroundStyles = {
    none: {},
    subtle: { backgroundColor: colors.bg },
    grid: {
      backgroundColor: colors.bg,
      backgroundImage: `
        linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
      `,
      backgroundSize: '20px 20px',
    },
    diagonal: {
      backgroundColor: colors.bg,
      backgroundImage: `repeating-linear-gradient(
        45deg,
        transparent,
        transparent 10px,
        rgba(255,255,255,0.02) 10px,
        rgba(255,255,255,0.02) 11px
      )`,
    },
  };

  // Designation position styles
  const designationPositionStyles = {
    'top-left': 'top-0 left-3 -translate-y-1/2',
    'top-right': 'top-0 right-3 -translate-y-1/2',
    'bottom-left': 'bottom-0 left-3 translate-y-1/2',
    'bottom-right': 'bottom-0 right-3 translate-y-1/2',
  };

  return (
    <div
      className={`relative ${glow ? colors.glow : ''} ${className}`}
      style={{ padding: `${padding}px`, ...backgroundStyles[background] }}
    >
      {/* Designation badge */}
      {designation && (
        <div
          className={`absolute ${designationPositionStyles[designationPosition]} bg-dark-navy px-2 z-10`}
        >
          <Designation code={designation} color={color} />
        </div>
      )}

      {/* Corner brackets */}
      {showCorners.tl && (
        <div
          style={{
            ...cornerStyle,
            top: 0,
            left: 0,
            borderLeft: borderStyle,
            borderTop: borderStyle,
          }}
          className={colors.border}
        />
      )}

      {showCorners.tr && (
        <div
          style={{
            ...cornerStyle,
            top: 0,
            right: 0,
            borderRight: borderStyle,
            borderTop: borderStyle,
          }}
          className={colors.border}
        />
      )}

      {showCorners.bl && (
        <div
          style={{
            ...cornerStyle,
            bottom: 0,
            left: 0,
            borderLeft: borderStyle,
            borderBottom: borderStyle,
          }}
          className={colors.border}
        />
      )}

      {showCorners.br && (
        <div
          style={{
            ...cornerStyle,
            bottom: 0,
            right: 0,
            borderRight: borderStyle,
            borderBottom: borderStyle,
          }}
          className={colors.border}
        />
      )}

      {/* Content */}
      {children}
    </div>
  );
});

/**
 * SectionFrame - Section avec header et designation
 */
export const SectionFrame = memo(function SectionFrame({
  children,
  title,
  designation,
  color = 'lime',
  className = '',
}) {
  const colorClasses = {
    lime: 'border-lime/20 text-lime',
    cyan: 'border-cyan/20 text-cyan',
    violet: 'border-violet/20 text-violet',
    slate: 'border-slate/30 text-slate',
  };

  return (
    <div className={`${className}`}>
      {/* Header bar */}
      <div className={`flex items-center gap-3 pb-3 mb-4 border-b ${colorClasses[color]}`}>
        {designation && <Designation code={designation} color={color} />}
        {title && (
          <h3 className="font-condensed text-sm font-semibold tracking-wider uppercase text-white">
            {title}
          </h3>
        )}
      </div>

      {/* Content */}
      {children}
    </div>
  );
});

/**
 * DataPanel - Panneau de donnees avec bordure complete
 */
export const DataPanel = memo(function DataPanel({
  children,
  title,
  className = '',
  color = 'lime',
}) {
  const colorClasses = {
    lime: 'border-lime/30',
    cyan: 'border-cyan/30',
    violet: 'border-violet/30',
    slate: 'border-slate/40',
  };

  const bgClasses = {
    lime: 'bg-lime/5',
    cyan: 'bg-cyan/5',
    violet: 'bg-violet/5',
    slate: 'bg-slate/5',
  };

  return (
    <div
      className={`
        border ${colorClasses[color]} ${bgClasses[color]}
        ${className}
      `}
    >
      {title && (
        <div className={`px-4 py-2 border-b ${colorClasses[color]}`}>
          <span className="font-mono text-[0.65rem] text-grey uppercase tracking-wider">
            {title}
          </span>
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
});

/**
 * TerminalBox - Boite style terminal avec prefixe
 */
export const TerminalBox = memo(function TerminalBox({
  children,
  prompt = '>',
  className = '',
}) {
  return (
    <div
      className={`
        bg-black/30 border border-slate/20
        p-4 font-mono text-sm
        ${className}
      `}
    >
      <span className="text-lime mr-2">{prompt}</span>
      <span className="text-off-white">{children}</span>
    </div>
  );
});

export default FrameWrapper;
