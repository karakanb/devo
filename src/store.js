import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    github: {
      updated_at: 0,
      data: [],
    },
    hackernews: {
      updated_at: 0,
      data: [],
    },
    updated_at_threshold: 1 * 60000,
  },
  mutations: {
    setGithubData(state, data) {
      state.github.data = data;
      state.github.updated_at = Date.now();
    },
    setHackernewsData(state, data) {
      state.hackernews.data = data;
      state.hackernews.updated_at = Date.now();
    },
  },
  actions: {
    async updateHackernews(context, forced) {
      const threshold = context.state.updated_at_threshold;
      const now = new Date();
      if (now - context.state.hackernews.updated_at > threshold || forced) {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URI}/hackernews`);
        context.commit('setHackernewsData', response.data.data);
      }
    },
    async updateGithub(context, forced = false) {
      const threshold = context.state.updated_at_threshold;
      const now = new Date();
      if (now - context.state.github.updated_at > threshold || forced) {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URI}/github`);
        context.commit('setGithubData', response.data.data);
      }
    },
  },
});
