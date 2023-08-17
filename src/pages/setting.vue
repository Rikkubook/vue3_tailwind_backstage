<template>
  <Layout>
    <PageHeader>
      <template #title>
        個人資料
      </template>
      <template #actions>
        <PrimaryButton to="/posts"> 新增</PrimaryButton>
      </template>
    </PageHeader>
    <Card class="mt-6">
      <CardContent>
        <form @submit.prevent="submit">
          <div class="grid md:grid-cols-12 gap-6">
            <div class="space-y-6 md:col-span-9">
              <TextInput label="姓名" id="name" v-model="form.name" :error="'請輸入標題'" required></TextInput>
              <Textarea class="h-28" label="介紹" id="description" v-model="form.description" :error="'請輸入標題'" required></Textarea>
            </div>
            <div class="text-center order-first md:col-span-3 md:order-none">
              <ImageUpload
                label="縮圖"
                id="image"
                v-model="form.avatar"
                :default-image="defaultAvatar"
                image-class="aspect-w-1 aspect-h-1 rounded-full "
                image-Wrapper-Class="w-36 mx-auto"
              />
            </div>

            <TextInput wrapper-class="md:col-span-6" label="Email" id="email" type="email" v-model="form.email" :error="'請輸入Email'" required></TextInput>
            <TextInput wrapper-class="md:col-span-6" label="密碼" id="password" type="password" v-model="form.password" :error="'請輸入密碼'" required></TextInput>
          </div>
          <div class="mt-6 flex justify-end">
            <PrimaryButton type="submit" class="w-full md:w-auto">
              儲存設定
            </PrimaryButton>
          </div>
        </form>
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
        const form = reactive({
            name: "",
            description: "",
            avatar: null,
            email: "",
            password: ""
        });
        const defaultAvatar = ref('https://fakeimg.pl/440x320/282828/eae0d0/?retina=1')

        const submit = async() => {
            loading.value = true
            await promiseTimeout(1000)
            loading.value = false
            successNotify('個人資料儲存成功')
        };
        return { loading, form, defaultAvatar, submit };
    }
}
</script>