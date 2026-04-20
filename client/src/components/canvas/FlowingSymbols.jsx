import { memo } from 'react';

/**
 * FlowingSymbols - Decorative flowing symbols along the edges
 * Creates a fluid-like effect with angular shapes flowing down the page
 */
const FlowingSymbols = memo(function FlowingSymbols({ className = '' }) {
  // Symbol definitions as inline SVG paths
  const symbols = {
    x: (
      <g strokeWidth="2" strokeLinecap="square">
        <line x1="3" y1="3" x2="17" y2="17" />
        <line x1="17" y1="3" x2="3" y2="17" />
      </g>
    ),
    square: <rect x="2" y="2" width="16" height="16" fill="none" strokeWidth="2" />,
    plus: (
      <g strokeWidth="2" strokeLinecap="square">
        <line x1="10" y1="3" x2="10" y2="17" />
        <line x1="3" y1="10" x2="17" y2="10" />
      </g>
    ),
    circle: <circle cx="10" cy="10" r="7" fill="none" strokeWidth="2" />,
    dot: <circle cx="10" cy="10" r="3" />,
    star: (
      <g strokeWidth="2" strokeLinecap="square">
        <line x1="10" y1="2" x2="10" y2="18" />
        <line x1="3" y1="6" x2="17" y2="14" />
        <line x1="3" y1="14" x2="17" y2="6" />
      </g>
    ),
  };

  // Flow pattern - positions along the left and right edges
  // Each item: [type, x%, y%, size, opacity, color]
  const leftFlow = [
    ['x', 2, 8, 24, 0.06, 'lime'],
    ['square', 4, 14, 18, 0.04, 'lime'],
    ['dot', 3, 18, 12, 0.08, 'cyan'],
    ['plus', 5, 24, 20, 0.05, 'lime'],
    ['circle', 2, 32, 22, 0.04, 'cyan'],
    ['star', 4, 38, 16, 0.06, 'lime'],
    ['x', 3, 46, 20, 0.05, 'cyan'],
    ['square', 5, 52, 14, 0.04, 'lime'],
    ['dot', 2, 58, 10, 0.07, 'lime'],
    ['plus', 4, 64, 18, 0.05, 'cyan'],
    ['circle', 3, 72, 24, 0.04, 'lime'],
    ['star', 5, 78, 20, 0.06, 'cyan'],
    ['x', 2, 86, 16, 0.05, 'lime'],
    ['square', 4, 92, 22, 0.04, 'cyan'],
  ];

  const rightFlow = [
    ['square', 96, 6, 20, 0.05, 'cyan'],
    ['dot', 94, 12, 14, 0.07, 'lime'],
    ['star', 97, 18, 18, 0.05, 'cyan'],
    ['x', 95, 26, 22, 0.04, 'lime'],
    ['plus', 96, 34, 16, 0.06, 'cyan'],
    ['circle', 94, 42, 20, 0.04, 'lime'],
    ['square', 97, 48, 14, 0.05, 'cyan'],
    ['dot', 95, 56, 12, 0.08, 'lime'],
    ['x', 96, 62, 18, 0.05, 'cyan'],
    ['star', 94, 70, 24, 0.04, 'lime'],
    ['plus', 97, 76, 20, 0.06, 'cyan'],
    ['circle', 95, 84, 16, 0.05, 'lime'],
    ['square', 96, 90, 22, 0.04, 'cyan'],
    ['dot', 94, 96, 18, 0.06, 'lime'],
  ];

  const renderSymbol = ([type, x, y, size, opacity, color], index, prefix) => {
    const colorValue = color === 'lime' ? '#C2FE0B' : '#01FFFF';
    return (
      <svg
        key={`${prefix}-${index}`}
        className="absolute pointer-events-none"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          width: `${size}px`,
          height: `${size}px`,
          opacity,
          transform: 'translate(-50%, -50%)',
        }}
        viewBox="0 0 20 20"
        fill={colorValue}
        stroke={colorValue}
      >
        {symbols[type]}
      </svg>
    );
  };

  return (
    <div className={`fixed inset-0 pointer-events-none z-[1] overflow-hidden ${className}`}>
      {leftFlow.map((item, i) => renderSymbol(item, i, 'left'))}
      {rightFlow.map((item, i) => renderSymbol(item, i, 'right'))}
    </div>
  );
});

export default FlowingSymbols;
