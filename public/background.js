chrome.runtime.onInstalled.addListener((details) => {

  // remove the legacy state.
  localStorage.removeItem('vuex');

  // remove the state for the previous version.
  const manifestVersion = chrome.runtime.getManifest().version;
  if (details.previousVersion && details.previousVersion !== manifestVersion) {
    localStorage.removeItem(`vuex-state-${details.previousVersion}`);
    console.log(`Successfully removed the old state for ${details.previousVersion}`);
  }
});
