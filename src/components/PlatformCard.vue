<template>
  <card
    :titleBackgroundColor="this.titleBackgroundColorBasedOnMode"
    :titleFontColor="this.titleFontColorBasedOnMode"
    :icon="options.icon"
    :externalLink="options.externalLink"
    :title="options.title"
    :iconOnClick="updateData"
  >
    <template #card-title>
      <custom-select :cardIndex="cardIndex"></custom-select>
    </template>
    <template #card-body>
      <loading :color="loadingColorBasedOnMode" v-if="loading"></loading>
      <slot v-else name="card-body">
        <component :is="options.bodyComponentName"></component>
      </slot>
    </template>
  </card>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import settings from '@/settings';
import Card from '@/components/Card.vue';
import Loading from '@/components/Loading.vue';
import CustomSelect from '@/components/PlatformSelect.vue';
import * as BodyComponents from '@/components/bodies';

export default {
  name: 'PlatformCard',
  components: {
    ...BodyComponents,
    Loading,
    Card,
    CustomSelect,
  },
  props: {
    cardIndex: {
      type: Number,
      required: true,
    },
  },
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
      this.loading = true;
      await this.updatePlatformData({
        platform: this.platform,
        url: this.options.dataUrl instanceof Function ? this.options.dataUrl() : this.options.dataUrl,
        forced,
      });
      this.loading = false;
    },

    ...mapActions(['updatePlatformData']),
  },

  computed: {
    platform() {
      return this.getPlatformByIndex(this.cardIndex);
    },

    titleFontColorBasedOnMode() {
      return this.isNightMode ? this.options.nightMode.titleFontColor : this.options.titleFontColor;
    },

    titleBackgroundColorBasedOnMode() {
      return this.isNightMode ? this.options.nightMode.titleBackgroundColor : this.options.titleBackgroundColor;
    },

    loadingColorBasedOnMode() {
      return this.isNightMode ? this.options.nightMode.loadingColor : this.options.loadingColor;
    },

    options() {
      return settings.platforms[this.platform];
    },

    ...mapState({
      isNightMode: state => state.settings.isNightMode,
    }),

    ...mapGetters(['getPlatformByIndex']),
  },

  watch: {
    platform() {
      this.updateData(false);
    },
  },
};
</script>
