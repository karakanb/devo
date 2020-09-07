<template>
  <div class="lr-list">
    <row v-for="(item, index) in lines" :key="index" :item="item"></row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Row from '@/components/Lobsters/Row.vue';

export default {
  name: 'Body',
  components: { Row },
  computed: {
    ...mapState({
      lines: state => state.lobsters.data,
    }),
  },
};
</script>

<style>
.lr-list > :last-child {
  border: none;
}
</style>
