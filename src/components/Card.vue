<template>
  <div class="card">
    <div class="card-title"
         :style="titleSpanStyle">
      <font-awesome-icon class="custom-icon"
                         :icon="icon"></font-awesome-icon>
      <div class="card-title-text">{{title}}</div>
      <div class="pull-right refresh-icon"
           :style="refreshIconStyle">
        <font-awesome-icon :icon="['fas', 'sync-alt']"
                           @click="iconOnClick"></font-awesome-icon>
      </div>
    </div>
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
    titleFontColor: {
      type: String,
      default: 'ffffff',
    },
    icon: {
      type: Array,
      required: true,
    },
    iconOnClick: {
      type: Function,
      required: true,
    },
  },

  computed: {
    titleSpanStyle() {
      return `background-color: #${this.titleBackgroundColor}; color: #${
        this.titleFontColor
      }`;
    },
    refreshIconStyle() {
      return `color: #${this.titleFontColor}b3`;
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

.card-title-text {
  font-weight: 600;
}

svg {
  margin: -4px 8px -4px 0px;
  white-space: nowrap;
}

.custom-icon {
  font-size: 32px !important;
}

svg,
.card-title-text,
.refresh-icon {
  display: inline-block !important;
  vertical-align: middle !important;
}

.refresh-icon:hover {
  cursor: pointer;
  color: #ffffff !important;
}

.pull-right {
  float: right;
}
</style>
