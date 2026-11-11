<template>
  <div class="rd-item">
    <div class="title-row">
      <div>
        <div class="site-string" v-if="!item.is_self && item.domain">({{ item.domain }})</div>
        <div class="title truncate">
          <a v-if="subredditInTitle" class="subreddit-link title-subreddit" :href="subredditLink">r/{{ item.subreddit }}</a>
          <a :href="externalLink" :title="item.title">{{ item.title }}</a>
        </div>
      </div>
    </div>
    <div class="meta-data">
      <template v-if="!subredditInTitle"><a class="subreddit-link" :href="subredditLink">r/{{ item.subreddit }}</a> |</template>
      {{ item.score }} points by <a class="user-link" :href="userLink">{{ item.author }}</a> |
      {{ relativeDate }} ago |
      <a class="thread-link" :href="threadLink">
        {{ item.num_comments > 0 ? `${item.num_comments} comments` : 'discuss' }}
      </a>
    </div>
  </div>
</template>

<script>
import { BASE_URL } from '@/components/Reddit/reddit';

export default {
  name: 'Row',
  props: {
    item: {
      required: true,
    },
    subredditInTitle: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    subredditLink() {
      return `${BASE_URL}/r/${this.item.subreddit}`;
    },
    userLink() {
      return `${BASE_URL}/user/${this.item.author}`;
    },
    threadLink() {
      return `${BASE_URL}${this.item.permalink}`;
    },
    externalLink() {
      const isWebLink = /^https?:\/\//.test(this.item.url || '');
      return this.item.is_self || !isWebLink ? this.threadLink : this.item.url;
    },
    relativeDate() {
      return this.timeSince(new Date(this.item.created_utc * 1000));
    },
  },

  methods: {
    timeSince(date) {
      const seconds = Math.max(0, Math.floor((new Date() - date) / 1000));
      const units = [
        ['year', 31536000],
        ['month', 2592000],
        ['day', 86400],
        ['hour', 3600],
        ['minute', 60],
      ];

      for (let i = 0; i < units.length; i += 1) {
        const [name, size] = units[i];
        const interval = Math.floor(seconds / size);
        if (interval >= 1) {
          return `${interval} ${name}${interval === 1 ? '' : 's'}`;
        }
      }

      return `${seconds} seconds`;
    },
  },
};
</script>

<style>
.rd-item {
  font-size: 16px;
  padding: 8px 0;
  margin: 0;
  text-align: left;
  border-bottom: 1px solid #dfe3e8a8;
}

.night-mode .rd-item {
  border-bottom: 1px solid #dfe3e82d;
}

.rd-item a {
  text-decoration: none;
  color: inherit;
}

.rd-item .meta-data a {
  margin: 0 2.5px;
}

.rd-item a:hover {
  text-decoration: underline;
}

.rd-item .title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.rd-item .title .title-subreddit {
  color: #ff4500;
  margin-right: 6px;
}

.night-mode .rd-item .title .title-subreddit {
  color: #ffa07c;
}

.rd-item .title-row {
  margin-bottom: 4px;
}

.rd-item .title-row > div {
  max-width: 100%;
}

.rd-item .site-string {
  color: rgb(130, 130, 130);
  font-size: 10.667px;
  float: right;
  white-space: nowrap;
  margin-top: 3px;
  padding-left: 4px;
}

.rd-item .meta-data {
  color: rgb(130, 130, 130);
  font-size: 9.33333px;
}
</style>
