<template>
  <div class="rd-list">
    <row v-for="item in lines" :key="item.id" :item="item"></row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Row from '@/components/Reddit/Row.vue';

export default {
  name: 'Body',
  components: { Row },
  computed: {
    ...mapState({
      lines: state => state.reddit.data,
    }),
  },
};
</script>

<style>
.rd-list > :last-child {
  border: none;
}
</style>
