import { Application, Assets, Container, Graphics, Sprite, Text } from 'pixi.js';
import './style.css';

const W = 1270;
const H = 720;
const CANONICAL_IMAGE = 'https://raw.githubusercontent.com/ongvuazero/HelloHT/main/Tools/TayDuKyTran/canonical_v5/TAY_DU_KY_TRAN_V5_CANONICAL_REFERENCE.jpg';

const app = new Application();
await app.init({
  width: W,
  height: H,
  background: '#071116',
  antialias: true,
  autoDensity: true,
  resolution: Math.min(window.devicePixelRatio || 1, 2),
});

document.querySelector<HTMLDivElement>('#app')!.appendChild(app.canvas);

const root = new Container();
app.stage.addChild(root);

// V5 canonical image is the visual lock. Runtime interaction overlays sit on top.
try {
  const texture = await Assets.load(CANONICAL_IMAGE);
  const bg = new Sprite(texture);
  bg.x = 0;
  bg.y = 0;
  bg.width = W;
  bg.height = H;
  root.addChild(bg);
} catch (error) {
  console.error('Failed to load V5 canonical reference:', error);
  root.addChild(new Graphics().rect(0, 0, W, H).fill(0x071116));
  const msg = new Text({
    text: 'Không tải được V5 canonical background',
    style: { fill: 0xffd36a, fontSize: 22, fontFamily: 'Arial, sans-serif' },
  });
  msg.position.set(24, 24);
  root.addChild(msg);
}

const debugLayer = new Container();
root.addChild(debugLayer);

const battlefield = [[184, 122], [1089, 122], [1070, 487], [203, 487]] as const;
const enemyBoard = [[184, 122], [1089, 122], [1079.5, 304.5], [193.5, 304.5]] as const;
const playerBoard = [[193.5, 304.5], [1079.5, 304.5], [1070, 487], [203, 487]] as const;
const bench = [193, 490, 1077, 563] as const;
const equipment = [934, 559, 1268, 718] as const;
const shop = [203, 566, 927, 719] as const;

function quadPoint(q: readonly (readonly [number, number])[], u: number, v: number) {
  const [tl, tr, br, bl] = q;
  const topX = tl[0] + (tr[0] - tl[0]) * u;
  const topY = tl[1] + (tr[1] - tl[1]) * u;
  const botX = bl[0] + (br[0] - bl[0]) * u;
  const botY = bl[1] + (br[1] - bl[1]) * u;
  return { x: topX + (botX - topX) * v, y: topY + (botY - topY) * v };
}

function drawQuad(g: Graphics, q: readonly (readonly [number, number])[], color: number, width = 2, alpha = 0.9) {
  g.moveTo(q[0][0], q[0][1]);
  for (let i = 1; i < q.length; i++) g.lineTo(q[i][0], q[i][1]);
  g.closePath();
  g.stroke({ color, width, alpha });
}

function drawGrid(g: Graphics) {
  drawQuad(g, battlefield, 0xffd56a, 2.5, 0.95);
  drawQuad(g, enemyBoard, 0xff5555, 2, 0.9);
  drawQuad(g, playerBoard, 0x48e789, 2, 0.9);

  for (let c = 1; c < 10; c++) {
    const u = c / 10;
    const p0 = quadPoint(battlefield, u, 0);
    const p1 = quadPoint(battlefield, u, 1);
    g.moveTo(p0.x, p0.y).lineTo(p1.x, p1.y).stroke({ color: 0xffffff, width: 1, alpha: 0.32 });
  }
  for (let r = 1; r < 6; r++) {
    const v = r / 6;
    const p0 = quadPoint(battlefield, 0, v);
    const p1 = quadPoint(battlefield, 1, v);
    g.moveTo(p0.x, p0.y).lineTo(p1.x, p1.y).stroke({ color: 0xffffff, width: 1, alpha: 0.32 });
  }

  const [bx0, by0, bx1, by1] = bench;
  g.rect(bx0, by0, bx1 - bx0, by1 - by0).stroke({ color: 0x37ddff, width: 2, alpha: 0.9 });
  for (let i = 1; i < 10; i++) {
    const x = bx0 + ((bx1 - bx0) * i) / 10;
    g.moveTo(x, by0).lineTo(x, by1).stroke({ color: 0x37ddff, width: 1, alpha: 0.65 });
  }

  const [ix0, iy0, ix1, iy1] = equipment;
  g.rect(ix0, iy0, ix1 - ix0, iy1 - iy0).stroke({ color: 0xffbd32, width: 2, alpha: 0.9 });
  for (let i = 1; i < 5; i++) {
    const x = ix0 + ((ix1 - ix0) * i) / 5;
    g.moveTo(x, iy0).lineTo(x, iy1).stroke({ color: 0xffbd32, width: 1, alpha: 0.65 });
  }
  const midY = iy0 + (iy1 - iy0) / 2;
  g.moveTo(ix0, midY).lineTo(ix1, midY).stroke({ color: 0xffbd32, width: 1, alpha: 0.65 });

  const [sx0, sy0, sx1, sy1] = shop;
  g.rect(sx0, sy0, sx1 - sx0, sy1 - sy0).stroke({ color: 0x59c7ef, width: 2, alpha: 0.85 });
}

let debugVisible = false;
function refreshDebug() {
  debugLayer.removeChildren();
  if (!debugVisible) return;
  const g = new Graphics();
  drawGrid(g);
  debugLayer.addChild(g);
}

window.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() === 'g') {
    debugVisible = !debugVisible;
    refreshDebug();
  }
});

// Small invisible-ish hotspot: click top-right corner to toggle V5 boundary debug.
const debugHit = new Graphics().rect(W - 72, 0, 72, 72).fill({ color: 0x000000, alpha: 0.001 });
debugHit.eventMode = 'static';
debugHit.cursor = 'pointer';
debugHit.on('pointertap', () => {
  debugVisible = !debugVisible;
  refreshDebug();
});
root.addChild(debugHit);

console.info('Tây Du Kỳ Trận V5 canonical runtime loaded. Press G to toggle Roboflow-style boundaries.');
