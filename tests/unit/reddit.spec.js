import { expect } from 'chai';

import { parseSubreddits, buildUrl, toItems } from '@/components/Reddit/reddit';

describe('reddit.js', () => {
  it('parses subreddit names from free text', () => {
    expect(parseSubreddits('r/vuejs, webdev  /r/rust+golang')).to.deep.equal(['vuejs', 'webdev', 'rust', 'golang']);
    expect(parseSubreddits('vuejs VueJS')).to.deep.equal(['vuejs']);
    expect(parseSubreddits('bad/name ../x ok_name')).to.deep.equal(['ok_name']);
    expect(parseSubreddits('')).to.deep.equal([]);
  });

  it('builds the listing url', () => {
    expect(buildUrl({ subreddits: ['programming'], sort: 'hot' }))
      .to.equal('https://www.reddit.com/r/programming/hot.json?limit=30&raw_json=1');
    expect(buildUrl({ subreddits: ['vuejs', 'rust'], sort: 'top' }))
      .to.equal('https://www.reddit.com/r/vuejs+rust/top.json?limit=30&raw_json=1&t=day');
  });

  it('falls back to the defaults for missing or invalid settings', () => {
    const defaultUrl = 'https://www.reddit.com/r/programming/hot.json?limit=30&raw_json=1';

    expect(buildUrl()).to.equal(defaultUrl);
    expect(buildUrl({ subreddits: [], sort: 'nope' })).to.equal(defaultUrl);
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

  it('returns no items for an unexpected response', () => {
    expect(toItems({ error: 404 })).to.deep.equal([]);
    expect(toItems(null)).to.deep.equal([]);
  });
});
