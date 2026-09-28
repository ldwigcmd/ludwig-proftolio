/* ==========================================================================
   reveal.js — cards and headings fade up as they enter the viewport
   ========================================================================== */

window.Reveal = (function () {
  function init() {
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
  }

  return { init: init };
})();
