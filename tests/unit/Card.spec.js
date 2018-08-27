import Vue from 'vue';
import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Card from '@/components/Card.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.component('font-awesome-icon', FontAwesomeIcon);

const dummyOnClick = () => { };
const objectProps = {
  icon: ['fab', 'github'],
  iconOnClick: dummyOnClick,
  title: 'test title',
  externalLink: 'https://github.com/trending',
};

describe('Card.vue', () => {
  it('renders title of the card', () => {
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
});
