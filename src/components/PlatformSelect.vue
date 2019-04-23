<template>
  <div class="wrapper">
    <span class="select-title" @click.self="toggleDropdown" v-outside="closeDropdown">
      {{ selectedPlatformTitle }} <span class="select-icon">▼</span></span
    >
    <ul v-if="dropdownVisible" class="options round-borders with-shadow">
      <li
        v-for="platform in platforms"
        :key="platform.name"
        @click="selectPlatform(platform.name)"
        class="option-item round-borders"
        :class="{ selected: platform.name === selectedPlatformName }"
      >
        <span class="platform-color-box round-borders" :style="{ backgroundColor: `#${platform.color}` }"> </span>
        <span class="platform-title">{{ platform.title }}</span>
        <span v-if="platform.name === selectedPlatformName" class="platform-selected-icon"
          ><font-awesome-icon icon="check"></font-awesome-icon
        ></span>
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
    closeDropdown() {
      this.dropdownVisible = false;
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
      platformNames.forEach((platform) => {
        const details = settings.platforms[platform];
        platformList.push({
          name: platform,
          title: details.title,
          color: this.isNightMode ? details.nightMode.titleFontColor : details.titleBackgroundColor,
        });
      });

      return platformList;
    },

    selectedPlatformTitle() {
      const platform = this.getPlatformByIndex(this.cardIndex);
      return settings.platforms[platform].title;
    },

    selectedPlatformName() {
      return this.getPlatformByIndex(this.cardIndex);
    },

    ...mapGetters(['getPlatformByIndex']),
    ...mapState({
      isNightMode: state => state.settings.isNightMode,
    }),
  },
  directives: {
    outside: {
      bind(el, binding, vnode) {
        el.clickOutsideEvent = event => {
          // check that click was outside the el and his childrens
          if (!(el === event.target || el.contains(event.target))) {
            // if it was, call method provided in attribute value
            vnode.context[binding.expression](event);
          }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
      },
      unbind(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
      },
    },
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  display: inline-block;
  cursor: pointer;
}

.options {
  margin: 0;
  padding: 0px;
  list-style-type: none;
  z-index: 9999;
  position: absolute;
  background: white;
  color: black;
  margin-top: 4px;
}

.option-item {
  padding: 8px 12px 8px 12px;
  cursor: pointer;
  font-weight: 200;
  display: flex;
  align-items: center;
  min-width: 200px;
}

.option-item.selected,
.option-item:hover {
  background: #f5f7fa;
}

.select-icon {
  display: none;
  color: #ffffff82;
  font-size: 14px;
  margin-left: 8px;
}

.select-title:hover .select-icon {
  display: inline-block;
}

.platform-color-box {
  width: 16px;
  height: 16px;
  margin-right: 8px;
  transition: box-shadow 0.1s;
}
.option-item:hover .platform-color-box {
  box-shadow: 0 2px 8px 0 rgba(70, 73, 77, 0.16);
}

.platform-selected-icon {
  color: #576068;
  font-size: 12px;
  margin-left: auto;
}

/* Here comes night-mode styling. */
.night-mode .options {
  background-color: #25292f;
  color: white;
}

.night-mode .option-item.selected,
.night-mode .option-item:hover {
  background: #31363e;
}

.night-mode .platform-selected-icon {
  color: #949494;
}
</style>
