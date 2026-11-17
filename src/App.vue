<template>
  <div id="app" :class="{ 'night-mode': isNightMode }">
    <!-- <div class="app-card-container"> -->
    <div class="app-card-container" :class="{ 'focus-mode': isFocusMode }">
      <div class="date-time-wrapper top-bar">
        <div class="col-xs date-time grey-text">
          <div class="time inline-block" @click="toggle24HourFormat">
            {{ now }}
          </div>
          <div class="date inline-block pull-right">{{ today }}</div>
        </div>
      </div>
      <div class="cards-wrapper">
        <component :is="this.layout"></component>
      </div>
      <div class="date-time-wrapper bottom-bar">
        <footer class="col-xs grey-text light">
          <span class="pull-left focus-hideable"> <span class="semi-bold">devo</span> is an <a href="https://github.com/karakanb/devo">open-source extension</a>. </span>

          <div class="pull-right day-night-toggle flex items-center">
            <div class="flex items-center focus-hideable">
              <div style="margin-right: 12px">
                <layout-select></layout-select>
              </div>
              <div class="flex items-center">
                <font-awesome-icon :icon="['fas', 'sun']"></font-awesome-icon>
                <toggle-switch v-model="nightModeToggle" style="margin-right: 8px"></toggle-switch>
                <font-awesome-icon :icon="['fas', 'moon']" style="margin: 0"></font-awesome-icon>
              </div>
            </div>
            <a class="focus-devo semi-bold" href="https://github.com/karakanb/devo" :tabindex="isFocusMode ? 0 : -1">devo</a>
            <button
              type="button"
              class="focus-toggle"
              :title="isFocusMode ? 'Show extras' : 'Hide extras'"
              @click="toggleFocusMode"
            >
              <font-awesome-icon :icon="['fas', isFocusMode ? 'eye-slash' : 'eye']"></font-awesome-icon>
            </button>
          </div>
        </footer>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Card from './components/Card.vue';
import ToggleSwitch from './components/ToggleSwitch.vue';
import LayoutSelect from './components/LayoutSelect.vue';
import SingleColumn from './layouts/SingleColumn.vue';
import TwoColumns from './layouts/TwoColumns.vue';
import ThreeColumns from './layouts/ThreeColumns.vue';
import TwoLeftOneRight from './layouts/TwoLeftOneRight.vue';
import OneLeftTwoRight from './layouts/OneLeftTwoRight.vue';
import TwoRowsTwoColumns from './layouts/TwoRowsTwoColumns.vue';

export default {
  name: 'app',
  components: {
    Card,
    ToggleSwitch,
    LayoutSelect,
    SingleColumn,
    TwoColumns,
    ThreeColumns,
    TwoLeftOneRight,
    OneLeftTwoRight,
    TwoRowsTwoColumns,
  },
  data() {
    return {
      nowTime: new Date(),
    };
  },
  created() {
    setInterval(() => {
      this.nowTime = new Date();
    }, 1000);
  },
  computed: {
    today() {
      return this.formatDate(this.nowTime);
    },
    now() {
      if (this.is24HourFormat) {
        const hour = this.nowTime.getHours().toString().padStart(2, '0');
        const minute = this.nowTime.getMinutes().toString().padStart(2, '0');
        return `${hour}:${minute}`;
      }

      return this.nowTime.toLocaleTimeString({}, { hour12: true, hour: 'numeric', minute: 'numeric' }).toUpperCase();
    },
    ...mapState({
      isNightMode: (state) => state.settings.isNightMode,
      is24HourFormat: (state) => state.settings.is24HourFormat,
      layout: (state) => state.settings.layout,
      isFocusMode: (state) => state.settings.isFocusMode,
    }),
    nightModeToggle: {
      get() {
        return this.isNightMode;
      },
      set(value) {
        this.setNightMode(value);
      },
    },
  },
  methods: {
    formatDate(date) {
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      const day = date.getDate();
      const monthIndex = date.getMonth();
      return `${days[date.getDay()]}, ${monthNames[monthIndex]} ${day}`;
    },
    toggle24HourFormat() {
      this.set24HourFormat(!this.is24HourFormat);
    },
    toggleFocusMode() {
      this.setFocusMode(!this.isFocusMode);
    },
    ...mapActions(['setNightMode', 'set24HourFormat', 'setFocusMode']),
  },
};
</script>

<style>
body {
  margin: 0;
}
#app {
  background-color: #f5f7fa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
}

#app.night-mode {
  background-color: #25292f;
}

.round-borders {
  border-radius: 4px;
}

.with-shadow {
  box-shadow: 0 2px 8px 0 rgba(70, 73, 77, 0.16);
}

.night-mode .with-shadow {
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.25);
}

.day-night-toggle {
  display: flex;
  align-items: center;
}

.day-night-toggle svg {
  margin-top: 0;
  margin-bottom: 0;
}

.app-card-container {
  box-sizing: border-box;
  flex: 0 0 auto;
  padding-right: var(--half-gutter-width, 0.5rem);
  padding-left: var(--half-gutter-width, 0.5rem);
  flex-basis: 83.33333333%;
  max-width: 83.33333333%;
  margin-left: 8.33333333%;
  transition: flex-basis 0.35s ease, max-width 0.35s ease, margin-left 0.35s ease;
}

.app-card-container.focus-mode {
  flex-basis: 97%;
  max-width: 97%;
  margin-left: 1.5%;
}

/* Focus mode: hide the clock, the footer caption and the controls, give the cards the room. */
.top-bar,
.bottom-bar {
  transition: height 0.35s ease, opacity 0.35s ease;
}

/* the top bar keeps a small gap so the cards do not touch the top edge */
.focus-mode .top-bar {
  height: 2vh;
  opacity: 0;
  overflow: hidden;
}

.focus-mode .bottom-bar {
  height: 6vh;
}

.focus-hideable {
  transition: opacity 0.35s ease, visibility 0.35s;
}

.focus-mode .focus-hideable {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.focus-devo {
  margin: 0 8px 0 12px;
  opacity: 0;
  transform: translateX(8px);
  pointer-events: none;
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.focus-mode .focus-devo {
  opacity: 0.35;
  transform: none;
  pointer-events: auto;
}

.focus-mode .focus-devo:hover {
  opacity: 0.7;
}

.focus-toggle {
  background: none;
  border: none;
  padding: 4px;
  margin: 0;
  color: inherit;
  font-size: larger;
  line-height: 0;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.focus-toggle:hover {
  opacity: 1;
}

.focus-toggle svg {
  margin: 0;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.pull-right {
  float: right;
}

.inline-block {
  display: inline-block;
}

.m-b-16 {
  margin-bottom: 16px;
}

.grey-text {
  color: #484b4f;
}

.night-mode .grey-text {
  color: #949494;
}

.light {
  font-weight: 100;
}

.semi-bold {
  font-weight: 400;
}

.date-time-wrapper {
  display: flex;
  height: 10vh;
  font-size: 12px;
  align-items: center;
}

.date-time {
  font-size: 32px;
  font-weight: 100;
  margin: initial;
}

.date-time .time {
  cursor: pointer;
}

footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer-row {
  height: 10vh;
  margin: 20px;
  text-align: center;
}

footer a {
  text-decoration: none;
  color: inherit;
}

footer a:hover {
  text-decoration: underline;
  text-decoration-line: underline;
  text-decoration-style: initial;
  text-decoration-color: initial;
}

@media screen and (min-width: 1200px) {
  .footer-row {
    margin: initial;
    text-align: left;
  }

  .cards-wrapper {
    height: 80vh;
    transition: height 0.35s ease;
  }

  .focus-mode .cards-wrapper {
    height: 92vh;
  }
}

.col-xs {
  box-sizing: border-box;
  flex: 0 0 auto;
  flex-grow: 1;
  flex-basis: 0;
  max-width: 100%;
}
</style>
