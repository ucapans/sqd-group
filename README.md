# Superconducting Quantum Devices Group — website

A static website (plain HTML/CSS/JS, no build step) ready for GitHub Pages.

## Pages
| File | Page |
|---|---|
| `index.html` | Home: hero, research highlights, stats, news, call to join |
| `research.html` | Research themes + facilities & methods |
| `members.html` | PI, postdocs, PhD, MSc, alumni |
| `collaborators.html` | Collaborators (filterable) + funders |
| `publications.html` | Searchable, filterable publication list |
| `join.html` | Open positions, contact, map |
| `404.html` | Not-found page |

## Updating content
Almost everything lives in **`assets/js/data.js`**:
- `SITE` – group email, address, links. Set `showPlaceholderNotes: false` to hide the dashed "edit me" boxes.
- `MEMBERS`, `COLLABORATORS`, `FUNDERS`, `PUBLICATIONS`, `NEWS`, `POSITIONS`.

Lines marked `// TODO` are placeholders. Photos go in `assets/img/` (square images, ~400×400 px) and are referenced as `photo: "assets/img/name.jpg"`. With no photo, initials are shown.

Research text is in `research.html` (edit directly). Colours are tokens at the top of `assets/css/style.css`.

## Publishing on GitHub Pages
1. Create a new repository on GitHub (e.g. `sqd-group`).
2. Upload **the contents of this folder** (so `index.html` sits at the repo root) — drag-and-drop via *Add file → Upload files*, or:
   ```bash
   git init && git add . && git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<user-or-org>/sqd-group.git
   git push -u origin main
   ```
3. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, folder `/ (root)`, Save.
4. After a minute the site is live at `https://<user-or-org>.github.io/sqd-group/`.

Optional custom domain: add it under Settings → Pages → Custom domain and point a CNAME DNS record at `<user-or-org>.github.io`.

To preview locally: `python3 -m http.server` in this folder, then open http://localhost:8000.
