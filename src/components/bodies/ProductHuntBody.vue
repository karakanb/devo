<template>
  <div class="ph-list">
    <row v-for="(item, index) in lines" :key="index" :item="item"></row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Row from '@/components/ProductHunt/ProductHuntRow.vue';

export default {
  name: 'ProductHuntBody',
  components: { Row },
  computed: {
    ...mapState({
      lines: state => state.producthunt.data,
    }),
  },
};
</script>

<style>
.ph-list {
  height: 100%;
}
</style>