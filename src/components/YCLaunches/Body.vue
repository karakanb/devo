<template>
  <div class="yc-list">
    <row v-for="item in lines" :key="item.id" :item="item"></row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Row from '@/components/YCLaunches/Row.vue';

export default {
  name: 'Body',
  components: { Row },
  computed: {
    ...mapState({
      lines: state => state.yclaunches.data,
    }),
  },
};
</script>

<style>
.yc-list > :last-child {
  border: none;
}
</style>
