import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';

import Row from '@/components/YCLaunches/Row.vue';

const item = {
  id: 129243,
  title: 'RightNow: own your AI, at full speed',
  tagline: 'Open model inference on the kernel stack frontier labs use',
  created_at: '2026-11-17T00:00:00.810Z',
  total_vote_count: 22,
  company: {
    name: 'RightNow',
    url: 'https://www.rightnowai.co',
    batch: 'Fall 2026',
  },
  search_path: 'https://www.ycombinator.com/launches/XcZ-rightnow-own-your-ai-at-full-speed',
};

describe('YCLaunches/Row.vue', () => {
  it('row is properly rendered', () => {
    const wrapper = shallowMount(Row, { props: { item } });

    expect(wrapper.find('.title-row > a').text()).to.equal(item.title);
    expect(wrapper.find('.title-row > a').attributes('href')).to.equal(item.search_path);
    expect(wrapper.find('.description').text()).to.equal(item.tagline);
    expect(wrapper.find('.votes').text()).to.equal('22');
    expect(wrapper.find('.company').text()).to.equal('RightNow');
    expect(wrapper.find('.company').attributes('href')).to.equal('https://www.rightnowai.co');
    expect(wrapper.find('.batch').text()).to.equal('Fall 2026');
  });

  it('renders a launch without company details', () => {
    const wrapper = shallowMount(Row, {
      props: { item: { ...item, tagline: '', company: undefined } },
    });

    expect(wrapper.find('.description').exists()).to.equal(false);
    expect(wrapper.find('.company').exists()).to.equal(false);
    expect(wrapper.find('.batch').exists()).to.equal(false);
  });
});
