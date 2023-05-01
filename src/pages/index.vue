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
        <PrimaryButton @click="open">
          提示
        </PrimaryButton>

      </div>
    </div>
  </Layout>
</template>

<script>
import { notify,  successNotify, warningNotify, errorNotify} from '@/composables/useNotification'
import {ref, computed} from 'vue'
// import { notify } from "@kyvg/vue3-notification";


export default {
  setup(){
    const open = ()=>{
      notify('更新成功')
      successNotify('更新成功')
      warningNotify('警示訊息')
      errorNotify('錯誤訊息','sdasd',{duration: 10000000})
    //   notify({
    //     // type: 'success',
    //     title: "更新成功",
    //     text: "已經更新成功了",
    //     duration: 10000000
    // });
    }

    return{ open }
  }
}
</script>