/**
 * Marathon-style decorative letters (SVG)
 * Original letterforms from the portfolio-marathon-v7(3).html mockup
 * Only M, R, H are used - they cycle based on index
 */

// Original Marathon M - vertical columns with organic connections
export function LetterM({ className = "", style = {} }) {
  return (
    <svg className={className} style={style} viewBox="0 0 168 173" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(0,173) scale(0.1,-0.1)">
        <path d="M110 950 c0 -640 1 -672 19 -708 41 -79 115 -123 206 -123 91 0 164 44 208 126 21 39 22 52 25 467 2 352 5 428 17 438 8 6 19 9 25 5 7 -4 10 -174 10 -521 l0 -515 103 3 102 3 3 495 c1 302 -2 516 -8 550 -33 183 -255 253 -386 122 -70 -69 -68 -61 -74 -537 -5 -422 -5 -430 -25 -430 -20 0 -20 8 -23 543 l-2 542 545 0 545 0 -2 -542 c-3 -535 -3 -543 -23 -543 -20 0 -20 8 -25 435 l-5 435 -26 45 c-34 57 -53 74 -114 101 -98 43 -223 8 -279 -79 -46 -70 -47 -87 -44 -627 l3 -510 100 0 100 0 5 515 c5 507 5 515 25 515 20 0 20 -8 25 -430 4 -385 7 -434 23 -470 23 -51 42 -71 96 -107 37 -23 56 -28 107 -28 99 0 173 43 217 124 l22 41 0 665 0 665 -747 3 -748 2 0 -670z"/>
      </g>
    </svg>
  );
}

// Original Marathon R - organic flowing shapes
export function LetterR({ className = "", style = {} }) {
  return (
    <svg className={className} style={style} viewBox="0 0 226 147" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(0,147) scale(0.1,-0.1)">
        <path d="M409 1321 c-65 -21 -133 -65 -178 -116 -37 -42 -90 -145 -119 -230 -43 -128 -46 -166 -47 -525 l0 -345 85 3 c253 9 499 146 630 349 15 23 30 40 34 36 3 -3 6 -94 6 -201 l0 -195 83 7 c125 11 212 32 302 75 136 64 242 152 322 268 l38 55 3 -196 c2 -164 5 -198 17 -203 27 -10 153 15 212 42 105 47 185 147 237 295 50 139 56 197 56 563 l0 337 -67 0 c-161 -1 -360 -75 -493 -183 -55 -45 -134 -135 -177 -203 -9 -15 -12 23 -12 184 l-1 202 -74 0 c-236 0 -508 -148 -641 -348 -15 -23 -32 -42 -36 -42 -5 0 -9 88 -9 195 l0 195 -57 -1 c-32 0 -83 -8 -114 -18z m171 -397 c0 -10 -112 -209 -141 -249 -59 -82 -189 -155 -275 -155 l-46 0 7 53 c9 71 59 172 117 233 46 49 131 100 193 115 37 9 145 11 145 3z m750 -4 c0 -6 -32 -66 -70 -135 -77 -136 -124 -186 -219 -232 -43 -21 -74 -29 -133 -32 -53 -2 -78 1 -78 8 0 14 92 181 130 236 48 70 145 134 235 156 47 11 135 10 135 -1z m704 -32 c-14 -104 -60 -193 -135 -263 -71 -67 -146 -99 -241 -103 -43 -2 -78 -1 -78 3 0 10 77 151 115 210 73 114 196 190 313 194 l32 1 -6 -42z"/>
      </g>
    </svg>
  );
}

// Original Marathon H - angular geometric patterns with diagonal slashes
export function LetterH({ className = "", style = {} }) {
  return (
    <svg className={className} style={style} viewBox="0 0 177 183" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(0,183) scale(0.1,-0.1)">
        <path d="M137 1654 c-3 -4 -6 -173 -7 -376 l0 -368 86 -63 c48 -34 139 -100 203 -147 64 -48 178 -130 254 -184 75 -55 135 -102 131 -105 -3 -3 -155 -8 -337 -11 l-332 -5 -3 -114 c-2 -85 1 -117 10 -123 19 -12 1486 -10 1490 2 2 5 1 177 -2 382 l-5 372 -120 88 c-66 49 -154 113 -195 142 -267 192 -334 242 -338 254 -3 9 67 12 327 12 l331 0 0 125 0 125 -743 0 c-409 0 -746 -3 -750 -6z m793 -252 c0 -4 -72 -60 -159 -123 -88 -63 -160 -116 -160 -119 -1 -6 29 -28 282 -212 59 -43 158 -115 220 -160 61 -45 156 -113 209 -152 249 -181 298 -219 292 -228 -7 -11 -761 -5 -771 5 -2 3 68 57 157 122 88 64 158 121 155 126 -3 5 -43 35 -88 67 -45 32 -163 118 -262 190 -99 72 -220 160 -270 196 -287 208 -380 278 -383 287 -2 5 146 9 387 9 215 0 391 -4 391 -8z"/>
      </g>
    </svg>
  );
}

// Only use the original Marathon letters from the mockup
const marathonLetters = [LetterM, LetterR, LetterH];

export function MarathonLetter({ index = 0, className = "", style = {} }) {
  // Cycle through M, R, H based on index
  const LetterComponent = marathonLetters[index % 3];
  return <LetterComponent className={className} style={style} />;
}

export default MarathonLetter;
