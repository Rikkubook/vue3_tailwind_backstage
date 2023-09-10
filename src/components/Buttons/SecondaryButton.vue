<template>
  <component
    :is="tag"
    :type="buttonType"
    :to="to"
    :class="[
      'btn border-gray-300 text-gray-700 bg-white hover:bg-gray-100 focus:ring-gray-300 disabled:bg-white disabled:text-gray-400',
      'dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:border-gray-400 dark:ring-offset-gray-700 disabled:bg-gray-700 disabled:text-gray-600'
    ]"
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