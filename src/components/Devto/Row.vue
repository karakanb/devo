<template>
  <div class="devto-item">
    <div class="row title-row">
      <div class="title truncate">
        <a :href="item.url" :title="item.title">
          <span class="hover-underline">{{ item.title }}</span>
        </a>
      </div>
    </div>
    <div class="row metadata">
      <span>
        by <a class="hover-underline" :href="userLink">{{ item.user.name }}</a> | {{ relativeDate }} ago |
        {{ item.positive_reactions_count }} likes |
        <a class="hover-underline" :href="commentsLink"> {{ item.comments_count }} comments </a>
      </span>

      <span
        v-if="item.flare_tag"
        class="flare-tag"
        :style="{ backgroundColor: item.flare_tag.bg_color_hex, color: item.flare_tag.text_color_hex }"
        >#{{ item.flare_tag.name }}</span
      >
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
      baseUrl: 'https://dev.to/',
    };
  },

  computed: {
    userLink() {
      return `${this.baseUrl}${this.item.user.username}`;
    },
    commentsLink() {
      return `${this.item.url}#comments`;
    },
    relativeDate() {
      return this.timeSince(new Date(this.item.published_at));
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
.devto-item {
  font-size: 16px;
  padding: 8px 0 4px 0;
  text-align: left;
  border-bottom: 1px solid #dfe3e8a8;
  line-height: 20px;
}

.devto-item .row {
  margin: 0;
}

.devto-item a {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.devto-item a:hover .hover-underline,
.devto-item .hover-underline:hover {
  text-decoration: underline;
  text-decoration-line: underline;
  text-decoration-style: initial;
  text-decoration-color: initial;
}

.devto-item .title {
  white-space: nowrap;
  overflow: hidden;
}

.devto-item .title-row > div {
  max-width: 100%;
}

.devto-item .site-string {
  color: rgb(130, 130, 130);
  font-size: 10.667px;
  float: right;
  white-space: nowrap;
  margin-top: 3px;
  padding-left: 4px;
}

.devto-item .flare-tag {
  border-radius: 4px;
  cursor: pointer;
  display: inline;
  font-size: 12px;
  font-weight: 500;
  margin-right: 5px;
  padding: 0 6px;
  vertical-align: 2px;
}

.devto-item a:hover .flare-tag {
  text-decoration: none;
}

.devto-item .tag {
  margin-right: 8px;
  padding: 8px 0;
  color: rgb(130, 130, 130);
}

.devto-item .metadata {
  color: rgb(130, 130, 130);
  font-size: 9.33333px;
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
}

.devto-item .truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
