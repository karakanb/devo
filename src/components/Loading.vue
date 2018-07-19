<template>
  <div class="spinner">
    <div :style="spinnerStyle"
         class="bounce1"></div>
    <div :style="spinnerStyle"
         class="bounce2"></div>
    <div :style="spinnerStyle"
         class="bounce3"></div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    color: {
      type: String,
      default: '333',
    },
  },
  computed: {
    spinnerStyle() {
      return `background-color: #${this.color};`;
    },
  },
};
</script>

<style>
.spinner {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.spinner > div {
  width: 18px;
  height: 18px;
  background-color: #333;

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
  }
}

@keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
