<template>
  <div id="three-columns-wrapper">
    <platform-card :cardIndex="0"></platform-card>
    <platform-card :cardIndex="1"></platform-card>
    <platform-card :cardIndex="2"></platform-card>
  </div>
</template>

<script>
import PlatformCard from '../components/PlatformCard.vue';

export default {
  components: {
    PlatformCard,
  },
  methods: {},
};
</script>

<style scoped>
#three-columns-wrapper {
  display: grid;
  grid-gap: 0.5rem;
}

@media screen and (min-width: 1200px) {
  #three-columns-wrapper {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
