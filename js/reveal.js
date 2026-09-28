/* ==========================================================================
   reveal.js — cards and headings fade up as they enter the viewport
   ========================================================================== */

window.Reveal = (function () {
  // A scroll list shows a fade at its foot while there is more below
  function scrollCues() {
    document.querySelectorAll(".certs").forEach(function (list) {
      function update() {
        list.classList.toggle("has-more", list.scrollTop + list.clientHeight < list.scrollHeight - 4);
      }
      list.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update);
      if (document.fonts) document.fonts.ready.then(update); // heights settle once Geist loads
      update();
    });
  }

  function init() {
    scrollCues();

    var nodes = document.querySelectorAll(".reveal");
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || !("IntersectionObserver" in window)) {
      nodes.forEach(function (n) { n.classList.add("is-in"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.05 });

    nodes.forEach(function (n) { observer.observe(n); });

    // Drawn pictures with looping motion (drifting water, a blinking LED) run
    // only while on screen
    var playing = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle("is-playing", entry.isIntersecting);
      });
    });
    document.querySelectorAll(".story__art").forEach(function (n) { playing.observe(n); });
  }

  return { init: init };
})();
