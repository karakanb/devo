<template>
  <div class="yc-item">
    <div class="title-row">
      <a :href="item.search_path" :title="item.title">{{ item.title }}</a>
    </div>
    <h3 class="description" v-if="item.tagline">
      {{ item.tagline }}
    </h3>
    <div class="meta">
      <span class="votes">
        <font-awesome-icon :icon="['fa', 'caret-up']" />
        {{ item.total_vote_count || 0 }}
      </span>
      <template v-if="company.name">
        |
        <a class="company" :href="company.url || item.search_path">{{ company.name }}</a>
      </template>
      <template v-if="company.batch">
        | <span class="batch">{{ company.batch }}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Row',
  props: {
    item: {
      required: true,
      type: Object,
    },
  },
  computed: {
    company() {
      return this.item.company || {};
    },
  },
};
</script>

<style>
.yc-item {
  font-size: 16px;
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #dfe3e8a8;
}

.night-mode .yc-item {
  border-bottom: 1px solid #dfe3e82d;
}

.yc-item a {
  text-decoration: none;
  color: inherit;
}

.yc-item a:hover {
  text-decoration: underline;
}

.yc-item .title-row {
  font-size: 18px;
  font-weight: 300;
  line-height: 26px;
}

.yc-item .description {
  color: rgb(153, 153, 153);
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  margin-bottom: 5px;
  margin-top: 2px;
}

.yc-item .meta {
  color: rgb(153, 153, 153);
  font-size: 11px;
}
</style>
