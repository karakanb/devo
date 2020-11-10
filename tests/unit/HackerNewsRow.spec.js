import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';

import Row from '@/components/HackerNews/Row.vue';

const objectProps = {
  title: 'How Go helped save HealthCare.gov',
  link: 'https://changelog.com/gotime/154',
  siteString: 'changelog.com',
  score: '204 points',
  user: {
    name: 'ra7',
    link: 'user?id=ra',
  },
  age: '4 hours ago',
  commentCount: '67 comments',
  threadLink: 'item?id=2503898',
};

describe('HackerNews/Row.vue', () => {
  it('row is properly rendered', () => {
    const wrapper = shallowMount(Row, { propsData: { item: objectProps } });

    expect(wrapper.find('.site-string').text()).to.equal(`(${objectProps.siteString})`);
    expect(wrapper.find('.site-string > a').attributes('href')).to.equal(`http://${objectProps.siteString}`);
    expect(wrapper.find('.title').text()).to.equal(objectProps.title);
    expect(wrapper.find('.title > a').attributes('href')).to.equal(objectProps.link);
    expect(wrapper.find('.user-link').attributes('href')).to.equal(`https://news.ycombinator.com/${objectProps.user.link}`);
    expect(wrapper.find('.user-link').text()).to.equal(objectProps.user.name);
    expect(wrapper.find('.thread-link').attributes('href')).to.equal(`https://news.ycombinator.com/${objectProps.threadLink}`);
    expect(wrapper.find('.thread-link').text()).to.equal(objectProps.commentCount);
  });
});
