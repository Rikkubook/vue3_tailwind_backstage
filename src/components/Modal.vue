<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="handleCancel" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/20" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all"
            >
              <div class="px-6 py-4">
                <slot name="icon"></slot>
                <slot name="title">
                  <DialogTitle
                    as="h3"
                    class="text-center text-2xl font-medium leading-6 text-gray-900 mb-2"
                  >
                    {{ title }}
                  </DialogTitle>
                </slot>

                <slot name="content"></slot>
              </div>

              <div class="p-6">
                <slot name="footer">
                  <PrimaryButton
                    type="button"
                    @click="handleSuccess"
                    class="w-full py-1.5"
                  >
                    確定
                  </PrimaryButton>
                </slot>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { useVModel } from '@vueuse/core'

export default{
  props:{
    modelValue: Boolean,
    title: String
  },
  emits:['update:modelValue'],
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
