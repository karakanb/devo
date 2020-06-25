<template>
  <label class="input-label">
    Change background image
    <input type="file" ref="file" class="input" v-on:change="handleFileUpload()" accept="image/*" />
  </label>
</template>

<script>
export default {
  name: 'BackgroundSelector',
  mounted() {
    if (localStorage.backgroundData) {
      this.setBackground(localStorage.backgroundData);
    }
  },
  methods: {
    setBackground(base64) {
      const backgroundEl = document.querySelector('.background');
      backgroundEl.style.backgroundImage = `url('${base64}')`;
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        try {
          localStorage.backgroundData = reader.result;
          this.setBackground(localStorage.backgroundData);
        } catch (err) {
          // eslint-disable-next-line
          alert('Image size must be smaller than 5MB');
        }
      });
      reader.readAsDataURL(this.file);
    },
  },
};
</script>

<style>
  .input-label {
    cursor: pointer;
    padding: 10px;
    font-size: 110%;
    opacity: .3;
    transition: opacity .2s;
  }

  body:hover .input-label {
    opacity: 1;
  }

  .input {
    display: none;
  }
</style>
