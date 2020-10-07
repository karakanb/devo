<template>
  <div id="two-columns-wrapper">
    <platform-card :cardIndex="0"></platform-card>
    <platform-card :cardIndex="1"></platform-card>
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
#two-columns-wrapper {
  display: grid;
  grid-gap: 0.5rem;
}

@media screen and (min-width: 1200px) {
  #two-columns-wrapper {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
