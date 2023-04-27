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
        <DangerButton @click="deletePost">
          刪除
        </DangerButton>

      </div>
    </div>
  </Layout>
</template>

<script>
import { useConfirmModel } from '@/composables/useConfirmModal'
import {ref, computed} from 'vue'

export default {
  setup(){
    const { showModal, confirmTitle } =  useConfirmModel()

    const deletePost = ()=>{
      showModal.value = true
      confirmTitle.value = '112233'
    }

    return{ deletePost }
  }
}
</script>