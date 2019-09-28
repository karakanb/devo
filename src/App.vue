<template>
  <div id="app" :class="{ 'night-mode': isNightMode }">
    <div class="row">
      <div class="col-lg-10 col-lg-offset-1">
        <div class="row date-time-wrapper middle-lg">
          <div class="col-xs date-time grey-text">
            <div class="time inline-block">{{ now }}</div>
            <div class="date inline-block pull-right">{{ today }}</div>
          </div>
        </div>
        <div class="row cards-wrapper">
          <div class="col-lg-6 col-xs-10 col-xs-offset-1 col-lg-offset-0 left-pane">
            <platform-card platform="github" :cardIndex="0"></platform-card>
          </div>
          <div class="col-lg-6 col-xs-10 col-xs-offset-1 col-lg-offset-0">
            <div class="row" style="height: 39vh; margin-bottom: 1vh;">
              <platform-card platform="hackernews" :cardIndex="1"></platform-card>
            </div>
            <div class="row" style="height: 40vh;">
              <platform-card platform="producthunt" :cardIndex="2"></platform-card>
            </div>
          </div>
        </div>
        <div class="row date-time-wrapper middle-lg">
          <footer class="col-xs grey-text light">
            <span class="pull-left">
              <span class="semi-bold">devo</span> is an
              <a href="https://github.com/karakanb/devo">open-source extension</a>.
            </span>

            <span class="pull-right day-night-toggle">
              <font-awesome-icon :icon="['fas', 'sun']"></font-awesome-icon>
              <toggle-switch v-model="nightModeToggle" style="margin-right: 8px"></toggle-switch>
              <font-awesome-icon :icon="['fas', 'moon']" style="margin: 0;"></font-awesome-icon>
            </span>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Card from './components/Card.vue';
import ToggleSwitch from './components/ToggleSwitch.vue';
import PlatformCard from './components/PlatformCard.vue';

export default {
  name: 'app',
  components: {
    Card,
    ToggleSwitch,
    PlatformCard,
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
    now() {
      const hour = this.nowTime
        .getHours()
        .toString()
        .padStart(2, '0');
      const minute = this.nowTime
        .getMinutes()
        .toString()
        .padStart(2, '0');

      return `${hour}:${minute}`;
    },
    today() {
      return this.formatDate(this.nowTime);
    },
    ...mapState({
      isNightMode: state => state.settings.isNightMode,
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

      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      const day = date.getDate();
      const monthIndex = date.getMonth();
      return `${days[date.getDay()]}, ${monthNames[monthIndex]} ${day}`;
    },

    ...mapActions(['setNightMode', 'updateGitHub']),
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
}
#app {
  background-color: #f5f7fa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol';
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

.card {
  border-radius: 4px;
  -webkit-border-radius: 4px;
  overflow: hidden;
}

.day-night-toggle {
  display: flex;
  align-items: center;
}

.day-night-toggle svg {
  margin-top: 0;
  margin-bottom: 0;
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
  height: 10vh;
  font-size: 12px;
}

.date-time {
  font-size: 32px;
  font-weight: 100;
  margin: 25px;
}

.date-time .row {
  margin: 0;
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

.left-pane {
  padding: 0;
  margin-bottom: 1vh;
  height: 100%;
}

@media screen and (min-width: 1200px) {
  .date-time {
    margin: initial;
  }

  .footer-row {
    margin: initial;
    text-align: left;
  }

  .cards-wrapper {
    height: 80vh;
  }

  .left-pane {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
}
</style>
