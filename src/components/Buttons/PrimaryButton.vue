<template>
  <component
    :is="tag"
    :type="buttonType"
    :to="to"
    class="btn text-white bg-violet-500 hover:bg-violet-600 focus:ring-violet-500"
  >
    <slot></slot>
  </component>
</template>

<script>
import useButton from '@/composables/useButton'

export default {
  props:{
    is: String,
    type: String,
    to: String
  },
  setup(props){
    return { ...useButton(props) }
  }
}
</script>