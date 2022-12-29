<template>
  <div class="tn-list">
    <row v-for="(item, index) in lines" :key="index" :item="item"></row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Row from '@/components/TabNews/Row.vue';

export default {
  name: 'Body',
  components: { Row },
  computed: {
    ...mapState({
      lines: state => state.tabnews.data,
    }),
  },
};
</script>

<style>
.tn-list > :last-child {
  border: none;
}
</style>
