export type Point = [number, number];

export interface QuadGridLayout {
  rows: number;
  cols: number;
  topLeft: Point;
  topRight: Point;
  bottomRight: Point;
  bottomLeft: Point;
}

export interface BoxGridLayout {
  rows: number;
  cols: number;
  x: number;
  y: number;
  w: number;
  h: number;
}

// Mirrors Tools/TayDuKyTran/board_grid_layout_v2_roboflow_style.json.
// Coordinates are traced directly from the approved mockup.
// 1280x720 is the logical design resolution. Rendering scales uniformly.
export const LOGICAL_WIDTH = 1280;
export const LOGICAL_HEIGHT = 720;

export const BOARD_LAYOUT = {
  enemy: {
    rows: 3,
    cols: 10,
    topLeft: [0.233254, 0.201913] as Point,
    topRight: [0.764354, 0.201913] as Point,
    bottomRight: [0.796651, 0.397450] as Point,
    bottomLeft: [0.199163, 0.397450] as Point,
  },
  player: {
    rows: 3,
    cols: 10,
    topLeft: [0.199163, 0.407014] as Point,
    topRight: [0.796651, 0.407014] as Point,
    bottomRight: [0.815789, 0.646121] as Point,
    bottomLeft: [0.183014, 0.646121] as Point,
  },
  bench: {
    rows: 1,
    cols: 10,
    x: 0.150120,
    y: 0.666312,
    w: 0.663875,
    h: 0.089267,
  },
  equipment: {
    rows: 2,
    cols: 5,
    x: 0.653110,
    y: 0.818278,
    w: 0.319976,
    h: 0.155155,
  },
} satisfies {
  enemy: QuadGridLayout;
  player: QuadGridLayout;
  bench: BoxGridLayout;
  equipment: BoxGridLayout;
};

export const UI_LAYOUT = {
  traitsPanel: { x: 0.008, y: 0.105, w: 0.108, h: 0.49 },
  playersPanel: { x: 0.884, y: 0.085, w: 0.108, h: 0.52 },
  topBar: { x: 0.35, y: 0.015, w: 0.30, h: 0.09 },
  levelPanel: { x: 0.012, y: 0.772, w: 0.132, h: 0.212 },
  shop: { x: 0.15, y: 0.785, w: 0.515, h: 0.195, cols: 5 },
};

export function n2x(value: number): number {
  return value * LOGICAL_WIDTH;
}

export function n2y(value: number): number {
  return value * LOGICAL_HEIGHT;
}
