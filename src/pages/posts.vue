<template>
  <Layout>
    <PageHeader>
      <template #title>文章</template>
      <template #actions>
        <PrimaryButton to="/posts"> 新增</PrimaryButton>
      </template>
    </PageHeader>
    <Card class="mt-6" stretch>
      <Table
        :columns="columns"
        :data="data"
        confirm-delete-text="確定要刪除文章嗎？"
        @delete-selected="handleDeleteSelectedPost"
      >
        <!-- https://vuejs.org/guide/components/slots.html#scoped-slots -->
        <template #column-title="{record, value}">
          <RouterLink :to="`/posts/${record.id}`" class="link font-normal">
            {{  value }}
          </RouterLink>
        </template>
        <template #column-visits="{value}">
          <heroicons-outline-eye class="inline-block w-4 h-4" /> {{ value }} 次
        </template>
        <template #column-tags="{value}">
          <span class="inline-flex space-x-2">
            <span
              v-for="tag in value"
              :key="tag"
              class="text-sm font-normal bg-violet-600 text-white px-2 py-0.5 rounded-full tracking-wider">{{ tag }}</span>
            </span>
        </template>
        <template #actions="{record,confirmDeleteText}">
          <EditAction :to="`/posts/${record.id}`"></EditAction>
          <DeleteAction :record="record" :confirmDeleteText="confirmDeleteText" @delete="handleDeletePost"></DeleteAction>
        </template>
      </Table>
    </Card>
  </Layout>
</template>

<script>
import { successNotify } from '@/composables/useNotification'
import {ref} from 'vue'

export default{
  setup(){
    const columns = ref([
      {key:'title', label: '標題'},
      {key:'desc', label: '簡介'},
      {key:'visits', label: '瀏覽次數'},
      {key:'created_at', label: '建立日期'},
      {key:'tags', label: '標籤'},
    ])

    const data = ref([
      {
        id: 1,
        title: '我的文章',
        desc: '文章簡介',
        visits: 123,
        created_at: '2012/12/03',
        tags: ['標籤一', '標籤二']
      },
      {
        id: 2,
        title: '我的文章',
        desc: '文章簡介',
        visits: 123,
        created_at: '2012/12/03',
        tags: ['標籤一', '標籤二']
      },
      {
        id: 3,
        title: '我的文章',
        desc: '文章簡介',
        visits: 123,
        created_at: '2012/12/03',
        tags: ['標籤一', '標籤二']
      },
    ])

    const handleDeletePost = (deleteRecord)=>{
      // 刪除單一文章
      data.value = data.value.filter((record)=> deleteRecord.id !== record.id)
      successNotify('文章刪除成功')
    }
    const handleDeleteSelectedPost = (ids)=>{
      // 刪除選取文章
      data.value = data.value.filter((record)=> !ids.includes(record.id))
      successNotify('文章刪除成功')
    }

    return {data, columns, handleDeletePost, handleDeleteSelectedPost}
  }
}

</script>
