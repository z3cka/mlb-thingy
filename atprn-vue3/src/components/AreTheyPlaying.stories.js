import AreTheyPlaying from './AreTheyPlaying.vue'

export default {
  title: 'Are They Playing',
  component: AreTheyPlaying,
}

const Template = (args) => ({
  components: { AreTheyPlaying },
  setup() {
    return { args };
  },
  template: '<AreTheyPlaying v-bind="args" />',
})

export const No = Template.bind({})

