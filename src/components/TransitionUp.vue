<template>
  <transition
    enter-active-class="transition duration-200"
    enter-from-class="transform translate-y-full"
    enter-to-class="transform translate-y-0"
    leave-active-class="transition duration-100"
    leave-from-class="transform translate-y-0"
    leave-to-class="transform translate-y-full"
  >
    <slot></slot> 
    <!-- 插槽 -->
  </transition>
</template>