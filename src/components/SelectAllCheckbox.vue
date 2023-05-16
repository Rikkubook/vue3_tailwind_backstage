<template>
  <input
    ref="elCheckbox"
    type="checkbox"
    class="form-checkbox"
    :checked="checkboxState"
    @change="updateState"
  >
</template>

<script>
import { useVModel } from '@vueuse/core'
import {ref, onMounted, watch} from 'vue'

export default {
  emits: ['update:state'],
  props:{
    state: String,  // 'none', 'all' ,'some' 
    // https://dowyuu.github.io/program/2021/01/07/indeterminate/
  },
  setup(props,{ emit }){
    const elCheckbox= ref(null)
    const checkboxState = ref(false)
    const state = useVModel(props, 'state') 

    const updateState = (event)=>{
      // emit('update:state',event.target.checked ) // 原始寫法
      // console.log(event.target.checked)
      state.value = event.target.checked? 'all': 'none'
    }

    const setElementState= (newSate)=>{
      if(newSate === 'none'){
        checkboxState.value = false
        elCheckbox.value.indeterminate = false
      }else if(newSate === 'all'){
        checkboxState.value = true
        elCheckbox.value.indeterminate = false
      }else if(newSate === 'some'){
        checkboxState.value = false
        elCheckbox.value.indeterminate = true
      }
    }

    onMounted(()=>{
      setElementState(props.state)
    })

    watch(()=>props.state, newSate=>{
      setElementState(newSate)  // 監聽 props 外部變更
    })


    return{ updateState, checkboxState, elCheckbox}
  }
}
</script>

<style lang="scss" scoped>

</style>