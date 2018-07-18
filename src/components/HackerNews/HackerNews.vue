<template>
  <div class="hn-list">
    <loading v-if="loading" color="fe6501"></loading>
    <hacker-news-row v-else v-for="(item, index) in lines"
                     :key="index"
                     :item="item"></hacker-news-row>
  </div>
</template>

<script>
import axios from 'axios';
import HackerNewsRow from './HackerNewsRow.vue';
import Loading from '@/components/Loading';

export default {
  name: 'HackerNews',
  components: { HackerNewsRow, Loading },
  data() {
    return {
      loading: true,
      lines: [],
    };
  },
  async created() {
    const response = await axios.get('https://hn-api.now.sh/');
    this.lines = response.data;
    this.loading = false;
  },
};
</script>

<style>
.hn-list {
  height: 75vh;
  overflow-x: hidden;
}
</style>
