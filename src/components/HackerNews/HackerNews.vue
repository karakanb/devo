<template>
  <div class="hn-list">
    <hacker-news-row v-for="(item, index) in lines"
                     :key="index"
                     :item="item"></hacker-news-row>
  </div>
</template>

<script>
import axios from 'axios';
import HackerNewsRow from './HackerNewsRow.vue';

export default {
  name: 'HackerNews',
  components: { HackerNewsRow },
  data() {
    return {
      lines: [],
    };
  },
  async created() {
    const response = await axios.get('https://hn-api.now.sh/');
    this.lines = response.data;
  },
};
</script>

<style>
.hn-list {
  height: 75vh;
  overflow-x: hidden;
}
</style>
