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

// Mirrors Tools/TayDuKyTran/board_grid_layout_v1.json.
// 1280x720 is the logical design resolution. Rendering scales uniformly.
export const LOGICAL_WIDTH = 1280;
export const LOGICAL_HEIGHT = 720;

export const BOARD_LAYOUT = {
  enemy: {
    rows: 3,
    cols: 10,
    topLeft: [0.252, 0.205] as Point,
    topRight: [0.748, 0.205] as Point,
    bottomRight: [0.798, 0.396] as Point,
    bottomLeft: [0.202, 0.396] as Point,
  },
  player: {
    rows: 3,
    cols: 10,
    topLeft: [0.202, 0.405] as Point,
    topRight: [0.798, 0.405] as Point,
    bottomRight: [0.835, 0.655] as Point,
    bottomLeft: [0.165, 0.655] as Point,
  },
  bench: {
    rows: 1,
    cols: 10,
    x: 0.165,
    y: 0.666,
    w: 0.688,
    h: 0.089,
  },
  equipment: {
    rows: 2,
    cols: 5,
    x: 0.681,
    y: 0.787,
    w: 0.304,
    h: 0.195,
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
