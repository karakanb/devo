<template>
  <card class="github-card"
      :title-background-color="titleBackgroundColor"
      title-font-color="ffffff"
      :icon="['fab', 'github']"
      :iconOnClick="updateData"
      externalLink="https://github.com/trending"
      title="GitHub Trending">
    <template slot="card-body">
      <div class="gh-list">
        <loading :color="loadingColor" v-if="loading"></loading>
        <git-hub-row v-else
            v-for="(item, index) in lines"
            :key="index"
            :item="item"></git-hub-row>
      </div>
    </template>
  </card>

</template>

<script>
import { mapState, mapActions } from 'vuex';
import Loading from '@/components/Loading.vue';
import GitHubRow from '@/components/GitHub/GitHubRow.vue';
import Card from '@/components/Card.vue';

export default {
  name: 'GitHub',
  components: { Loading, GitHubRow, Card },
  data() {
    return {
      loading: true,
    };
  },
  async created() {
    this.updateData(false);
  },
  methods: {
    async updateData(forced = true) {
      this.loading = true;
      await this.updateGitHub(forced);
      this.loading = false;
    },
    ...mapActions(['updateGitHub']),
  },

  computed: {
    titleBackgroundColor() {
      return this.isNightMode ? '31363e' : '25292f';
    },

    loadingColor() {
      return this.isNightMode ? 'ffffff' : '25292f';
    },

    ...mapState({
      lines: state => state.github.data,
      isNightMode: state => state.settings.isNightMode,
    }),
  },
};
</script>

<style>
.gh-list {
  height: 100%;
}

.github-card .card-body {
  max-height: 80vh;
}

@media only screen and (min-width: 1200px) {
  .github-card .card-body {
    max-height: initial;
  }
}
</style>
