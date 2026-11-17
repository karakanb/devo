import { expect } from 'chai';

import {
  buildUrl, normalizeSettings, toItems, DEFAULT_SETTINGS,
} from '@/components/HuggingFace/huggingface';

const query = url => Object.fromEntries(
  [...new URL(url).searchParams.keys()].map(key => [key, new URL(url).searchParams.getAll(key).join(',')]),
);

describe('huggingface.js', () => {
  it('builds the models url with filters', () => {
    const url = buildUrl({
      section: 'models', sort: 'likes', search: ' llama ', author: '@meta-llama', pipelineTag: 'text-generation',
    });

    expect(url.startsWith('https://huggingface.co/api/models?')).to.equal(true);
    expect(query(url)).to.include({
      limit: '30', sort: 'likes', search: 'llama', author: 'meta-llama', pipeline_tag: 'text-generation',
    });
    expect(query(url)['expand[]']).to.contain('pipeline_tag');
  });

  it('builds the url of every section', () => {
    expect(buildUrl({ section: 'spaces', sort: 'trendingScore' })).to.contain('/api/spaces?');
    expect(query(buildUrl({ section: 'spaces' }))['expand[]']).to.contain('cardData');
    expect(buildUrl({ section: 'datasets', sort: 'downloads' })).to.contain('/api/datasets?');
    expect(buildUrl({ section: 'papers', sort: 'today' })).to.equal('https://huggingface.co/api/daily_papers?limit=30');
    expect(query(buildUrl({ section: 'papers', sort: 'trending' }))).to.include({ sort: 'trending' });
    expect(query(buildUrl({
      section: 'collections', sort: 'upvotes', search: 'qwen', author: 'Qwen',
    }))).to.include({ sort: 'upvotes', q: 'qwen', owner: 'Qwen' });
  });

  it('keeps only what the section supports', () => {
    expect(normalizeSettings()).to.deep.equal(DEFAULT_SETTINGS);
    expect(normalizeSettings({ section: 'nope', sort: 'nope' })).to.deep.equal(DEFAULT_SETTINGS);
    expect(normalizeSettings({
      section: 'spaces', sort: 'downloads', search: 'flux', pipelineTag: 'text-to-image',
    })).to.deep.equal({
      section: 'spaces', sort: 'trendingScore', search: 'flux', author: '', pipelineTag: '',
    });
    expect(normalizeSettings({ section: 'papers', search: 'x', author: 'y' })).to.deep.equal({
      section: 'papers', sort: 'today', search: '', author: '', pipelineTag: '',
    });
    expect(normalizeSettings({ author: '../evil', pipelineTag: 'made-up' })).to.include({ author: '', pipelineTag: '' });
  });

  it('reduces models, datasets and spaces to slim items', () => {
    const [model] = toItems([{
      id: 'Qwen/Qwen3-8B', author: 'Qwen', likes: 12, downloads: 3400, pipeline_tag: 'text-generation', createdAt: '2026-11-01T00:00:00.000Z',
    }], 'models');
    expect(model).to.include({
      kind: 'model', title: 'Qwen/Qwen3-8B', url: 'https://huggingface.co/Qwen/Qwen3-8B', tag: 'text-generation', likes: 12, downloads: 3400, author: 'Qwen',
    });

    const [dataset] = toItems([{ id: 'org/data', likes: 1, downloads: 2 }], 'datasets');
    expect(dataset).to.include({ kind: 'dataset', url: 'https://huggingface.co/datasets/org/data', author: 'org' });

    const [space] = toItems([{
      id: 'bfl/flux', sdk: 'gradio', likes: 5, cardData: { title: 'FLUX', emoji: '🌲', short_description: 'Image editing' },
    }], 'spaces');
    expect(space).to.include({
      kind: 'space', title: 'FLUX', emoji: '🌲', subtitle: 'Image editing', url: 'https://huggingface.co/spaces/bfl/flux', downloads: null,
    });
  });

  it('reduces papers and collections to slim items', () => {
    const [paper] = toItems([{
      paper: {
        id: '2611.00001', title: 'A paper', upvotes: 40, publishedAt: '2026-11-15T00:00:00.000Z', summary: 'long text',
      },
      numComments: 3,
      organization: { name: 'nvidia' },
    }], 'papers');
    expect(paper).to.deep.include({
      kind: 'paper', title: 'A paper', url: 'https://huggingface.co/papers/2611.00001', likes: 40, comments: 3, author: 'nvidia',
    });
    expect(paper).to.not.have.property('summary');

    const [collection] = toItems([{
      slug: 'Qwen/qwen3-abc', title: 'Qwen3', description: 'All of them', upvotes: 9, owner: { name: 'Qwen' }, items: [{}, {}],
    }], 'collections');
    expect(collection).to.include({
      kind: 'collection', title: 'Qwen3', url: 'https://huggingface.co/collections/Qwen/qwen3-abc', subtitle: 'All of them', likes: 9, author: 'Qwen',
    });
  });

  it('ignores unexpected responses', () => {
    expect(toItems(null, 'models')).to.deep.equal([]);
    expect(toItems({ error: 'x' }, 'models')).to.deep.equal([]);
    expect(toItems([null, {}, { id: 'a/b' }], 'models')).to.have.lengthOf(1);
  });
});
