import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';

import Row from '@/components/DesignerNews/Row.vue';

const props = {
  id: '111922',
  href: 'https://api.designernews.co/api/v2/stories/111922',
  links: {
    user: '117612',
    comments: [
      '329744',
    ],
    upvotes: [
      '542420',
      '542423',
      '542426',
      '542429',
      '542430',
      '542432',
    ],
    downvotes: [],
  },
  created_at: '2020-11-09T21:31:32.000Z',
  updated_at: '2020-11-09T22:30:50.000Z',
  title: 'Hitsnag - Send what you em‎ail‎ ‎yours‎elf directly to productivity tools.',
  badge: 'show',
  comment: null,
  comment_html: null,
  comment_count: 1,
  category: 'show',
  pinned_at: null,
  url: 'https://www.producthunt.com/upcoming/hitsnag',
  sponsored: false,
  vote_count: 7,
  hostname: 'producthunt.com',
  twitter_handles: [],
};

describe('DesignerNews/Row.vue', () => {
  it('row is properly rendered', () => {
    const wrapper = shallowMount(Row, { propsData: { item: props } });

    expect(wrapper.find('.site-string').text()).to.equal(`(${props.hostname})`);
    expect(wrapper.find('.site-string > a').attributes('href')).to.equal(`https://${props.hostname}`);
    expect(wrapper.find('.title').text()).to.equal(props.title);
    expect(wrapper.find('.title > a').attributes('href')).to.equal(props.url);
    expect(wrapper.find('.thread-link').attributes('href')).to.equal(`https://www.designernews.co/stories/${props.id}`);
    expect(wrapper.find('.thread-link').text()).to.equal(`${props.comment_count} comments`);
  });
});
