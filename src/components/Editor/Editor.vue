<template>
  <div :class="wrapperClass">
    <label :for="id" class="form-label">
      {{ label }}
    </label>
    <div v-if="editor" class="form-input p-0 focus-within:border-violet-600 focus-within:ring-1 focus-within:ring-violet-600"> 
      <!-- 多一層判斷是否已渲染 editor-->
      <EditorMenuBar :editor="editor"/>
      <EditorContent class="px-3 py-2" :editor="editor" />
    </div>
    <div v-if="error" class="form-error">{{ error }}</div>
  </div>
</template>

<script>
import { watch } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

export default {
  components: {
    EditorContent,
  },
  inheritAttrs: false, // 自動繼承 改為手動 v-bind
  emits:['update:modelValue'], // 更新
  props:{
    id: String,
    modelValue: Array ,
    label: String,
    error: String,
    autocompleteItems: {type: Array, default:()=> []},
    wrapperClass: [String, Array, Object]
  },
  setup(props, { emit }) {
    const editor = useEditor({ // 改vue3寫法
      content: props.modelValue,
      extensions: [
        StarterKit,
      ],
      editorProps: { // typography 內部渲染樣式
        attributes: {
          class: 'prose prose-sm sm:prose mx-auto focus:outline-none !max-w-full min-h-[300px]',
        },
      },
      onUpdate: () => {
        // HTML
        emit('update:modelValue', editor.value.getHTML()) 
      }
    })

    watch(()=> props.modelValue, value => {
      if (editor.value.getHTML() === value) { // 如果一樣就不傳值
        return
      }
      editor.value.commands.setContent(value, false)
    })

    return { editor }
  },
}
</script>