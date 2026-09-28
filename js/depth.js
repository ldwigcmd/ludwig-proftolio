/* ==========================================================================
   depth.js — cards lean toward the pointer, catch the light, and their
   contents float at different depths. Mouse and trackpad only; touch screens
   and reduced motion keep the flat page.
   ========================================================================== */

window.Depth = (function () {
  function tilt(tile) {
    var frame = 0;

    // Start only after the card's fade-up has finished, so the two never fight.
    // Only first-screen stories fade in (base.css); the rest start live.
    function goLive() { tile.classList.add("tilt-live"); }
    if (!tile.classList.contains("reveal") || !tile.closest(".section--hero")) {
      goLive();
    } else {
      tile.addEventListener("transitionend", function done(e) {
        if (e.target !== tile || e.propertyName !== "opacity" || !tile.classList.contains("is-in")) return;
        tile.removeEventListener("transitionend", done);
        goLive();
      });
    }

    tile.addEventListener("pointermove", function (e) {
      if (!tile.classList.contains("tilt-live")) return;
      var cx = e.clientX, cy = e.clientY;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(function () {
        var r = tile.getBoundingClientRect();
        var x = Math.min(1, Math.max(0, (cx - r.left) / r.width));
        var y = Math.min(1, Math.max(0, (cy - r.top) / r.height));
        var amp = Math.min(3, 1500 / r.width); // wide cards lean less than narrow ones
        var s = tile.style;
        tile.classList.add("is-hovering");
        s.setProperty("--rx", ((0.5 - y) * 2 * amp).toFixed(2) + "deg");
        s.setProperty("--ry", ((x - 0.5) * 2 * amp).toFixed(2) + "deg");
        s.setProperty("--px", ((x - 0.5) * 2).toFixed(3));
        s.setProperty("--py", ((y - 0.5) * 2).toFixed(3));
        s.setProperty("--mx", (x * 100).toFixed(1) + "%");
        s.setProperty("--my", (y * 100).toFixed(1) + "%");
      });
    });

    tile.addEventListener("pointerleave", function () {
      cancelAnimationFrame(frame);
      tile.classList.remove("is-hovering");
      ["--rx", "--ry", "--px", "--py"].forEach(function (p) { tile.style.removeProperty(p); });
    });
  }

  // The glass island rises off the page once content scrolls beneath it
  function island() {
    var nav = document.getElementById("island");
    if (!nav) return;
    function update() { nav.classList.toggle("is-floating", window.scrollY > 8); }
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  function init() {
    island();

    var pointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!pointer || calm) return;

    // The contact card holds still: fields shouldn't move while someone types
    document.querySelectorAll(".tile").forEach(function (tile) {
      if (!tile.querySelector("form")) tilt(tile);
    });
  }

  return { init: init };
})();
