<template>
  <Card class="flex items-center px-5 py-3">
    <div class="w-10 h-10 flex justify-center items-center bg-violet-100 indigo:bg-indigo-100 dark:bg-gray-500 text-violet-600 indigo:text-indigo-600 dark:text-white rounded-full">
      <heroicons-outline-eye  v-if="icon === 'eye'" />
      <heroicons-outline-star  v-else-if="icon === 'star'" />
      <heroicons-outline-annotation  v-else-if="icon === 'annotation'" />
    </div>
    <div class="ml-3 flex-auto">
      <div class="text-gray-400 text-sm font-normal tracking-wider ">{{ label }}</div>
      <div class="text-3xl font-semibold text-gray-800 dark:text-gray-50">{{ value }}</div>
    </div>
    <Trending :is-up="isUp" :value="trending" percentage />
  </Card>
</template>

<script>
import { babelParse } from 'vue/compiler-sfc';

export default{
  props:{
    icon:{
      type: String,
    },
    label:{
      type: String,
    },
    value: [Number, String],
    isUp: Boolean,
    trending:[Number, String],

  }
}
</script>