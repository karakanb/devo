import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';

import Settings from '@/components/Reddit/Settings.vue';

const mountSettings = () => {
  const saved = [];
  const store = createStore({
    state: { reddit: { settings: { subreddits: ['programming'], sort: 'hot', subredditPlacement: 'meta' } } },
    actions: {
      setRedditSettings(context, payload) {
        saved.push(payload);
      },
    },
  });

  return { saved, wrapper: mount(Settings, { global: { plugins: [store] } }) };
};

describe('RedditSettings.vue', () => {
  it('shows the current subreddits', () => {
    const { wrapper } = mountSettings();

    expect(wrapper.find('.rd-settings-input').element.value).to.equal('programming');
  });

  it('saves the entered subreddits', async () => {
    const { wrapper, saved } = mountSettings();

    await wrapper.find('.rd-settings-input').setValue('r/vuejs, rust');
    await wrapper.find('form').trigger('submit');

    expect(saved).to.deep.equal([{ subreddits: ['vuejs', 'rust'], sort: 'hot', subredditPlacement: 'meta' }]);
    expect(wrapper.emitted().saved).to.have.lengthOf(1);
  });

  it('saves the selected sort order', async () => {
    const { wrapper, saved } = mountSettings();

    expect(wrapper.find('.rd-settings-sort').element.value).to.equal('hot');
    await wrapper.find('.rd-settings-sort').setValue('top');
    await wrapper.find('form').trigger('submit');

    expect(saved).to.deep.equal([{ subreddits: ['programming'], sort: 'top', subredditPlacement: 'meta' }]);
  });

  it('saves where the subreddit is shown', async () => {
    const { wrapper, saved } = mountSettings();

    expect(wrapper.find('.rd-settings-placement').element.value).to.equal('meta');
    await wrapper.find('.rd-settings-placement').setValue('title');
    await wrapper.find('form').trigger('submit');

    expect(saved).to.deep.equal([{ subreddits: ['programming'], sort: 'hot', subredditPlacement: 'title' }]);
  });

  it('does not save without a valid subreddit', async () => {
    const { wrapper, saved } = mountSettings();

    await wrapper.find('.rd-settings-input').setValue('  ,, ');
    await wrapper.find('form').trigger('submit');

    expect(saved).to.deep.equal([]);
    expect(wrapper.emitted().saved).to.equal(undefined);
    expect(wrapper.find('.rd-settings-error').exists()).to.equal(true);
  });
});
