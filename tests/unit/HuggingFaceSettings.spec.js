import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';

import Settings from '@/components/HuggingFace/Settings.vue';

const mountSettings = (settings = {}) => {
  const saved = [];
  const store = createStore({
    state: {
      huggingface: {
        settings: {
          section: 'models', sort: 'likes', search: '', author: '', pipelineTag: '', ...settings,
        },
      },
    },
    actions: {
      setHuggingFaceSettings(context, payload) {
        saved.push(payload);
      },
    },
  });

  return { saved, wrapper: mount(Settings, { global: { plugins: [store] } }) };
};

const optionValues = select => select.findAll('option').map(option => option.element.value);

describe('HuggingFaceSettings.vue', () => {
  it('shows the current settings', () => {
    const { wrapper } = mountSettings({ author: 'Qwen' });

    expect(wrapper.find('.hf-settings-section').element.value).to.equal('models');
    expect(wrapper.find('.hf-settings-sort').element.value).to.equal('likes');
    expect(wrapper.find('.hf-settings-author').element.value).to.equal('Qwen');
    expect(wrapper.find('.hf-settings-task').exists()).to.equal(true);
  });

  it('changes the sorts and filters with the section', async () => {
    const { wrapper } = mountSettings({ sort: 'downloads' });

    await wrapper.find('.hf-settings-section').setValue('spaces');
    expect(optionValues(wrapper.find('.hf-settings-sort'))).to.not.contain('downloads');
    expect(wrapper.find('.hf-settings-sort').element.value).to.equal('trendingScore');
    expect(wrapper.find('.hf-settings-task').exists()).to.equal(false);

    await wrapper.find('.hf-settings-section').setValue('papers');
    expect(optionValues(wrapper.find('.hf-settings-sort'))).to.deep.equal(['today', 'trending']);
    expect(wrapper.find('.hf-settings-search').exists()).to.equal(false);
    expect(wrapper.find('.hf-settings-author').exists()).to.equal(false);
  });

  it('saves the chosen section and filters', async () => {
    const { wrapper, saved } = mountSettings();

    await wrapper.find('.hf-settings-section').setValue('datasets');
    await wrapper.find('.hf-settings-sort').setValue('downloads');
    await wrapper.find('.hf-settings-search').setValue(' code ');
    await wrapper.find('.hf-settings-author').setValue('@nvidia');
    await wrapper.find('form').trigger('submit');

    expect(saved).to.deep.equal([{
      section: 'datasets', sort: 'downloads', search: 'code', author: 'nvidia', pipelineTag: '',
    }]);
    expect(wrapper.emitted().saved).to.have.lengthOf(1);
  });

  it('does not save an invalid author', async () => {
    const { wrapper, saved } = mountSettings();

    await wrapper.find('.hf-settings-author').setValue('not a name');
    await wrapper.find('form').trigger('submit');

    expect(saved).to.deep.equal([]);
    expect(wrapper.find('.hf-settings-error').exists()).to.equal(true);
  });
});
