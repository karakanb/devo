<template>
  <div class="wrapper" @click.self="toggleDropdown">
    {{ selectedPlatformName }}
    <ul v-if="dropdownVisible" class="options round-borders with-shadow">
      <li
        v-for="platform in platforms"
        :key="platform.index"
        @click="selectPlatform(platform.index)"
        class="option-item round-borders"
      >
        {{ platform.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import settings from '@/settings';
export default {
  props: {
    cardIndex: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      dropdownVisible: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    selectPlatform(platform) {
      this.dropdownVisible = false;
      console.log('dropdown noldu', this.dropdownVisible);
      this.setCardPlatform({ index: this.cardIndex, platform: platform });
      console.log('selected platform', platform);
      console.log('dropdown tekrar', this.dropdownVisible);
    },
    ...mapActions(['setCardPlatform']),
  },
  computed: {
    platforms() {
      const platformList = [];
      const platformNames = Object.keys(settings.platforms);
      for (const platform of platformNames) {
        const details = settings.platforms[platform];
        platformList.push({
          index: platform,
          name: details.title,
          color: details.titleBackgroundColor,
        });
      }

      return platformList;
    },

    selectedPlatformName() {
      const platform = this.getPlatformByIndex(this.cardIndex);
      return settings.platforms[platform].title;
    },

    ...mapGetters(['getPlatformByIndex']),
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  padding: 4px;
  display: inline-block;
}

.options {
  margin: 0;
  padding: 0px;
  list-style-type: none;
  z-index: 9999;
  position: absolute;
  background: white;
  color: black;
}

.option-item {
  padding: 8px 12px;
  cursor: pointer;
}

.option-item:hover {
  background: #f5f7fa;
}
</style>
