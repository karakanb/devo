<template>
  <card title="Product Hunt"
        title-background-color="da5430"
        :icon="['fab', 'product-hunt']"
        :iconOnClick="updateData"
        title-font-color="ffffff">
    <template slot="card-body">
      <div class="hn-list">
        <loading v-if="loading"
                 color="fe6501"></loading>
        <product-hunt-row v-else
                          v-for="(item, index) in lines"
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
      loading: true,
    };
  },
  async created() {
    this.updateData(false);
  },
  methods: {
    async updateData(forced = true) {
      //
    },
    ...mapActions(['updateHackernews']),
  },
  computed: mapState({
    lines: state => state.hackernews,
  }),
};
</script>

<style>
.hn-list {
  height: 100%;
  overflow-x: hidden;
}
</style>
