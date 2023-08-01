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
      <div class="p-4 grid gap-6 lg:grid-cols-12">
        <!-- 左側文章 -->
        <div class="space-y-6 lg:col-span-8 xl:col-span-9">
          <TextInput label="文章標題" id="title" v-model="form.title" :error="'請輸入標題'" required></TextInput>
          <Textarea class="h-[200px]" label="文章內容" id="content" v-model="form.content" :error="'請輸入內容'" required></Textarea>
          <!-- 電腦版送出按鈕 -->
          <div class="hidden lg:flex lg:justify-end lg:items-center lg:space-x-4">
            <SecondaryButton @click="submitDraft">保存草稿</SecondaryButton>
            <PrimaryButton @click="submit">發布文章</PrimaryButton>
          </div>
        </div>
        <!-- 右側側邊欄 -->
        <div class="space-y-6 lg:col-span-4 xl:col-span-3">
          <ImageUpload
            label="縮圖"
            id="image"
            v-model="form.image"
            :default-image="defaultImage"
          />
          <TextInput class="h-[200px]" label="文章簡介" id="description" v-model="form.description" :error="'請輸入簡介'" required></TextInput>
          <div>
            <label for="tags" class="form-label">文章標籤</label>
            <input type="text" id="tags" class="form-input" v-model="form.tags">
            <div class="form-error">請輸入標題</div>
          </div>
          <!-- 手機版送出按鈕 -->
          <div class="grid grid-cols-2 gap-4 lg:hidden">
            <SecondaryButton @click="submitDraft">保存草稿</SecondaryButton>
            <PrimaryButton @click="submit">發布文章</PrimaryButton>
          </div>
        </div>
      </div>
    </Card>
  </Layout>
</template>

<script>
import { ref, reactive} from 'vue'
import { useRouter } from 'vue-router';
import { successNotify } from '@/composables/useNotification';

export default{
    setup() {
        const router = useRouter();
        const form = reactive({
            title: "",
            content: `嗨嗨嗨囉～`,
            image: null,
            description: "",
            tags: ""
        });
        const defaultImage = ref('https://fakeimg.pl/440x320/282828/eae0d0/?retina=1')
        const submitDraft = () => {
            router.push('./posts').then(() => {
                successNotify('草稿保存成功');
            });
        };
        const submit = () => {
            router.push('./posts').then(() => {
                successNotify('文章發布成功');
            });
        };
        return { form, defaultImage, submitDraft, submit };
    }
}
</script>