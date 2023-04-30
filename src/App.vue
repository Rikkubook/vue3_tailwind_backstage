<script setup>
import AppConfirmModal from './sections/AppConfirmModal.vue';
import AppNotification from './sections/AppNotification.vue';

</script>

<template>
  <RouterView></RouterView> 
  <AppConfirmModal></AppConfirmModal>
  <AppNotification></AppNotification>
</template>

<style scoped>
</style>
