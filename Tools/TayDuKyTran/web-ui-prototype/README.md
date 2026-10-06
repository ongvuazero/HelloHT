# Tây Du Kỳ Trận — Web UI Prototype v0.1

Prototype giao diện web 16:9 dùng PixiJS + TypeScript + Vite để khóa layout gameplay trước khi gắn asset thật.

## Layout đã khóa

- Sân địch: **3 x 10** ô.
- Sân mình: **3 x 10** ô.
- Dự bị: **10** ô, luôn giữ riêng.
- Shop: **5** card.
- Trang bị: **5 x 2 = 10** món.
- Baseline logic resolution: **1280 x 720**.
- Scale toàn màn hình theo 16:9.

`src/layout.ts` mirror từ `../board_grid_layout_v1.json`.

## Prototype hiện có

- Hiển thị cả hai board 3x10.
- 10 unit demo bên mình và 10 unit demo bên địch.
- Dự bị 10 slot.
- Click unit dự bị -> click ô sân mình để đưa unit lên sân.
- Click unit trên sân -> click ô dự bị trống để kéo xuống.
- Shop 5 card có thể click mua vào bench.
- Mua EXP.
- Reroll shop.
- Lock shop.
- Trang bị 10 ô 5x2.
- Toggle Grid debug.
- Toggle Prep / Combat; Combat thu gọn Shop/Bench/Inventory để trả diện tích cho battlefield.

## Chạy local

```bash
cd Tools/TayDuKyTran/web-ui-prototype
npm install
npm run dev
```

Mở URL Vite in ra, thường là `http://localhost:5173`.

## Build

```bash
npm run build
```

## Bước tiếp theo

1. Thay placeholder background bằng BG01 final.
2. Gắn hero PNG đã cắt nền vào unit renderer.
3. Gắn Skill/Status/Tộc-Hệ/Item icon thật.
4. Tách Prep HUD và Combat HUD thành scene/state riêng.
5. Nối state từ server/client protocol thay vì demo arrays local.
6. Sau khi layout pass mới làm animation/VFX runtime.
