<template>
  <card title="Hacker News"
        title-background-color="fe6501"
        :icon="['fab', 'hacker-news-square']"
        title-font-color="ffffff">
    <template slot="card-body">
      <div class="hn-list">
        <loading v-if="loading"
                 color="fe6501"></loading>
        <hacker-news-row v-else
                         v-for="(item, index) in lines"
                         :key="index"
                         :item="item"></hacker-news-row>
      </div>
    </template>
  </card>
</template>

<script>
import axios from 'axios';
import Loading from '@/components/Loading';
import Card from '@/components/Card.vue';
import HackerNewsRow from './HackerNewsRow.vue';

export default {
  name: 'HackerNews',
  components: { HackerNewsRow, Loading, Card },
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
