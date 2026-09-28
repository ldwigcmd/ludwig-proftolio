/* ==========================================================================
   nav.js — active section in the island, and the full-screen phone menu
   ========================================================================== */

window.Nav = (function () {
  function activeSection(links) {
    var sections = links
      .map(function (link) { return document.getElementById(link.getAttribute("href").slice(1)); })
      .filter(Boolean);
    if (!sections.length) return;

    function update() {
      var line = window.innerHeight * 0.35;
      var current = null;
      sections.forEach(function (s) {
        if (s.getBoundingClientRect().top <= line) current = s.id;
      });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = sections[sections.length - 1].id;
      }
      links.forEach(function (link) {
        var on = link.getAttribute("href") === "#" + current;
        link.classList.toggle("is-active", on);
        if (on) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    }

    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  function menu() {
    var btn = document.getElementById("menu-btn");
    var panel = document.getElementById("menu");
    if (!btn || !panel) return;

    var behind = [document.getElementById("content"), document.querySelector(".site-footer")].filter(Boolean);

    function setOpen(open) {
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.style.overflow = open ? "hidden" : "";
      behind.forEach(function (node) { node.inert = open; });
      if (open) {
        panel.hidden = false;
        void panel.offsetWidth; // commit the hidden state so the links animate in, one after another
        panel.classList.add("is-open");
      } else {
        panel.classList.remove("is-open");
        panel.hidden = true;
      }
    }

    btn.addEventListener("click", function () {
      setOpen(btn.getAttribute("aria-expanded") !== "true");
    });

    panel.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        btn.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) setOpen(false);
    });
  }

  function init() {
    activeSection(Array.prototype.slice.call(document.querySelectorAll(".island__link")));
    menu();
  }

  return { init: init };
})();
