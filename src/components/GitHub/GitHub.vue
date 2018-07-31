<template>
  <card class="github-card"
        title-background-color="25292f"
        title-font-color="ffffff"
        :icon="['fab', 'github']"
        :iconOnClick="updateData"
        title="GitHub Trending">
    <template slot="card-body">
      <div class="gh-list">
        <loading v-if="loading"></loading>
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
      await this.updateGithub(forced);
      this.loading = false;
    },
    ...mapActions(['updateGithub']),
  },

  computed: mapState({
    lines: state => state.github.data,
  }),
};
</script>

<style>
.gh-list {
  overflow-x: hidden;
  height: 100%;
}
</style>
