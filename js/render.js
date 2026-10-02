/* ==========================================================================
   render.js — turns js/data.js into the page: a front page of stories
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

  function slug(text) {
    return String(text || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  // Other sites, PDFs and images open in a new tab so the visitor keeps this page
  function external(href) {
    return /^https?:|\.(pdf|jpe?g|png|webp)$/i.test(href || "") ? ' target="_blank" rel="noopener noreferrer"' : "";
  }

  var ARROW = '<span class="btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M5 11 11 5M6 5h5v5" /></svg></span>';

  function button(label, href, variant) {
    return '<a class="btn btn--' + variant + '" href="' + esc(href) + '"' + external(href) + ">" + esc(label) + ARROW + "</a>";
  }

  // The video id from a YouTube link (youtu.be/ID, watch?v=ID, shorts/ID, embed/ID)
  function youtubeId(href) {
    var m = /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/))([\w-]{11})/.exec(href || "");
    return m ? m[1] : "";
  }

  // A video that plays right in the story: a YouTube link becomes YouTube's
  // player, anything else is a video file served from this site
  function player(item) {
    var label = (item.title || "") + " video demonstration";
    var yt = youtubeId(item.video);
    return yt
      ? '<iframe src="https://www.youtube-nocookie.com/embed/' + yt + '?rel=0" title="' + esc(label) + '"' +
        ' loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>'
      // Without a poster image, "#t=0.5" makes the browser show a frame from the
      // video itself instead of a black box before it plays
      : '<video src="' + esc(item.video) + (item.thumb || /#t=/.test(item.video) ? "" : "#t=0.5") + '"' +
        (item.thumb ? ' poster="' + esc(item.thumb) + '"' : "") +
        ' controls preload="metadata" playsinline aria-label="' + esc(label) + '"></video>';
  }

  // A story's picture: a real video or photo when data.js has one, otherwise
  // the drawing named by `art` (js/art.js)
  function picture(item, extraClass) {
    if (item.video) return '<div class="story__art story__art--video">' + player(item) + "</div>";
    var inner = item.thumb
        ? '<img src="' + esc(item.thumb) + '" alt="" loading="lazy" />'
        : window.Art ? window.Art.draw(item.art) : "";
    return inner
      ? '<div class="story__art' + (extraClass ? " " + extraClass : "") + '"' +
          (item.art && !item.video && !item.thumb ? ' data-art="' + esc(item.art) + '"' : "") + ">" + inner + "</div>"
      : "";
  }

  var COPY_ICONS =
    '<svg class="email__icon email__icon--copy" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '<rect x="8.5" y="8.5" width="11" height="11" rx="2.5" /><path d="M15.5 5.5v-.5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7.5a2 2 0 0 0 2 2h.5" /></svg>' +
    '<svg class="email__icon email__icon--done" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '<path d="m5 12.5 4.5 4.5L19 7.5" /></svg>';

  // The address in plain view, with a copy button for visitors without a mail app
  function emailLine(extraClass) {
    var email = D.contact && D.contact.email;
    if (!email) return "";
    return (
      '<div class="email ' + extraClass + '">' +
        // <wbr> lets a narrow screen break before the @ rather than mid-word
        '<a class="email__link draw-link" href="mailto:' + esc(email) + '">' + esc(email).replace("@", "<wbr>@") + "</a>" +
        '<button class="icon-btn email__copy" type="button" data-copy="' + esc(email) + '" aria-label="Copy email address">' +
          COPY_ICONS +
        "</button>" +
        '<span class="sr-only" role="status"></span>' +
      "</div>"
    );
  }

  /* ---- hero: the lead story across the full width ------------------------ */

  function hero() {
    var host = el("hero");
    var p = D.profile;
    if (!host || !p) return;

    var secondary = (p.links || []).filter(function (l) { return l.href.indexOf("mailto:") !== 0; });

    var lead =
      '<div class="tile tile--12 tile--photo story story--lead reveal" style="--i:0">' +
        '<div class="story__photo portrait-frame">' +
          '<img class="portrait" src="' + esc(p.avatar) + '" alt="' + esc(p.avatarAlt || p.name) +
            '" width="800" height="1000" fetchpriority="high" />' +
        "</div>" +
        '<div class="story__body lead">' +
          '<h1 class="lead__name" id="hero-name">' + esc(p.name) + "</h1>" +
          '<p class="lead__role">' + esc(p.role) + "</p>" +
          (p.tagline ? '<p class="lead__tagline">' + esc(p.tagline) + "</p>" : "") +
          '<div class="lead__actions">' +
            button("Get in touch", "#contact", "primary") +
            secondary.map(function (l) { return button(l.label, l.href, "secondary"); }).join("") +
          "</div>" +
          emailLine("lead__email") +
        "</div>" +
      "</div>";

    host.innerHTML = lead;
  }

  /* ---- about: the description in one box, the quick facts in another ----- */

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
      '<div class="tile tile--7 story reveal">' +
        '<div class="story__body about__text">' +
          (D.about || []).map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") +
        "</div>" +
      "</div>" +
      '<div class="tile tile--5 story reveal" style="--i:1">' +
        '<dl class="story__body facts">' +
          facts.map(function (f) { return "<div><dt>" + esc(f[0]) + "</dt><dd>" + esc(f[1]) + "</dd></div>"; }).join("") +
        "</dl>" +
      "</div>";
  }

  /* ---- experience: one wide story per job --------------------------------- */

  function experience() {
    var host = el("experience-grid");
    if (!host || !D.experience) return;

    host.innerHTML = D.experience
      .map(function (job, i) {
        var points = (job.highlights || []).map(function (h) { return "<li>" + esc(h) + "</li>"; }).join("");
        return (
          '<article class="tile tile--12 story story--wide reveal" style="--i:' + i + '">' +
            picture({ art: job.art }) +
            '<div class="story__body">' +
              '<h3 class="story__title">' + esc(job.role) + "</h3>" +
              '<p class="story__sub">' + esc(job.company) + "</p>" +
              '<p class="story__meta">' + esc(job.period) + "</p>" +
              (points ? '<ul class="story__points">' + points + "</ul>" : "") +
              (job.tech && job.tech.length ? '<p class="story__tech">' + esc(job.tech.join(", ")) + "</p>" : "") +
            "</div>" +
          "</article>"
        );
      })
      .join("");
  }

  /* ---- projects ----------------------------------------------------------
     A story links out when it has a url, plays its own video when it has one,
     and otherwise says what is coming instead of linking nowhere. */

  var KIND = {
    site: { cta: "View site", soon: "Live site coming soon" },
    repo: { cta: "Open repository", soon: "Repository coming soon" },
    video: { cta: "Watch video", soon: "Video demo coming soon" },
    "case study": { cta: "Read case study", soon: "Case study coming soon" }
  };

  // The system drawn as parts wired top to bottom, from the project's `flow`
  function flow(p) {
    if (!p.flow || !p.flow.length) return "";
    return (
      '<ol class="flow" aria-label="' + esc("How " + p.title + " is wired") + '">' +
        p.flow
          .map(function (n, i) {
            var last = i === p.flow.length - 1;
            return (
              '<li class="flow__node' + (n.hub ? " flow__node--hub" : "") + '" style="--n:' + i + '">' +
                (n.via ? '<span class="flow__via">' + esc(n.via) + "</span>" : "") +
                '<span class="flow__part">' + esc(n.part) + "</span>" +
                (n.note ? '<span class="flow__note">' + esc(n.note) + "</span>" : "") +
                (last ? "" : '<span class="flow__pulse" aria-hidden="true"></span>') +
              "</li>"
            );
          })
          .join("") +
      "</ol>"
    );
  }

  // The "Read more" window: a project's `more` blocks as a modal sheet
  var CLOSE_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6 6 18" /></svg>';

  function block(b) {
    if (b.h) return "<h3>" + esc(b.h) + "</h3>";
    if (b.sub) return "<h4>" + esc(b.sub) + "</h4>";
    if (b.p) return "<p>" + esc(b.p) + "</p>";
    if (b.list) return "<ul>" + b.list.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>";
    if (b.table) {
      return (
        '<table class="sheet__table"><tbody>' +
          b.table.map(function (r) { return '<tr><th scope="row">' + esc(r[0]) + "</th><td>" + esc(r[1]) + "</td></tr>"; }).join("") +
        "</tbody></table>"
      );
    }
    return "";
  }

  function sheet(p) {
    var id = "more-" + slug(p.title);
    return (
      '<dialog class="sheet" id="' + id + '" aria-labelledby="' + id + '-title">' +
        '<div class="sheet__head">' +
          '<h2 class="sheet__title" id="' + id + '-title">' + esc(p.title) + "</h2>" +
          '<button class="icon-btn sheet__close" type="button" data-close aria-label="Close">' + CLOSE_ICON + "</button>" +
        "</div>" +
        // Focus lands on the text when the sheet opens, so arrow keys scroll it
        '<div class="sheet__body" tabindex="-1" autofocus>' +
          (p.more.length ? p.more.map(block).join("") : '<p class="sheet__empty">More about ' + esc(p.title) + " is on its way.</p>") +
        "</div>" +
      "</dialog>"
    );
  }

  function projects() {
    var host = el("projects-grid");
    if (!host || !D.projects) return;

    // Sheets live outside the stories, so a tilting card never moves them
    var sheets = el("sheets");
    if (sheets) {
      sheets.innerHTML = D.projects.filter(function (p) { return Array.isArray(p.more); }).map(sheet).join("");
    }

    host.innerHTML = D.projects
      .map(function (p, i) {
        var kind = KIND[p.kind] || { cta: "Open project", soon: "Link coming soon" };
        var foot = (p.url
          ? button(kind.cta, p.url, "primary")
          : p.video ? "" : '<p class="story__soon">' + esc(kind.soon) + "</p>") +
          // A `more` list (even an empty one) gives the story a Read more link
          (Array.isArray(p.more)
            ? '<button class="more-link draw-link" type="button" data-open="more-' + slug(p.title) + '" aria-haspopup="dialog">Read more</button>'
            : "");

        return (
          '<article class="tile tile--12 story story--project reveal" id="project-' + slug(p.title) + '" style="--i:' + i + '">' +
            picture(p, "story__art--banner") +
            '<div class="story__body project">' +
              '<div class="project__text">' +
                '<h3 class="project__title">' + esc(p.title) + "</h3>" +
                (p.subtitle ? '<p class="story__sub">' + esc(p.subtitle) + "</p>" : "") +
                '<p class="story__meta">' + esc([p.role, p.year].filter(Boolean).join(", ")) + "</p>" +
                '<p class="story__desc">' + esc(p.description) + "</p>" +
                (p.tech && p.tech.length ? '<p class="story__tech">' + esc(p.tech.join(", ")) + "</p>" : "") +
                (foot ? '<div class="story__foot">' + foot + "</div>" : "") +
              "</div>" +
              flow(p) +
            "</div>" +
          "</article>"
        );
      })
      .join("");
  }

  /* ---- skills: a box per group ------------------------------------------- */
  // The tools are the line; the group name sits under them like a story's date

  function skills() {
    var host = el("skills-grid");
    if (!host || !D.skills) return;
    host.innerHTML = D.skills
      .map(function (g, i) {
        return (
          '<div class="tile tile--4 story skill reveal" style="--i:' + (i % 3) + '">' +
            (window.Art ? window.Art.icon(g.icon) : "") +
            '<p class="skill__items">' + esc((g.items || []).join(", ")) + "</p>" +
            '<p class="skill__group">' + esc(g.title) + "</p>" +
          "</div>"
        );
      })
      .join("");
  }

  /* ---- education + certificates ------------------------------------------ */

  function education() {
    var host = el("education-grid");
    if (!host) return;

    var schools = (D.education || [])
      .map(function (e, i) {
        return (
          '<article class="tile tile--7 story reveal" style="--i:' + i + '">' +
            (e.logo
              // A school logo sits whole and centred on a light field, never cropped
              ? '<div class="story__art story__art--logo"><img src="' + esc(e.logo) + '" alt="' + esc(e.school + " logo") + '" loading="lazy" /></div>'
              : picture({ art: e.art })) +
            '<div class="story__body">' +
              '<h3 class="story__title">' + esc(e.school) + "</h3>" +
              '<p class="story__sub">' + esc(e.degree) + "</p>" +
              '<p class="story__meta">' + esc(e.period) + "</p>" +
              (e.detail ? '<p class="story__desc">' + esc(e.detail) + "</p>" : "") +
            "</div>" +
          "</article>"
        );
      })
      .join("");

    var certs = (D.certifications || [])
      .map(function (c) {
        return (
          "<li>" +
            '<p class="cert__name">' + esc(c.name) + "</p>" +
            '<p class="cert__issuer">' + esc(c.issuer) + (c.year ? ", " + esc(c.year) : "") + "</p>" +
            (c.url ? '<a class="cert__view draw-link" href="' + esc(c.url) + '"' + external(c.url) + ">View certificate</a>" : "") +
          "</li>"
        );
      })
      .join("");

    host.innerHTML =
      schools +
      '<article class="tile tile--5 story reveal" style="--i:1">' +
        picture({ art: "certificate" }, "story__art--banner") +
        '<div class="story__body">' +
          '<h3 class="story__title">Certificates</h3>' +
          '<ul class="certs">' + certs + "</ul>" +
        "</div>" +
      "</article>";
  }

  /* ---- contact + footer -------------------------------------------------- */

  function contact() {
    var blurb = el("contact-blurb");
    if (blurb && D.contact) blurb.textContent = D.contact.blurb || "";

    var email = el("contact-email");
    if (email) email.innerHTML = emailLine("contact__email");

    // The address is already on show, so only the other links become buttons
    var links = el("contact-links");
    if (links && D.profile && D.profile.links) {
      links.innerHTML = D.profile.links
        .filter(function (l) { return l.href.indexOf("mailto:") !== 0; })
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
