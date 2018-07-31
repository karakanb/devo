<template>
  <card title="Product Hunt"
        title-background-color="da5430"
        :icon="['fab', 'product-hunt']"
        :iconOnClick="updateData"
        title-font-color="ffffff">
    <template slot="card-body">
      <div class="ph-list">
        <loading v-if="loading"
                 color="fe6501"></loading>
        <product-hunt-row v-for="(item, index) in lines"
                          :key="index"
                          :item="item"></product-hunt-row>
      </div>
    </template>
  </card>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Loading from '@/components/Loading';
import Card from '@/components/Card.vue';
import ProductHuntRow from './ProductHuntRow.vue';

export default {
  name: 'ProductHunt',
  components: { ProductHuntRow, Loading, Card },
  data() {
    return {
      loading: false,
    };
  },
  async created() {
    this.updateData(false);
  },
  methods: {
    async updateData(forced = true) {
      this.loading = true;
      await this.updateProductHunt(forced);
      this.loading = false;
    },
    ...mapActions(['updateProductHunt']),
  },
  computed: mapState({
    lines: state => state.producthunt.data,
  }),
};
</script>

<style>
.ph-list {
  height: 100%;
  overflow-x: auto;
}
</style>
