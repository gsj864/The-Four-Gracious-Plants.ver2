(function () {
  "use strict";

  var STORAGE_KEY = "fourgentle-theme";

  function getTheme() {
    return localStorage.getItem(STORAGE_KEY) || "light";
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  function toggleTheme() {
    var current = getTheme();
    var next = current === "dark" ? "light" : "dark";
    setTheme(next);
    updateToggleIcon(next);
  }

  function updateToggleIcon(theme) {
    var btn = document.getElementById("themeToggle");
    if (!btn) return;
    btn.textContent = theme === "dark" ? "\u2600" : "\uD83C\uDF19";
    btn.setAttribute("aria-label", theme === "dark" ? "라이트 모드" : "다크 모드");
  }

  function init() {
    var theme = getTheme();
    setTheme(theme);
    updateToggleIcon(theme);

    var btn = document.getElementById("themeToggle");
    if (btn) {
      btn.addEventListener("click", function () {
        toggleTheme();
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
