import { memo } from 'react';

/**
 * Vrais motifs Marathon extraits des fichiers fig01-07.svg
 * Ces SVG sont les icônes authentiques du jeu Marathon
 */

// Fig01 - Triple colonnes avec U connectés
export const MotifFig01 = memo(function MotifFig01({ size = 100, color = '#C2FE0B', className = '' }) {
  const scale = size / 168;
  return (
    <svg
      width={size}
      height={size * (173/168)}
      viewBox="0 0 1680 1730"
      className={className}
      style={{ transform: `scale(${scale > 1 ? 1 : 1})` }}
    >
      <g transform="translate(0,1730) scale(1,-1)" fill={color}>
        <path d="M110 950 c0 -640 1 -672 19 -708 41 -79 115 -123 206 -123 91 0 164 44 208 126 21 39 22 52 25 467 2 352 5 428 17 438 8 6 19 9 25 5 7 -4 10 -174 10 -521 l0 -515 103 3 102 3 3 495 c1 302 -2 516 -8 550 -33 183 -255 253 -386 122 -70 -69 -68 -61 -74 -537 -5 -422 -5 -430 -25 -430 -20 0 -20 8 -23 543 l-2 542 545 0 545 0 -2 -542 c-3 -535 -3 -543 -23 -543 -20 0 -20 8 -25 435 l-5 435 -26 45 c-34 57 -53 74 -114 101 -98 43 -223 8 -279 -79 -46 -70 -47 -87 -44 -627 l3 -510 100 0 100 0 5 515 c5 507 5 515 25 515 20 0 20 -8 25 -430 4 -385 7 -434 23 -470 23 -51 42 -71 96 -107 37 -23 56 -28 107 -28 99 0 173 43 217 124 l22 41 0 665 0 665 -747 3 -748 2 0 -670z"/>
      </g>
    </svg>
  );
});

// Fig02 - Symbole de retour (S étiré)
export const MotifFig02 = memo(function MotifFig02({ size = 100, color = '#C2FE0B', className = '' }) {
  return (
    <svg
      width={size}
      height={size * (142/232)}
      viewBox="0 0 2320 1420"
      className={className}
    >
      <g transform="translate(0,1420) scale(1,-1)" fill={color}>
        <path d="M190 730 l0 -460 130 0 130 0 2 333 3 332 662 3 c365 1 677 -1 695 -6 35 -9 48 -36 28 -56 -8 -8 -168 -12 -563 -16 -542 -5 -553 -5 -592 -27 -48 -26 -116 -95 -141 -143 -13 -26 -18 -58 -19 -120 0 -73 4 -92 27 -136 34 -64 95 -118 165 -144 52 -19 77 -20 723 -20 l670 0 0 130 0 130 -654 0 c-584 0 -655 2 -667 16 -9 11 -10 20 -2 32 9 15 61 17 554 22 l544 5 53 24 c149 67 214 248 143 396 -33 70 -67 104 -137 139 l-52 26 -851 0 -851 0 0 -460z"/>
      </g>
    </svg>
  );
});

// Fig03 - Triple cercles entrelacés
export const MotifFig03 = memo(function MotifFig03({ size = 100, color = '#C2FE0B', className = '' }) {
  return (
    <svg
      width={size}
      height={size * (147/226)}
      viewBox="0 0 2260 1470"
      className={className}
    >
      <g transform="translate(0,1470) scale(1,-1)" fill={color}>
        <path d="M409 1321 c-65 -21 -133 -65 -178 -116 -37 -42 -90 -145 -119 -230 -43 -128 -46 -166 -47 -525 l0 -345 85 3 c253 9 499 146 630 349 15 23 30 40 34 36 3 -3 6 -94 6 -201 l0 -195 83 7 c125 11 212 32 302 75 136 64 242 152 322 268 l38 55 3 -196 c2 -164 5 -198 17 -203 27 -10 153 15 212 42 105 47 185 147 237 295 50 139 56 197 56 563 l0 337 -67 0 c-161 -1 -360 -75 -493 -183 -55 -45 -134 -135 -177 -203 -9 -15 -12 23 -12 184 l-1 202 -74 0 c-236 0 -508 -148 -641 -348 -15 -23 -32 -42 -36 -42 -5 0 -9 88 -9 195 l0 195 -57 -1 c-32 0 -83 -8 -114 -18z m171 -397 c0 -10 -112 -209 -141 -249 -59 -82 -189 -155 -275 -155 l-46 0 7 53 c9 71 59 172 117 233 46 49 131 100 193 115 37 9 145 11 145 3z m750 -4 c0 -6 -32 -66 -70 -135 -77 -136 -124 -186 -219 -232 -43 -21 -74 -29 -133 -32 -53 -2 -78 1 -78 8 0 14 92 181 130 236 48 70 145 134 235 156 47 11 135 10 135 -1z m704 -32 c-14 -104 -60 -193 -135 -263 -71 -67 -146 -99 -241 -103 -43 -2 -78 -1 -78 3 0 10 77 151 115 210 73 114 196 190 313 194 l32 1 -6 -42z"/>
      </g>
    </svg>
  );
});

// Fig04 - Double spirale/cornes
export const MotifFig04 = memo(function MotifFig04({ size = 100, color = '#C2FE0B', className = '' }) {
  return (
    <svg
      width={size}
      height={size * (126/183)}
      viewBox="0 0 1830 1260"
      className={className}
    >
      <g transform="translate(0,1260) scale(1,-1)" fill={color}>
        <path d="M80 1127 l0 -112 67 -13 c163 -31 296 -157 333 -314 12 -52 13 -118 2 -118 -4 0 -24 12 -43 26 -70 53 -191 97 -301 110 l-58 6 0 -114 0 -114 63 -11 c181 -31 318 -173 343 -356 l7 -47 113 0 114 0 0 33 c1 165 177 352 353 373 l57 7 0 113 c0 129 9 120 -96 105 -73 -11 -199 -60 -259 -101 -24 -16 -46 -30 -49 -30 -13 0 -5 101 13 152 59 171 218 288 392 288 161 0 319 -106 385 -260 17 -40 20 -78 24 -360 l5 -315 113 -3 113 -3 -3 333 c-4 371 -5 374 -83 513 -125 224 -407 360 -651 315 -151 -28 -248 -79 -359 -189 l-71 -71 -82 81 c-65 64 -98 88 -164 118 -80 38 -200 71 -252 71 l-26 0 0 -113z"/>
      </g>
    </svg>
  );
});

// Fig05 - Double arche avec barre
export const MotifFig05 = memo(function MotifFig05({ size = 100, color = '#C2FE0B', className = '' }) {
  return (
    <svg
      width={size}
      height={size * (132/180)}
      viewBox="0 0 1800 1320"
      className={className}
    >
      <g transform="translate(0,1320) scale(1,-1)" fill={color}>
        <path d="M64 1247 c-2 -7 -3 -74 -2 -148 l3 -134 835 0 835 0 0 145 0 145 -833 3 c-678 2 -834 0 -838 -11z"/>
        <path d="M68 804 c-5 -4 -8 -70 -8 -146 0 -104 3 -138 13 -138 59 -1 161 -26 213 -51 70 -35 159 -120 192 -185 26 -50 52 -151 52 -198 l0 -36 145 0 145 0 0 50 c0 139 -73 332 -170 448 -88 105 -214 188 -351 230 -71 22 -219 39 -231 26z"/>
        <path d="M1600 803 c-99 -12 -235 -69 -331 -139 -167 -122 -288 -351 -289 -546 l0 -68 145 0 145 0 0 49 c0 112 71 252 164 321 79 59 130 80 222 92 l85 11 -3 141 -3 141 -50 1 c-27 1 -66 -1 -85 -3z"/>
      </g>
    </svg>
  );
});

// Fig06 - Double flèche/zigzag
export const MotifFig06 = memo(function MotifFig06({ size = 100, color = '#C2FE0B', className = '' }) {
  return (
    <svg
      width={size}
      height={size * (183/177)}
      viewBox="0 0 1770 1830"
      className={className}
    >
      <g transform="translate(0,1830) scale(1,-1)" fill={color}>
        <path d="M137 1654 c-3 -4 -6 -173 -7 -376 l0 -368 86 -63 c48 -34 139 -100 203 -147 64 -48 178 -130 254 -184 75 -55 135 -102 131 -105 -3 -3 -155 -8 -337 -11 l-332 -5 -3 -114 c-2 -85 1 -117 10 -123 19 -12 1486 -10 1490 2 2 5 1 177 -2 382 l-5 372 -120 88 c-66 49 -154 113 -195 142 -267 192 -334 242 -338 254 -3 9 67 12 327 12 l331 0 0 125 0 125 -743 0 c-409 0 -746 -3 -750 -6z m793 -252 c0 -4 -72 -60 -159 -123 -88 -63 -160 -116 -160 -119 -1 -6 29 -28 282 -212 59 -43 158 -115 220 -160 61 -45 156 -113 209 -152 249 -181 298 -219 292 -228 -7 -11 -761 -5 -771 5 -2 3 68 57 157 122 88 64 158 121 155 126 -3 5 -43 35 -88 67 -45 32 -163 118 -262 190 -99 72 -220 160 -270 196 -287 208 -380 278 -383 287 -2 5 146 9 387 9 215 0 391 -4 391 -8z"/>
      </g>
    </svg>
  );
});

// Fig07 - Double flèche opposée
export const MotifFig07 = memo(function MotifFig07({ size = 100, color = '#C2FE0B', className = '' }) {
  return (
    <svg
      width={size}
      height={size * (172/158)}
      viewBox="0 0 1580 1720"
      className={className}
    >
      <g transform="translate(0,1720) scale(1,-1)" fill={color}>
        <path d="M445 1628 c-45 -16 -93 -55 -112 -91 -9 -18 -22 -61 -28 -97 -7 -36 -22 -112 -35 -170 -34 -162 -40 -207 -31 -238 7 -23 116 -169 202 -270 10 -12 19 -24 19 -26 0 -2 -75 -67 -167 -144 -93 -77 -175 -153 -184 -168 -18 -33 -66 -260 -57 -269 5 -5 182 137 368 295 44 37 222 187 310 260 25 21 119 99 210 174 91 74 174 144 185 154 11 10 86 74 167 141 166 137 183 156 199 215 18 68 48 221 43 225 -2 2 -12 -2 -21 -11 -86 -72 -266 -220 -298 -243 -22 -17 -49 -40 -60 -51 -17 -19 -310 -264 -587 -493 -49 -40 -92 -70 -96 -67 -3 4 9 82 27 174 57 288 60 301 93 338 59 67 67 69 336 72 133 2 242 6 242 8 0 3 -45 62 -101 132 -70 88 -112 132 -137 144 -31 15 -68 17 -247 17 -119 0 -223 -5 -240 -11z"/>
        <path d="M1115 998 c-3 -13 -23 -115 -45 -227 -48 -242 -60 -269 -135 -317 -26 -17 -56 -20 -278 -24 l-249 -5 103 -130 c66 -83 117 -136 139 -147 30 -15 65 -18 240 -18 119 0 222 5 245 11 24 7 57 28 81 53 37 37 43 50 63 141 71 323 78 376 62 411 -14 32 -202 273 -213 274 -4 0 -10 -10 -13 -22z"/>
      </g>
    </svg>
  );
});

// Composant pour afficher tous les motifs
export const AllMarathonMotifs = memo(function AllMarathonMotifs({
  size = 60,
  color = '#C2FE0B',
  gap = 24,
  className = ''
}) {
  return (
    <div className={`flex flex-wrap items-center justify-center ${className}`} style={{ gap }}>
      <MotifFig01 size={size} color={color} />
      <MotifFig02 size={size} color={color} />
      <MotifFig03 size={size} color={color} />
      <MotifFig04 size={size} color={color} />
      <MotifFig05 size={size} color={color} />
      <MotifFig06 size={size} color={color} />
      <MotifFig07 size={size} color={color} />
    </div>
  );
});

// Motif aléatoire
export const RandomMarathonMotif = memo(function RandomMarathonMotif({
  size = 100,
  color = '#C2FE0B',
  className = ''
}) {
  const motifs = [MotifFig01, MotifFig02, MotifFig03, MotifFig04, MotifFig05, MotifFig06, MotifFig07];
  const Motif = motifs[Math.floor(Math.random() * motifs.length)];
  return <Motif size={size} color={color} className={className} />;
});

export default {
  Fig01: MotifFig01,
  Fig02: MotifFig02,
  Fig03: MotifFig03,
  Fig04: MotifFig04,
  Fig05: MotifFig05,
  Fig06: MotifFig06,
  Fig07: MotifFig07,
  All: AllMarathonMotifs,
  Random: RandomMarathonMotif,
};
