<template>
  <div class="ph-list">
    <row v-for="(item, index) in lines" :key="index" :item="item"></row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Row from '@/components/ProductHunt/Row.vue';

export default {
  name: 'Body',
  components: { Row },
  computed: {
    ...mapState({
      lines: state => state.producthunt.data,
    }),
  },
};
</script>

<style>
.ph-list > :last-child {
  border: none;
}
</style>
