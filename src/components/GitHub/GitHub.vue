<template>
  <div class="gh-list">
    <loading v-if="loading"></loading>
    <git-hub-row v-else
                 v-for="(item, index) in lines"
                 :key="index"
                 :item="item"></git-hub-row>
  </div>
</template>

<script>
import axios from 'axios';
import Loading from '@/components/Loading.vue';
import GitHubRow from '@/components/GitHub/GitHubRow.vue';

export default {
  name: 'GitHub',
  components: { Loading, GitHubRow },
  data() {
    return {
      loading: true,
      lines: [],
    };
  },
  async created() {
    const response = await axios.get('https://gh-api.now.sh/');
    this.lines = response.data;
    this.loading = false;
  },
};
</script>

<style>
.gh-list {
  height: 75vh;
  overflow-x: hidden;
}
</style>
