<template>
  <transition
    enter-active-class="transition duration-150"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-150"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="show" class=" absolute z-10 inset-0 bg-white/90 flex justify-center items-center text-violet-600 indigo:text-indigo-600">
      <!-- inset 是新的class語法 -->
      <LoadingIcon class="w-6 h-6"/>
      <span class="ml-2 text-lg">{{ text }}.</span>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      text:{
        type: String,
        default: '載入中...',
      },
      show:{
        type: Boolean,
        default: false,
      },
    }
  }
</script>