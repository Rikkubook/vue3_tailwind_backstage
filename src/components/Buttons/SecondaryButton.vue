<template>
  <component
    :is="tag"
    :type="buttonType"
    :to="to"
    class="btn border-gray-300 text-gray-700 bg-white hover:bg-gray-100 focus:ring-gray-300"
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