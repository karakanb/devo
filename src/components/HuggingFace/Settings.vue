<template>
  <form class="hf-settings" @submit.prevent="save">
    <label class="hf-settings-label" :for="ids.section">Show</label>
    <select :id="ids.section" class="hf-settings-input hf-settings-select hf-settings-section round-borders" v-model="section">
      <option v-for="option in sections" :key="option.value" :value="option.value">{{ option.title }}</option>
    </select>

    <label class="hf-settings-label" :for="ids.sort">Sort by</label>
    <select :id="ids.sort" class="hf-settings-input hf-settings-select hf-settings-sort round-borders" v-model="sort">
      <option v-for="option in currentSection.sorts" :key="option.value" :value="option.value">{{ option.title }}</option>
    </select>

    <template v-if="has('pipelineTag')">
      <label class="hf-settings-label" :for="ids.pipelineTag">Task</label>
      <select :id="ids.pipelineTag" class="hf-settings-input hf-settings-select hf-settings-task round-borders" v-model="pipelineTag">
        <option v-for="option in pipelineTags" :key="option.value" :value="option.value">{{ option.title }}</option>
      </select>
    </template>

    <template v-if="has('search')">
      <label class="hf-settings-label" :for="ids.search">Search</label>
      <input
        :id="ids.search"
        class="hf-settings-input hf-settings-search round-borders"
        type="text"
        v-model="search"
        placeholder="llama, flux, whisper"
        autocomplete="off"
        spellcheck="false"
      />
    </template>

    <template v-if="has('author')">
      <label class="hf-settings-label" :for="ids.author">Author or organization</label>
      <input
        :id="ids.author"
        class="hf-settings-input hf-settings-author round-borders"
        type="text"
        v-model="author"
        placeholder="Qwen, black-forest-labs"
        autocomplete="off"
        spellcheck="false"
      />
      <div class="hf-settings-hint">Leave empty to see everyone.</div>
    </template>

    <div v-if="error" class="hf-settings-error">{{ error }}</div>

    <div class="hf-settings-actions">
      <button type="submit" class="hf-settings-button primary round-borders">Save</button>
      <button type="button" class="hf-settings-button round-borders" @click="$emit('close')">Cancel</button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import {
  SECTIONS, PIPELINE_TAGS, getSection, normalizeSettings,
} from '@/components/HuggingFace/huggingface';

let instanceCount = 0;

export default {
  name: 'HuggingFaceSettings',
  emits: ['close', 'saved'],
  data() {
    instanceCount += 1;
    const settings = normalizeSettings(this.$store.state.huggingface.settings);
    const id = name => `hf-settings-${name}-${instanceCount}`;

    return {
      ids: {
        section: id('section'), sort: id('sort'), pipelineTag: id('task'), search: id('search'), author: id('author'),
      },
      sections: SECTIONS,
      pipelineTags: PIPELINE_TAGS,
      error: '',
      ...settings,
    };
  },
  computed: {
    currentSection() {
      return getSection(this.section);
    },
  },
  watch: {
    section() {
      // every section has its own sorts, keep the current one only if the new section offers it.
      if (!this.currentSection.sorts.some(item => item.value === this.sort)) {
        this.sort = this.currentSection.sorts[0].value;
      }
    },
  },
  methods: {
    has(filter) {
      return this.currentSection.filters.includes(filter);
    },

    save() {
      const author = this.author.trim().replace(/^@/, '');
      if (this.has('author') && author && !/^[A-Za-z0-9][\w.-]*$/.test(author)) {
        this.error = 'Use the name from the profile address, such as black-forest-labs.';
        return;
      }

      this.setHuggingFaceSettings(normalizeSettings({
        section: this.section,
        sort: this.sort,
        search: this.search,
        author,
        pipelineTag: this.pipelineTag,
      }));
      this.$emit('saved');
    },

    ...mapActions(['setHuggingFaceSettings']),
  },
};
</script>

<style scoped>
.hf-settings {
  padding: 16px 0;
  text-align: left;
  font-size: 14px;
}

.hf-settings-label {
  display: block;
  font-weight: 600;
  margin-bottom: 6px;
}

.hf-settings-label:not(:first-child) {
  margin-top: 16px;
}

.hf-settings-input {
  width: 100%;
  box-sizing: border-box;
  padding: 8px;
  font: inherit;
  color: inherit;
  background: white;
  border: 1px solid #dfe3e8;
}

.hf-settings-select {
  width: auto;
  min-width: 180px;
}

.hf-settings-input:focus-visible,
.hf-settings-button:focus-visible {
  outline: 2px solid #ff9d00;
  outline-offset: 1px;
}

.hf-settings-hint,
.hf-settings-error {
  margin-top: 6px;
  font-size: 12px;
  color: rgb(130, 130, 130);
}

.hf-settings-error {
  color: #c0392b;
}

.hf-settings-actions {
  margin-top: 16px;
  display: flex;
  gap: 8px;
}

.hf-settings-button {
  padding: 6px 14px;
  font: inherit;
  color: inherit;
  cursor: pointer;
  background: transparent;
  border: 1px solid #dfe3e8;
}

.hf-settings-button:hover {
  background: #f5f7fa;
}

.hf-settings-button.primary,
.hf-settings-button.primary:hover {
  color: #1f2328;
  background: #ffd21e;
  border-color: #ffd21e;
}

.night-mode .hf-settings-input {
  background: #25292f;
  border-color: #dfe3e82d;
}

.night-mode .hf-settings-button {
  border-color: #dfe3e82d;
}

.night-mode .hf-settings-button:hover {
  background: #25292f;
}

.night-mode .hf-settings-button.primary,
.night-mode .hf-settings-button.primary:hover {
  color: #25292f;
  background: #ffd21e;
  border-color: #ffd21e;
}

.night-mode .hf-settings-error {
  color: #ec8f8f;
}
</style>
