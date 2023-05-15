<template>
  <div class="paginator px-5 py-3">
    <VPagination
      v-model="currentPage"
      :pages="totalPage"
      hide-first-button
      hide-last-button
    />
  </div>
  <!-- <v-pagination
    v-model="page"
    :pages="10"
    :range-size="1"
    active-color="#DCEDFF"
    @update:modelValue="updateHandler"
  /> -->
</template>

<script>
import VPagination from "@hennge/vue3-pagination";
import { useVModel } from '@vueuse/core'

export default {
  components:{
    VPagination
  },
  emits: ['update: currentPage'],
  props:{
    currentPage: {
      type: Number,
      default: 1,
    },
    totalPage: {
      type: Number,
      default: 10,
    }
  },
  setup(props){
    const currentPage = useVModel(props, 'currentPage')

    return{currentPage}
  }
}
</script>