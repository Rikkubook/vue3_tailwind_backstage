<template>
  <div :class="wrapperClass">
    <label :for="id" class="form-label">
      {{ label }}
    </label>
    <input
      :type="type"
      :id="id"
      class="form-input"
      v-model="value"
      v-bind="$attrs"
    >
    <div v-if="error" class="form-error">{{ error }}</div>
  </div>
</template>  
<script>
import { useVModel } from '@vueuse/core'; // 用這個達到雙向綁定

  export default {
		inheritAttrs: false, // 自動繼承 改為手動 v-bind
    emits:['update:modelValue'], // 更新
		props:{
      id: String,
      modelValue: String, // v-model
      label: String,
      error: String,
      type: {
        type: String,
        default: 'text'
      },
			wrapperClass: [String, Array, Object]
    },
    setup(props){
		  const value = useVModel(props); // 雙向
      return {value}
    }
  }
</script>