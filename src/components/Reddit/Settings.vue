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
    <button type="button" class="rd-settings-button rd-settings-import round-borders" :disabled="importing" @click="importSubscriptions">
      {{ importing ? 'Importing…' : 'Import from my account' }}
    </button>
    <div v-if="importMessage" class="rd-settings-hint rd-settings-import-message" role="status">{{ importMessage }}</div>

    <label class="rd-settings-label rd-settings-sort-label" :for="sortId">Sort by</label>
    <select :id="sortId" class="rd-settings-input rd-settings-sort round-borders" v-model="sort">
      <option v-for="option in sorts" :key="option.value" :value="option.value">{{ option.title }}</option>
    </select>

    <label class="rd-settings-label rd-settings-sort-label" :for="placementId">Show subreddit</label>
    <select :id="placementId" class="rd-settings-input rd-settings-sort rd-settings-placement round-borders" v-model="subredditPlacement">
      <option v-for="option in placements" :key="option.value" :value="option.value">{{ option.title }}</option>
    </select>

    <div v-if="error" class="rd-settings-error">{{ error }}</div>

    <div class="rd-settings-actions">
      <button type="submit" class="rd-settings-button primary round-borders">Save</button>
      <button type="button" class="rd-settings-button round-borders" @click="$emit('close')">Cancel</button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import {
  parseSubreddits, fetchSubscribedSubreddits, normalizeSort, normalizeSubredditPlacement,
  SORTS, SUBREDDIT_PLACEMENTS, IMPORT_LIMIT,
} from '@/components/Reddit/reddit';

let instanceCount = 0;

export default {
  name: 'RedditSettings',
  emits: ['close', 'saved'],
  data() {
    instanceCount += 1;

    return {
      inputId: `rd-settings-subreddits-${instanceCount}`,
      sortId: `rd-settings-sort-${instanceCount}`,
      placementId: `rd-settings-placement-${instanceCount}`,
      subredditsText: this.$store.state.reddit.settings.subreddits.join(', '),
      sort: normalizeSort(this.$store.state.reddit.settings.sort),
      sorts: SORTS,
      subredditPlacement: normalizeSubredditPlacement(this.$store.state.reddit.settings.subredditPlacement),
      placements: SUBREDDIT_PLACEMENTS,
      error: '',
      importing: false,
      importMessage: '',
    };
  },
  methods: {
    save() {
      const subreddits = parseSubreddits(this.subredditsText);
      if (subreddits.length === 0) {
        this.error = 'Enter at least one subreddit name.';
        return;
      }

      this.setRedditSettings({ subreddits, sort: this.sort, subredditPlacement: this.subredditPlacement });
      this.$emit('saved');
    },

    async importSubscriptions() {
      this.importing = true;
      this.importMessage = '';
      try {
        const subreddits = await fetchSubscribedSubreddits();
        if (subreddits.length === 0) {
          this.importMessage = 'Your account has no subreddit subscriptions.';
        } else {
          this.subredditsText = subreddits.slice(0, IMPORT_LIMIT).join(', ');
          this.error = '';
          this.importMessage = subreddits.length > IMPORT_LIMIT
            ? `Imported the first ${IMPORT_LIMIT} of ${subreddits.length} subreddits. Press Save to use them.`
            : `Imported ${subreddits.length} subreddits. Press Save to use them.`;
        }
      } catch (error) {
        this.importMessage = 'Could not read your subscriptions. Sign in to reddit.com in this browser and try again.';
      } finally {
        this.importing = false;
      }
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

.rd-settings-sort-label {
  margin-top: 16px;
}

.rd-settings-sort {
  width: auto;
  min-width: 160px;
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

.rd-settings-button:disabled {
  cursor: default;
  opacity: 0.6;
}

.rd-settings-import {
  margin-top: 10px;
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
