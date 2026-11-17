import { expect } from 'chai';

import {
  parseSubreddits, buildUrl, toItems, fetchSubscribedSubreddits,
} from '@/components/Reddit/reddit';

describe('reddit.js', () => {
  it('parses subreddit names from free text', () => {
    expect(parseSubreddits('r/vuejs, webdev  /r/rust+golang')).to.deep.equal(['vuejs', 'webdev', 'rust', 'golang']);
    expect(parseSubreddits('vuejs VueJS')).to.deep.equal(['vuejs']);
    expect(parseSubreddits('bad/name ../x ok_name')).to.deep.equal(['ok_name']);
    expect(parseSubreddits('')).to.deep.equal([]);
  });

  it('builds the listing url', () => {
    expect(buildUrl({ subreddits: ['programming'], sort: 'hot' }))
      .to.equal('https://www.reddit.com/r/programming.json?limit=30&raw_json=1');
    expect(buildUrl({ subreddits: ['vuejs', 'rust'], sort: 'top' }))
      .to.equal('https://www.reddit.com/r/vuejs+rust/top.json?limit=30&raw_json=1&t=day');
    expect(buildUrl({ subreddits: ['rust'], sort: 'top-week' }))
      .to.equal('https://www.reddit.com/r/rust/top.json?limit=30&raw_json=1&t=week');
  });

  it('falls back to the defaults for missing or invalid settings', () => {
    const defaultUrl = 'https://www.reddit.com/r/programming.json?limit=30&raw_json=1';

    expect(buildUrl()).to.equal(defaultUrl);
    expect(buildUrl({ subreddits: [], sort: 'nope' })).to.equal(defaultUrl);
    // a sort saved by an older version that reddit no longer serves
    expect(buildUrl({ subreddits: [], sort: 'new' })).to.equal(defaultUrl);
    expect(buildUrl({ subreddits: ['../../evil'], sort: 'hot' })).to.equal(defaultUrl);
  });

  it('reduces a listing to slim items', () => {
    const listing = {
      kind: 'Listing',
      data: {
        children: [
          { kind: 't3', data: { id: 'pinned', title: 'Rules', stickied: true } },
          {
            kind: 't3',
            data: {
              id: '1abcde',
              title: 'Pijul: Towards 1.0',
              url: 'https://pijul.org/',
              permalink: '/r/programming/comments/1abcde/pijul/',
              subreddit: 'programming',
              author: 'pmeunier',
              score: 34,
              num_comments: 15,
              created_utc: 1604913844,
              is_self: false,
              domain: 'pijul.org',
              selftext_html: '<p>big</p>',
              stickied: false,
            },
          },
        ],
      },
    };

    expect(toItems(listing)).to.deep.equal([{
      id: '1abcde',
      title: 'Pijul: Towards 1.0',
      url: 'https://pijul.org/',
      permalink: '/r/programming/comments/1abcde/pijul/',
      subreddit: 'programming',
      author: 'pmeunier',
      score: 34,
      num_comments: 15,
      created_utc: 1604913844,
      is_self: false,
      domain: 'pijul.org',
    }]);
  });

  it('loads every page of the subscribed subreddits', async () => {
    const pages = {
      '': { data: { after: 't5_next', children: [{ data: { display_name: 'vuejs' } }, { data: { display_name: 'u_someone' } }] } },
      t5_next: { data: { after: null, children: [{ data: { display_name: 'Rust' } }] } },
    };
    const requests = [];
    const fetchFn = async (url, options) => {
      requests.push({ url, options });
      const after = new URL(url).searchParams.get('after') || '';
      return { ok: true, json: async () => pages[after] };
    };

    expect(await fetchSubscribedSubreddits(fetchFn)).to.deep.equal(['Rust', 'vuejs']);
    expect(requests).to.have.lengthOf(2);
    expect(requests[0].url).to.equal('https://www.reddit.com/subreddits/mine/subscriber.json?limit=100&raw_json=1');
    expect(requests[0].options).to.deep.equal({ credentials: 'include' });
  });

  it('fails when the subscriptions can not be read', async () => {
    const outcome = fetchFn => fetchSubscribedSubreddits(fetchFn).then(() => 'resolved', () => 'rejected');

    expect(await outcome(async () => ({ ok: false, status: 403 }))).to.equal('rejected');
    expect(await outcome(async () => ({ ok: true, json: async () => ({ error: 403 }) }))).to.equal('rejected');
  });

  it('returns no items for an unexpected response', () => {
    expect(toItems({ error: 404 })).to.deep.equal([]);
    expect(toItems(null)).to.deep.equal([]);
  });
});
