import {ref, computed} from 'vue'

export default function useButton(props){
  const getTag = () => {
    if(props.is){
      return props.is
    }else if(!props.is && props.to){
      return 'RouterLink'
    }
    return 'button'
  }
  const tag = ref(getTag()) // 特殊用法
  const buttonType = ref(props.type || (tag.value === 'button'? 'button': null)) //也可以使用此寫法
  return {tag , buttonType}
}