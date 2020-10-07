<template>
  <div id="two-rows-two-columns-wrapper">
    <platform-card class="card-1" :cardIndex="0"></platform-card>
    <platform-card class="card-2" :cardIndex="1"></platform-card>
    <platform-card class="card-3" :cardIndex="2"></platform-card>
    <platform-card class="card-4" :cardIndex="3"></platform-card>
  </div>
</template>

<script>
import PlatformCard from '../components/PlatformCard.vue';

export default {
  components: {
    PlatformCard,
  },
};
</script>

<style scoped>
#two-rows-two-columns-wrapper {
  height: 100%;
  display: grid;
  grid-gap: 0.5rem;
}

@media screen and (min-width: 1200px) {
  #two-rows-two-columns-wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }

  .card-1 {
    grid-area: 1 / 1 / 2 / 2;
  }

  .card-2 {
    grid-area: 1 / 2 / 2 / 3;
  }

  .card-3 {
    grid-area: 2 / 1 / 3 / 2;
  }

  .card-4 {
    grid-area: 2 / 2 / 3 / 3;
  }
}
</style>
