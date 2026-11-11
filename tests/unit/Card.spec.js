import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faSyncAlt, faExternalLinkAlt, faCog } from '@fortawesome/free-solid-svg-icons';

import Card from '@/components/Card.vue';

library.add(faGithub, faSyncAlt, faExternalLinkAlt, faCog);

const objectProps = {
  title: 'test title',
  icon: ['fab', 'github'],
  iconOnClick: vi.fn(),
  externalLink: 'https://github.com/trending',
};

describe('Card.vue', () => {
  it('card is properly rendered', () => {
    const titleContent = 'this is card title';
    const title = `<h1>${titleContent}</h1>`;

    const bodyContent = 'this is card body.';
    const body = `<p>${bodyContent}</p>`;

    const wrapper = mount(Card, {
      props: objectProps,
      slots: {
        'card-title': title,
        'card-body': body,
      },
      global: {
        components: {
          'font-awesome-icon': FontAwesomeIcon,
        },
      },
    });

    expect(wrapper.find('.card-title-text').text()).toContain(titleContent);
    expect(wrapper.find('.card-body').text()).toContain(bodyContent);
    expect(wrapper.find('.external-icon > a').attributes('href')).toBe(objectProps.externalLink);
    expect(wrapper.findAllComponents(FontAwesomeIcon).length).toBe(3);
  });

  it('icon action triggered on click', () => {
    const wrapper = mount(Card, { 
      props: objectProps,
      global: {
        components: {
          'font-awesome-icon': FontAwesomeIcon,
        },
      },
    });
    const refreshIcon = wrapper.find('.fa-refresh-icon');
    refreshIcon.trigger('click');
    expect(objectProps.iconOnClick).toHaveBeenCalledOnce();
  });

  it('settings icon is rendered only when there is a settings action', () => {
    const global = { components: { 'font-awesome-icon': FontAwesomeIcon } };
    const settingsOnClick = vi.fn();

    const withoutSettings = mount(Card, { props: objectProps, global });
    expect(withoutSettings.find('.settings-icon').exists()).toBe(false);

    const withSettings = mount(Card, { props: { ...objectProps, settingsOnClick }, global });
    withSettings.find('.settings-icon').trigger('click');
    expect(settingsOnClick).toHaveBeenCalledOnce();
  });
});
