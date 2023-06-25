<template>
  <div class="overflow-x-auto" v-bind="$attrs">
    <table class="w-full">
      <thead>
        <tr class="border-b border-gray-200">
          <th v-if="showSelection" class="pl-5 py-3 text-left">
            <SelectAllCheckbox
              :disabled="selectAllDisable"
              :state="selectAllState"
              @update:state="updateSelectAllState"
            />
            <!-- 為了避免無限循環 不能用語法糖 -->
          </th>
          <th 
            v-for="column in columns"
            :key="column.key"
            class="px-5 py-3 text-left text-gray-400 text-sm font-medium tracking-wider whitespace-nowrap"
          >
            {{  column.label }}
          </th>
          <th v-if="showActions" class="px-5 py-3 text-left text-gray-400 text-sm font-medium tracking-wider whitespace-nowrap"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(record,index) in data"
          :key="record.id"
          :class="{'bg-violet-50': rowSelectStatus[index]} "
        >
          <td v-if="showSelection" class="pl-5 py-3 text-gray-600 whitespace-nowrap">
            <!-- https://penueling.com/%E7%B7%9A%E4%B8%8A%E5%AD%B8%E7%BF%92/vue3%E4%BD%BF%E7%94%A8v-model%E7%B6%81%E5%AE%9A/ -->
            <!-- https://ithelp.ithome.com.tw/m/articles/10268187 -->
            <SelectRowCheckbox
              :state="rowSelectStatus[index]"
              :index="index"
              @update:state="updateRowSelectStatus"
            />
          </td>

          <td
            v-for="column in columns"
            :key="column.key"
            class="px-5 py-3 text-gray-600 whitespace-nowrap">
            <slot 
              :name="`column-${column.key}`"
              :record="record"
              :value="record[column.key]"
            >
              {{  record[column.key] }}
            </slot>
          </td>

          <td v-if="showActions">
            <slot
              name="actions"
              :record="record"
              :confirm-delete-text="confirmDeleteText"
            ></slot>
          </td>
        </tr>
        <tr v-if="!data.length">
          <td :colspan="columnCount" class="text-center text-gray-400 py-12">
            {{ emptyText }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Pagination
    v-if="showPaginator"
    v-model:current-page="currentPage"
    :total-page="totalPage"
    class="border-t border-gray-200"
  />
  <!-- <input type="checkbox" v-model="showActionBar"> -->
  <ActionsBar :show="showActionBar">
    <div>
      <div class="text-gray-600 test-sm sm:test-base">已選取 {{ selectedIds.length }} 筆資料</div>
    </div>
    <div class="space-x-2">
      <PrimaryButton class="btn-sm sm:btn-base" @click="updateSelectAllState('all')">
        全選
      </PrimaryButton>
      <DangerButton class="btn-sm sm:btn-base" @click="deleteRows()">
        刪除
      </DangerButton>
      <SecondaryButton class="btn-sm sm:btn-base"  @click="updateSelectAllState('none')">
        取消
      </SecondaryButton>
    </div>
  </ActionsBar>
</template>

<script>
import {ref, computed, watch} from 'vue'
import { useConfirm } from '@/composables/useConfirmModal';
import { nextTick } from 'vue';

export default {
  emits:['delete-selected'],
  props:{
    data: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    emptyText:{
      type: String,
      default: '當前沒有任何資料'
    },
    confirmDeleteText:{
      type: String,
      default: '~當前沒有任何資料'
    },
    showSelection:{
      type: Boolean,
      default: true
    },
    showActions:{
      type: Boolean,
      default: true
    },
    showPaginator:{
      type: Boolean,
      default: true
    },
  },
  setup (props,{emit}) {
    const columnCount = computed(()=>{
      return props.columns.length + Number(props.showSelection)+ Number(props.showActions)
    })
    const currentPage = ref(1)
    const totalPage = ref(10)

    // 全部行的選取狀態
    const selectAllState = ref('none')
    // 行的選取狀態
    const rowSelectStatus = ref(props.data.map(_=>false))

    // 算勾選數
    const selectedIds = computed(()=>{
      return props.data
      .filter((_,index) => rowSelectStatus.value[index])
      .map(data => data.id) 
    })

    const selectAllDisable = computed(()=>{
      return props.data.length === 0
    })

    const updateSelectAllState =  state =>{
      selectAllState.value = state

      rowSelectStatus.value = rowSelectStatus.value.map(()=> selectAllState.value === 'all')
    }
    const updateRowSelectStatus =  (state,index) =>{
      rowSelectStatus.value[index] = state

      if(selectedIds.value.length === props.data.length){
        selectAllState.value = 'all'
      }else if(selectedIds.value.length > 0 && selectedIds.value.length < props.data.length){
        selectAllState.value = 'some'
      }else{
        selectAllState.value = 'none'
      }
    }


    // 下方彈出列表
    const showActionBar = ref(false)

    watch(selectAllState, selectAllState =>{
      showActionBar.value = ['some', 'all'].includes(selectAllState)
    })

    const deleteRows = async()=>{
      // 把要刪除的 ID 傳出去到資料層
      if(await useConfirm(props.confirmDeleteText)){
        emit('delete-selected', selectedIds.value)
        await nextTick() // dom會改變
        rowSelectStatus.value = props.data.map(_=>false) // 將預售改回
        selectAllState.value = 'none'
      }
    }
  
    return {
      columnCount,
      currentPage,
      totalPage,
      selectAllState,
      rowSelectStatus,
      selectedIds,
      selectAllDisable,
      updateSelectAllState,
      updateRowSelectStatus,
      showActionBar,
      deleteRows
    }
  }
}
</script>

<style lang="scss" scoped>

</style>