<template>
  <input
    type="checkbox"
    class="form-checkbox"
    :checked="state"
    @change="updateState"
  >
</template>

<script>
import { useVModel } from '@vueuse/core'

export default {
  emits: ['update:state'],
  props:{
    state: Boolean,
    index: Number
  },
  setup(props,{ emit }){
    // const state = useVModel(props, 'state') 

    const updateState = (event)=>{
      emit('update:state',event.target.checked, props.index ) // 原始寫法
      // console.log(event.target.checked)
      // state.value = event.target.checked
    }

    return{ updateState}
  }
}
</script>

<style lang="scss" scoped>

</style>