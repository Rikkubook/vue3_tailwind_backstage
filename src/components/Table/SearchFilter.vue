<template>
  <div class="flex item-center">
    <!-- ui 與 menu 差異在於可以在裡面進行動作例如確認與取消 -->
    <div class="flex flex-grow sm:flex-grow-0">
      <Popover class="relative flex-shrink-0 -mr-px focus:z-[1]">
        <PopoverButton class="form-select pl-4 text-gray-600 rounded-r-none">
          篩選
        </PopoverButton>
        <TransitionZoon>
          <PopoverPanel
            class="absolute z-10 origin-top-left"
            v-slot="{close}"
          >
            <div class="p-4 w-[270px] mt-2 bg-white border border-gray-200 rounded-md shadow-lg space-y-4">
              <div>
                <label class="text-gray-400 text-sm">
                  建立日期
                </label>
                <div class="mt-1 flex">
                  <select
                    v-model="form.created_date_compare"
                    class="form-select form-select-sm w-[100px] rounded-r-none focus:z-[1] text-sm -mr-px"
                  >
                    <option value="before">之前</option>
                    <option value="after">之後</option>
                  </select>
                  <input
                    v-model="form.created_date_value"
                    type="date"
                    class="form-input form-input-sm rounded-l-none focus:z-[1] test-sm"
                  >
                </div>
              </div>
              <div>
                <label class="text-gray-400 text-sm">
                  瀏覽次數
                </label>
                <div class="mt-1 flex">
                  <select
                    v-model="form.visits_compare"
                    class="form-select form-select-sm w-[100px] rounded-r-none focus:z-[1] text-sm  -mr-px"
                  >
                    <option value="gt">大於</option>
                    <option value="lt">小於</option>
                  </select>
                  <input
                    v-model="form.visits_count"
                    type="number"
                    class="form-input form-input-sm rounded-l-none focus:z-[1] test-sm">
                </div>
              </div>
              <div class="">
                <label class="text-gray-400 text-sm">
                  標籤
                </label>
                <div class="mt-1">
                  <label v-for="tag in tagOptions" :key="tag" class="flex items-center">
                    <input
                      v-model="form.tags"
                      :value="tag"
                      type="checkbox"
                      class="form-checkbox mr-1"
                    >
                    <span>{{ tag  }}</span>
                  </label>
                </div>
              </div>
              <div class="">
                <label class="text-gray-400 text-sm">
                  軟刪除
                </label>
                <div class="mt-1">
                  <label class="flex items-center">
                    <input
                      v-model="form.soft_delete"
                      value="default"
                      type="radio"
                      class="form-radio mr-1"
                    >
                    <span>默認</span>
                  </label>
                  <label class="flex items-center">
                    <input
                      v-model="form.soft_delete"
                      value="contains"
                      type="radio"
                      class="form-radio mr-1"
                    >
                    <span>包含軟刪除</span>
                  </label>
                  <label class="flex items-center">
                    <input
                      v-model="form.soft_delete"
                      value="only"
                      type="radio"
                      class="form-radio mr-1"
                    >
                    <span>只有軟刪除</span>
                  </label>
                </div>
              </div>
              <div class="space-x-2 flex justify-end">
                <SecondaryButton class="btn-sm" @click="close">
                  取消
                </SecondaryButton>
                <PrimaryButton class="btn-sm" @click="submit(close)">
                  確定
                </PrimaryButton>
              </div>
            </div>
          </PopoverPanel>
        </TransitionZoon>
      </Popover>
      <input
        v-model="search"
        type="text"
        placeholder="搜尋..."
        class="form-input placeholder-gray-400 focus:z-[1] rounded-l-none sm:max-w-[200px]"
        @keyup.enter="submitSearch"
      >
    </div>

    <secondaryButton
      type="button"
      class="ml-2 text-gray-400"
      @click="reset"
    >清除</secondaryButton>
  </div>

</template>

<script>
import {ref, reactive} from 'vue'

export default {
  emits: ['filter','search','reset'],
  setup(props, {emit} ){
    const tagOptions = ref([
      '標籤一','標籤二'
    ])
    const form = reactive({
      created_date_compare: null,
      created_date_value: null,
      visits_compare: null,
      visits_count: null,
      tags: [],
      soft_delete: null
    })

    const search = ref('')

    const submit = (close) => {
      //  為了脫鉤reactive
      emit('filter',{...form})
      close()
    }

    const submitSearch =()=>{
      emit('search',search.value)
    }

    const reset = ()=>{
      form.created_date_compare= null,
      form.created_date_value= null,
      form.visits_compare= null,
      form.visits_count= null,
      form.tags= [],
      form.soft_delete= null
      search.value = ''
    }

    return { form, search, tagOptions, submit, submitSearch, reset }
  }
}
</script>
<style>
  
</style>