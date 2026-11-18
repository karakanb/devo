// Runs first in <head>, before any stylesheet, so the very first frame of a new tab
// already has the page's own background instead of a white flash. It mirrors the
// theme choice in src/store.js: saved app state > saved toggle > system preference.
// It is a file, not an inline script, because extension pages do not allow inline scripts.
(function paintBackground() {
  var night = null;
  try {
    for (var i = 0; i < localStorage.length; i += 1) {
      var key = localStorage.key(i);
      if (key.indexOf('vuex-state-') === 0) {
        var settings = (JSON.parse(localStorage.getItem(key)) || {}).settings;
        if (settings && typeof settings.isNightMode === 'boolean') night = settings.isNightMode;
        break;
      }
    }
    if (night === null) {
      var saved = localStorage.getItem('settings.isNightMode');
      if (saved) night = JSON.parse(saved);
    }
  } catch (e) {
    // storage blocked: fall back to the system preference
  }
  if (night === null) {
    night = !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
  // same colors as #app in src/App.vue
  document.documentElement.style.backgroundColor = night ? '#25292f' : '#f5f7fa';
}());
