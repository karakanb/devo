<template>
  <div class="devto-item">
    <div class="row title-row">
      <h2 class="title truncate">
        <a :href="item.url" :title="item.title">
          <span class="hover-underline">{{ item.title }}</span>
        </a>
      </h2>
    </div>
    <div class="row tag-list" v-if="item.tag_list">
      <a class="tag hover-underline" v-for="tag in item.tag_list" :key="tag" :href="`${baseUrl}/t/${tag}`"
        >#{{ tag }}</a
      >
    </div>
    <div class="row metadata">
      <div>
        <a class="hover-underline" :href="userLink">{{ item.user.name }}</a
        >・{{ publishDateShort }} ({{ relativeDate }} ago)
      </div>
      <div class="pull-right">
        <div class="icon-with-text inline-block box likes">
          <font-awesome-icon :icon="['fas', 'heart']"></font-awesome-icon>
          <span>{{ item.positive_reactions_count }}</span>
        </div>
        <a :href="commentsLink" class="icon-with-text inline-block box comments">
          <font-awesome-icon :icon="['fas', 'comment']"></font-awesome-icon>
          <span>{{ item.comments_count }}</span>
        </a>
      </div>
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
    publishDateShort() {
      const d = new Date(this.item.published_at);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
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
  font-size: 15px;
  padding: 8px 0;
  text-align: left;
  border-bottom: 1px solid #dfe3e8a8;
  color: #292929 !important;
}

.night-mode .devto-item,
.night-mode .devto-item .title {
  color: inherit !important;
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
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  margin: 0;
  color: #292929;
  line-height: 28px;
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

.devto-item .tag-list {
  margin-top: 2px;
  font-size: 10px;
}

.devto-item .tag {
  margin-right: 8px;
  color: #757575;
  font-size: 12px;
}

.devto-item .metadata {
  color: rgba(0, 0, 0, 0.54) !important;
  font-size: 12px;
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.devto-item .box {
  color: rgb(153, 153, 153);
  border-radius: 3px;
  border: 1px solid #e8e8e8;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  outline: 0;
  overflow: hidden;
  white-space: nowrap;
  padding: 2px 6px;
}

.devto-item a.box:hover {
  background-color: #f2f2f2;
}

.night-mode .devto-item a.box:hover {
  background-color: #25292e;
}

.night-mode .devto-item .box {
  border: 1px solid #757575;
}

.night-mode .devto-item .metadata {
  color: #757575 !important;
}

.devto-item .metadata .likes {
  margin-right: 4px;
}
.devto-item .metadata .likes > svg {
  color: #ff6363;
  vertical-align: 3px !important;
}

.devto-item .metadata .comments > svg {
  color: #60a0ff;
  vertical-align: 2px !important;
}

.devto-item .truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.devto-item .light-grey {
  color: #757575;
}

.icon-with-text svg {
  margin-right: 4px;
  vertical-align: 20% !important;
}

.icon-with-text a {
  text-decoration: none;
  text-decoration-line: none;
  text-decoration-style: initial;
  text-decoration-color: initial;
  color: inherit;
}
</style>
