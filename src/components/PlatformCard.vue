<template>
  <card
    :titleBackgroundColor="this.titleBackgroundColorBasedOnMode"
    :titleFontColor="this.options.titleFontColor"
    :icon="this.options.icon"
    :externalLink="this.options.externalLink"
    :title="this.options.title"
    :iconOnClick="this.updateData"
  >
    <template slot="card-body">
      <div class="gh-list">
        <loading :color="loadingColorBasedOnMode" v-if="loading"></loading>
        <slot v-else name="card-body">
          <component :is="this.options.bodyComponentName"></component>
        </slot>
      </div>
    </template>
  </card>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import settings from '@/settings';
import Card from '@/components/Card.vue';
import Loading from '@/components/Loading.vue';
import * as BodyComponents from '@/components/bodies';

export default {
  name: 'PlatformCard',
  components: { Loading, Card, ...BodyComponents },
  props: {
    platform: {
      type: String,
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
      await this.updatePlatformData({ platform: this.platform, forced });
      this.loading = false;
    },

    ...mapActions(['updatePlatformData']),
  },

  computed: {
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
  },
};
</script>
