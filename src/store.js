import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const GITHUB = 'github';
const HACKERNEWS = 'hackernews';
const PRODUCTHUNT = 'producthunt';

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    settings: {
      is24HourFormat: true,
      isNightMode: false,
      cards: [GITHUB, HACKERNEWS, PRODUCTHUNT],
    },
    github: {
      updated_at: 0,
      cache: 5 * 60000,
      data: [],
      responseDataKey: 'data',
    },
    hackernews: {
      updated_at: 0,
      cache: 5 * 60000,
      data: [],
      responseDataKey: 'data',
    },
    producthunt: {
      updated_at: 0,
      cache: 30 * 60000,
      data: [],
      responseDataKey: 'data',
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
  },
  mutations: {
    set24HourFormat(state, is24HourFormat) {
      state.settings.is24HourFormat = is24HourFormat;
    },
    setNightMode(state, isNightMode) {
      state.settings.isNightMode = isNightMode;
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
    set24HourFormat(context, is24HourFormat) {
      context.commit('set24HourFormat', is24HourFormat);
    },

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
        const response = await axios.get(url);
        let data = response.data;
        if ('responseDataKey' in platformConfig) {
          data = response.data[platformConfig.responseDataKey];
        }
        commit('setPlatformData', { platform, data });
      }
    },
  },
  getters: {
    getPlatformByIndex: state => cardIndex => state.settings.cards[cardIndex],
  },
});
