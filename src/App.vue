<template>
  <div id="app">
    <div class="row">
      <div class="col-lg-4 col-lg-offset-1">
        <card class="github-card"
              title-background-color="25292f"
              title-font-color="ffffff"
              :icon="['fab', 'github']"
              title="GitHub Trending">
          <template slot="card-body">
            <div style="height: 250px; background-color: #f3f3f3"></div>
          </template>
        </card>
      </div>
      <div class="col-lg-4 col-lg-offset-2">
        <card title="Hacker News"
              title-background-color="fe6501"
              :icon="['fab', 'hacker-news-square']"
              title-font-color="ffffff">
          <template slot="card-body">
            <div style="height: 250px; background-color: #f3f3f3"></div>
          </template>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import Card from './components/Card.vue';

export default {
  name: 'app',
  components: {
    HelloWorld,
    Card,
  },
};
</script>

<style lang="scss">
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
