<template>
  <div class="card with-shadow">
    <div class="card-title" :style="titleSpanStyle">
      <font-awesome-icon class="custom-icon" :icon="icon"></font-awesome-icon>
      <div class="card-title-text"><slot name="card-title"></slot></div>
      <div class="pull-right external-icons">
        <div class="title-icon external-icon" :style="iconStyle">
          <a :href="externalLink">
            <font-awesome-icon :icon="['fas', 'external-link-alt']"></font-awesome-icon>
          </a>
        </div>
        <div class="title-icon refresh-icon" :style="iconStyle">
          <font-awesome-icon class="fa-refresh-icon" :icon="['fas', 'sync-alt']" @click="iconOnClick">
          </font-awesome-icon>
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
      return `background-color: #${this.titleBackgroundColor}; color: #${this.titleFontColor}`;
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
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 16px;
  text-align: left;
  padding: 12px;
  display: flex;
  align-items: center;
}

.card-body {
  background-color: white;
  padding: 0 16px;
  overflow-x: auto;
  height: 100%;
}

.night-mode .card-body {
  height: calc(100% - 48px);
  background-color: #31363e;
  color: #c5c8ca;
  padding: 0 16px;
  overflow-x: auto;
}

.card-title-text {
  font-weight: 600;
}

svg {
  margin: -8px 8px -4px 0px;
}

.custom-icon {
  font-size: 32px !important;
  margin: -4px 8px -4px 0px !important;
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
  margin-left: auto;
}

.title-icon a {
  text-decoration: none;
  color: inherit;
}
.title-icon svg {
  transform: translateY(-8%);
}
</style>
