<template>
  <div class="rd-list">
    <row v-for="item in lines" :key="item.id" :item="item" :subreddit-in-title="subredditInTitle"></row>
    <div v-if="lines.length === 0" class="rd-empty">No posts found. Check the subreddit names in the settings.</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Row from '@/components/Reddit/Row.vue';
import { normalizeSubredditPlacement } from '@/components/Reddit/reddit';

export default {
  name: 'Body',
  components: { Row },
  computed: {
    ...mapState({
      lines: state => state.reddit.data,
      // settings saved by an older version have no placement yet.
      subredditInTitle: state => normalizeSubredditPlacement(state.reddit.settings.subredditPlacement) === 'title',
    }),
  },
};
</script>

<style>
.rd-list > :last-child {
  border: none;
}

.rd-empty {
  padding: 16px 0;
  text-align: left;
  color: rgb(130, 130, 130);
}
</style>
