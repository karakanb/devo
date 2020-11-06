<template>
  <div
    class="round-borders wrapper"
    :class="{ 'hovered-wrapper': this.dropdownVisible }"
    @click="toggleDropdown"
    v-outside="closeDropdown"
  >
    <div class="select-title-wrapper">
      <span class="select-title">
        <font-awesome-icon icon="th-large" style="margin: 0"></font-awesome-icon>
      </span>
    </div>
    <ul v-if="dropdownVisible" class="options round-borders with-shadow">
      <li
        v-for="layout in this.layouts"
        :key="layout.component"
        @click="select(layout.component)"
        class="option-item round-borders"
        :class="{ selected: layout.component === selectedLayout }"
      >
        <span class="platform-title">{{ layout.displayName }}</span>
        <span v-if="layout.component === selectedLayout" class="platform-selected-icon">
          <font-awesome-icon icon="check"></font-awesome-icon>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import settings from '@/settings';

export default {
  data() {
    return {
      dropdownVisible: false,
      layouts: settings.layouts,
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    closeDropdown() {
      this.dropdownVisible = false;
    },
    select(layout) {
      this.dropdownVisible = false;
      this.setLayout(layout);
    },
    ...mapActions(['setLayout']),
  },
  computed: {
    ...mapState({
      selectedLayout: (state) => state.settings.layout,
    }),
    selectedLayoutDisplayName() {
      return this.layouts.find((layout) => layout.component === this.selectedLayout).displayName;
    },
  },
  directives: {
    outside: {
      bind(el, binding, vnode) {
        el.clickOutsideEvent = (event) => {
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
  box-sizing: border-box;
  position: relative;
  font-size: larger;
}

.options {
  margin: 0;
  padding: 0px;
  list-style-type: none;
  z-index: 9999;
  position: absolute;
  background: white;
  color: black;
  bottom: 28px;
  right: 0;
  border: 1px #535a635e solid;
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
  margin-left: auto;
}

.select-title {
  padding: 5px;
  line-height: 0;
  display: inline-block;
}

.hovered-wrapper,
.wrapper:hover {
  border: 1px solid rgb(255, 255, 255, 0.25);
}

.hovered-wrapper .select-title,
.wrapper:hover .select-title {
  padding: 4px;
}

.hovered-wrapper .select-icon,
.wrapper:hover .select-icon {
  display: inline-block;
}

.select-title-wrapper {
  display: flex;
  align-items: center;
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
  border: 1px #1e2123 solid;
  color: white;
}

.night-mode .option-item.selected,
.night-mode .option-item:hover {
  background: #31363e;
}

.night-mode .platform-selected-icon {
  color: #949494;
}

.night-mode .hovered-wrapper,
.night-mode .wrapper:hover {
  border: 1px solid rgba(130, 130, 130, 0.4);
}
</style>
