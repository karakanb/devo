chrome.runtime.onInstalled.addListener((details) => {

  // remove the legacy state.
  chrome.storage.local.remove('vuex', () => { });

  // remove the state for the previous version.
  const manifestVersion = chrome.runtime.getManifest().version;
  if (details.previousVersion && details.previousVersion !== manifestVersion) {
    chrome.storage.local.remove(`vuex-state-${details.previousVersion}`, () => {
      console.log(`Successfully removed the old state for ${details.previousVersion}`);
    });
  }
});
