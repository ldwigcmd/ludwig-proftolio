/* ==========================================================================
   theme.js — light / dark switching
   ========================================================================== */

window.Theme = (function () {
  var STORAGE_KEY = window.THEME_STORAGE_KEY || "portfolio-theme";
  var THEME_COLORS = { light: "#f5f5f7", dark: "#000000" };

  var root = document.documentElement;
  var toggle;
  var metaThemeColor;

  function current() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function apply(theme) {
    root.setAttribute("data-theme", theme);

    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", THEME_COLORS[theme]);
    }

    if (toggle) {
      var goingTo = theme === "dark" ? "light" : "dark";
      toggle.setAttribute("aria-pressed", String(theme === "dark"));
      toggle.setAttribute("aria-label", "Switch to " + goingTo + " mode");
      toggle.setAttribute("title", "Switch to " + goingTo + " mode");
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* storage unavailable (private mode) — the theme still applies for this visit */
    }
  }

  function init() {
    toggle = document.getElementById("theme-toggle");
    metaThemeColor = document.getElementById("meta-theme-color");

    apply(current());

    if (!toggle) return;

    toggle.addEventListener("click", function () {
      apply(current() === "dark" ? "light" : "dark");
    });
  }

  return { init: init, apply: apply, current: current };
})();
