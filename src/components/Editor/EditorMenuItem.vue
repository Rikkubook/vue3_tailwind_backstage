<template>
  <button
    class="mr-1 w-7 h-7 p-1 rounded"
    :class="isActive()? 'bg-violet-500 indigo:bg-indigo-500 dark:bg-stone-500 text-white':'hover:bg-violet-500 indigo:hover:bg-indigo-500 dark:hover:bg-stone-500 hover:text-white'"
    @click="action"
    :title="title"
  >
  <RemixIcon :icon="icon"/>
  </button>
</template>

<script>

export default {
  props: {
    icon: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    action: {
      type: Function,
      required: true,
    },

    isActive: {
      type: Function,
      default: ()=> false,
    },
  }
}
</script>
