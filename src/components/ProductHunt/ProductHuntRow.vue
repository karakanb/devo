<template>
  <div class="ph-item">
    <div class="row">
      <div class="col-lg-2">
        <div class="image-container"
             :style="imageStyle"></div>
      </div>
      <div class="col-lg-10">
        <div class="row title-row">
          {{item.name}}
        </div>
        <h3 class="row description">
          {{item.tagline}}
        </h3>
        <div class="row meta">
          <span class="ph-tag-wrapper">
            <span class="ph-tag"
                  v-if="topicExists">
              <a :href="item.topics[0].slug">
                {{item.topics[0].name}}
              </a>
            </span>
            <span class="remaining-topic-count"
                  v-if="remainingTopicCount > 0">+{{remainingTopicCount}}</span>
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
      baseUrl: 'https://news.ycombinator.com/',
    };
  },

  computed: {
    imageStyle() {
      return {
        backgroundImage: `url("${this.item.thumbnail.image_url}")`,
      };
    },
    topicExists() {
      return this.item.topics.length !== 0;
    },
    remainingTopicCount() {
      return this.item.topics.length - 1;
    },
  },
};
</script>

<style>
.ph-item {
  font-size: 16px;
  padding: 16px 16px 16px 8px;
  text-align: left;
  border-bottom: 1px solid #dfe3e8a8;
}

.ph-item .row {
  margin: 0;
}

.ph-item a {
  text-decoration: none;
  color: inherit;
}

.ph-item .image-container {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
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

.ph-item .ph-tag {
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
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
}

.ph-item .ph-tag-wrapper {
  display: flex;
  align-items: center;
}

.ph-item .ph-tag a {
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
