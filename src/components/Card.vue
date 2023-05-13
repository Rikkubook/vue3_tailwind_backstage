<template>
  <div 
    class="relative bg-white shadow border-gray-200"
    :class="
      stretch?
      ' -mx-6 sm:mx-0 border-t border-b sm:border sm:rounded-md': 
      ' border rounded-md' "
  >
    <slot></slot>
  </div>
</template>

<script>
export default{
  props: {
    stretch: Boolean
  }
}
</script>

<style lang="scss" scoped>

</style>