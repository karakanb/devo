<template>
  <div>
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
