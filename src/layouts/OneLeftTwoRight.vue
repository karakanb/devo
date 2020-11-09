<template>
  <div id="one-left-two-right-wrapper">
    <platform-card class="card-1" :cardIndex="0"></platform-card>
    <platform-card class="card-2" :cardIndex="1"></platform-card>
    <platform-card class="card-3" :cardIndex="2"></platform-card>
  </div>
</template>

<script>
import PlatformCard from '../components/PlatformCard.vue';

export default {
  name: 'OneLeftTwoRight',
  components: {
    PlatformCard,
  },
};
</script>

<style scoped>
#one-left-two-right-wrapper {
  height: 100%;
  display: grid;
  grid-gap: 0.5rem;
}

@media screen and (min-width: 1200px) {
  #one-left-two-right-wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }

  .card-1 {
    grid-area: 1 / 1 / 3 / 2;
  }
  .card-2 {
    grid-area: 1 / 2 / 2 / 3;
  }
  .card-3 {
    grid-area: 2 / 2 / 3 / 3;
  }
}
</style>
