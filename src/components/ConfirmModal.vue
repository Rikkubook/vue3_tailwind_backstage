<template>
  <!-- 這邊是與Modal 共用 -->
  <Modal v-model="isOpen" @success="handleSuccess" @cancel="handleCancel">
    <template #icon>
      <heroicons-outline-exclamation class="mt-8 mx-auto w-12 h-12 text-red-600" />
    </template>
    <template #title>
      <DialogTitle
        as="h3"
        class="text-center text-2xl font-medium leading-6 text-red-600  tracking-wider my-2"
      >
        {{ title }}
      </DialogTitle>
    </template>
    <template #footer>
      <div class="grid grid-cols-2 gap-4">
        <SecondaryButton
          type="button"
          @click="handleCancel"
          class="w-full py-1.5"
        >
          取消
        </SecondaryButton>
        <DangerButton
          type="button"
          @click="handleSuccess"
          class="w-full py-1.5"
        >
          確定
        </DangerButton>
      </div>
    </template> 
    <!-- # 為 v-slot的簡寫 -->
  </Modal>
</template>

<script>
import { useVModel } from '@vueuse/core'

export default{
  props:{
    modelValue: Boolean,
    title: {type: String, default: '確定要刪除嗎？'}
  },
  emits:['update:modelValue', 'success', 'cancel'],
  setup(props, {emit}){
    
    // v-model="modelValue"
    // v-model:data="data" const isOpen = useVModels(props,'data')
    const isOpen = useVModel(props) // 預設會自動抓 'modelValue'

    const openModal = () => {
      // emit('update:modelValue', true)
      isOpen.value = true
    }

    const closeModal = () => {
      // emit('update:modelValue', false)
      isOpen.value = false
    }

    const handleSuccess = ()=>{
      emit('success')
      closeModal()
    }

    const handleCancel = ()=>{
      emit('cancel')
      closeModal()
    }

    return{isOpen, openModal, closeModal, handleSuccess, handleCancel}
  }
}
</script>
