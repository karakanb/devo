// Paints the last rendered page (saved by src/snapshot.js) right away, before the
// app bundle loads. It runs as a plain blocking script because extension pages
// do not allow inline scripts. The app replaces this markup when it mounts.
(function paintSnapshot() {
  try {
    var html = localStorage.getItem('devo-snapshot');
    var app = document.getElementById('app');
    if (!html || !app) return;
    app.innerHTML = html;

    // the saved clock is stale: show the current time and date in the user's format
    var is24 = true;
    for (var i = 0; i < localStorage.length; i += 1) {
      var key = localStorage.key(i);
      if (key.indexOf('vuex-state-') === 0) {
        var settings = (JSON.parse(localStorage.getItem(key)) || {}).settings;
        if (settings && settings.is24HourFormat === false) is24 = false;
        break;
      }
    }
    var now = new Date();
    var time = app.querySelector('.date-time .time');
    var date = app.querySelector('.date-time .date');
    if (time) {
      time.textContent = is24
        ? String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0')
        : now.toLocaleTimeString({}, { hour12: true, hour: 'numeric', minute: 'numeric' }).toUpperCase();
    }
    if (date) {
      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      date.textContent = days[now.getDay()] + ', ' + months[now.getMonth()] + ' ' + now.getDate();
    }
  } catch (e) {
    // no snapshot then: the app renders as usual
  }
}());
