<template>
  <div class="grid gap-6 lg:grid-cols-12">
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
      <TextInput label="文章簡介" id="description" v-model="form.description" :error="'請輸入簡介'" required></TextInput>
      
      <TagsInput
        label="文章標籤"
        id="tags"
        v-model="form.tags"
        :autocompleteItems="tagsAutocompleteItems"
      ></TagsInput>

      <!-- 手機版送出按鈕 -->
      <div class="grid grid-cols-2 gap-4 lg:hidden">
        <SecondaryButton @click="submitDraft">保存草稿</SecondaryButton>
        <PrimaryButton @click="submit">發布文章</PrimaryButton>
      </div>
    </div>
  </div>
</template>

<script>
import { useVModel } from '@vueuse/core';

export default {
  emits: ['update:modelValue','submit', 'submit-draft'],
  props:{
    modelValue: Object,
    defaultImage: String,
    tagsAutocompleteItems: Array
  },
  setup(props, { emit } ){
    const form = useVModel(props)

    const submitDraft = () => {
      emit('submit-draft')
    }
    const submit = () => {
      emit('submit')
    }

    return { form, submitDraft, submit };
  }
}
</script>