<template>
  <div :class="wrapperClass">
    <label :for="id" class="form-label">
      {{ label }}
    </label>
    <VueTagsInput
      v-model="newTag"
      :tags="tags"
      :autocomplete-items="formatAutoItems"
      placeholder=""
      @tags-changed="updateTags"
    />
    <div v-if="error" class="form-error">{{ error }}</div>
  </div>
</template>  
<script>
import { ref, computed } from 'vue';
import VueTagsInput from "@sipec/vue3-tags-input";

  export default {
    components: {
      VueTagsInput,
    },
		inheritAttrs: false, // 自動繼承 改為手動 v-bind
    emits:['update:modelValue'], // 更新
		props:{
      id: String,
      modelValue: Array , // v-model
      label: String,
      error: String,
      autocompleteItems: {type: Array, default:()=> []}, // 不成default直接給預設值因為會傳新物件
			wrapperClass: [String, Array, Object]
    },
    setup(props, {emit}){
      const tags = props.modelValue.map(text => {return {text:text}}) 
      // 這邊是修改套件的用法 因為套件本來是 {text:text, tiClasses} 但我們傳出去是array 返回要改回
      const newTag = ref('')

      const updateTags =(newTag)=>{ // newTag 是 Array
        emit('update:modelValue', newTag.map((tag)=> tag.text))
        newTag.value = ''
      }

      const formatAutoItems = computed(()=>{
        return props.autocompleteItems
          .filter(item => item.toLowerCase().indexOf(newTag.value.toLowerCase()) !== -1)
          .map(text => ({text}))
          // 這邊是修改套件的用法 因為套件本來是 {text:text, tiClasses} 但我們傳出去是array 返回要改回
          // 不為-1表示存在
      })
      return {tags, newTag, updateTags, formatAutoItems}
    }
  }
</script>