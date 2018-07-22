<template>
  <card class="github-card"
        title-background-color="25292f"
        title-font-color="ffffff"
        :icon="['fab', 'github']"
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
import axios from 'axios';
import Loading from '@/components/Loading.vue';
import GitHubRow from '@/components/GitHub/GitHubRow.vue';
import Card from '@/components/Card.vue';

export default {
  name: 'GitHub',
  components: { Loading, GitHubRow, Card },
  data() {
    return {
      loading: true,
      lines: [],
    };
  },
  async created() {
    this.updateData();
  },
  methods: {
    async updateData() {
      this.loading = true;
      const response = await axios.get('https://gh-api.now.sh/');
      this.lines = response.data;
      this.loading = false;
    },
  },
};
</script>

<style>
.gh-list {
  height: 75vh;
  overflow-x: hidden;
}
</style>
