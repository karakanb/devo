<template>
  <div id="app" :class="{ 'night-mode': isNightMode }">
    <!-- <div class="app-card-container"> -->
    <div class="app-card-container">
      <div class="date-time-wrapper">
        <div class="col-xs date-time grey-text">
          <div class="time inline-block" @click="toggle24HourFormat">{{ now }}</div>
          <div class="date inline-block pull-right">{{ today }}</div>
        </div>
      </div>
      <div class="cards-wrapper">
        <component :is="this.layout"></component>
      </div>
      <div class="date-time-wrapper">
        <footer class="col-xs grey-text light">
          <span class="pull-left">
            <span class="semi-bold">devo</span> is an
            <a href="https://github.com/karakanb/devo">open-source extension</a
            >.
          </span>

          <div class="pull-right day-night-toggle flex items-center">
            <div style="margin-right: 12px">
              <layout-select></layout-select>
            </div>
            <div class="flex items-center">
              <font-awesome-icon :icon="['fas', 'sun']"></font-awesome-icon>
              <toggle-switch
                v-model="nightModeToggle"
                style="margin-right: 8px"
              ></toggle-switch>
              <font-awesome-icon
                :icon="['fas', 'moon']"
                style="margin: 0"
              ></font-awesome-icon>
            </div>
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
    ...mapState({
      isNightMode: (state) => state.settings.isNightMode,
      now(state) {
        const { is24HourFormat } = state.settings;
        if (is24HourFormat) {
          return this.getTime();
        } else {
          let time = this.getTime();
          time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
          time = time.slice(1);
          time[5] = +time[0] < 12 ? ' AM' : ' PM';
          time[0] = +time[0] % 12 || 12;
          return time.join('');
        }
      },
      is24HourFormat: state => state.settings.is24HourFormat,
      layout: (state) => state.settings.layout,
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
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];

      const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];

      const day = date.getDate();
      const monthIndex = date.getMonth();
      return `${days[date.getDay()]}, ${monthNames[monthIndex]} ${day}`;
    },
    getTime(){
      const hour = this.nowTime.getHours().toString().padStart(2, "0");
      const minute = this.nowTime.getMinutes().toString().padStart(2, "0");
      return `${hour}:${minute}`;
    },
    toggle24HourFormat() {
      this.set24HourFormat(!this.is24HourFormat);
    },
    ...mapActions(["setNightMode", "set24HourFormat"]),
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
}
#app {
  background-color: #f5f7fa;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
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
