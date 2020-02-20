import { shallowMount } from '@vue/test-utils'
import FormTest from '@/components/FormTest.vue'

describe('FormTest.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(FormTest, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
