<template>
  <Listbox v-model="selected">
    <div class="relative">
      <ListboxButton
        class="form-select py-2 pl-4 pr-10 text-gray-600 text-left shadow rounded-md"
      >
        <slot name="button"></slot>
      </ListboxButton>

      <TransitionZoom>
        <ListboxOptions
          class="absolute z-[1] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm origin-top-right"
        >
          <ListboxOption
            v-slot="{ active, selected }"
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            as="template"
          >
            <li
              :class="{'bg-gray-100': active}"
              class="relative cursor-pointer select-none py-2 px-4 text-gray-600"
            >
              <slot name="option" :option="option" :selected="selected" :active="active"></slot>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </TransitionZoom>
    </div>
  </Listbox>
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
    },
    options:{
      type: Array,
    }
  },
  setup(props){
    const selected = useVModel(props)

    const selectedValue = computed(() => {
      const find =  options.find((option)=> {
        return option.value === selected.value
      })
      return find.label
    })

    return { selected, selectedValue}
  }
}
</script>
