<template>
  <div id="app">
    <div class="row">
      <div class="col-lg-4 col-lg-offset-1">
        <card title-background-color="ababab" title="First Card">
          <template slot="card-body">
            <h1>Here might be a page title</h1>
          </template>
        </card>
      </div>
      <div class="col-lg-4 col-lg-offset-2">
        <card title="Second Card">
          <template slot="card-body">
            <h1>Secondo kardo</h1>
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
