import { computed } from 'vue';
import { useLocalStorage } from '@vueuse/core';

const themeOptions = [
  { label: '紫色', value: 'violet', color: 'bg-violet-500'},
  { label: '藍色', value: 'indigo', color: 'bg-indigo-500'},
  { label: '黑色', value: 'dark', color: 'bg-gray-600'}
]
const currentTheme = computed(()=> themeOptions.find((item)=>item.value === theme.value)
)
const theme = useLocalStorage('theme','violet')

export function useTheme(){
  return {themeOptions, currentTheme, theme}
}