import Vue from 'vue';
import { expect, use, spy } from 'chai';
import spies from 'chai-spies';
import { mount } from '@vue/test-utils';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import Card from '@/components/Card.vue';

use(spies);
Vue.component('font-awesome-icon', FontAwesomeIcon);

const objectProps = {
  title: 'test title',
  icon: ['fab', 'github'],
  iconOnClick: spy(() => { }),
  externalLink: 'https://github.com/trending',
};

describe('Card.vue', () => {
  it('card is properly rendered', () => {
    const titleContent = 'this is card title';
    const title = `<h1>${titleContent}</h1>`;

    const bodyContent = 'this is card body.';
    const body = `<p>${bodyContent}</p>`;

    const wrapper = mount(Card, { propsData: objectProps, slots: { 'card-title': title, 'card-body': body } });
    expect(wrapper.find('.card-title-text').text()).to.include(titleContent);
    expect(wrapper.find('.card-body').text()).to.include(bodyContent);
    expect(wrapper.find('.external-icon > a').attributes('href')).to.be.equal(objectProps.externalLink);
    expect(wrapper.findAllComponents(FontAwesomeIcon).length).to.be.equal(3);
  });

  it('icon action triggered on click', () => {
    const wrapper = mount(Card, { propsData: objectProps });
    const refreshIcon = wrapper.find('.fa-refresh-icon');
    refreshIcon.trigger('click');
    expect(objectProps.iconOnClick).to.have.been.called.once;
  });
});
