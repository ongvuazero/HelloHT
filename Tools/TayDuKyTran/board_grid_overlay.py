from PIL import Image, ImageDraw
import json
from pathlib import Path


def lerp(a, b, t):
    return (a[0] + (b[0]-a[0])*t, a[1] + (b[1]-a[1])*t)


def quad_grid(draw, tl, tr, br, bl, cols, rows, color, width=4):
    # Outer boundary
    poly = [tl, tr, br, bl, tl]
    draw.line(poly, fill=color, width=width, joint='curve')

    # Vertical grid lines, interpolated along top/bottom perspective edges
    for c in range(1, cols):
        t = c / cols
        p0 = lerp(tl, tr, t)
        p1 = lerp(bl, br, t)
        draw.line([p0, p1], fill=color, width=width)

    # Horizontal grid lines, interpolated along left/right perspective edges
    for r in range(1, rows):
        t = r / rows
        p0 = lerp(tl, bl, t)
        p1 = lerp(tr, br, t)
        draw.line([p0, p1], fill=color, width=width)


def rect_grid(draw, box, cols, rows, color, width=4):
    x0, y0, x1, y1 = box
    draw.rectangle(box, outline=color, width=width)
    for c in range(1, cols):
        x = x0 + (x1-x0)*c/cols
        draw.line([(x,y0),(x,y1)], fill=color, width=width)
    for r in range(1, rows):
        y = y0 + (y1-y0)*r/rows
        draw.line([(x0,y),(x1,y)], fill=color, width=width)


def render(source_path, output_path, config_path=None):
    im = Image.open(source_path).convert('RGBA')
    w, h = im.size
    overlay = Image.new('RGBA', im.size, (0,0,0,0))
    d = ImageDraw.Draw(overlay)

    # Coordinates normalized against approved 1648x928 mockup.
    # Enemy: 3 rows x 10 cols. Player: 3 rows x 10 cols.
    enemy = {
        'tl': (0.252*w, 0.205*h),
        'tr': (0.748*w, 0.205*h),
        'br': (0.798*w, 0.396*h),
        'bl': (0.202*w, 0.396*h),
    }
    player = {
        'tl': (0.202*w, 0.405*h),
        'tr': (0.798*w, 0.405*h),
        'br': (0.835*w, 0.655*h),
        'bl': (0.165*w, 0.655*h),
    }

    quad_grid(d, enemy['tl'], enemy['tr'], enemy['br'], enemy['bl'], 10, 3, (255,70,70,220), 4)
    quad_grid(d, player['tl'], player['tr'], player['br'], player['bl'], 10, 3, (70,255,120,220), 4)

    # Reserve bench: 10 slots
    reserve_box = (0.165*w, 0.666*h, 0.853*w, 0.755*h)
    rect_grid(d, reserve_box, 10, 1, (60,220,255,220), 4)

    # Equipment inventory: 10 slots = 5 columns x 2 rows
    item_box = (0.681*w, 0.787*h, 0.985*w, 0.982*h)
    rect_grid(d, item_box, 5, 2, (255,205,70,220), 4)

    out = Image.alpha_composite(im, overlay).convert('RGB')
    out.save(output_path, quality=96)

    if config_path:
        config = {
            'coordinate_space': 'normalized_0_to_1',
            'enemy_board': {'cols':10,'rows':3,'tl':[0.252,0.205],'tr':[0.748,0.205],'br':[0.798,0.396],'bl':[0.202,0.396]},
            'player_board': {'cols':10,'rows':3,'tl':[0.202,0.405],'tr':[0.798,0.405],'br':[0.835,0.655],'bl':[0.165,0.655]},
            'reserve': {'cols':10,'rows':1,'box':[0.165,0.666,0.853,0.755]},
            'equipment': {'cols':5,'rows':2,'box':[0.681,0.787,0.985,0.982]},
            'legend': {'enemy':'red','player':'green','reserve':'cyan','equipment':'gold'}
        }
        Path(config_path).write_text(json.dumps(config, indent=2), encoding='utf-8')


if __name__ == '__main__':
    import argparse
    p = argparse.ArgumentParser()
    p.add_argument('source')
    p.add_argument('output')
    p.add_argument('--config')
    args = p.parse_args()
    render(args.source, args.output, args.config)
