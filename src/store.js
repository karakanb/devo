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
      isNightMode: false,
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
      cache: 30 * 60000,
      data: [],
    },
    designernews: {
      updated_at: 0,
      cache: 5 * 60000,
      data: [],
      responseDataKey: 'stories',
    },
  },
  mutations: {
    setGitHubData(state, data) {
      state.github.data = data;
      state.github.updated_at = Date.now();
    },
    setHackerNewsData(state, data) {
      state.hackernews.data = data;
      state.hackernews.updated_at = Date.now();
    },
    setProductHuntData(state, data) {
      state.producthunt.data = data;
      state.producthunt.updated_at = Date.now();
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
        let data = response.data.data;
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
