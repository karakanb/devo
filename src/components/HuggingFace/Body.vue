<template>
  <div class="hf-list">
    <row v-for="item in lines" :key="item.id" :item="item"></row>
    <div v-if="lines.length === 0" class="hf-empty">Nothing found. Try other filters in the settings.</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Row from '@/components/HuggingFace/Row.vue';

export default {
  name: 'Body',
  components: { Row },
  computed: {
    ...mapState({
      lines: state => state.huggingface.data,
    }),
  },
};
</script>

<style>
.hf-list > :last-child {
  border: none;
}

.hf-empty {
  padding: 16px 0;
  text-align: left;
  color: rgb(130, 130, 130);
}
</style>
