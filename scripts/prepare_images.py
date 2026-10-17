"""Create web assets from preserved originals. Requires Pillow: pip install Pillow."""
from pathlib import Path
from PIL import Image
root = Path(__file__).resolve().parents[1] / 'public' / 'characters'
for source in sorted(root.glob('*.png')):
    with Image.open(source) as image:
        image.save(source.with_suffix('.webp'), 'WEBP', lossless=True, method=6)
        small = image.copy()
        small.thumbnail((480, 480), Image.Resampling.LANCZOS)
        small.save(source.with_name(source.stem + '-small.webp'), 'WEBP', quality=90, method=6)
        print(source.name)
