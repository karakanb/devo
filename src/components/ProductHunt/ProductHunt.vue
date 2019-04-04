<template>
  <card title="Product Hunt"
      :title-background-color="titleBackgroundColor"
      :icon="['fab', 'product-hunt']"
      :iconOnClick="updateData"
      externalLink="https://www.producthunt.com"
      :title-font-color="titleFontColor">
    <template slot="card-body">
      <div class="ph-list">
        <loading v-if="loading"
            color="da5430"></loading>
        <product-hunt-row v-else
            v-for="(item, index) in lines"
            :key="index"
            :item="item">
        </product-hunt-row>
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
  computed: {
    titleBackgroundColor() {
      return this.isNightMode ? '31363e' : 'da5430';
    },

    titleFontColor() {
      return this.isNightMode ? 'da5430' : 'ffffff';
    },

    ...mapState({
      lines: state => state.producthunt.data,
      isNightMode: state => state.settings.isNightMode,
    }),
  },
};
</script>

<style>
.ph-list {
  height: 100%;
}
</style>
