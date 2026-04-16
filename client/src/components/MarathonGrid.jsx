import { memo, useMemo } from "react";

// Grille simple avec densité uniforme
const SymbolBlock = memo(function SymbolBlock({
  rows,
  cols,
  symbols,
  density = 1,
  size = "text-xs",
  opacity = 1,
  className = ""
}) {
  const cells = useMemo(() => {
    const items = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (Math.random() < density) {
          items.push({
            id: `${r}-${c}`,
            symbol: symbols[Math.floor(Math.random() * symbols.length)],
            row: r,
            col: c,
          });
        }
      }
    }
    return items;
  }, [rows, cols, symbols, density]);

  return (
    <div
      className={`grid font-mono leading-none ${size} ${className}`}
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        opacity,
      }}
    >
      {cells.map((cell) => (
        <span
          key={cell.id}
          className="flex items-center justify-center"
          style={{ gridRow: cell.row + 1, gridColumn: cell.col + 1 }}
        >
          {cell.symbol}
        </span>
      ))}
    </div>
  );
});

// Composition principale style Marathon
function MarathonGrid({ className = "" }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none text-lime ${className}`}>

      {/* Bloc dense - haut droite */}
      <div className="absolute top-[5%] right-[3%] w-[25%] h-[30%]">
        <SymbolBlock rows={10} cols={10} symbols={["✖", "◎", "□", "▣"]} density={0.9} size="text-sm" />
      </div>

      {/* Colonne dense - extrême droite */}
      <div className="absolute top-[15%] right-0 w-[8%] h-[60%]">
        <SymbolBlock rows={20} cols={3} symbols={["✖", "□", "◎"]} density={1} size="text-base" />
      </div>

      {/* Bloc moyen - centre droite */}
      <div className="absolute top-[40%] right-[15%] w-[20%] h-[25%]">
        <SymbolBlock rows={8} cols={8} symbols={["×", "+", "◎", "□"]} density={0.7} size="text-xs" />
      </div>

      {/* Points épars - haut gauche */}
      <div className="absolute top-[10%] left-[10%] w-[20%] h-[25%]">
        <SymbolBlock rows={8} cols={8} symbols={["·", "·", "+"]} density={0.3} size="text-xs" opacity={0.4} />
      </div>

      {/* Ligne horizontale - bas */}
      <div className="absolute bottom-[10%] right-[10%] w-[35%] h-[8%]">
        <SymbolBlock rows={2} cols={14} symbols={["□", "◎", "✖", "▣"]} density={0.85} size="text-sm" />
      </div>

      {/* Bloc épars - centre gauche */}
      <div className="absolute top-[45%] left-[5%] w-[18%] h-[30%]">
        <SymbolBlock rows={10} cols={6} symbols={["·", "+", "×"]} density={0.25} size="text-xs" opacity={0.35} />
      </div>

      {/* Petits accents - dispersés */}
      <div className="absolute top-[70%] right-[40%] w-[12%] h-[15%]">
        <SymbolBlock rows={4} cols={5} symbols={["⊕", "⦿", "▣"]} density={0.6} size="text-xs" opacity={0.7} />
      </div>

    </div>
  );
}

export default memo(MarathonGrid);
