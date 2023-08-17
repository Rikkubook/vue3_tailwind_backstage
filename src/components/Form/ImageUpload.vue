<template>
  <div :class="wrapperClass">
    <label :for="id" class="form-label">
      {{ label }}
    </label>

    <div :class="imageWrapperClass">
      <div class="overflow-hidden" :class="imageClass">
        <!-- 預覽圖片 -->
        <img v-if="previewImageSrc || defaultImage" class="object-cover" :src="previewImageSrc || defaultImage" alt="">
        <!-- 預設圖片模板 -->
        <div v-else class=" flex justify-center items-center bg-gray-400 text-white">
          <heroicons-outline-photograph class="h-10 w-10 "/>
        </div>
        <!-- 刪除圖片按鈕 -->
        <div v-if="modelFile">
          <button
            type="button"
            class=" absolute flex  justify-center items-center h-6 w-6 top-4 right-4 bg-gray-700/50 text-white rounded-full"
            @click="removeSelectFile"
          >
            <heroicons-outline-x class="h-5 w-5 "/>
          </button>
        </div>
      </div>
    </div>

    <PrimaryButton class="mt-3 w-full flex items-center" @click="selectFile">
      <heroicons-outline-cloud-upload class="mr-1 h-5 w-5"/> 上傳圖片
    </PrimaryButton>
    <div class="mt-2 text-gray-400 text-sm">圖片最大5MB</div>

    <input ref="fileEl" class="hidden" type="file" accept="image/*" @change="onChangeFile">
  </div>
</template>  
<script>
import { ref } from 'vue';
import { useVModel } from '@vueuse/core'; // 用這個達到雙向綁定

  export default {
		inheritAttrs: false, // 自動繼承 改為手動 v-bind
    emits:['update:modelValue'], // 更新
		props:{
      id: String,
      modelValue: File, // 綁檔案
      label: String,
      error: String,
      defaultImage: String,
      type: {
        type: String,
        default: 'text'
      },
			wrapperClass: [String, Array, Object],
      imageClass: {
        type: [String, Array, Object],
        default: 'aspect-w-1 aspect-h-1'
      },
      imageWrapperClass: [String, Array, Object],
    },
    setup(props,{emit}){
		  const modelFile = useVModel(props); // 雙向
      const fileEl = ref(null);
      const previewImageSrc = ref(null)

      const selectFile = ()=>{ // 觸發選擇檔案
        fileEl.value.click()
      }
      const onChangeFile = ()=>{
        const [file] = fileEl.value.files
        const reader = new FileReader()

        reader.readAsDataURL(file)
        reader.onload = ()=>{ // 等讀完轉base64
          const dataUrl = reader.result
          previewImageSrc.value = dataUrl
          emit('update:modelValue', file) // 把檔案傳出去
        }
      }
      const removeSelectFile = ()=>{
        previewImageSrc.value = null
        emit('update:modelValue', null) 
      }

      return {modelFile, fileEl, previewImageSrc, selectFile, onChangeFile, removeSelectFile}
    }
  }
</script>