import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const distanceInMinutes = (dateInstance) => {
  const now = new Date();
  const diffMs = (now - dateInstance); // milliseconds between now & Christmas
  return Math.round(((diffMs % 86400000) % 3600000) / 60000);
};

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    github: [],
    hackernews: [],
    updated_at: {
      github: 0,
      hackernews: 0,
      threshold: 1 * 60000, // 1s = 60000ms
    },
  },
  mutations: {
    setGithubData(state, data) {
      state.github = data;
      state.updated_at.github = Date.now();
    },
    setHackernewsData(state, data) {
      state.hackernews = data;
      state.updated_at.hackernews = Date.now();
    },
  },
  actions: {
    async updateHackernews(context, forced) {
      const { threshold } = context.state.updated_at;
      if ((new Date()) - context.state.updated_at.hackernews > threshold || forced) {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URI}/hackernews`);
        context.commit('setHackernewsData', response.data.data);
      }
    },
    async updateGithub(context, forced = false) {
      const { threshold } = context.state.updated_at;
      if ((new Date()) - context.state.updated_at.github > threshold || forced) {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URI}/github`);
        context.commit('setGithubData', response.data.data);
      }
    },
  },
});
