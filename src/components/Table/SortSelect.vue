<template>
  <Select v-model="selected" :options="options" >
    <template #button
      class="form-select pl-4 text-gray-600 text-left shadow rounded-md"
    >
      <span class="block truncate">排序 {{ selectedValue }}</span>
      <span
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
      >
      </span>
    </template>

    <template #option="{option, selected}">
      <span
        :class="[
          selected ? 'font-medium' : 'font-normal',
          'block truncate pl-6'
        ]"
        >{{ option.label }}</span
      >
      <span
        v-if="selected"
        class="absolute inset-y-0 left-0 flex items-center pl-3 text-violet-600"
      >
        <heroicons-outline-check class="h-5 w-5" aria-hidden="true" />
      </span>
    </template>
  </Select>
</template>


<script>
import { computed } from 'vue'
import { useVModel } from '@vueuse/core'

export default {
  emits: ['update:modelValue'],
  props:{
    modelValue:{
      type: String,
      default: 'asc'
    }
  },
  setup(props){
    const selected = useVModel(props)
    const options = [
      { value: 'asc', label: 'A-Z'},
      { value: 'desc', label: 'Z-A'}
    ]
    const selectedValue = computed(() => {
      const find =  options.find((option)=> {
        return option.value === selected.value
      })
      return find.label
    })

    return { selected, options, selectedValue}
  }
}
</script>
