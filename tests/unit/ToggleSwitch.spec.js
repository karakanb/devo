import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ToggleSwitch from '@/components/ToggleSwitch.vue';

describe('ToggleSwitch.vue', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(ToggleSwitch);
    
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true);
    expect(wrapper.find('.slider').exists()).toBe(true);
    expect(wrapper.find('input[type="checkbox"]').element.checked).toBe(false);
  });

  it('renders correctly when modelValue is true', () => {
    const wrapper = mount(ToggleSwitch, {
      props: {
        modelValue: true,
      },
    });
    
    expect(wrapper.find('input[type="checkbox"]').element.checked).toBe(true);
  });

  it('emits update:modelValue when clicked', async () => {
    const wrapper = mount(ToggleSwitch, {
      props: {
        modelValue: false,
      },
    });

    const checkbox = wrapper.find('input[type="checkbox"]');
    
    // Set the checkbox to checked and then trigger change event
    checkbox.element.checked = true;
    await checkbox.trigger('change');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([true]);
  });

  it('works with v-model', async () => {
    const Parent = {
      components: { ToggleSwitch },
      template: `
        <div>
          <ToggleSwitch v-model="isToggled" />
          <span data-testid="value">{{ isToggled }}</span>
        </div>
      `,
      data() {
        return {
          isToggled: false,
        };
      },
    };

    const wrapper = mount(Parent);
    
    expect(wrapper.find('[data-testid="value"]').text()).toBe('false');
    
    const checkbox = wrapper.find('input[type="checkbox"]');
    
    // Set the checkbox to checked and then trigger change event
    checkbox.element.checked = true;
    await checkbox.trigger('change');
    
    expect(wrapper.find('[data-testid="value"]').text()).toBe('true');
  });
});