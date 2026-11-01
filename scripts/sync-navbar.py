"""Sync static site navbars from root index.html; use --check to detect drift."""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
NAV = re.compile(r'<nav\b[^>]*>.*?</nav>', re.S)
ATTR = re.compile(r'(href|src)="([^"]*)"')
CSS = re.compile(r'<link\b[^>]*href="[^"]*assets/css/site-navbar\.css[^"]*"[^>]*>')


def read(path):
    return path.read_bytes().decode('utf-8')


def site_nav(text):
    return next((m for m in NAV.finditer(text) if 'offcanvas-nav' in m.group()), None)


canonical = site_nav(read(ROOT / 'index.html')).group()


def relative_nav(depth):
    prefix = '../' * depth or './'

    def link(match):
        attr, url = match.groups()
        if not url or url.startswith(('#', '/', 'https:', 'http:', 'mailto:', 'tel:', 'data:')):
            return match.group()
        return f'{attr}="{prefix}{url.removeprefix("./")}"'

    return ATTR.sub(link, canonical)


changed = []
checked = 0
for path in sorted(ROOT.rglob('*.html')):
    relative = path.relative_to(ROOT)
    if any(part in ('assets', '.git', 'node_modules') for part in relative.parts):
        continue
    text = read(path)
    match = site_nav(text)
    if not match:
        continue
    checked += 1
    depth = len(relative.parts) - 1
    updated = text[:match.start()] + relative_nav(depth) + text[match.end():]
    prefix = '../' * depth or './'
    stylesheet = f'<link rel="stylesheet" href="{prefix}assets/css/site-navbar.css?v=1">'
    if CSS.search(updated):
        updated = CSS.sub(stylesheet, updated)
    else:
        newline = '\r\n' if '\r\n' in updated else '\n'
        updated = updated.replace('</head>', f'   {stylesheet}{newline}</head>', 1)
    if updated != text:
        changed.append(str(relative))
        if '--check' not in sys.argv:
            path.write_bytes(updated.encode('utf-8'))

print(f'Checked {checked} navbars; {len(changed)} ' + ('need syncing.' if '--check' in sys.argv else 'updated.'))
if '--check' in sys.argv and changed:
    print('\n'.join(changed))
    sys.exit(1)
