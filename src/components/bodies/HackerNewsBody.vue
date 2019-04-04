<template>
  <div class="hn-list">
    <hacker-news-row v-for="(item, index) in lines" :key="index" :item="item"></hacker-news-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import HackerNewsRow from '@/components/HackerNews/HackerNewsRow.vue';

export default {
  name: 'HackerNewsBody',
  components: { HackerNewsRow },
  computed: {
    ...mapState({
      lines: state => state.hackernews.data,
    }),
  },
};
</script>

<style>
.hn-list {
  height: 100%;
}
</style>