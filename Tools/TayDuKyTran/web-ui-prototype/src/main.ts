import { Application, Container, Graphics, Text } from 'pixi.js';
import './style.css';
import {
  BOARD_LAYOUT,
  LOGICAL_HEIGHT,
  LOGICAL_WIDTH,
  UI_LAYOUT,
  type QuadGridLayout,
} from './layout';

type Unit = { id: string; name: string; tint: number };

type Point = { x: number; y: number };

const app = new Application();
await app.init({
  width: LOGICAL_WIDTH,
  height: LOGICAL_HEIGHT,
  background: '#0a1720',
  antialias: true,
  autoDensity: true,
  resolution: Math.min(window.devicePixelRatio || 1, 2),
});

document.querySelector<HTMLDivElement>('#app')!.appendChild(app.canvas);

const HERO_POOL = [
  'Tôn Ngộ Không', 'Trư Bát Giới', 'Bạch Cốt Tinh', 'Thiên Lý Nhãn', 'Nhị Lang Thần',
  'Na Tra', 'Hồng Hài Nhi', 'Ngưu Ma Vương', 'Kim Sí Đại Bằng', 'Quan Âm',
  'Sa Ngộ Tịnh', 'Tiểu Bạch Long', 'Hằng Nga', 'Thái Thượng Lão Quân', 'Địa Tạng',
];

const UNIT_COLORS = [0xd69b32, 0x8f5be8, 0x45bde7, 0xe85d4d, 0x56c98a, 0xc8cfd6];

function makeUnit(index: number, prefix: string): Unit {
  const name = HERO_POOL[index % HERO_POOL.length];
  return { id: `${prefix}_${index}`, name, tint: UNIT_COLORS[index % UNIT_COLORS.length] };
}

const enemySlots: Array<Unit | null> = Array(30).fill(null);
const playerSlots: Array<Unit | null> = Array(30).fill(null);
const benchSlots: Array<Unit | null> = Array(10).fill(null);

// Ten visible units per side; 3x10 grid still leaves room to reposition.
[0, 2, 4, 6, 8, 11, 13, 15, 17, 19].forEach((slot, i) => enemySlots[slot] = makeUnit(i, 'E'));
[10, 12, 14, 16, 18, 20, 22, 24, 26, 28].forEach((slot, i) => playerSlots[slot] = makeUnit(i + 4, 'P'));
for (let i = 0; i < 6; i++) benchSlots[i] = makeUnit(i + 1, 'B');

let shopHeroes = HERO_POOL.slice(0, 5);
let equipment = ['Kiếm', 'Giáp', 'Pháp Châu', 'Phong Nhẫn', 'Hỏa Thương', 'Linh Kiếm', 'Băng Nhẫn', 'Hộ Tâm', 'Tiên Y', 'Kim Luân'];
let selectedBench: number | null = null;
let selectedPlayer: number | null = null;
let debug = false;
let locked = false;
let level = 6;
let exp = 18;
let gold = 52;
let phase: 'prep' | 'combat' = 'prep';

const root = new Container();
app.stage.addChild(root);

function rgba(hex: number, alpha = 1) {
  return { color: hex, alpha };
}

function txt(text: string, x: number, y: number, size = 14, color = 0xffffff, anchorX = 0, anchorY = 0): Text {
  const node = new Text({
    text,
    style: {
      fill: color,
      fontSize: size,
      fontFamily: 'Arial, sans-serif',
      fontWeight: '600',
      stroke: { color: 0x061015, width: Math.max(2, Math.floor(size / 8)) },
    },
  });
  node.x = x;
  node.y = y;
  node.anchor.set(anchorX, anchorY);
  return node;
}

function panel(x: number, y: number, w: number, h: number, fill = 0x07181e, border = 0xc99a45, alpha = 0.93): Graphics {
  return new Graphics()
    .roundRect(x, y, w, h, 9)
    .fill(rgba(fill, alpha))
    .stroke({ color: border, width: 2, alpha: 0.95 });
}

function button(x: number, y: number, w: number, h: number, label: string, onClick: () => void, active = false): Container {
  const c = new Container();
  const g = new Graphics()
    .roundRect(x, y, w, h, 8)
    .fill(rgba(active ? 0x6c4b18 : 0x0b2229, 0.98))
    .stroke({ color: active ? 0xf1c768 : 0xb68a3b, width: 2 });
  g.eventMode = 'static';
  g.cursor = 'pointer';
  g.on('pointertap', onClick);
  c.addChild(g, txt(label, x + w / 2, y + h / 2, 13, 0xffefc7, 0.5, 0.5));
  return c;
}

function lerp(a: Point, b: Point, t: number): Point {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

function normPoint([x, y]: [number, number]): Point {
  return { x: x * LOGICAL_WIDTH, y: y * LOGICAL_HEIGHT };
}

function quadPoint(q: QuadGridLayout, u: number, v: number): Point {
  const tl = normPoint(q.topLeft);
  const tr = normPoint(q.topRight);
  const bl = normPoint(q.bottomLeft);
  const br = normPoint(q.bottomRight);
  const top = lerp(tl, tr, u);
  const bottom = lerp(bl, br, u);
  return lerp(top, bottom, v);
}

function cellCorners(q: QuadGridLayout, row: number, col: number): Point[] {
  const u0 = col / q.cols;
  const u1 = (col + 1) / q.cols;
  const v0 = row / q.rows;
  const v1 = (row + 1) / q.rows;
  return [quadPoint(q, u0, v0), quadPoint(q, u1, v0), quadPoint(q, u1, v1), quadPoint(q, u0, v1)];
}

function cellCenter(q: QuadGridLayout, row: number, col: number): Point {
  return quadPoint(q, (col + 0.5) / q.cols, (row + 0.5) / q.rows);
}

function polygon(points: Point[], fillColor: number, fillAlpha: number, strokeColor: number, strokeAlpha = 1, width = 1): Graphics {
  const g = new Graphics();
  g.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) g.lineTo(points[i].x, points[i].y);
  g.closePath();
  g.fill(rgba(fillColor, fillAlpha));
  g.stroke({ color: strokeColor, alpha: strokeAlpha, width });
  return g;
}

function drawBackground(layer: Container) {
  const bg = new Graphics().rect(0, 0, LOGICAL_WIDTH, LOGICAL_HEIGHT).fill(0x0b1c24);
  layer.addChild(bg);

  // Placeholder environment until final BG01 is wired in.
  layer.addChild(new Graphics().ellipse(640, 220, 540, 185).fill(rgba(0x193743, 0.75)));
  layer.addChild(new Graphics().ellipse(640, 238, 455, 138).fill(rgba(0xd9e6dd, 0.07)));
  layer.addChild(new Graphics().rect(160, 118, 960, 370).fill(rgba(0xb8b39a, 0.06)));
}

function drawGrid(layer: Container, q: QuadGridLayout, side: 'enemy' | 'player', slots: Array<Unit | null>) {
  const debugColor = side === 'enemy' ? 0xff4d4d : 0x44e67a;
  const normalStroke = side === 'enemy' ? 0xb45b52 : 0xa68d55;

  for (let r = 0; r < q.rows; r++) {
    for (let c = 0; c < q.cols; c++) {
      const index = r * q.cols + c;
      const cell = polygon(
        cellCorners(q, r, c),
        side === 'enemy' ? 0x4c2020 : 0x172f2d,
        debug ? 0.13 : 0.055,
        debug ? debugColor : normalStroke,
        debug ? 0.85 : 0.32,
        debug ? 2 : 1,
      );
      cell.eventMode = 'static';
      cell.cursor = side === 'player' ? 'pointer' : 'default';
      if (side === 'player') cell.on('pointertap', () => clickPlayerSlot(index));
      layer.addChild(cell);

      const unit = slots[index];
      if (unit) drawUnit(layer, cellCenter(q, r, c), unit, side, side === 'player' && selectedPlayer === index);
    }
  }

  if (debug) {
    const p = q.topLeft;
    layer.addChild(txt(`${side.toUpperCase()} 3x10`, p[0] * LOGICAL_WIDTH, p[1] * LOGICAL_HEIGHT - 18, 13, debugColor));
  }
}

function drawUnit(layer: Container, center: Point, unit: Unit, side: 'enemy' | 'player', selected: boolean) {
  const radius = 19;
  const aura = new Graphics()
    .circle(center.x, center.y + 5, radius + (selected ? 7 : 3))
    .fill(rgba(unit.tint, selected ? 0.25 : 0.12))
    .stroke({ color: selected ? 0xffdf78 : unit.tint, width: selected ? 3 : 1.5, alpha: 0.9 });
  layer.addChild(aura);

  const body = new Graphics()
    .circle(center.x, center.y, radius)
    .fill(rgba(unit.tint, 0.88))
    .stroke({ color: 0xf4e6c1, width: 1.5 });
  layer.addChild(body);

  const hpY = center.y - 28;
  layer.addChild(new Graphics().roundRect(center.x - 23, hpY, 46, 5, 2).fill(0x1a1d1d));
  layer.addChild(new Graphics().roundRect(center.x - 22, hpY + 1, 42, 3, 1).fill(side === 'enemy' ? 0xe34545 : 0x38d36f));
  layer.addChild(txt(unit.name.split(' ')[0], center.x, center.y + 28, 9, 0xfff2d0, 0.5, 0));
}

function clickPlayerSlot(index: number) {
  if (selectedBench !== null) {
    const incoming = benchSlots[selectedBench];
    if (!incoming) return;
    const displaced = playerSlots[index];
    playerSlots[index] = incoming;
    benchSlots[selectedBench] = displaced;
    selectedBench = null;
    selectedPlayer = index;
    render();
    return;
  }

  if (playerSlots[index]) {
    selectedPlayer = selectedPlayer === index ? null : index;
    render();
  }
}

function clickBenchSlot(index: number) {
  if (selectedPlayer !== null && !benchSlots[index]) {
    benchSlots[index] = playerSlots[selectedPlayer];
    playerSlots[selectedPlayer] = null;
    selectedPlayer = null;
    selectedBench = index;
    render();
    return;
  }

  if (benchSlots[index]) {
    selectedBench = selectedBench === index ? null : index;
    selectedPlayer = null;
    render();
  }
}

function drawBench(layer: Container) {
  const box = BOARD_LAYOUT.bench;
  const x = box.x * LOGICAL_WIDTH;
  const y = box.y * LOGICAL_HEIGHT;
  const w = box.w * LOGICAL_WIDTH;
  const h = box.h * LOGICAL_HEIGHT;
  const slotW = w / box.cols;

  layer.addChild(panel(x - 4, y - 20, w + 8, h + 24, 0x0a2228, 0xa58a51, 0.96));
  layer.addChild(txt(`Dự bị Tướng (${benchSlots.filter(Boolean).length}/10)`, x + 5, y - 16, 12, 0xffe5a4));

  for (let i = 0; i < 10; i++) {
    const sx = x + i * slotW + 2;
    const slot = new Graphics()
      .roundRect(sx, y + 3, slotW - 4, h - 7, 6)
      .fill(rgba(0x10272d, selectedBench === i ? 0.98 : 0.82))
      .stroke({ color: selectedBench === i ? 0x48e789 : 0x8d7848, width: selectedBench === i ? 3 : 1.5 });
    slot.eventMode = 'static';
    slot.cursor = 'pointer';
    slot.on('pointertap', () => clickBenchSlot(i));
    layer.addChild(slot);

    const unit = benchSlots[i];
    if (unit) {
      layer.addChild(new Graphics().circle(sx + (slotW - 4) / 2, y + h / 2, 15).fill(unit.tint));
      layer.addChild(txt(unit.name.split(' ')[0], sx + (slotW - 4) / 2, y + h - 10, 8, 0xffffff, 0.5, 0.5));
    } else {
      layer.addChild(txt('+', sx + (slotW - 4) / 2, y + h / 2, 24, 0x5c6b6b, 0.5, 0.5));
    }
  }
}

function drawEquipment(layer: Container) {
  const b = BOARD_LAYOUT.equipment;
  const x = b.x * LOGICAL_WIDTH;
  const y = b.y * LOGICAL_HEIGHT;
  const w = b.w * LOGICAL_WIDTH;
  const h = b.h * LOGICAL_HEIGHT;
  const gap = 7;
  const cellW = (w - gap * 6) / 5;
  const cellH = (h - 30 - gap * 3) / 2;

  layer.addChild(panel(x, y, w, h, 0x07181e, 0xb4904d, 0.98));
  layer.addChild(txt('Trang Bị (10/10)', x + 14, y + 9, 13, 0xffe5a4));

  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 5; c++) {
      const i = r * 5 + c;
      const sx = x + gap + c * (cellW + gap);
      const sy = y + 30 + gap + r * (cellH + gap);
      layer.addChild(new Graphics().roundRect(sx, sy, cellW, cellH, 6).fill(0x0d252b).stroke({ color: 0x8c7139, width: 1.5 }));
      const color = UNIT_COLORS[(i + 2) % UNIT_COLORS.length];
      layer.addChild(new Graphics().circle(sx + cellW / 2, sy + cellH / 2, Math.min(cellW, cellH) * 0.22).fill(color));
      layer.addChild(txt(equipment[i], sx + cellW / 2, sy + cellH - 9, 8, 0xd9e6e2, 0.5, 0.5));
    }
  }

  if (debug) layer.addChild(txt('ITEM 5x2 = 10', x + w - 6, y + 8, 10, 0xffd84a, 1, 0));
}

function drawShop(layer: Container) {
  const b = UI_LAYOUT.shop;
  const x = b.x * LOGICAL_WIDTH;
  const y = b.y * LOGICAL_HEIGHT;
  const w = b.w * LOGICAL_WIDTH;
  const h = b.h * LOGICAL_HEIGHT;
  const gap = 7;
  const cardW = (w - gap * 6) / 5;

  for (let i = 0; i < 5; i++) {
    const sx = x + gap + i * (cardW + gap);
    const card = new Graphics().roundRect(sx, y, cardW, h, 7).fill(0x102831).stroke({ color: i === 4 ? 0xd0a441 : 0x386a72, width: 2 });
    card.eventMode = 'static';
    card.cursor = 'pointer';
    card.on('pointertap', () => buyHero(i));
    layer.addChild(card);

    layer.addChild(new Graphics().circle(sx + cardW / 2, y + 44, 24).fill(UNIT_COLORS[i % UNIT_COLORS.length]));
    layer.addChild(txt(shopHeroes[i], sx + cardW / 2, y + 78, 10, 0xffffff, 0.5, 0));
    layer.addChild(txt(['Tây Du', 'Yêu Vực', 'Thiên Đình', 'Phật Môn', 'Long Cung'][i], sx + cardW / 2, y + 98, 9, 0xa8c7c8, 0.5, 0));
    layer.addChild(txt(`${i + 1} vàng`, sx + cardW / 2, y + h - 15, 10, 0xffd36c, 0.5, 0.5));
  }
}

function buyHero(shopIndex: number) {
  const empty = benchSlots.findIndex((u) => !u);
  const cost = shopIndex + 1;
  if (empty < 0 || gold < cost) return;
  gold -= cost;
  benchSlots[empty] = makeUnit(Math.floor(Math.random() * HERO_POOL.length), 'BUY');
  render();
}

function rerollShop() {
  if (!locked && gold >= 2) gold -= 2;
  shopHeroes = Array.from({ length: 5 }, () => HERO_POOL[Math.floor(Math.random() * HERO_POOL.length)]);
  render();
}

function drawSidePanels(layer: Container) {
  const traits = ['Thần Linh 6', 'Tây Du 4', 'Thiên Đình 3', 'Yêu Tộc 2', 'Đấu Sĩ 2', 'Pháp Sư 1', 'Hộ Pháp 1', 'Sát Thủ 1'];
  const players = ['Thiên Mệnh 100', 'Hắc Phong 86', 'Bạch Cốt 78', 'Ngọc Thố 72', 'Long Vương 64', 'Kim Sí Điểu 58', 'Ngưu Ma Vương 46', 'Thiết Phiến 38'];

  const l = UI_LAYOUT.traitsPanel;
  const lx = l.x * LOGICAL_WIDTH;
  const ly = l.y * LOGICAL_HEIGHT;
  const lw = l.w * LOGICAL_WIDTH;
  const lh = l.h * LOGICAL_HEIGHT;
  layer.addChild(panel(lx, ly, lw, lh, 0x081a20, 0x6e6b56, 0.88));
  traits.forEach((t, i) => {
    layer.addChild(txt(t, lx + 10, ly + 12 + i * 38, 11, 0xf1eee1));
    layer.addChild(txt(i < 5 ? '2 / 4 / 6' : '1 / 3 / 5', lx + 10, ly + 27 + i * 38, 9, 0x9fb1b2));
  });

  const r = UI_LAYOUT.playersPanel;
  const rx = r.x * LOGICAL_WIDTH;
  const ry = r.y * LOGICAL_HEIGHT;
  const rw = r.w * LOGICAL_WIDTH;
  const rh = r.h * LOGICAL_HEIGHT;
  layer.addChild(panel(rx, ry, rw, rh, 0x081a20, 0x6e6b56, 0.88));
  players.forEach((p, i) => {
    const [name, hp] = p.split(' ');
    layer.addChild(new Graphics().circle(rx + 16, ry + 18 + i * 40, 10).fill(UNIT_COLORS[i % UNIT_COLORS.length]));
    layer.addChild(txt(`${i + 1}. ${name}`, rx + 31, ry + 10 + i * 40, 10, 0xf5f0e4));
    layer.addChild(txt(hp, rx + rw - 10, ry + 10 + i * 40, 10, Number(hp) > 50 ? 0x59df82 : 0xe86666, 1, 0));
  });
}

function drawTopBar(layer: Container) {
  const b = UI_LAYOUT.topBar;
  const x = b.x * LOGICAL_WIDTH;
  const y = b.y * LOGICAL_HEIGHT;
  const w = b.w * LOGICAL_WIDTH;
  const h = b.h * LOGICAL_HEIGHT;
  layer.addChild(panel(x, y, w, h, 0x0a2027, 0xbd9145, 0.95));
  layer.addChild(txt('Vòng 4-2', x + 35, y + 10, 14, 0xffefd0));
  layer.addChild(txt(phase === 'prep' ? 'Chuẩn bị' : 'Chiến đấu', x + w / 2, y + 11, 14, 0xffefd0, 0.5, 0));
  layer.addChild(txt('24', x + w / 2, y + 35, 25, 0xffd473, 0.5, 0));
  layer.addChild(txt(`Vàng ${gold}`, x + w - 85, y + 13, 12, 0xffd473));
}

function drawBottomControls(layer: Container) {
  const b = UI_LAYOUT.levelPanel;
  const x = b.x * LOGICAL_WIDTH;
  const y = b.y * LOGICAL_HEIGHT;
  const w = b.w * LOGICAL_WIDTH;
  const h = b.h * LOGICAL_HEIGHT;
  layer.addChild(panel(x, y, w, h, 0x07181e, 0xa88545, 0.98));
  layer.addChild(txt(`Cấp ${level}`, x + 12, y + 9, 15, 0xffffff));
  layer.addChild(txt(`${exp}/36`, x + w - 12, y + 10, 10, 0xdce6e1, 1, 0));
  const barW = w - 24;
  layer.addChild(new Graphics().roundRect(x + 12, y + 31, barW, 7, 3).fill(0x10292e));
  layer.addChild(new Graphics().roundRect(x + 12, y + 31, barW * Math.min(exp / 36, 1), 7, 3).fill(0x30cfe4));
  layer.addChild(button(x + 10, y + 48, w - 20, 45, 'Mua KN · 4', () => {
    if (gold < 4) return;
    gold -= 4;
    exp += 5;
    if (exp >= 36) { level++; exp -= 36; }
    render();
  }));
  layer.addChild(button(x + 10, y + 102, w - 20, 45, 'Đổi lại · 2', rerollShop));
}

function drawToolbar(layer: Container) {
  layer.addChild(button(1030, 650, 100, 36, locked ? 'Khóa ✓' : 'Khóa', () => { locked = !locked; render(); }, locked));
  layer.addChild(button(1140, 650, 112, 36, debug ? 'Grid ON' : 'Grid OFF', () => { debug = !debug; render(); }, debug));
  layer.addChild(button(1030, 608, 222, 34, phase === 'prep' ? 'Bắt đầu Combat' : 'Về Chuẩn bị', () => {
    phase = phase === 'prep' ? 'combat' : 'prep';
    render();
  }, phase === 'combat'));
}

function render() {
  root.removeChildren();
  drawBackground(root);
  drawTopBar(root);
  drawSidePanels(root);
  drawGrid(root, BOARD_LAYOUT.enemy, 'enemy', enemySlots);
  drawGrid(root, BOARD_LAYOUT.player, 'player', playerSlots);

  if (phase === 'prep') {
    drawBench(root);
    drawBottomControls(root);
    drawShop(root);
    drawEquipment(root);
  } else {
    root.addChild(panel(225, 666, 830, 40, 0x07181e, 0xa58a51, 0.92));
    root.addChild(txt('COMBAT MODE — Shop / Bench / Inventory thu gọn để trả diện tích cho chiến đấu', 640, 686, 13, 0xd9e8e5, 0.5, 0.5));
  }

  drawToolbar(root);
}

render();
