import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const GITHUB = 'github';
const HACKERNEWS = 'hackernews';
const PRODUCTHUNT = 'producthunt';
const DESIGNERNEWS = 'designernews';

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
  const defaultValue = 'default-version';
  if (typeof chrome === 'undefined' && typeof browser === 'undefined') {
    return defaultValue;
  }

  /* global chrome, browser */
  const browserInstance = chrome || browser;
  if (('getManifest' in browserInstance.runtime)) {
    return defaultValue;
  }

  if (typeof browserInstance.runtime.getManifest !== 'function') {
    return defaultValue;
  }

  const manifest = browserInstance.runtime.getManifest();
  return 'version' in manifest ? manifest.version : defaultValue;
};


export default new Vuex.Store({
  plugins: [createPersistedState({
    key: `vuex-state-${getVersion()}`,
  })],
  state: {
    settings: {
      is24HourFormat: true,
      isNightMode: getIsNightMode(),
      cards: [GITHUB, HACKERNEWS, PRODUCTHUNT, DESIGNERNEWS],
      layout: 'OneLeftTwoRight',
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
    set24HourFormat(state, is24HourFormat) {
      state.settings.is24HourFormat = is24HourFormat;
    },
    setNightMode(state, isNightMode) {
      state.settings.isNightMode = isNightMode;
      localStorage.setItem(SETTINGS_ISNIGHTMODE, isNightMode);
    },
    setCardPlatform(state, { index, platform }) {
      Vue.set(state.settings.cards, index, platform);
    },
    setLayout(state, layout) {
      state.settings.layout = layout;
    },
    setPlatformData(state, { platform, data }) {
      state[platform].data = data;
      state[platform].updated_at = Date.now();
    },
  },
  actions: {
    set24HourFormat(context, is24HourFormat) {
      context.commit('set24HourFormat', is24HourFormat);
    },

    setNightMode(context, isNightMode) {
      context.commit('setNightMode', isNightMode);
    },

    setCardPlatform(context, payload) {
      context.commit('setCardPlatform', payload);
    },

    setLayout(context, layout) {
      context.commit('setLayout', layout);
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
