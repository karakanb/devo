<template>
  <div class="ph-item">
    <div class="row">
      <div class="thumbnail">
        <div class="image-container">
          <img :src="thumbnailLink"
               width="80"
               height="80">
        </div>
      </div>
      <div class="col-lg-10">
        <div class="row title-row">
          <a :href="itemLink"> {{item.name}}</a>
        </div>
        <h3 class="row description">
          {{item.tagline}}
        </h3>
        <div class="row meta between-lg">
          <span class="ph-tag-wrapper">
            <span class="small-info-box link-box"
                  v-if="topicExists">
              <a :href="firstTopicLink">
                {{item.topics[0].name}}
              </a>
            </span>
            <span class="remaining-topic-count"
                  v-if="remainingTopicCount > 0"
                  :title="remainingTopics">+{{remainingTopicCount}}</span>
          </span>
          <span class="ph-action-wrapper">
            <span class="small-info-box action vote-count white-background">
              <span>
                <font-awesome-icon :icon="['fas', 'chevron-up']"></font-awesome-icon>
                {{item.votes_count}}
              </span>
            </span>
            <span class="small-info-box action white-background">
              <span>
                <font-awesome-icon :icon="['fas', 'comment']"></font-awesome-icon>
                {{item.comments_count}}
              </span>
            </span>
          </span>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ProductHuntRow',
  props: {
    item: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      baseUrl: 'https://www.producthunt.com',
    };
  },
  computed: {
    thumbnailLink() {
      return `${this.item.thumbnail.image_url}&h=80&w=80`;
    },
    topicExists() {
      return this.item.topics.length !== 0;
    },
    firstTopicLink() {
      return `${this.baseUrl}/topics/${this.item.topics[0].slug}`;
    },
    remainingTopicCount() {
      return this.item.topics.length - 1;
    },
    remainingTopics() {
      const topics = this.item.topics.slice(1);
      return topics.map(e => this.toTitleCase(e.name)).join(', ');
    },
    itemLink() {
      return `${this.baseUrl}/posts/${this.item.slug}`;
    },
  },
  methods: {
    toTitleCase(str) {
      str = str.toLowerCase().split(' ');
      for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
      }
      return str.join(' ');
    },
  },
};
</script>

<style>
.ph-item {
  font-size: 16px;
  padding: 16px 0;
  text-align: left;
  border-bottom: 1px solid #dfe3e8a8;
}

.ph-item .row {
  margin: 0;
}

.ph-item .row .col-lg-2 {
  padding: 0;
}

.ph-item a {
  text-decoration: none;
  color: inherit;
}

.ph-item .thumbnail {
  width: 80px;
  height: 80px;
  margin-right: 8px;
}

.ph-item .image-container {
  width: 80px;
  height: 80px;
}

.ph-item a:hover {
  text-decoration: underline;
  text-decoration-line: underline;
  text-decoration-style: initial;
  text-decoration-color: initial;
}

.ph-item .title-row {
  font-size: 20px;
  font-weight: 300;
  line-height: 32px;
}

.ph-item .description {
  align-items: center;
  color: rgb(153, 153, 153);
  font-size: 13px;
  font-weight: 400;
  height: 20px;
  line-height: 20px;
  margin-bottom: 5px;
}

.ph-item .small-info-box {
  color: rgb(153, 153, 153);
  background: #f8f8f8;
  border-radius: 3px;
  border: 1px solid #e8e8e8;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin-right: 4px;
  height: 24px;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  outline: 0;
  overflow: hidden;
  white-space: nowrap;
}

.ph-item .ph-tag-wrapper,
.ph-item .ph-action-wrapper {
  display: flex;
  align-items: center;
}

.ph-item .small-info-box a,
.ph-item .small-info-box span {
  line-height: 16px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  color: inherit;
  text-decoration: none !important;
  padding: 0 8px;
  font-weight: 400;
  font-size: 11px;
  text-align: left;
  text-decoration-color: rgb(153, 153, 153);
  text-decoration-line: none;
  text-decoration-style: solid;
  text-transform: uppercase;
}

.ph-item .link-box:hover {
  background-color: #ebebeb;
  cursor: pointer;
}

.ph-item .small-info-box svg {
  margin: -4px 2px -2px 0px;
  font-size: 12px !important;
}

.ph-item .white-background {
  background-color: white;
}

.ph-item .vote-count {
  color: black;
}

.ph-item .vote-count {
  color: black;
  background-color: white;
}

.ph-item .action span {
  font-weight: 600 !important;
}

.ph-item .remaining-topic-count {
  background-color: rgba(0, 0, 0, 0);
  color: rgb(153, 153, 153);
  font-size: 11px;
  font-weight: 400;
  height: auto;
  line-height: 16px;
  list-style-image: none;
  list-style-position: outside;
  list-style-type: none;
  margin-left: 3.85px;
  text-align: left;
  text-decoration-color: rgb(153, 153, 153);
  text-decoration-line: none;
  text-decoration-style: solid;
  text-size-adjust: 100%;
  text-transform: uppercase;
  white-space: nowrap;
  width: auto;
  -webkit-box-direction: normal;
  cursor: pointer;
}
.ph-item .remaining-topic-count:hover {
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

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
