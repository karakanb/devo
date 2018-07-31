<template>
  <div class="card">
    <div class="card-title"
         :style="titleSpanStyle">
      <font-awesome-icon class="custom-icon"
                         :icon="icon"></font-awesome-icon>
      <div class="card-title-text">{{title}}</div>
      <div class="pull-right">
        <div class="title-icon external-icon"
             :style="iconStyle">
          <a :href="externalLink">
            <font-awesome-icon :icon="['fas', 'external-link-alt']"></font-awesome-icon>
          </a>
        </div>
        <div class="title-icon refresh-icon"
             :style="iconStyle">
          <font-awesome-icon :icon="['fas', 'sync-alt']"
                             @click="iconOnClick"></font-awesome-icon>
        </div>
      </div>
    </div>
    <div class="card-body">
      <slot name="card-body"></slot>
    </div>
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
    externalLink: {
      type: String,
      required: true,
    },
  },

  computed: {
    titleSpanStyle() {
      return `background-color: #${this.titleBackgroundColor}; color: #${
        this.titleFontColor
      }`;
    },
    iconStyle() {
      return `color: #${this.titleFontColor}b3`;
    },
  },
};
</script>

<style>
.card {
  height: 100%;
  width: 100%;
}

.card-title {
  font-size: 16px;
  text-align: left;
  padding: 12px;
}

.card-body {
  height: calc(100% - 48px);
  background-color: white;
  padding: 0 16px;
  overflow-x: auto;
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
.title-icon,
.card-title-text,
.refresh-icon {
  display: inline-block !important;
  vertical-align: middle !important;
}

.refresh-icon:hover,
.external-icon:hover {
  cursor: pointer;
  color: #ffffff !important;
}

.pull-right {
  float: right;
}

.title-icon a {
  text-decoration: none;
  color: inherit;
}
</style>
