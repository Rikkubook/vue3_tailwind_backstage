<template>
  <div class="relative">
    <button
      class="mr-1 w-7 h-7 p-1 rounded"
      :class="showPopover? 'bg-violet-500 indigo:bg-indigo-500 text-white':'hover:bg-violet-500 indigo:hover:bg-indigo-500 hover:text-white'"
      @click="handleAction"
      :title="title"
    >
      <RemixIcon :icon="icon"/>
    </button>
    <div v-if="showPopover" ref="popoverEl" class="mt-1.5 absolute top-full left-[-103px] md:left-auto w-[300px] bg-white border border-gray-200 rounded shadow-md">
      <TabGroup>
        <TabList class="flex items-center space-x-2 px-3 pt-2.5 border-b border-gray-200">
          <Tab v-for="label in ['連結', '上傳圖片']" :key="label" as="template" v-slot="{selected}">
            <button
              type="button"
              class="pb-1 text-sm  tracking-wide border-b-2 "
              :class="selected? 'text-violet-600 indigo:text-indigo-600 border-violet-600 indigo:border-indigo-600': 'text-gray-500  border-transparent'"
              >
              {{ label }}
            </button>
          </Tab>
        </TabList>
        <TabPanels class="px-3 py-3.5">
          <TabPanel class="flex">
            <input
              ref="urlEl"
              type="text"
              class="form-input text-sm px-2 py-1"
              placeholder="圖片連結..."
              v-model="url"
              @keyup.enter="handleSubmit"
            >
            <button
              type="button"
              title="插入連結"
              class="ml-1 w-7 h-7 p-1 flex-shrink-0 rounded hover:bg-violet-500 indigo:hover:bg-indigo-500 hover:text-white"
              @click="handleSubmit"
            >
              <RemixIcon icon="check-line"/>
            </button>
          </TabPanel>
          <TabPanel>
            <PrimaryButton class="btn-sm w-full flex items-center" @click="selectFile">
              <heroicons-outline-cloud-upload class="mr-1 h-5 w-5"/>  選擇圖片
            </PrimaryButton>
          </TabPanel>
        </TabPanels>
      </TabGroup>

      <input ref="fileEl" class="hidden" type="file" accept="image/*" @change="onChangeFile">
    </div>
  </div>
</template>

<script>
import { onClickOutside } from '@vueuse/core';
import {ref, nextTick} from 'vue';

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
    },
    setup(props) {
        const url = ref('');
        const urlEl = ref(null);
        const showPopover = ref(false);
        const popoverEl = ref(null);
        const fileEl = ref(null)

        const handleAction = () => {
            showPopover.value = !showPopover.value;
            if (showPopover.value === false)
                return;
            url.value = '';
            onClickOutside(popoverEl, event => {
                console.log('aaa');
                showPopover.value = false;
            });
            nextTick(() => {
                urlEl.value.focus();
            });
        };
        const handleSubmit = () => {
            if (url.value) {
                props.action(url.value); // 填入
            }
            showPopover.value = false;
        };

        const selectFile = ()=>{ // 觸發選擇檔案
          fileEl.value.click()
        }

        const onChangeFile = ()=>{
        const [file] = fileEl.value.files
        const reader = new FileReader() 

        reader.readAsDataURL(file)
        reader.onload = ()=>{ // 等讀完轉base64
          const dataUrl = reader.result
          props.action(dataUrl)  // 這裡可以塞後端等回傳API

          showPopover.value = false;
        }
      }

        return {
            url,
            urlEl,
            popoverEl,
            fileEl,
            showPopover,
            handleAction,
            handleSubmit,
            selectFile,
            onChangeFile
        };
    },
}
</script>
