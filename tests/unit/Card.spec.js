import Vue from 'vue';
import { expect, use, spy } from 'chai';
import spies from 'chai-spies';
import { mount, shallowMount } from '@vue/test-utils';
import Card from '@/components/Card.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faHackerNewsSquare, faProductHunt } from '@fortawesome/free-brands-svg-icons';
import { faSyncAlt, faCodeBranch, faStar, faChevronUp, faComment, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add([faGithub, faHackerNewsSquare, faProductHunt, faSyncAlt,
  faCodeBranch, faStar, faChevronUp, faComment, faExternalLinkAlt]);
Vue.component('font-awesome-icon', FontAwesomeIcon);

use(spies);
Vue.component('font-awesome-icon', FontAwesomeIcon);

const objectProps = {
  icon: ['fab', 'github'],
  iconOnClick: spy(() => { }),
  title: 'test title',
  externalLink: 'https://github.com/trending',
};

describe('Card.vue', () => {
  it('title is rendered', () => {
    const wrapper = shallowMount(Card, { propsData: objectProps });
    expect(wrapper.text()).to.include(objectProps.title);
  });

  it('external link is set on icon', () => {
    const wrapper = shallowMount(Card, { propsData: objectProps });
    expect(wrapper.find('.external-icon > a').attributes('href').href).to.be.equal(objectProps.externalLink);
  });

  it('body is placed for slot', () => {
    const message = 'this is card body.';
    const cardBody = `<h1>${message}</h1>`;
    const wrapper = shallowMount(Card, { propsData: objectProps, slots: { 'card-body': cardBody } });

    expect(wrapper.find('.card-body').text()).to.include(message);
  });

  it('three font-awesome icons exist on title', () => {
    const wrapper = shallowMount(Card, { propsData: objectProps });
    expect(wrapper.findAll(FontAwesomeIcon).length).to.be.equal(3);
  });

  it('icon action triggered on click', () => {
    const wrapper = mount(Card, { propsData: objectProps });
    const refreshIcon = wrapper.find('.fa-refresh-icon');
    refreshIcon.trigger('click');
    expect(objectProps.iconOnClick).to.have.been.called.once;
  });
});
