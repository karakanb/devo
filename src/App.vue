<template>
  <div id="app">
    <div class="row">
      <div class="col-lg-10 col-lg-offset-1">
        <div class="row">
          <div class="col-lg-6">
            <card class="github-card"
                  title-background-color="25292f"
                  title-font-color="ffffff"
                  :icon="['fab', 'github']"
                  title="GitHub Trending">
              <template slot="card-body">
                <git-hub></git-hub>
              </template>
            </card>
          </div>
          <div class="col-lg-6">
            <card title="Hacker News"
                  title-background-color="fe6501"
                  :icon="['fab', 'hacker-news-square']"
                  title-font-color="ffffff">
              <template slot="card-body">
                <hacker-news></hacker-news>
              </template>
            </card>
          </div>
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

export default {
  name: 'app',
  components: {
    HelloWorld,
    Card,
    HackerNews,
    GitHub,
  },
};
</script>

<style lang="scss">
body {
  background-color: #f5f7fa;
}
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
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
</style>
