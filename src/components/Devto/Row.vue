<template>
  <div class="devto-item">
    <div class="row title-row">
      <div>
        <div class="site-string" v-if="item.siteString">
          <a :href="siteStringLink"> ({{ item.siteString }}) </a>
        </div>
        <div class="title truncate">
          <a :href="itemLink" :title="item.title">{{ item.title }}</a>
        </div>
      </div>
    </div>
    <div class="row meta-data">
      {{ item.score }} by <a :href="userLink"> {{ item.user.name }}</a> | {{ item.age }} |
      <a :href="threadLink"> {{ item.commentCount }}</a>
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
      return `${this.baseUrl}${this.item.user.link}`;
    },
    threadLink() {
      return `${this.baseUrl}${this.item.threadLink}`;
    },
    siteStringLink() {
      return `http://${this.item.siteString}`;
    },
    itemLink() {
      return this.item.link.startsWith('http') ? this.item.link : `${this.baseUrl}${this.item.link}`;
    },
  },
};
</script>

<style>
.hn-item {
  font-size: 16px;
  padding: 8px 0;
  text-align: left;
  border-bottom: 1px solid #dfe3e8a8;
}

.hn-item .row {
  margin: 0;
}

.hn-item a {
  text-decoration: none;
  color: inherit;
}

.hn-item .meta-data a {
  margin: 0 2.5px;
}

.hn-item a:hover {
  text-decoration: underline;
  text-decoration-line: underline;
  text-decoration-style: initial;
  text-decoration-color: initial;
}

.hn-item .title {
  white-space: nowrap;
  overflow: hidden;
}

.hn-item .title-row {
  margin-bottom: 4px;
}

.hn-item .title-row > div {
  max-width: 100%;
}

.hn-item .site-string {
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
