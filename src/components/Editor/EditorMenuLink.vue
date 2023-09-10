<template>
  <div class="relative">
    <button
      class="mr-1 w-7 h-7 p-1 rounded"
      :class="isActive()? 'bg-violet-500 indigo:bg-indigo-500 dark:bg-stone-500 text-white':'hover:bg-violet-500 indigo:hover:bg-indigo-500 dark:hover:bg-stone-500 hover:text-white'"
      @click="handleAction"
      :title="title"
    >
      <RemixIcon :icon="icon"/>
    </button>
    <div v-if="showPopover" class="mt-1.5 absolute top-full left-[-103px] md:left-auto flex items-center w-[300px] p-2 bg-white dark:bg-gray-600 border border-gray-200 dark:bg-border-500 rounded shadow-md">
      <input
        ref="urlEl"
        type="text"
        class="form-input text-sm px-2 py-1"
        placeholder="連結..."
        v-model="url"
        @keyup.enter="handleSubmit"
      >
      <button
        type="button"
        title="插入連結"
        class="ml-1 w-7 h-7 p-1 flex-shrink-0 rounded hover:bg-violet-500 indigo:hover:bg-indigo-500 dark:hover:bg-stone-500 hover:text-white"
        @click="handleSubmit"
      >
        <RemixIcon icon="check-line"/>
      </button>
      <button
        type="button"
        title="取消連結"
        class="ml-1 w-7 h-7 p-1 flex-shrink-0 rounded hover:bg-violet-500 indigo:hover:bg-indigo-500 dark:hover:bg-stone-500 hover:text-white"
        @click="handleUnlink"
      >
        <RemixIcon icon="link-unlink"/>
      </button>
      <a
        type="button"
        title="瀏覽網頁"
        class="ml-1 w-7 h-7 p-1 flex-shrink-0 rounded hover:bg-violet-500 indigo:hover:bg-indigo-500 dark:hover:bg-stone-500 hover:text-white"
        :href="url"
        target="_blank"
      >
        <RemixIcon icon="external-link-line"/>
      </a>
    </div>
  </div>
</template>

<script>
import { onBeforeUnmount } from 'vue';
import {ref, nextTick, inject, watch} from 'vue';

export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },

    action: {
      type: Function,
      required: true,
    },
    isActive: {
      type: Function,
      default: ()=> false,
    },
  },
  setup(props){
    const editor = inject('editor')
    const editorEvent = inject('editorEvent')

    const url = ref('')
    const urlEl = ref(null)
    const showPopover = ref(false)

    editorEvent.on('link-selected',attrs =>{
      url.value = attrs.href
    })

    onBeforeUnmount(()=>{
      editorEvent.off('link-selected')
    })

    watch(()=>props.isActive(),isActive =>{
      if(!isActive){
        showPopover.value = false
      }
    }) // 失焦時自動關閉

    const handleAction = ()=>{
      showPopover.value = !showPopover.value 
      if(showPopover.value === false) return
      if(props.isActive()){
        // 更新連結
        url.value = editor.value.getAttributes('link').href || ''
      }else{
        // 建立連結
        url.value = ''
        props.action(url.value) // 先新增一組空的
      }

      
      setTimeout(()=>{ // 因為套件自動加的動作比較多所以要再讓他異步
        urlEl.value.focus()
      })
      // nextTick(()=>{ // vue dom 打開後還沒讀到
      //   urlEl.value.focus()
      // })
    }
    const handleSubmit = ()=>{
      props.action(url.value) // 填入
      showPopover.value = false
    }
    const handleUnlink = ()=>{
      props.action(null) // 填入
      showPopover.value = false
    }
    return {
      url,
      urlEl,
      showPopover,
      handleAction,
      handleSubmit,
      handleUnlink
    }
  }
}
</script>
