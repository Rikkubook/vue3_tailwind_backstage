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
    <Card class="mt-10 mb-[100px]">
      <CardContent>
        <h4 class="text-xl text-gray-800 dark:text-gray-200 font-medium tracking-wide">其他設定</h4>
        <div class="mt-4">
          <label class="form-label" for="theme">主題顏色</label>
          <Select 
            id="theme"
            v-model="theme"
            :options="themeOptions"
            class="max-w-[200px]"
          >
            <template #button>
              <div class="inline-flex items-center"> 
                <div class="w-5 h-5 rounded mr-2" :class="currentTheme.color"></div>
                {{ currentTheme.label }}
              </div>
            </template>
            <template #option="{option}">
              <div class="inline-flex items-center">
                <div class="w-5 h-5 rounded mr-2" :class="option.color"></div>
                <div> {{ option.label }}</div>
              </div>

            </template>
          </Select>
        </div>
      </CardContent>
    </Card>
  </Layout>
</template>

<script>
import { ref, reactive} from 'vue'
import { successNotify } from '@/composables/useNotification';
import { promiseTimeout } from '@vueuse/core';
import { useTheme } from '@/composables/useTheme';

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

        const { theme, themeOptions, currentTheme } = useTheme()
        return { loading, form, defaultAvatar, submit, theme, themeOptions, currentTheme  };
    }
}
</script>