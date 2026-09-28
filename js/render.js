/* ==========================================================================
   render.js — turns js/data.js into the page
   ========================================================================== */

window.Render = (function () {
  var D = window.PORTFOLIO || {};

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function el(id) {
    return document.getElementById(id);
  }

  // Other sites, PDFs and images open in a new tab so the visitor keeps this page
  function external(href) {
    return /^https?:|\.(pdf|jpe?g|png|webp)$/i.test(href || "") ? ' target="_blank" rel="noopener noreferrer"' : "";
  }

  var ARROW = '<span class="btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M5 11 11 5M6 5h5v5" /></svg></span>';

  function button(label, href, variant) {
    return '<a class="btn btn--' + variant + '" href="' + esc(href) + '"' + external(href) + ">" + esc(label) + ARROW + "</a>";
  }

  // A bezel card: tinted shell, concentric core. `span` is its share of 12 columns.
  function tile(span, i, inner, coreClass) {
    return (
      '<div class="tile tile--' + span + ' reveal" style="--i:' + i + '">' +
        '<div class="tile__core' + (coreClass ? " " + coreClass : "") + '">' + inner + "</div>" +
      "</div>"
    );
  }

  /* ---- hero -------------------------------------------------------------- */

  function hero() {
    var host = el("hero");
    var p = D.profile;
    if (!host || !p) return;

    var secondary = (p.links || []).filter(function (l) { return l.href.indexOf("mailto:") !== 0; });

    host.innerHTML =
      tile(8, 0,
        '<h1 class="hero__name" id="hero-name">' + esc(p.name) + "</h1>" +
        '<p class="hero__role">' + esc(p.role) + "</p>" +
        (p.tagline ? '<p class="hero__tagline">' + esc(p.tagline) + "</p>" : "") +
        '<div class="hero__actions">' +
          button("Get in touch", "#contact", "primary") +
          secondary.map(function (l) { return button(l.label, l.href, "secondary"); }).join("") +
        "</div>",
        "hero__core") +
      // The photo is the card's core itself, so it runs edge to edge inside the bezel
      '<div class="tile tile--4 reveal" style="--i:1">' +
        '<img class="tile__core portrait" src="' + esc(p.avatar) + '" alt="' + esc(p.avatarAlt || p.name) +
          '" width="800" height="1000" fetchpriority="high" />' +
      "</div>";
  }

  /* ---- about + quick facts ----------------------------------------------- */

  function about() {
    var host = el("about-grid");
    if (!host) return;
    var p = D.profile || {};
    var school = (D.education || [])[0];

    var facts = [
      p.location && ["Based in", p.location],
      school && ["Education", school.degree + ", " + school.school + ", " + school.period],
      p.available && ["Status", p.availableLabel]
    ].filter(Boolean);

    host.innerHTML =
      tile(7, 0,
        '<div class="about__text">' +
          (D.about || []).map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") +
        "</div>") +
      tile(5, 1,
        '<dl class="facts">' +
          facts.map(function (f) { return "<div><dt>" + esc(f[0]) + "</dt><dd>" + esc(f[1]) + "</dd></div>"; }).join("") +
        "</dl>");
  }

  /* ---- experience -------------------------------------------------------- */

  function experience() {
    var host = el("experience-grid");
    if (!host || !D.experience) return;

    host.innerHTML = tile(12, 0,
      D.experience
        .map(function (job) {
          var points = (job.highlights || []).map(function (h) { return "<li>" + esc(h) + "</li>"; }).join("");
          return (
            '<article class="job">' +
              '<p class="job__when">' + esc(job.period) + "</p>" +
              "<div>" +
                '<h3 class="card__title">' + esc(job.role) + "</h3>" +
                '<p class="card__sub">' + esc(job.company) + "</p>" +
                (points ? '<ul class="card__points">' + points + "</ul>" : "") +
                (job.tech && job.tech.length ? '<p class="card__meta">' + esc(job.tech.join(", ")) + "</p>" : "") +
              "</div>" +
            "</article>"
          );
        })
        .join(""));
  }

  /* ---- projects ----------------------------------------------------------
     A card links out when it has a url, plays its own video when it has one,
     and otherwise says what is coming instead of linking nowhere. */

  var KIND = {
    site: { cta: "Open live site", soon: "Live site coming soon" },
    repo: { cta: "Open repository", soon: "Repository coming soon" },
    video: { cta: "Watch video", soon: "Video demo coming soon" },
    "case study": { cta: "Read case study", soon: "Case study coming soon" }
  };

  var PROJECT_SPANS = [6, 6];

  function projects() {
    var host = el("projects-grid");
    if (!host || !D.projects) return;

    host.innerHTML = D.projects
      .map(function (p, i) {
        var kind = KIND[p.kind] || { cta: "Open project", soon: "Link coming soon" };

        var media = p.video
          ? '<video class="project__media" src="' + esc(p.video) + '"' + (p.thumb ? ' poster="' + esc(p.thumb) + '"' : "") +
            ' controls preload="metadata" playsinline aria-label="' + esc(p.title + " video demonstration") + '"></video>'
          : p.thumb
            ? '<img class="project__media" src="' + esc(p.thumb) + '" alt="" loading="lazy" width="800" height="500" />'
            : "";

        var foot = p.url
          ? button(kind.cta, p.url, "secondary")
          : p.video ? "" : '<p class="card__soon">' + esc(kind.soon) + "</p>";

        return tile(PROJECT_SPANS[i % PROJECT_SPANS.length], i,
          media +
          '<h3 class="card__title">' + esc(p.title) + "</h3>" +
          (p.subtitle ? '<p class="card__sub">' + esc(p.subtitle) + "</p>" : "") +
          '<p class="card__desc">' + esc(p.description) + "</p>" +
          '<p class="card__meta">' + esc([p.role, p.year].filter(Boolean).join(", ")) + "</p>" +
          (p.tech && p.tech.length ? '<p class="card__tech">' + esc(p.tech.join(", ")) + "</p>" : "") +
          (foot ? '<div class="card__foot">' + foot + "</div>" : ""),
          "stack");
      })
      .join("");
  }

  /* ---- skills ------------------------------------------------------------ */

  // One card, one row per group: short groups no longer float in half-empty cards
  function skills() {
    var host = el("skills-grid");
    if (!host || !D.skills) return;
    host.innerHTML = tile(12, 0,
      '<dl class="skills">' +
        D.skills
          .map(function (g) {
            return "<div><dt>" + esc(g.title) + "</dt><dd>" + esc((g.items || []).join(", ")) + "</dd></div>";
          })
          .join("") +
      "</dl>");
  }

  /* ---- education + certificates ------------------------------------------ */

  function education() {
    var host = el("education-grid");
    if (!host) return;

    var schools = (D.education || [])
      .map(function (e) {
        return (
          '<h3 class="card__title">' + esc(e.school) + "</h3>" +
          '<p class="card__sub">' + esc(e.degree) + "</p>" +
          '<p class="card__meta">' + esc(e.period) + "</p>" +
          (e.detail ? '<p class="card__desc">' + esc(e.detail) + "</p>" : "")
        );
      })
      .join("");

    var certs = (D.certifications || [])
      .map(function (c) {
        return (
          "<li>" +
            '<p class="cert__name">' + esc(c.name) + "</p>" +
            '<p class="cert__issuer">' + esc(c.issuer) + (c.year ? ", " + esc(c.year) : "") + "</p>" +
            (c.url ? '<a class="cert__view" href="' + esc(c.url) + '"' + external(c.url) + ">View certificate</a>" : "") +
          "</li>"
        );
      })
      .join("");

    host.innerHTML =
      tile(5, 0, schools) +
      tile(7, 1, '<h3 class="card__title">Certificates</h3><ul class="certs">' + certs + "</ul>");
  }

  /* ---- contact + footer -------------------------------------------------- */

  function contact() {
    var blurb = el("contact-blurb");
    if (blurb && D.contact) blurb.textContent = D.contact.blurb || "";

    var links = el("contact-links");
    if (links && D.profile && D.profile.links) {
      links.innerHTML = D.profile.links
        .map(function (l) { return "<li>" + button(l.label, l.href, "secondary") + "</li>"; })
        .join("");
    }

    var copy = el("footer-copy");
    if (copy) {
      copy.textContent = "© " + new Date().getFullYear() + " " +
        ((D.footer && D.footer.copyright) || (D.profile && D.profile.name) || "");
    }
  }

  function all() {
    hero();
    about();
    experience();
    projects();
    skills();
    education();
    contact();

    if (D.profile && D.profile.name) {
      document.title = D.profile.name + " — " + (D.profile.role || "Portfolio");
    }
  }

  return { all: all };
})();
