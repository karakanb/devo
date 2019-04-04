<template>
  <div class="gh-list">
    <git-hub-row v-for="(item, index) in lines" :key="index" :item="item"></git-hub-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import GitHubRow from '@/components/GitHub/GitHubRow.vue';

export default {
  name: 'GitHubBody',
  components: { GitHubRow },
  computed: {
    ...mapState({
      lines: state => state.github.data,
    }),
  },
};
</script>
