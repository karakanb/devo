<template>
  <div id="single-column-wrapper">
    <platform-card :cardIndex="0"></platform-card>
  </div>
</template>

<script>
import PlatformCard from '../components/PlatformCard.vue';

export default {
  name: 'SingleColumn',
  components: {
    PlatformCard,
  },
};
</script>

<style scoped>
@media screen and (min-width: 1200px) {
  #single-column-wrapper {
    height: 100%;
  }
}
</style>
