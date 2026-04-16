/**
 * Symbol Drawing Functions for Canvas 2D Context
 * Reproduces the 14 symbols from the Marathon mockup
 * Each symbol is drawn centered at the specified position
 */

export const SYMBOL_TYPES = [
  'x', 'sq', 'co', '+', 'o', 'dot',
  'sq_dot', 'star6', 'sq_sq', 'bullseye', 'ring', 'star4', 'dotcross', 'quad'
];

/**
 * Draw a symbol on a canvas context
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D context
 * @param {string} type - Symbol type from SYMBOL_TYPES
 * @param {number} cx - Center X position
 * @param {number} cy - Center Y position
 * @param {number} sz - Symbol size
 * @param {string} col - Color (hex or CSS color)
 */
export function drawSymbol(ctx, type, cx, cy, sz, col) {
  const r = sz * 0.42;
  ctx.save();
  ctx.strokeStyle = col;
  ctx.fillStyle = col;
  ctx.lineWidth = Math.max(1.3, sz * 0.13);
  ctx.lineCap = 'square';
  ctx.beginPath();

  switch (type) {
    case 'x':
      // X shape - two diagonal lines
      ctx.moveTo(cx - r, cy - r);
      ctx.lineTo(cx + r, cy + r);
      ctx.moveTo(cx + r, cy - r);
      ctx.lineTo(cx - r, cy + r);
      ctx.stroke();
      break;

    case 'sq':
      // Square outline
      ctx.strokeRect(cx - r, cy - r, r * 2, r * 2);
      break;

    case 'co':
      // Circle with center dot
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, sz * 0.09, 0, Math.PI * 2);
      ctx.fill();
      break;

    case '+':
      // Plus sign
      ctx.moveTo(cx - r, cy);
      ctx.lineTo(cx + r, cy);
      ctx.moveTo(cx, cy - r);
      ctx.lineTo(cx, cy + r);
      ctx.stroke();
      break;

    case 'o':
      // Circle outline
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
      break;

    case 'dot':
      // Filled dot
      ctx.arc(cx, cy, sz * 0.1, 0, Math.PI * 2);
      ctx.fill();
      break;

    case 'sq_dot':
      // Square with center dot
      ctx.strokeRect(cx - r, cy - r, r * 2, r * 2);
      ctx.beginPath();
      ctx.arc(cx, cy, sz * 0.09, 0, Math.PI * 2);
      ctx.fill();
      break;

    case 'sq_sq':
      // Square with inner filled square
      ctx.strokeRect(cx - r, cy - r, r * 2, r * 2);
      ctx.fillRect(cx - r * 0.38, cy - r * 0.38, r * 0.76, r * 0.76);
      break;

    case 'star6':
      // 6-pointed star (3 lines at 60 degrees)
      for (let i = 0; i < 3; i++) {
        const a = i * Math.PI / 3;
        ctx.moveTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
        ctx.lineTo(cx - r * Math.cos(a), cy - r * Math.sin(a));
      }
      ctx.stroke();
      break;

    case 'bullseye':
      // Circle with filled center
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.35, 0, Math.PI * 2);
      ctx.fill();
      break;

    case 'ring':
      // Double circle (ring)
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.52, 0, Math.PI * 2);
      ctx.stroke();
      break;

    case 'star4': {
      // 4-pointed star (filled)
      const pts = [];
      for (let i = 0; i < 8; i++) {
        const a = i * Math.PI / 4 - Math.PI / 2;
        const ri = i % 2 === 0 ? r : r * 0.28;
        pts.push([cx + ri * Math.cos(a), cy + ri * Math.sin(a)]);
      }
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < 8; i++) {
        ctx.lineTo(pts[i][0], pts[i][1]);
      }
      ctx.closePath();
      ctx.fill();
      break;
    }

    case 'dotcross':
      // Cross with dots at extremities
      ctx.moveTo(cx - r * 0.5, cy);
      ctx.lineTo(cx + r * 0.5, cy);
      ctx.moveTo(cx, cy - r * 0.5);
      ctx.lineTo(cx, cy + r * 0.5);
      ctx.stroke();
      // Dots at extremities
      [[0, -1], [0, 1], [-1, 0], [1, 0]].forEach(([dx, dy]) => {
        ctx.beginPath();
        ctx.arc(cx + dx * r, cy + dy * r, sz * 0.08, 0, Math.PI * 2);
        ctx.fill();
      });
      break;

    case 'quad':
      // 4 dots in square pattern
      [[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(([dx, dy]) => {
        ctx.beginPath();
        ctx.arc(cx + dx * r * 0.52, cy + dy * r * 0.52, sz * 0.09, 0, Math.PI * 2);
        ctx.fill();
      });
      break;

    default:
      // Fallback: simple dot
      ctx.arc(cx, cy, sz * 0.1, 0, Math.PI * 2);
      ctx.fill();
  }

  ctx.restore();
}
