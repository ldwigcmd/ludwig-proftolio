# Portfolio

A static, dependency-free personal portfolio. Plain HTML, CSS and JavaScript —
no build step, no framework, no npm install.

## Run it

Double-click `index.html`, or serve the folder:

```bash
python -m http.server 8080
# then open http://localhost:8080
```

## Where to change things

**All content lives in one file: `js/data.js`.** Edit the values, keep the shape,
and the page rebuilds itself. You should not need to touch the HTML.

| What | Where |
| --- | --- |
| Name, photo, role, one-line summary, availability, links | `js/data.js` → `profile` |
| The About paragraphs | `js/data.js` → `about` |
| Jobs, dates, bullet points, tech | `js/data.js` → `experience` |
| Projects, links, videos, stack | `js/data.js` → `projects` |
| Skill groups | `js/data.js` → `skills` |
| School and certificates | `js/data.js` → `education`, `certifications` |
| Where the contact form sends mail | `js/data.js` → `contact.email` |
| Colours, type sizes, spacing | `css/tokens.css` |

### Your photo

`assets/img/portrait.jpg` is an 800×1000 photo shown on the card beside your
name. To swap it, drop in a 4:5 photo and
point `profile.avatar` at it.

### Projects

- `url`: where the project opens. While it is `""`, the entry says "Live site
  coming soon" (or "Video demo coming soon") instead of linking nowhere. Once
  set, the whole entry becomes a link that opens in a new tab.
- `video`: plays right in the project's story, in place of the drawing. Either
  a YouTube link (`"https://youtu.be/..."`, shown in YouTube's player) or a
  video file in this folder (`"assets/video/brailingo-demo.mp4"`, served by
  your own site). Keep a file under about 50 MB; GitHub refuses files over
  100 MB.
- `thumb`: a real screenshot or photo, e.g. `"assets/img/camote.jpg"` (about
  16:9). It replaces the drawing at the top of the project's story.
- `art`: which drawing (from `js/art.js`) to show while there is no `thumb` or
  `video`: `"camote"`, `"brailingo"`. Jobs and schools take `art` too
  (`"kiosk"`, `"degree"`). Remove it to show no picture.
- `kind`: names the link: `"site"`, `"repo"`, `"video"` or `"case study"`.
- `flow`: the parts of the system, top to bottom, drawn as the wiring diagram
  beside the project. Each part is `{ part, note }`; add `via: "I2C"` to label
  the connection into it, and `hub: true` on the main controller (blue pin).
  Remove `flow` to hide the diagram.

### Certificates

Put each certificate image (JPG, PNG or PDF) in `assets/certificates/` and set
its `url` in `js/data.js`. "View certificate" opens it in a new tab.

### Contact form

The form validates in the browser, then opens the visitor's mail app with the
message pre-filled and addressed to `contact.email`. Nothing is sent from the
page itself. To deliver messages without a mail app, swap the
`window.location.href = buildMailto()` line in `js/contact.js` for a `fetch()`
to Formspree, Basin, or your own endpoint.

## Deploying

On Vercel, pick the "Other" framework preset with no build command. The
`.vercelignore` file keeps the notes and design docs (this README, DESIGN.md,
PRODUCT.md, `.impeccable/`, `.claude/`) off the live site. File names are
case-sensitive once deployed: keep them exactly as written in `js/data.js`.

## Dark mode

Light is the default. The moon/sun button in the floating navigation switches
theme and remembers the choice in `localStorage` under `portfolio-theme`.
`js/theme-init.js` runs before first paint so there is no flash on reload.
Every colour is defined twice in `css/tokens.css`: on `:root` for light and on
`[data-theme="dark"]`. The design system is written up in `DESIGN.md`.

## File map

```
index.html              markup: floating nav, phone menu, section shells, contact form
css/
  reset.css             normalisation
  tokens.css            colour, type, spacing, bezel, motion (light + dark)
  base.css              element defaults, links, selection, scroll fade-up
  layout.css            bento grid, bezel cards, floating nav, phone menu, buttons
  sections.css          hero, portrait, about, experience, projects, skills, certificates
  contact.css           contact card and form
js/
  data.js               ← all content
  theme-init.js         applies saved theme before paint
  theme.js              light/dark toggle
  art.js                the drawn pictures on each story, until real photos exist
  render.js             builds every section from data.js
  nav.js                current section in the nav, phone menu
  reveal.js             fades cards up as they scroll into view
  depth.js              cards tilt toward the mouse and catch the light; nav rises on scroll
  contact.js            form validation + mailto handoff
  main.js               boot order
assets/
  img/                  portrait.jpg, favicon.svg
  certificates/         certificate images (you add these)
  video/                project demo videos (you add these)
  Ludwig-Intal-Resume.pdf   the résumé linked from the page
DESIGN.md               the design system
PRODUCT.md              who the site is for and what it must do
```

## Notes

- One typeface, Geist, from Google Fonts, for every piece of text.
- Under 900px the navigation collapses to a menu button; under 768px the cards
  stack in one column with the photo first.
- Motion respects `prefers-reduced-motion`. The card tilt only runs with a
  mouse or trackpad; phones and tablets get the flat page.
- The page is rendered by JavaScript, so it needs JS enabled.
