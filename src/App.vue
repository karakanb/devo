<template>
  <div id="app">
    <div class="row">
      <div class="col-lg-10 col-lg-offset-1">
        <div class="row date-time-wrapper middle-lg">
          <div class="col-lg date-time grey-text">
            <div class="time inline-block">{{now}}</div>
            <div class="date inline-block pull-right">{{today}}</div>
          </div>
        </div>
        <div class="row cards-wrapper">
          <div class="col-lg-6" style="height: 100%">
            <git-hub></git-hub>
          </div>
          <div class="col-lg-6">
            <div class="row"
                 style="height: 39vh; margin-bottom: 1vh;">
              <hacker-news></hacker-news>
            </div>
            <div class="row"
                 style="height: 40vh;">
              <product-hunt></product-hunt>
            </div>

          </div>
        </div>
        <div class="row footer-row middle-lg">
          <footer class="col-lg grey-text light">
            <span class="semi-bold">devo</span> is an
            <a href="https://github.com/karakanb/devo">open source extension</a>.</footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GitHub from '@/components/GitHub/GitHub.vue';
import HelloWorld from './components/HelloWorld.vue';
import Card from './components/Card.vue';
import HackerNews from './components/HackerNews/HackerNews.vue';
import ProductHunt from './components/ProductHunt/ProductHunt.vue';

export default {
  name: 'app',
  components: {
    HelloWorld,
    Card,
    HackerNews,
    GitHub,
    ProductHunt,
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
      return `${this.nowTime
        .getHours()
        .toString()
        .padStart(2, '0')}:${this.nowTime
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;
    },
    today() {
      return this.formatDate(this.nowTime);
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
  },
};
</script>

<style lang="scss">
body {
  background-color: #f5f7fa;
  margin: 0;
}
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.card {
  border-radius: 4px;
  -webkit-border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 8px 0 rgba(70, 73, 77, 0.16);
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

.light {
  font-weight: 100;
}

.semi-bold {
  font-weight: 400;
}

.date-time-wrapper {
  height: 10vh;
}

.date-time {
  font-size: 32px;
  font-weight: 100;
}

.date-time .row {
  margin: 0;
}

.cards-wrapper {
  height: 80vh;
}

.footer-row {
  height: 10vh;
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
</style>
