import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    settings: {
      is_night_mode: false,
    },
    github: {
      updated_at: 0,
      data: [],
    },
    hackernews: {
      updated_at: 0,
      data: [],
    },
    producthunt: {
      updated_at: 0,
      data: [],
    },
    updated_at_thresholds: {
      github: 5 * 60000,
      hackernews: 5 * 60000,
      producthunt: 30 * 60000,
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
      state.settings.is_night_mode = isNightMode;
    },
  },
  actions: {

    setNightMode(context, isNightMode) {
      context.commit('setNightMode', isNightMode);
    },

    /**
     * Update the Hacker News response content.
     * Respects the memoization a threshold TTL, and can be forced. 
     * @param {any} context context instance.
     * @param {boolean} forced - whether this update is forced.
     */
    async updateHackerNews(context, forced = false) {
      const threshold = context.state.updated_at_thresholds.hackernews;
      const lastUpdate = context.state.hackernews.updated_at;
      const now = new Date();

      if (!lastUpdate || now - lastUpdate > threshold || forced) {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URI}/hackernews`);
        context.commit('setHackerNewsData', response.data.data);
      }
    },

    /**
     * Update the GitHub Trending response content.
     * Respects the memoization a threshold TTL, and can be forced.
     * @param {any} context context instance.
     * @param {boolean} forced - whether this update is forced.
     */
    async updateGitHub(context, forced = false) {
      const threshold = context.state.updated_at_thresholds.github;
      const lastUpdate = context.state.github.updated_at;
      const now = new Date();

      if (!lastUpdate || now - lastUpdate > threshold || forced) {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URI}/github`);
        context.commit('setGitHubData', response.data.data);
      }
    },

    /**
     * Update the Product Hunt response content.
     * Respects the memoization a threshold TTL, and can be forced.
     * @param {any} context context instance.
     * @param {boolean} forced - whether this update is forced.
     */
    async updateProductHunt(context, forced = false) {
      const threshold = context.state.updated_at_thresholds.producthunt;
      const lastUpdate = context.state.producthunt.updated_at;
      const now = new Date();

      if (!lastUpdate || now - lastUpdate > threshold || forced) {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URI}/producthunt`);
        context.commit('setProductHuntData', response.data.data);
      }
    },
  },
});
