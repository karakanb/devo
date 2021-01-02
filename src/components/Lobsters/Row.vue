<template>
  <div class="lr-item">
    <div class="title-row">
      <div>
        <div class="site-string" v-if="item.url">
          <a :href="siteStringLink"> ({{ siteString }}) </a>
        </div>
        <div class="title truncate">
          <a :href="item.url" :title="item.title">{{ item.title }}</a>
        </div>
      </div>
    </div>
    <div class="meta-data">
      {{ item.score }} votes via <a class="user-link" :href="userLink"> {{ item.submitter_user.username }}</a> |
      {{ relativeDate }} ago |
      <a class="thread-link" :href="threadLink">
        {{ item.comment_count > 0 ? `${item.comment_count} comments` : 'discuss' }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Row',
  props: {
    item: {
      required: true,
    },
  },
  data() {
    return {
      baseUrl: 'https://lobste.rs',
    };
  },

  computed: {
    userLink() {
      return `${this.baseUrl}/u/${this.item.submitter_user.username}`;
    },
    threadLink() {
      return this.item.comments_url;
    },
    siteStringLink() {
      return `http://${new URL(this.item.url).hostname}`;
    },
    siteString() {
      return new URL(this.item.url).hostname;
    },
    relativeDate() {
      return this.timeSince(new Date(this.item.created_at));
    },
    itemLink() {
      return this.item.link.startsWith('http') ? this.item.link : `${this.baseUrl}${this.item.link}`;
    },
  },

  methods: {
    timeSince(date) {
      const seconds = Math.floor((new Date() - date) / 1000);
      let interval = Math.floor(seconds / 31536000);

      if (interval > 1) {
        return `${interval} years`;
      }

      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
        return `${interval} months`;
      }

      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        return interval + (interval === 1 ? ' day' : ' days');
      }

      interval = Math.floor(seconds / 3600);
      if (interval >= 1) {
        return interval + (interval === 1 ? ' hour' : ' hours');
      }

      interval = Math.floor(seconds / 60);
      if (interval >= 1) {
        return interval + (interval === 1 ? 'minute' : ' minutes');
      }

      return `${Math.floor(seconds)} seconds`;
    },
  },
};
</script>

<style>
.lr-item {
  font-size: 16px;
  padding: 8px 0;
  text-align: left;
  border-bottom: 1px solid #dfe3e8a8;
}

.lr-item{
  margin: 0;
}

.lr-item a {
  text-decoration: none;
  color: inherit;
}

.lr-item .meta-data a {
  margin: 0 2.5px;
}

.lr-item a:hover {
  text-decoration: underline;
  text-decoration-line: underline;
  text-decoration-style: initial;
  text-decoration-color: initial;
}

.lr-item .title {
  white-space: nowrap;
  overflow: hidden;
}

.lr-item .title-row {
  margin-bottom: 4px;
}

.lr-item .title-row > div {
  max-width: 100%;
}

.lr-item .site-string {
  color: rgb(130, 130, 130);
  font-size: 10.667px;
  float: right;
  white-space: nowrap;
  margin-top: 3px;
  padding-left: 4px;
}

.meta-data {
  color: rgb(130, 130, 130);
  font-size: 9.33333px;
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
