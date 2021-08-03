import chai from 'chai';
import spies from 'chai-spies';
import { mount, createLocalVue } from '@vue/test-utils';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faSyncAlt, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import Card from '@/components/Card.vue';

library.add(faGithub, faSyncAlt, faExternalLinkAlt);

const localVue = createLocalVue();
localVue.component('font-awesome-icon', FontAwesomeIcon);

chai.use(spies);

const objectProps = {
  title: 'test title',
  icon: ['fab', 'github'],
  iconOnClick: chai.spy(() => { }),
  externalLink: 'https://github.com/trending',
};

describe('Card.vue', () => {
  it('card is properly rendered', () => {
    const titleContent = 'this is card title';
    const title = `<h1>${titleContent}</h1>`;

    const bodyContent = 'this is card body.';
    const body = `<p>${bodyContent}</p>`;

    const wrapper = mount(Card, {
      localVue,
      propsData: objectProps,
      slots: {
        'card-title': title,
        'card-body': body,
      },
    });

    chai.expect(wrapper.find('.card-title-text').text()).to.include(titleContent);
    chai.expect(wrapper.find('.card-body').text()).to.include(bodyContent);
    chai.expect(wrapper.find('.external-icon > a').attributes('href')).to.be.equal(objectProps.externalLink);
    chai.expect(wrapper.findAllComponents(FontAwesomeIcon).length).to.be.equal(3);
  });

  it('icon action triggered on click', () => {
    const wrapper = mount(Card, { localVue, propsData: objectProps });
    const refreshIcon = wrapper.find('.fa-refresh-icon');
    refreshIcon.trigger('click');
    chai.expect(objectProps.iconOnClick).to.have.been.called.once;
  });
});
