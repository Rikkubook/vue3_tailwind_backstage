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
        <Modal v-model="showModal">
          <template v-slot:title> 我是跳窗</template>
          <template #content> 我是內容</template> 
          <!-- # 為 v-slot的簡寫 -->
        </Modal>
      </div>
    </div>
  </Layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup(){
    const showModal = ref(false)
    return{ showModal }
  }
}
</script>