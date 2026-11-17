<template>
  <div class="hf-item">
    <div class="title truncate">
      <span v-if="item.emoji" class="emoji">{{ item.emoji }}</span>
      <a :href="item.url" :title="item.title">{{ item.title }}</a>
    </div>
    <div v-if="item.subtitle" class="subtitle truncate" :title="item.subtitle">{{ item.subtitle }}</div>
    <div class="meta-data">
      <span v-if="item.tag" class="tag">{{ item.tag }}</span>
      <span class="likes" :title="likesTitle">
        <font-awesome-icon :icon="['fas', 'heart']" /> {{ formatCount(item.likes) }}
      </span>
      <span v-if="item.downloads !== null && item.downloads !== undefined" class="downloads" title="Downloads">
        <font-awesome-icon :icon="['fas', 'download']" /> {{ formatCount(item.downloads) }}
      </span>
      <span v-if="item.comments !== null && item.comments !== undefined" class="comments" title="Comments">
        <font-awesome-icon :icon="['fas', 'comment']" /> {{ item.comments }}
      </span>
      <a v-if="item.author" class="author" :href="authorLink">{{ item.author }}</a>
      <span v-if="relativeDate" class="date">{{ relativeDate }} ago</span>
    </div>
  </div>
</template>

<script>
import { BASE_URL } from '@/components/HuggingFace/huggingface';

const UNITS = [
  ['year', 31536000],
  ['month', 2592000],
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
];

export default {
  name: 'Row',
  props: {
    item: {
      required: true,
      type: Object,
    },
  },

  computed: {
    authorLink() {
      return `${BASE_URL}/${this.item.author}`;
    },
    likesTitle() {
      return this.item.kind === 'paper' || this.item.kind === 'collection' ? 'Upvotes' : 'Likes';
    },
    relativeDate() {
      const time = Date.parse(this.item.date);
      if (Number.isNaN(time)) {
        return '';
      }

      const seconds = Math.max(0, Math.floor((Date.now() - time) / 1000));
      const unit = UNITS.find(([, size]) => seconds >= size);
      if (!unit) {
        return 'a moment';
      }

      const count = Math.floor(seconds / unit[1]);
      return `${count} ${unit[0]}${count === 1 ? '' : 's'}`;
    },
  },

  methods: {
    formatCount(value) {
      const count = Number(value) || 0;
      if (count >= 1e6) {
        return `${(count / 1e6).toFixed(count >= 1e7 ? 0 : 1)}M`;
      }
      if (count >= 1e3) {
        return `${(count / 1e3).toFixed(count >= 1e4 ? 0 : 1)}k`;
      }

      return String(count);
    },
  },
};
</script>

<style>
.hf-item {
  font-size: 16px;
  padding: 8px 0;
  text-align: left;
  border-bottom: 1px solid #dfe3e8a8;
}

.night-mode .hf-item {
  border-bottom: 1px solid #dfe3e82d;
}

.hf-item a {
  text-decoration: none;
  color: inherit;
}

.hf-item a:hover {
  text-decoration: underline;
}

.hf-item .title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 2px;
}

.hf-item .emoji {
  margin-right: 6px;
}

.hf-item .subtitle {
  color: rgb(130, 130, 130);
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 3px;
}

.hf-item .meta-data {
  color: rgb(130, 130, 130);
  font-size: 11px;
  display: flex;
  flex-wrap: wrap;
  gap: 2px 10px;
}

.hf-item .tag {
  color: #b07800;
}

.night-mode .hf-item .tag {
  color: #ffd21e;
}
</style>
