/* ==========================================================================
   main.js — boots the page in the right order
   ========================================================================== */

(function () {
  function start() {
    window.Render.all();
    window.Theme.init();
    window.Nav.init();
    window.Reveal.init();
    window.Contact.init();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
