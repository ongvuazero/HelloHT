# TÂY DU KỲ TRẬN — V5 CANONICAL LOCK

This folder locks the approved V5 mockup as the canonical visual/layout reference.

## Canonical files
- `TAY_DU_KY_TRAN_V5_CANONICAL_REFERENCE.jpg` — approved visual reference.
- `TAY_DU_KY_TRAN_V5_ANNOTATION_OVERLAY.jpg` — Roboflow-style debug boundary overlay.
- `board_layout_v5_canonical.json` — named runtime zones + perspective subdivision rules.

## Canonical runtime zones
- `background_safe_area`
- `brand_panel`
- `top_hud`
- `system_buttons`
- `traits_panel`
- `player_list_panel`
- `battlefield`
- `enemy_board`
- `player_board`
- `combat_center`
- `reserve_bench`
- `level_economy_panel`
- `shop_panel`
- `equipment_inventory`

## Combat lock
- ONE shared battlefield, `6x10` total.
- `enemy_board` = far/top `3x10`.
- `player_board` = near/bottom `3x10`.
- Combat is simultaneous auto-battler combat, NOT turn-based.
- Runtime board cells are generated from the battlefield quadrilateral with bilinear subdivision.

## UI lock
- Bench: 10 hero slots.
- Shop: 5 hero cards.
- Equipment: 10 item slots arranged `5x2`.
- Left traits and right player list are compact edge overlays.
- Grid/boundary lines are debug-only and must never be baked into production UI.

## Runtime scaling
Use `polygon_norm` / `box_norm` from `board_layout_v5_canonical.json` for scaling to other resolutions while preserving the 1270x720 baseline composition.
