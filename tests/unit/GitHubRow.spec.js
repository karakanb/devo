import { expect } from 'chai';
import { shallowMount, createLocalVue } from '@vue/test-utils';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCodeBranch, faStar } from '@fortawesome/free-solid-svg-icons';

import Row from '@/components/GitHub/Row.vue';

library.add(faCodeBranch, faStar);

const localVue = createLocalVue();
localVue.component('font-awesome-icon', FontAwesomeIcon);

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

describe('GitHub/Row.vue', () => {
  it('row is properly rendered', () => {
    const wrapper = shallowMount(Row, { localVue, propsData: objectProps });

    expect(wrapper.find('.repo-name').text()).to.equal(objectProps.item.repo.rawName);
    expect(wrapper.find('.repo-name > a').attributes('href')).to.include(objectProps.item.repo.link);
    expect(wrapper.find('.description').text()).to.equal(objectProps.item.repo.description);
    expect(wrapper.find('.language-text').text()).to.equal(objectProps.item.language.is);
    expect(wrapper.find('.stars').text()).to.equal(objectProps.item.stars.count.toString());
    expect(wrapper.find('.stars > a').attributes('href')).to.include(objectProps.item.stars.link);
    expect(wrapper.find('.forks').text()).to.equal(objectProps.item.forks.count.toString());
    expect(wrapper.find('.forks > a').attributes('href')).to.include(objectProps.item.forks.link);
    expect(wrapper.find('.stars-today').text()).to.equal(`${objectProps.item.todayStars.toString()} stars today`);
  });
});
