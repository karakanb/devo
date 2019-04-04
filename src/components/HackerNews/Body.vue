<template>
  <div class="hn-list">
    <row v-for="(item, index) in lines" :key="index" :item="item"></row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Row from '@/components/HackerNews/Row.vue';

export default {
  name: 'Body',
  components: { Row },
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