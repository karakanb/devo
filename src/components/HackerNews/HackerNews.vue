<template>
  <card title="Hacker News"
        title-background-color="fe6501"
        :icon="['fab', 'hacker-news-square']"
        :iconOnClick="updateData"
        externalLink="https://news.ycombinator.com"
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
import { mapState, mapActions } from 'vuex';
import Loading from '@/components/Loading';
import Card from '@/components/Card.vue';
import HackerNewsRow from './HackerNewsRow.vue';

export default {
  name: 'HackerNews',
  components: { HackerNewsRow, Loading, Card },
  data() {
    return {
      loading: false,
    };
  },
  async created() {
    this.updateData(false);
  },
  methods: {
    async updateData(forced = true) {
      this.loading = true;
      await this.updateHackerNews(forced);
      this.loading = false;
    },
    ...mapActions(['updateHackerNews']),
  },

  computed: mapState({
    lines: state => state.hackernews.data,
  }),
};
</script>

<style>
.hn-list {
  height: 100%;
}
</style>
