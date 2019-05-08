<template>
  <div class="dn-item">
    <div class="row title-row">
      <div>
        <div class="site-string" v-if="item.hostname">
          <a :href="hostnameLink"> ({{ item.hostname }}) </a>
        </div>
        <div class="title truncate">
          <a :href="itemLink" :title="item.title">{{ item.title }}</a>
        </div>
      </div>
    </div>
    <div class="row meta-data">
      {{ item.vote_count }} points | {{ relativeDate }} ago |
      <a :href="threadLink"> {{ item.comment_count > 0 ? `${item.comment_count} comments` : 'discuss' }}</a>
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
      baseUrl: 'https://www.designernews.co/',
    };
  },
  computed: {
    userLink() {
      return `${this.baseUrl}${this.item.links.user}`;
    },
    threadLink() {
      return `${this.baseUrl}stories/${this.item.id}`;
    },
    hostnameLink() {
      return `https://${this.item.hostname}`;
    },
    itemLink() {
      return this.item.url && this.item.url.startsWith('http') ? this.item.url : this.threadLink;
    },
    relativeDate() {
      return this.timeSince(new Date(this.item.created_at));
    },
  },
  methods: {
    timeSince(date) {
      var seconds = Math.floor((new Date() - date) / 1000);
      var interval = Math.floor(seconds / 31536000);

      if (interval > 1) {
        return interval + ' years';
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
        return interval + ' months';
      }
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        return interval + (interval == 1 ? ' day' : ' days');
      }
      interval = Math.floor(seconds / 3600);
      if (interval >= 1) {
        return interval + (interval == 1 ? ' hour' : ' hours');
      }
      interval = Math.floor(seconds / 60);
      if (interval >= 1) {
        return interval + (interval == 1 ? 'minute' : ' minutes');
      }
      return Math.floor(seconds) + ' seconds';
    },
  },
};
</script>

<style scoped>
.dn-item {
  font-size: 16px;
  padding: 8px 0;
  text-align: left;
  border-bottom: 1px solid #dfe3e8a8;
}

.dn-item .row {
  margin: 0;
}

.dn-item a {
  text-decoration: none;
  color: inherit;
}

.dn-item .meta-data a {
  margin: 0 2.5px;
}

.dn-item a:hover {
  text-decoration: underline;
  text-decoration-line: underline;
  text-decoration-style: initial;
  text-decoration-color: initial;
}

.dn-item .title {
  white-space: nowrap;
  overflow: hidden;
}

.dn-item .title-row {
  margin-bottom: 4px;
}

.dn-item .title-row > div {
  max-width: 100%;
}

.dn-item .site-string {
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
