// Marathon Design Components
// Inspired by Marathon (Bungie 2026) visual style

// Core visual components
export { default as MotifSVG } from './MotifSVG';
export { default as MarathonSymbolGrid } from './MarathonSymbolGrid';
export { default as DiagonalStripes, StripeHeader, StripeBar } from './DiagonalStripes';
export { default as CrosshairFrame, CrosshairMark } from './CrosshairFrame';
export { default as RadialHUD, RadialHUDMini } from './RadialHUD';

// Dot Grid pattern
export { default as DotGrid } from './DotGrid';

// Geometric patterns
export {
  default as GeometricPattern,
  TessellatedTriangles,
  CrossDiagonals,
  AbstractShape,
  GeometricComposition,
} from './GeometricPattern';

// Complex patterns (tessellations, HUD, data grids)
export {
  default as ComplexPatterns,
  ParallelogramTessellation,
  CrosshairPattern,
  CornerBrackets,
  TriangularMesh,
  HUDComposition,
  DataGrid,
  HexGrid,
} from './ComplexPatterns';

// Symbol compositions
export {
  default as SymbolComposition,
  VerticalStack,
  HorizontalRow,
  SymbolGrid,
  HeroComposition,
  SectionAccent,
  FooterComposition,
} from './SymbolComposition';

// Individual motifs
export {
  default as SymbolMotifs,
  MotifArches,
  MotifReturn,
  MotifWaves,
  MotifHorns,
  MotifArch,
  MotifParallel,
  MotifHexSlash,
  AllMotifs,
  RandomMotif,
} from './SymbolMotifs';

export {
  default as GlitchText,
  TypewriterText,
  FlickerText,
  DataCounter,
} from './GlitchText';

export {
  default as MatrixRain,
  SymbolCloud,
  GridPattern,
} from './MatrixRain';

export {
  default as DataPanel,
  AlertBar,
  TechLabel,
  CoordinateDisplay,
  StatusIndicator,
  ProgressBar,
} from './DataPanel';
