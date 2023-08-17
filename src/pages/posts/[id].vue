<template>
  <Layout>
    <PageHeader>
      <template #title>
        <RouterLink to="/posts" class="link">文章</RouterLink>
          / 編輯文章
      </template>
      <template #actions>
        <PrimaryButton to="/posts"> 新增</PrimaryButton>
      </template>
    </PageHeader>
    <Card class="mt-6">
      <CardContent>
        <PostForm
          v-model="form"
          :default-image="defaultImage"
          :tag-autocomplete-items="tagsAutocompleteItems"
          @submit="submit"
          @submit-draft="submitDraft"
        ></PostForm>
      </CardContent>
      <Loading :show="loading" :text="'保存中...'"/>
    </Card>
  </Layout>
</template>

<script>
import { ref, reactive} from 'vue'
import { useRouter } from 'vue-router';
import { successNotify } from '@/composables/useNotification';
import { promiseTimeout } from '@vueuse/shared';

export default{
    setup() {
        const loading = ref(false)
        const router = useRouter();
        const form = reactive({
            title: "這是我的文章",
            content: `
              <h1>哈囉123</h1>
              <p>菜單明細</p>
              <ul>
                <li>巧克力蛋糕</li>
                <li>草莓氣泡飲</li>
              </ul>
              <a href="https://ciao.kitchen/gateau-au-chocolat/">店家網址</a>
              <<img src="data:image/jpeg;base64,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" alt="巧克力蛋糕ｚ" />
            `,
            image: null,
            description: "123test",
            tags: ['Vue3']
        });
        const defaultImage = ref('https://fakeimg.pl/440x320/282828/eae0d0/?retina=1')

        const tagsAutocompleteItems =  [
          'Spain','France','USA','Germany','China'
        ]

        const submitDraft =async() => {
            loading.value = true
            await promiseTimeout(1000)
            loading.value = false
            router.push('./posts').then(() => {
                successNotify('草稿保存成功');
            });
        };
        const submit = async() => {
            loading.value = true
            await promiseTimeout(1000)
            loading.value = false
            router.push('./posts').then(() => {
                successNotify('文章發布成功');
            });
        };
        return { loading, form, defaultImage, tagsAutocompleteItems, submitDraft, submit };
    }
}
</script>