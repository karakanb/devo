<template>
  <div class="devto-list">
    <row v-for="(item, index) in lines" :key="index" :item="item"></row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Row from './Row.vue';

export default {
  name: 'Body',
  components: { Row },
  computed: {
    ...mapState({
      lines: state => state.devto.data,
    }),
  },
};
</script>

<style>
.devto-list > :last-child {
  border: none;
}
</style>
