import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const GITHUB = 'github';
const HACKERNEWS = 'hackernews';
const PRODUCTHUNT = 'producthunt';

const SETTINGS_ISNIGHTMODE = 'settings.isNightMode';

/**
 * @returns {Boolean} - in priority: the user's existing selection > their dark mode preference > false
 */
const getIsNightMode = () => {
  const localVersion = localStorage.getItem(SETTINGS_ISNIGHTMODE);
  if (localVersion) {
    return JSON.parse(localVersion);
  }

  const hasMatchMedia = 'matchMedia' in window;
  if (!hasMatchMedia) {
    return false;
  }

  const darkModeQuery = '(prefers-color-scheme: dark)';
  return window.matchMedia(darkModeQuery).matches;
};

/**
 * @returns {String} - the version number of the extension to version the state.
 */
const getVersion = () => {
  if (!(window.chrome || false)) {
    return 'default-version';
  }

  const manifest = chrome.runtime.getManifest();
  return 'version' in manifest ? manifest.version : 'default-version';
};


export default new Vuex.Store({
  plugins: [createPersistedState({
    key: `vuex-state-${getVersion()}`,
  })],
  state: {
    settings: {
      isNightMode: getIsNightMode(),
      cards: [GITHUB, HACKERNEWS, PRODUCTHUNT],
    },
    github: {
      updated_at: 0,
      cache: 5 * 60000,
      data: [],
    },
    hackernews: {
      updated_at: 0,
      cache: 5 * 60000,
      data: [],
    },
    producthunt: {
      updated_at: 0,
      cache: 15 * 60000,
      data: [],
    },
    designernews: {
      updated_at: 0,
      cache: 5 * 60000,
      data: [],
      responseDataKey: 'stories',
    },
    devto: {
      updated_at: 0,
      cache: 5 * 60000,
      data: [],
    },
    lobsters: {
      updated_at: 0,
      cache: 5 * 60000,
      data: [],
    },
  },
  mutations: {
    setNightMode(state, isNightMode) {
      state.settings.isNightMode = isNightMode;
      localStorage.setItem(SETTINGS_ISNIGHTMODE, isNightMode);
    },
    setCardPlatform(state, { index, platform }) {
      Vue.set(state.settings.cards, index, platform);
    },
    setPlatformData(state, { platform, data }) {
      state[platform].data = data;
      state[platform].updated_at = Date.now();
    },
  },
  actions: {
    setNightMode(context, isNightMode) {
      context.commit('setNightMode', isNightMode);
    },

    setCardPlatform(context, payload) {
      context.commit('setCardPlatform', payload);
    },

    async updatePlatformData({ state, commit }, { platform, forced, url }) {
      const platformConfig = state[platform];
      const threshold = platformConfig.cache;
      const lastUpdate = platformConfig.updated_at;
      const now = new Date();

      if (!lastUpdate || now - lastUpdate > threshold || forced) {
        const response = await fetch(url);
        let data = await response.json();
        if ('responseDataKey' in platformConfig) {
          data = data[platformConfig.responseDataKey];
        }
        commit('setPlatformData', { platform, data });
      }
    },
  },
  getters: {
    getPlatformByIndex: state => cardIndex => state.settings.cards[cardIndex],
  },
});
