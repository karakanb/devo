<template>
  <div class="dn-list">
    <row v-for="(item, index) in lines" :key="index" :item="item"></row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Row from '@/components/DesignerNews/Row.vue';

export default {
  name: 'Body',
  components: { Row },
  computed: {
    ...mapState({
      lines: state => state.designernews.data,
    }),
  },
};
</script>

<style>
.dn-list > :last-child {
  border: none;
}
</style>
