import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';

import Row from '@/components/Reddit/Row.vue';

const linkPost = {
  id: '1abcde',
  title: 'Pijul: Towards 1.0',
  url: 'https://pijul.org/posts/2020-11-07-towards-1.0/',
  permalink: '/r/programming/comments/1abcde/pijul_towards_10/',
  subreddit: 'programming',
  author: 'pmeunier',
  score: 34,
  num_comments: 15,
  created_utc: 1604913844,
  is_self: false,
  domain: 'pijul.org',
};

describe('RedditRow.vue', () => {
  it('renders a link post', () => {
    const wrapper = shallowMount(Row, { propsData: { item: linkPost } });

    expect(wrapper.find('.title a').text()).to.equal(linkPost.title);
    expect(wrapper.find('.title a').attributes().href).to.equal(linkPost.url);
    expect(wrapper.find('.site-string').text()).to.equal('(pijul.org)');
    expect(wrapper.find('.title .subreddit-link').exists()).to.equal(false);
    expect(wrapper.find('.meta-data .subreddit-link').text()).to.equal('r/programming');
    expect(wrapper.find('.meta-data .subreddit-link').attributes().href).to.equal('https://www.reddit.com/r/programming');
    expect(wrapper.find('.user-link').text()).to.equal('pmeunier');
    expect(wrapper.find('.user-link').attributes().href).to.equal('https://www.reddit.com/user/pmeunier');
    expect(wrapper.find('.thread-link').text()).to.equal('15 comments');
    expect(wrapper.find('.thread-link').attributes().href).to.equal(`https://www.reddit.com${linkPost.permalink}`);
    expect(wrapper.find('.meta-data').text()).to.contain('34 points');
  });

  it('shows the subreddit in the title when asked', () => {
    const wrapper = shallowMount(Row, { propsData: { item: linkPost, subredditInTitle: true } });

    expect(wrapper.find('.title .subreddit-link').text()).to.equal('r/programming');
    expect(wrapper.find('.title .subreddit-link').attributes().href).to.equal('https://www.reddit.com/r/programming');
    expect(wrapper.find('.meta-data .subreddit-link').exists()).to.equal(false);
    expect(wrapper.find('.meta-data').text()).to.match(/^34 points/);
  });

  it('links a self post to its thread', () => {
    const selfPost = {
      ...linkPost,
      is_self: true,
      url: `https://www.reddit.com${linkPost.permalink}`,
      domain: 'self.programming',
      num_comments: 0,
    };
    const wrapper = shallowMount(Row, { propsData: { item: selfPost } });

    expect(wrapper.find('.title a').attributes().href).to.equal(`https://www.reddit.com${linkPost.permalink}`);
    expect(wrapper.find('.site-string').exists()).to.equal(false);
    expect(wrapper.find('.thread-link').text()).to.equal('discuss');
  });
});
