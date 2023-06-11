<template>
  <Listbox v-model="selected">
    <div class="relative">
      <ListboxButton
        class="form-select pl-4 text-gray-600 text-left"
      >
        <span class="block truncate">排序 {{ selectedValue }}</span>
        <span
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
        >
        </span>
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
              class="relative cursor-pointer select-none py-2 pl-10 pr-4 text-gray-600"
            >
              <span
                :class="[
                  selected ? 'font-medium' : 'font-normal',
                ]"
                >{{ option.label }}</span
              >
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-violet-600"
              >
                <heroicons-outline-check class="h-5 w-5" aria-hidden="true" />
              </span>
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
