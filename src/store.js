import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const GITHUB = 'github';
const HACKERNEWS = 'hackernews';
const PRODUCTHUNT = 'producthunt';
const DESIGNERNEWS = 'designernews';

// Legacy key: set only when the user explicitly toggled night mode in older versions.
const SETTINGS_ISNIGHTMODE = 'settings.isNightMode';
const SETTINGS_THEMEMODE = 'settings.themeMode';

export const THEME_SYSTEM = 'system';
export const THEME_LIGHT = 'light';
export const THEME_DARK = 'dark';
const THEME_MODES = [THEME_SYSTEM, THEME_LIGHT, THEME_DARK];

const darkModeMediaQuery = typeof window !== 'undefined' && 'matchMedia' in window
  ? window.matchMedia('(prefers-color-scheme: dark)')
  : null;

const getSystemPrefersDark = () => Boolean(darkModeMediaQuery && darkModeMediaQuery.matches);

/**
 * @returns {String} - the user's saved theme mode, migrating the legacy explicit toggle, defaulting to 'system'.
 */
const getInitialThemeMode = () => {
  const saved = localStorage.getItem(SETTINGS_THEMEMODE);
  if (THEME_MODES.includes(saved)) {
    return saved;
  }

  const legacy = localStorage.getItem(SETTINGS_ISNIGHTMODE);
  if (legacy === 'true') {
    return THEME_DARK;
  }
  if (legacy === 'false') {
    return THEME_LIGHT;
  }

  return THEME_SYSTEM;
};

const resolveIsNightMode = (themeMode, systemPrefersDark) => {
  if (themeMode === THEME_DARK) {
    return true;
  }
  if (themeMode === THEME_LIGHT) {
    return false;
  }
  return systemPrefersDark;
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
  if (!browserInstance || !browserInstance.runtime) {
    return defaultValue;
  }

  if (!('getManifest' in browserInstance.runtime)) {
    return defaultValue;
  }

  if (typeof browserInstance.runtime.getManifest !== 'function') {
    return defaultValue;
  }

  const manifest = browserInstance.runtime.getManifest();
  return 'version' in manifest ? manifest.version : defaultValue;
};


const store = createStore({
  plugins: [createPersistedState({
    key: `vuex-state-${getVersion()}`,
  })],
  state: {
    settings: {
      is24HourFormat: true,
      themeMode: getInitialThemeMode(),
      systemPrefersDark: getSystemPrefersDark(),
      isNightMode: resolveIsNightMode(getInitialThemeMode(), getSystemPrefersDark()),
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
    tabnews: {
      updated_at: 0,
      cache: 5 * 60000,
      data: [],
    },
  },
  mutations: {
    set24HourFormat(state, is24HourFormat) {
      state.settings.is24HourFormat = is24HourFormat;
    },
    setThemeMode(state, themeMode) {
      if (!THEME_MODES.includes(themeMode)) {
        return;
      }
      state.settings.themeMode = themeMode;
      state.settings.isNightMode = resolveIsNightMode(themeMode, state.settings.systemPrefersDark);
      localStorage.setItem(SETTINGS_THEMEMODE, themeMode);
      localStorage.removeItem(SETTINGS_ISNIGHTMODE);
    },
    setSystemPrefersDark(state, systemPrefersDark) {
      state.settings.systemPrefersDark = systemPrefersDark;
      state.settings.isNightMode = resolveIsNightMode(state.settings.themeMode, systemPrefersDark);
    },
    setCardPlatform(state, { index, platform }) {
      state.settings.cards[index] = platform;
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

    setThemeMode(context, themeMode) {
      context.commit('setThemeMode', themeMode);
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
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} for ${url}`);
        }
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

// The persisted state may hold a stale system preference; sync it now and follow OS changes live.
store.commit('setSystemPrefersDark', getSystemPrefersDark());
if (darkModeMediaQuery) {
  const onChange = (event) => store.commit('setSystemPrefersDark', event.matches);
  if (typeof darkModeMediaQuery.addEventListener === 'function') {
    darkModeMediaQuery.addEventListener('change', onChange);
  } else if (typeof darkModeMediaQuery.addListener === 'function') {
    darkModeMediaQuery.addListener(onChange);
  }
}

export default store;
