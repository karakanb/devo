<template>
  <div class="card">
    <div class="card-title"
         :style="style">{{title}}</div>
    <slot name="card-body"></slot>
  </div>

</template>
<script>
export default {
  name: 'Card',
  props: {
    title: {
      type: String,
      required: true,
    },
    titleBackgroundColor: {
      type: String,
      default: 'f3f3f3',
    },
  },

  computed: {
    style() {
      return `background-color: #${this.titleBackgroundColor};`;
    },
  },
};
</script>

<style>
.card-title {
  font-size: 16px;
  text-align: left;
  padding: 12px;
}
</style>
