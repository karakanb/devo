import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';

import Row from '@/components/Lobsters/Row.vue';

const objectProps = {
  short_id: 'ml1n24',
  short_id_url: 'https://lobste.rs/s/ml1n24',
  created_at: '2020-11-09T03:24:04.000-06:00',
  title: 'Pijul: Towards 1.0',
  url: 'https://pijul.org/posts/2020-11-07-towards-1.0/',
  score: 34,
  flags: 0,
  comment_count: 15,
  description: '',
  comments_url: 'https://lobste.rs/s/ml1n24/pijul_towards_1_0',
  submitter_user: {
    username: 'someuser',
    created_at: '2017-01-23T10:07:40.000-06:00',
    is_admin: false,
    about: '...',
    is_moderator: false,
    karma: 2267,
    avatar_url: '/avatars/someuser-100.png',
    invited_by_user: 'alicebob',
  },
  tags: [
    'vcs',
  ],
};

describe('Lobsters/Row.vue', () => {
  it('row is properly rendered', () => {
    const wrapper = shallowMount(Row, { propsData: { item: objectProps } });

    expect(wrapper.find('.site-string').text()).to.equal('(pijul.org)');
    expect(wrapper.find('.site-string > a').attributes('href')).to.equal('http://pijul.org');
    expect(wrapper.find('.title').text()).to.equal(objectProps.title);
    expect(wrapper.find('.title > a').attributes('href')).to.equal(objectProps.url);
    expect(wrapper.find('.user-link').attributes('href')).to.equal(`https://lobste.rs/u/${objectProps.submitter_user.username}`);
    expect(wrapper.find('.user-link').text()).to.equal(objectProps.submitter_user.username);
    expect(wrapper.find('.thread-link').attributes('href')).to.equal(objectProps.comments_url);
    expect(wrapper.find('.thread-link').text()).to.equal('15 comments');
  });
});
