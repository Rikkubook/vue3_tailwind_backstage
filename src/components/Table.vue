<template>
  <div class="overflow-x-auto">
    <table class="w-full">
      <thead>
        <tr class="border-b border-gray-200">
          <th class="pl-5 py-3 text-left">
            <SelectAllCheckbox 
              v-model:state="selectAllState"
            />
          </th>
          <th 
            v-for="column in columns"
            :key="column.key"
            class="px-5 py-3 text-left text-gray-400 text-sm font-medium tracking-wider whitespace-nowrap"
          >
            {{  column.label }}
          </th>
          <th class="px-5 py-3 text-left text-gray-400 text-sm font-medium tracking-wider whitespace-nowrap"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(record,i) in data"
          :key="record.id"
          :class="{'bg-violet-50': rowSelectStatus[i]} "
        >
          <td class="pl-5 py-3 text-gray-600 whitespace-nowrap">
            <!-- https://penueling.com/%E7%B7%9A%E4%B8%8A%E5%AD%B8%E7%BF%92/vue3%E4%BD%BF%E7%94%A8v-model%E7%B6%81%E5%AE%9A/ -->
            <!-- https://ithelp.ithome.com.tw/m/articles/10268187 -->
            <SelectRowCheckbox
              v-model:state="rowSelectStatus[i]"
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

          <td>
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
    v-model:current-page="currentPage"
    :total-page="totalPage"
  />
</template>

<script>
import {ref, computed} from 'vue'

export default {
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
  },
  setup (props) {
    const columnCount = computed(()=>{
      return props.columns.length +2
    })
    const currentPage = ref(1)
    const totalPage = ref(10)

    // 全部行的選取狀態
    const selectAllState = ref('none')
    // 行的選取狀態
    const rowSelectStatus = ref(props.data.map(_=>false))

    return { selectAllState, columnCount, currentPage, totalPage, rowSelectStatus}
  }
}
</script>

<style lang="scss" scoped>

</style>