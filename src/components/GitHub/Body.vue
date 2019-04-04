<template>
  <div class="gh-list">
    <row v-for="(item, index) in lines" :key="index" :item="item"></row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Row from '@/components/GitHub/Row.vue';

export default {
  name: 'Body',
  components: { Row },
  computed: {
    ...mapState({
      lines: state => state.github.data,
    }),
  },
};
</script>
