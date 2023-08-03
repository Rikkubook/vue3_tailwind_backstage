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
      <Loading :show="loading" :text="'保存中...'"/>
      <PostForm
        class="p-4"
        v-model="form"
        :default-image="defaultImage"
        :tag-autocomplete-items="tagsAutocompleteItems"
        @submit="submit"
        @submit-draft="submitDraft"
      ></PostForm>
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
            title: "",
            content: `嗨嗨嗨囉～`,
            image: null,
            description: "",
            tags: []
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