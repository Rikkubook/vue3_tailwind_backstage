import {ref, computed} from 'vue'

const showModal = ref(false)
const confirmTitle = ref('')
const handleSuccess = ()=>{
  console.log('success')
}
const handleCancel = ()=>{
  console.log('cancel')
}

export function useConfirmModel(){
  return {
    showModal, confirmTitle, handleSuccess, handleCancel
  }
}