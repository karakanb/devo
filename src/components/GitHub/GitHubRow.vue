<template>
  <div class="gh-item">
    <div class="row title">
      <h3 class="repo-name">
        <a :href="repoLink">
          <span class="text-normal"> {{item.repo.owner}} /</span> {{item.repo.name}}
        </a>
      </h3>
    </div>
    <div class="row description">
      {{item.repo.description}}
    </div>
    <div class="row meta-row text-grey">
      <div class="icon-with-text m-r-16">
        <a :href="starsLink">
          <font-awesome-icon :icon="['fas', 'star']"></font-awesome-icon>
          <span>{{Number(item.stars.count).toLocaleString()}}</span>
        </a>
      </div>
      <div class="icon-with-text m-r-16">
        <a :href="forksLink">
          <font-awesome-icon :icon="['fas', 'code-branch']"></font-awesome-icon>
          <span>{{Number(item.forks.count).toLocaleString()}}</span>
        </a>
      </div>
      <div class="icon-with-text pull-right">
        <font-awesome-icon :icon="['fas', 'star']"></font-awesome-icon>
        <span>{{Number(item.todayStars).toLocaleString()}} stars today</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GitHubRow',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      baseLink: 'https://github.com/',
    };
  },
  computed: {
    repoLink() {
      return `${this.baseLink}${this.item.repo.link}`;
    },
    starsLink() {
      return `${this.baseLink}${this.item.stars.link}`;
    },
    forksLink() {
      return `${this.baseLink}${this.item.forks.link}`;
    },
  },
};
</script>

<style>
.gh-item {
  font-size: 16px;
  padding: 16px;
  text-align: left;
  border-bottom: 1px solid #dfe3e8a8;
}

.gh-item .row {
  margin: 0;
}

.gh-item .title {
  margin-bottom: 4px;
  height: 30px;
}

.gh-item .description {
  font-size: 14px;
  color: #586069 !important;
  margin-bottom: 8px;
  padding: 4px 0;
}

.text-grey {
  color: #586069 !important;
}

.gh-item .meta-row {
  font-size: 12px;
}

h3.repo-name {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}

.text-normal {
  font-weight: 400;
}

.repo-name a {
  color: #0366d6;
  text-decoration: none;
  text-decoration-line: none;
  text-decoration-style: initial;
  text-decoration-color: initial;
}

.row.meta-row {
  display: block;
}

.icon-with-text {
  display: inline-block;
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

.gh-item a:hover {
  text-decoration: underline;
  text-decoration-line: underline;
  text-decoration-style: initial;
  text-decoration-color: initial;
}

.m-r-16 {
  margin-right: 16px;
}
</style>
