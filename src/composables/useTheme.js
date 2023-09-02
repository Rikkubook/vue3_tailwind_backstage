import { computed, watch } from 'vue';
import { useLocalStorage } from '@vueuse/core';

const themeOptions = [
  { label: '紫色', value: 'violet', color: 'bg-violet-500'},
  { label: '藍色', value: 'indigo', color: 'bg-indigo-500', htmlClass: 'theme-indigo'},
  { label: '黑色', value: 'dark', color: 'bg-gray-600', htmlClass: 'dark'}
]
const currentTheme = computed(()=> themeOptions.find((item)=>item.value === theme.value)
)
const theme = useLocalStorage('theme','violet')

const applyColor = mapping => mapping[theme.value] || ''

watch(theme,()=>{
  document.documentElement.classList.remove(
    ...themeOptions // 要解構回傳的Array
      .filter(item=>item.htmlClass) //有htmlClass
      .map(item=>item.htmlClass) 
  )
  if(currentTheme.value?.htmlClass){
    document.documentElement.classList.add(currentTheme.value.htmlClass)
  }
},{immediate: true})
export function useTheme(){
  return {themeOptions, currentTheme, theme, applyColor}
}