<template>
  <div class="gh-list">
    <loading></loading>
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue';

export default {
  name: 'GitHub',
  components: { Loading },
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
