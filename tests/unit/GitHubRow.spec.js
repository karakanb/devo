import Vue from 'vue';
import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Row from '@/components/GitHub/Row.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faGithub,
  faHackerNewsSquare,
  faProductHunt,
} from '@fortawesome/free-brands-svg-icons';
import {
  faSyncAlt,
  faCodeBranch,
  faStar,
  faChevronUp,
  faComment,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add([
  faGithub,
  faHackerNewsSquare,
  faProductHunt,
  faSyncAlt,
  faCodeBranch,
  faStar,
  faChevronUp,
  faComment,
  faExternalLinkAlt,
]);
Vue.component('font-awesome-icon', FontAwesomeIcon);

const objectProps = {
  item: {
    repo: {
      rawName: 'Android1404 / AwesomeDrawer',
      owner: 'Android1404',
      name: 'AwesomeDrawer',
      link: '/Android1404/AwesomeDrawer',
      description: 'materail awsome anim',
    },
    stars: {
      count: 584,
      link: '/Android1404/AwesomeDrawer/stargazers',
    },
    forks: {
      count: 7,
      link: '/Android1404/AwesomeDrawer/network',
    },
    todayStars: 556,
    language: {
      is: 'Java',
      color: '#b07219',
    },
  },
};

const wrapper = shallowMount(Row, { propsData: objectProps });

describe('GitHubRow.vue', () => {
  it('repo title is rendered', () => {
    expect(wrapper.find('.repo-name').text()).to.equal(objectProps.item.repo.rawName);
    expect(wrapper.find('.repo-name > a').attributes('href').href).to.include(objectProps.item.repo.link);
  });

  it('description is rendered', () => {
    expect(wrapper.find('.description').text()).to.equal(objectProps.item.repo.description);
  });

  it('language is rendered', () => {
    expect(wrapper.find('.language-text').text()).to.equal(objectProps.item.language.is);
  });

  it('star count is rendered', () => {
    expect(wrapper.find('.stars').text()).to.equal(objectProps.item.stars.count.toString());
    expect(wrapper.find('.stars > a').attributes('href').href).to.include(objectProps.item.stars.link);
  });

  it('fork count is rendered', () => {
    expect(wrapper.find('.forks').text()).to.equal(objectProps.item.forks.count.toString());
    expect(wrapper.find('.forks > a').attributes('href').href).to.include(objectProps.item.forks.link);
  });

  it('stars today is rendered', () => {
    expect(wrapper.find('.stars-today').text()).to.equal(`${objectProps.item.todayStars.toString()} stars today`);
  });
});
