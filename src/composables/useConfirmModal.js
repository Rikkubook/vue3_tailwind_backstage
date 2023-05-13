import {ref, computed} from 'vue'
import mitt from 'mitt'

const confirmEvents = mitt();


const showModal = ref(false)
const confirmTitle = ref('')
const handleSuccess = ()=>{ 
  confirmEvents.emit('success') // 觸法功能 2
}
const handleCancel = ()=>{
  confirmEvents.emit('cancel')
}

export function useConfirmModel(){
  return {
    showModal, confirmTitle, handleSuccess, handleCancel
  }
}

export function useConfirm(title){
  showModal.value = true
  confirmTitle.value = title
  return new Promise((resolve, reject) =>{
    confirmEvents.on('success',()=>{  // 註冊功能 1
      resolve(true);
    })

    confirmEvents.on('cancel',()=>{  // 註冊功能
      resolve(false);
    })

  })
}