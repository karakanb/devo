import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';

import Row from '@/components/HuggingFace/Row.vue';

const model = {
  kind: 'model',
  id: 'Qwen/Qwen3-8B',
  title: 'Qwen/Qwen3-8B',
  url: 'https://huggingface.co/Qwen/Qwen3-8B',
  subtitle: '',
  emoji: '',
  tag: 'text-generation',
  author: 'Qwen',
  likes: 20350,
  downloads: 6942530,
  comments: null,
  date: new Date(Date.now() - 3 * 86400 * 1000).toISOString(),
};

describe('HuggingFace/Row.vue', () => {
  it('renders a model', () => {
    const wrapper = shallowMount(Row, { props: { item: model } });

    expect(wrapper.find('.title a').text()).to.equal('Qwen/Qwen3-8B');
    expect(wrapper.find('.title a').attributes('href')).to.equal(model.url);
    expect(wrapper.find('.tag').text()).to.equal('text-generation');
    expect(wrapper.find('.likes').text()).to.equal('20k');
    expect(wrapper.find('.downloads').text()).to.equal('6.9M');
    expect(wrapper.find('.comments').exists()).to.equal(false);
    expect(wrapper.find('.author').attributes('href')).to.equal('https://huggingface.co/Qwen');
    expect(wrapper.find('.date').text()).to.equal('3 days ago');
  });

  it('renders a space with its emoji and description', () => {
    const wrapper = shallowMount(Row, {
      props: {
        item: {
          ...model, kind: 'space', title: 'FLUX', emoji: '🌲', subtitle: 'Image editing', tag: '', downloads: null,
        },
      },
    });

    expect(wrapper.find('.emoji').text()).to.equal('🌲');
    expect(wrapper.find('.subtitle').text()).to.equal('Image editing');
    expect(wrapper.find('.downloads').exists()).to.equal(false);
    expect(wrapper.find('.tag').exists()).to.equal(false);
  });

  it('renders a paper with comments', () => {
    const wrapper = shallowMount(Row, {
      props: {
        item: {
          ...model, kind: 'paper', tag: '', downloads: null, comments: 4, likes: 7, author: '', date: '',
        },
      },
    });

    expect(wrapper.find('.comments').text()).to.equal('4');
    expect(wrapper.find('.likes').attributes('title')).to.equal('Upvotes');
    expect(wrapper.find('.author').exists()).to.equal(false);
    expect(wrapper.find('.date').exists()).to.equal(false);
  });
});
