<template>
  <Layout>
    <div class="p-4 space-y-4">
      <!-- space-y-4 間隔 -->
      <!--  focus:outline-none 
        focus:ring-offset-2
        focus:ring-violet-500
        聚焦屬性
      -->
      <!-- transition-colors -->
      <div class="space-x-4">
        <PrimaryButton @click="showModal = true">
          主要按鈕
        </PrimaryButton>
        <ConfirmModal
          v-model="showModal"
          title="確定要刪除文章?"
          @success="success"
          @cancel="cancel"
        >
        </ConfirmModal>
      </div>
    </div>
  </Layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup(){
    const showModal = ref(false)

    const success = ()=>{
      console.log('success')
    }

    const cancel = ()=>{
      console.log('cancel')
    }
    return{ showModal, success, cancel }
  }
}
</script>