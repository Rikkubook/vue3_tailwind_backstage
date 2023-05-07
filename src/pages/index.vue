<template>
  <Layout>
    <div class="mt-6 grid md:grid-cols-12 gap-4">
      <TrendingCard
        class="md:col-span-12 lg:col-span-4"
        icon="eye"
        label="瀏覽人次"
        value="145"
        :is-up="true"
        trending="12"
      ></TrendingCard>
      <TrendingCard
        class="md:col-span-12 lg:col-span-4"
        icon="star"
        label="點讚數"
        value="591"
        :is-up="false"
        trending="2"
      ></TrendingCard>
      <TrendingCard
        class="md:col-span-12 lg:col-span-4"
        icon="annotation"
        label="留言數"
        value="7"
        :is-up="true"
        trending="53"
      ></TrendingCard>
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