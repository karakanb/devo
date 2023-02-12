<template>
  <div class="tn-item">
    <div class="title-row">
      <div class="title">
        <a :href="itemLink" :title="item.title">{{ item.title }}</a>
      </div>
      <div class="site-string">
        <a :href="siteStringLink"> ({{ siteStringLink }}) </a>
      </div>
    </div>
    <div class="meta-data">
      {{ tabcoinsVerbose }} by
      <a class="user-link" :href="userLink"> {{ item.owner_username }}</a> |
      {{ relativeDate }} |
      <a class="thread-link" :href="itemLink"> {{commentsVerbose}}</a>
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
      baseUrl: 'https://tabnews.com.br',
    };
  },

  computed: {
    userLink() {
      return `${this.baseUrl}/${this.item.owner_username}`;
    },
    siteStringLink() {
      return this.baseUrl.replace('https://', '');
    },
    itemLink() {
      return `${this.baseUrl}/${this.item.owner_username}/${this.item.slug}`;
    },
    tabcoinsVerbose() {
      if (this.item.tabcoins === 0 || this.item.tabcoins > 1) {
        return `${this.item.tabcoins} tabcoins`;
      }
      return `${this.item.tabcoins} tabcoin`;
    },
    commentsVerbose() {
      if (this.item.children_deep_count === 0 || this.item.children_deep_count > 1) {
        return `${this.item.children_deep_count} comments`;
      }
      return `${this.item.children_deep_count} comment`;
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
.tn-item {
  font-size: 16px;
  padding: 8px 0;
  text-align: left;
  border-bottom: 1px solid #dfe3e8a8;
  margin: 0;
}

.night-mode .tn-item {
  border-bottom: 1px solid #dfe3e82d;
}

.tn-item a {
  text-decoration: none;
  color: inherit;
}

.tn-item a:hover {
  text-decoration: underline;
  text-decoration-line: underline;
  text-decoration-style: initial;
  text-decoration-color: initial;
}

.tn-item .title {
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
  text-overflow: ellipsis;
}

.tn-item .title-row {
  margin-bottom: 2px;
  max-width: 100%;
  display: flex;
}

.tn-item .site-string {
  color: rgb(130, 130, 130);
  font-size: 10.667px;
  display: inline-block;
  white-space: nowrap;
  margin-top: 3px;
  padding-left: 4px;
}

.meta-data {
  color: rgb(130, 130, 130);
  font-size: 9.33333px;
}
</style>
