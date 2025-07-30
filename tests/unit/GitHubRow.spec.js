import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCodeBranch, faStar } from '@fortawesome/free-solid-svg-icons';

import Row from '@/components/GitHub/Row.vue';

library.add(faCodeBranch, faStar);

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
    const wrapper = shallowMount(Row, { 
      props: objectProps,
      global: {
        components: {
          'font-awesome-icon': FontAwesomeIcon,
        },
      },
    });

    expect(wrapper.find('.repo-name').text()).toBe(objectProps.item.repo.rawName);
    expect(wrapper.find('.repo-name > a').attributes('href')).toContain(objectProps.item.repo.link);
    expect(wrapper.find('.description').text()).toBe(objectProps.item.repo.description);
    expect(wrapper.find('.language-text').text()).toBe(objectProps.item.language.is);
    expect(wrapper.find('.stars').text()).toBe(objectProps.item.stars.count.toString());
    expect(wrapper.find('.stars > a').attributes('href')).toContain(objectProps.item.stars.link);
    expect(wrapper.find('.forks').text()).toBe(objectProps.item.forks.count.toString());
    expect(wrapper.find('.forks > a').attributes('href')).toContain(objectProps.item.forks.link);
    expect(wrapper.find('.stars-today').text()).toBe(`${objectProps.item.todayStars.toString()} stars today`);
  });
});
