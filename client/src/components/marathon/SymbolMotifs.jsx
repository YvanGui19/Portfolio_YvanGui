import { memo } from 'react';

/**
 * SymbolMotifs - Les 7 motifs authentiques Marathon (fig01-07)
 * Reproduits fidèlement depuis la charte graphique
 */

const COLORS = {
  lime: '#C2FE0B',
  cream: '#E8E4DC',
  white: '#FFFFFF',
  cyan: '#00F0FF',
};

/**
 * Fig01 - Triple colonnes avec U connectés
 * Barre horizontale en haut, 3 colonnes verticales, 2 U arrondis en bas
 */
export const MotifArches = memo(function MotifArches({
  size = 100,
  color = 'cream',
  className = ''
}) {
  const c = COLORS[color] || color;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      {/* Barre horizontale en haut */}
      <rect x="8" y="8" width="84" height="10" rx="5" fill={c} />

      {/* Colonne gauche */}
      <rect x="8" y="8" width="10" height="60" fill={c} />

      {/* Colonne centrale */}
      <rect x="45" y="8" width="10" height="60" fill={c} />

      {/* Colonne droite */}
      <rect x="82" y="8" width="10" height="60" fill={c} />

      {/* U gauche (connecte colonne gauche et centrale) */}
      <path
        d="M8 58 L8 75 Q8 92, 25 92 L30 92 Q47 92, 47 75 L47 58"
        fill="none"
        stroke={c}
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* U droit (connecte colonne centrale et droite) */}
      <path
        d="M53 58 L53 75 Q53 92, 70 92 L75 92 Q92 92, 92 75 L92 58"
        fill="none"
        stroke={c}
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

/**
 * Fig02 - Symbole de retour
 * Ligne horizontale en haut, courbe à droite vers le bas, ligne horizontale en bas
 */
export const MotifReturn = memo(function MotifReturn({
  size = 100,
  color = 'cream',
  className = ''
}) {
  const c = COLORS[color] || color;
  return (
    <svg width={size} height={size * 0.55} viewBox="0 0 120 66" className={className}>
      <path
        d="M8 12 L75 12 Q108 12, 108 38 Q108 58, 75 58 L8 58"
        fill="none"
        stroke={c}
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

/**
 * Fig03 - Triple S entrelacé (tresse)
 * 3 formes en S épaisses qui s'entrecroisent
 */
export const MotifWaves = memo(function MotifWaves({
  size = 100,
  color = 'cream',
  className = ''
}) {
  const c = COLORS[color] || color;
  return (
    <svg width={size} height={size * 0.65} viewBox="0 0 100 65" className={className}>
      {/* S1 - gauche */}
      <path
        d="M0 8 Q8 0, 18 8 Q32 20, 32 32 Q32 45, 18 57 Q8 65, 0 57"
        fill={c}
      />
      <path
        d="M0 8 L18 32 L0 57"
        fill={c}
      />

      {/* S2 - centre */}
      <path
        d="M33 8 Q41 0, 51 8 Q65 20, 65 32 Q65 45, 51 57 Q41 65, 33 57"
        fill={c}
      />
      <path
        d="M33 8 L51 32 L33 57"
        fill={c}
      />

      {/* S3 - droite */}
      <path
        d="M66 8 Q74 0, 84 8 Q98 20, 98 32 Q98 45, 84 57 Q74 65, 66 57"
        fill={c}
      />
      <path
        d="M66 8 L84 32 L66 57"
        fill={c}
      />
    </svg>
  );
});

/**
 * Fig04 - Cornes / Y
 * Deux branches courbées partant du centre bas vers le haut
 */
export const MotifHorns = memo(function MotifHorns({
  size = 100,
  color = 'cream',
  className = ''
}) {
  const c = COLORS[color] || color;
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 100 70" className={className}>
      {/* Branche gauche - courbe vers l'extérieur en montant */}
      <path
        d="M50 70 Q50 45, 25 25 Q10 12, 5 5"
        fill="none"
        stroke={c}
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Branche droite - courbe vers l'extérieur en montant */}
      <path
        d="M50 70 Q50 45, 75 25 Q90 12, 95 5"
        fill="none"
        stroke={c}
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

/**
 * Fig05 - Rectangle + double arche
 * Rectangle plein en haut, 2 arches séparées en dessous (ouverture vers le bas)
 */
export const MotifArch = memo(function MotifArch({
  size = 100,
  color = 'cream',
  className = ''
}) {
  const c = COLORS[color] || color;
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 100 70" className={className}>
      {/* Rectangle plein en haut */}
      <rect x="5" y="5" width="90" height="20" fill={c} />

      {/* Arche gauche (U inversé) */}
      <path
        d="M10 70 L10 45 Q10 28, 27 28 Q44 28, 44 45 L44 70"
        fill="none"
        stroke={c}
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Arche droite (U inversé) */}
      <path
        d="M56 70 L56 45 Q56 28, 73 28 Q90 28, 90 45 L90 70"
        fill="none"
        stroke={c}
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

/**
 * Fig06 - Double parallélogramme avec barres
 * Barres horizontales haut et bas + 2 parallélogrammes inclinés
 */
export const MotifParallel = memo(function MotifParallel({
  size = 100,
  color = 'cream',
  className = ''
}) {
  const c = COLORS[color] || color;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      {/* Barre horizontale en haut */}
      <rect x="5" y="5" width="90" height="8" fill={c} />

      {/* Barre horizontale en bas */}
      <rect x="5" y="87" width="90" height="8" fill={c} />

      {/* Parallélogramme gauche (incliné vers la droite) */}
      <polygon points="18,87 38,13 58,13 38,87" fill={c} />

      {/* Parallélogramme droit (incliné vers la droite) */}
      <polygon points="42,87 62,13 82,13 62,87" fill={c} />
    </svg>
  );
});

/**
 * Fig07 - Hexagone barré
 * Hexagone allongé verticalement avec diagonale
 */
export const MotifHexSlash = memo(function MotifHexSlash({
  size = 100,
  color = 'cream',
  className = ''
}) {
  const c = COLORS[color] || color;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      {/* Hexagone allongé verticalement */}
      <polygon
        points="50,4 88,22 88,78 50,96 12,78 12,22"
        fill="none"
        stroke={c}
        strokeWidth="10"
        strokeLinejoin="round"
      />
      {/* Barre diagonale (bas-gauche vers haut-droite) */}
      <line
        x1="20" y1="80"
        x2="80" y2="20"
        stroke={c}
        strokeWidth="10"
        strokeLinecap="round"
      />
    </svg>
  );
});

/**
 * Composant qui affiche tous les motifs
 */
export const AllMotifs = memo(function AllMotifs({
  size = 60,
  color = 'cream',
  gap = 16,
  className = '',
}) {
  return (
    <div className={`flex flex-wrap items-center ${className}`} style={{ gap }}>
      <MotifArches size={size} color={color} />
      <MotifReturn size={size} color={color} />
      <MotifWaves size={size} color={color} />
      <MotifHorns size={size} color={color} />
      <MotifArch size={size} color={color} />
      <MotifParallel size={size} color={color} />
      <MotifHexSlash size={size} color={color} />
    </div>
  );
});

/**
 * Motif aléatoire
 */
export const RandomMotif = memo(function RandomMotif({
  size = 100,
  color = 'cream',
  className = '',
}) {
  const motifs = [
    MotifArches,
    MotifReturn,
    MotifWaves,
    MotifHorns,
    MotifArch,
    MotifParallel,
    MotifHexSlash,
  ];
  const Motif = motifs[Math.floor(Math.random() * motifs.length)];
  return <Motif size={size} color={color} className={className} />;
});

export default {
  Arches: MotifArches,
  Return: MotifReturn,
  Waves: MotifWaves,
  Horns: MotifHorns,
  Arch: MotifArch,
  Parallel: MotifParallel,
  HexSlash: MotifHexSlash,
  All: AllMotifs,
  Random: RandomMotif,
};
