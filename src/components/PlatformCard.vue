<template>
  <card
    :title-background-color="titleBackgroundColorBasedOnMode"
    :title-font-color="titleFontColor"
    :icon="icon"
    :iconOnClick="updateData"
    :externalLink="externalLink"
    :title="title"
  >
    <template slot="card-body">
      <div class="gh-list">
        <loading :color="loadingColorBasedOnMode" v-if="loading"></loading>
        <slot name="card-body"></slot>
      </div>
    </template>
  </card>
</template>

<script>
import { mapState } from 'vuex';
import Loading from '@/components/Loading.vue';
import Card from '@/components/Card.vue';

export default {
  name: 'PlatformCard',
  components: { Loading, Card },
  props: {
    title: {
      type: String,
      required: true,
    },
    titleBackgroundColor: {
      type: String,
      required: true,
    },
    titleFontColor: {
      type: String,
      required: true,
    },
    icon: {
      required: true,
      type: Array,
    },
    externalLink: {
      required: true,
      type: String,
    },
    updateDataFunction: {
      required: true,
      type: Function,
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
      await this.updateDataFunction(forced);
      this.loading = false;
    },
  },

  computed: {
    titleBackgroundColorBasedOnMode() {
      return this.isNightMode ? '31363e' : this.titleBackgroundColor;
    },

    loadingColorBasedOnMode() {
      return this.isNightMode ? 'ffffff' : this.titleBackgroundColor;
    },

    ...mapState({
      isNightMode: state => state.settings.is_night_mode,
    }),
  },
};
</script>

<style>
.gh-list {
  height: 100%;
}

.github-card .card-body {
  max-height: 80vh;
}

@media only screen and (min-width: 1200px) {
  .github-card .card-body {
    max-height: initial;
  }
}
</style>
