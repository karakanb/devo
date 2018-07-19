<template>
  <div class="gh-list">
    <git-hub-row></git-hub-row>
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue';
import GitHubRow from '@/components/GitHub/GitHubRow.vue';

export default {
  name: 'GitHub',
  components: { Loading, GitHubRow },
  data() {
    return {
      lines: [],
    };
  },
};
</script>

<style>
.gh-list {
  height: 75vh;
  overflow-x: hidden;
}
</style>
