<template>
  <TransitionUp>
    <div v-if="show" class="fixed left-0 right-0 bottom-0 bg-white dark:bg-gray-700 h-16 shadow-lg-top sm:left-[16rem] ">
      <div class="w-full h-full flex justify-between items-center px-4 sm:px-10">
        <slot></slot>
      </div>
    </div>
  </TransitionUp>
</template>

<script>

export default{
  props:{
    show: Boolean
  }
}

</script>
