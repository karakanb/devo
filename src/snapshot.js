// Saves the rendered page so public/snapshot.js can paint it on the next new tab
// before the app's JavaScript has loaded. Vue clears the container on mount and
// renders the live page in the same task, so the swap is not visible.

export const SNAPSHOT_KEY = 'devo-snapshot';

export const saveSnapshot = (container) => {
  if (!container) return;
  try {
    localStorage.setItem(SNAPSHOT_KEY, container.innerHTML);
  } catch (e) {
    // storage full or blocked: the next tab simply waits for the app, as before
  }
};

export const watchSnapshot = (store, container, delay = 1000) => {
  let timer = null;
  const save = () => {
    clearTimeout(timer);
    timer = null;
    saveSnapshot(container);
  };
  // after any state change (new data, settings), save once the page has re-rendered
  store.subscribe(() => {
    clearTimeout(timer);
    timer = setTimeout(save, delay);
  });
  // and when the tab is left, so the snapshot matches what was last on screen
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') save();
  });
  window.addEventListener('pagehide', save);
  timer = setTimeout(save, delay);
};
