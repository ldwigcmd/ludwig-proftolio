/* ==========================================================================
   theme-init.js — runs before first paint so the saved theme never flashes.
   Light is the default; dark is only ever applied by explicit choice.
   ========================================================================== */

(function () {
  var STORAGE_KEY = "portfolio-theme";
  var saved;

  try {
    saved = window.localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    saved = null;
  }

  var theme = saved === "dark" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  // Scroll-entry styles only apply when scripts run, so no-JS visitors see everything
  document.documentElement.classList.add("js");

  // Expose for theme.js so the key is defined in exactly one place
  window.THEME_STORAGE_KEY = STORAGE_KEY;
})();
