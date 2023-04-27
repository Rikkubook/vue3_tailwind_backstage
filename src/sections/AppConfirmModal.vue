<template>
  <ConfirmModal
    v-model="showModal"
    :title="confirmTitle"
    @success="handleSuccess"
    @cancel="handleCancel"
  >
  </ConfirmModal>
</template>

<script>
import {ref, computed} from 'vue'

import { useConfirmModel } from '@/composables/useConfirmModal'
export default {
  setup(){
    return{ ...useConfirmModel() }
  }
}
</script>
