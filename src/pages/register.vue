<template>
  <div class="flex justify-center items-center bg-violet-600 indigo:bg-indigo-600 dark:bg-gray-800  min-h-screen">
    <div class="w-[400px] px-4">
      <h1 class="flex justify-center items-center h-16 text-white">
        <heroicons-outline-clipboard-list class="w-10 h-10 mr-2"/>
        <span class="text-4xl font-medium">RikkuPress</span>
      </h1>
  
      <Card class="mt-8 p-6 sm:p-8">
        <form class="space-y-8" @submit.prevent="handleSubmit">
          <TextInput label="姓名" id="name" v-model="form.name" :error="'請輸入名稱'" required></TextInput>
          <TextInput label="Email" id="email" type="email" v-model="form.email" :error="'請輸入Email'" required></TextInput>
          <TextInput label="密碼" id="password" type="password" v-model="form.password" :error="'請輸入密碼'" required></TextInput>
          <TextInput label="確認密碼" id="confirmPassword" type="password" v-model="form.confirmPassword" :error="'請輸入確認密碼'" required></TextInput>
          <PrimaryButton type="submit" class="w-full" :loading="loading">註冊</PrimaryButton>
        </form>
        <hr class="mt-6 mb-4 border-gray-300 dark:border-gray-500">
        <div class="text-center text-gray-600 dark:text-gray-400">
          已有帳號?
          <RouterLink to="/login" class="link">馬上登入</RouterLink>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import { promiseTimeout } from '@vueuse/core'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup(){
    const router = useRouter()
    const form = reactive({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
    const loading = ref(false)

    const handleSubmit = async()=>{
      loading.value = true
      await promiseTimeout(1000) // 模擬打API
      loading.value = false
      router.push('/')
    }
    return { form, loading, handleSubmit }
  }
}
</script>
