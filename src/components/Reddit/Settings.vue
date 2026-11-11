<template>
  <form class="rd-settings" @submit.prevent="save">
    <label class="rd-settings-label" :for="inputId">Subreddits</label>
    <input
      :id="inputId"
      class="rd-settings-input round-borders"
      type="text"
      v-model="subredditsText"
      placeholder="programming, webdev, rust"
      autocomplete="off"
      spellcheck="false"
    />
    <div class="rd-settings-hint">Separate names with commas or spaces.</div>

    <div v-if="error" class="rd-settings-error">{{ error }}</div>

    <div class="rd-settings-actions">
      <button type="submit" class="rd-settings-button primary round-borders">Save</button>
      <button type="button" class="rd-settings-button round-borders" @click="$emit('close')">Cancel</button>
    </div>
  </form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { parseSubreddits } from '@/components/Reddit/reddit';

let instanceCount = 0;

export default {
  name: 'RedditSettings',
  emits: ['close', 'saved'],
  data() {
    instanceCount += 1;

    return {
      inputId: `rd-settings-subreddits-${instanceCount}`,
      subredditsText: this.$store.state.reddit.settings.subreddits.join(', '),
      error: '',
    };
  },
  computed: {
    ...mapState({
      settings: state => state.reddit.settings,
    }),
  },
  methods: {
    save() {
      const subreddits = parseSubreddits(this.subredditsText);
      if (subreddits.length === 0) {
        this.error = 'Enter at least one subreddit name.';
        return;
      }

      this.setRedditSettings({ subreddits, sort: this.settings.sort });
      this.$emit('saved');
    },

    ...mapActions(['setRedditSettings']),
  },
};
</script>

<style scoped>
.rd-settings {
  padding: 16px 0;
  text-align: left;
  font-size: 14px;
}

.rd-settings-label {
  display: block;
  font-weight: 600;
  margin-bottom: 6px;
}

.rd-settings-input {
  width: 100%;
  box-sizing: border-box;
  padding: 8px;
  font: inherit;
  color: inherit;
  background: white;
  border: 1px solid #dfe3e8;
}

.rd-settings-input:focus-visible,
.rd-settings-button:focus-visible {
  outline: 2px solid #ff4500;
  outline-offset: 1px;
}

.rd-settings-hint,
.rd-settings-error {
  margin-top: 6px;
  font-size: 12px;
  color: rgb(130, 130, 130);
}

.rd-settings-error {
  color: #c0392b;
}

.rd-settings-actions {
  margin-top: 16px;
  display: flex;
  gap: 8px;
}

.rd-settings-button {
  padding: 6px 14px;
  font: inherit;
  color: inherit;
  cursor: pointer;
  background: transparent;
  border: 1px solid #dfe3e8;
}

.rd-settings-button:hover {
  background: #f5f7fa;
}

.rd-settings-button.primary,
.rd-settings-button.primary:hover {
  color: white;
  background: #ff4500;
  border-color: #ff4500;
}

.night-mode .rd-settings-input {
  background: #25292f;
  border-color: #dfe3e82d;
}

.night-mode .rd-settings-button {
  border-color: #dfe3e82d;
}

.night-mode .rd-settings-button:hover {
  background: #25292f;
}

.night-mode .rd-settings-button.primary,
.night-mode .rd-settings-button.primary:hover {
  color: #25292f;
  background: #ff8b60;
  border-color: #ff8b60;
}

.night-mode .rd-settings-error {
  color: #ec8f8f;
}
</style>
