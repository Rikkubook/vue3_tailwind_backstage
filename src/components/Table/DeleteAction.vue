<template>
  <button
    type="button"
    class="inline-flex justify-center items-center w-8 h-8  text-gray-400 hover:text-violet-600 indigo:hover:text-indigo-600 dark:hover:text-stone-500  transition-colors"
    @click="handleDelete"
  >
    <heroicons-outline-trash />
  </button>
</template>


<script>
import { useConfirm } from '@/composables/useConfirmModal';

export default {
  emits:['delete'],
  props:{
    record: Object,
    confirmDeleteText: {
      type: String,
      default: '確定要刪除此文章嗎'
    }
  },
  setup(props, {emit}){

    const handleDelete = async () =>{
      if( await useConfirm(props.confirmDeleteText)){
        console.log(props.record)
        emit('delete', props.record)
      }

    }
    return { handleDelete }
  }
}
</script>