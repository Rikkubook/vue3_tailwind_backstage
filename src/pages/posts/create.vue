<template>
  <Layout>
    <PageHeader>
      <template #title>
        <RouterLink to="/posts" class="link">文章</RouterLink>
          / 新增文章
      </template>
      <template #actions>
        <PrimaryButton to="/posts"> 新增</PrimaryButton>
      </template>
    </PageHeader>
    <Card class="mt-6">
      <div class="p-4">
        <!-- 左側文章 -->
        <div class="space-y-4">
          <div>
            <label for="title" class="form-label">文章標題</label>
            <input type="text" id="title" class="form-input" v-model="form.title">
            <div class="form-error">請輸入標題</div>
          </div>
          <div>
            <label for="content" class="form-label">文章內容</label>
            <textarea type="text" id="content" class="form-textarea h-[200px]" v-model="form.content"></textarea>
            <div class="form-error">請輸入內容</div>
          </div>
        </div>
        <!-- 右側側邊欄 -->
        <div class="space-y-4">
          <div>
            <label for="image" class="form-label">縮圖</label>
            <div class="aspect-w-16 aspect-h-9">
              <div class=" flex justify-center items-center bg-gray-400 text-white rounded-md ">
                <heroicons-outline-photograph class="h-10 w-10 "/>
              </div>
            </div>
          </div>
          <div></div>
          <div></div>
          <!-- 手機版送出按鈕 -->
          <div></div>
        </div>
      </div>
    </Card>
  </Layout>
</template>

<script>
import {reactive} from 'vue'

export default{
  setup(){
    const form = reactive({
      title: '',
      content: `嗨嗨嗨囉～`
    })

    return {form} 
  }
}
</script>