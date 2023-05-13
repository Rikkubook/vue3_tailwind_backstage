<template>
  <div class="overflow-x-auto">
    <table class="w-full">
      <thead>
        <tr class="border-b border-gray-200">
          <th class="pl-5 py-3 text-left">
            <input type="checkbox" class="form-checkbox">
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
          v-for="record in data"
          :key="record.id"
        >
          <td class="pl-5 py-3 text-gray-600 whitespace-nowrap">
            <input type="checkbox" class="form-checkbox">
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
</template>

<script>
import {computed} from 'vue'

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
    }
  },
  setup (props) {
    const columnCount = computed(()=>{
      return props.columns.length +2
    })
    return {columnCount}
  }
}
</script>

<style lang="scss" scoped>

</style>