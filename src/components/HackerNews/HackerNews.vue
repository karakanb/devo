<template>
  <card title="Hacker News"
      :title-background-color="titleBackgroundColor"
      :icon="['fab', 'hacker-news-square']"
      :iconOnClick="updateData"
      externalLink="https://news.ycombinator.com"
      :title-font-color="titleFontColor">
    <template slot="card-body">
      <div class="hn-list">
        <loading v-if="loading"
            color="fe6501"></loading>
        <hacker-news-row v-else
            v-for="(item, index) in lines"
            :key="index"
            :item="item">
        </hacker-news-row>
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

  computed: {
    titleBackgroundColor() {
      return this.isNightMode ? '31363e' : 'fe6501';
    },

    titleFontColor() {
      return this.isNightMode ? 'fe6501' : 'ffffff';
    },

    ...mapState({
      lines: state => state.hackernews.data,
      isNightMode: state => state.settings.isNightMode,
    }),
  },
};
</script>

<style>
.hn-list {
  height: 100%;
}
</style>
