<template>
  <div  v-if="isUp" class="flex items-center text-green-500 font-medium self-end">
    <div>
      <heroicons-outline-trending-up  />
      <div class="ml-1">{{ value }} {{ percentage? '%': '' }}</div>
    </div>
  </div>
  <div  v-else class="flex items-center text-red-500 font-medium self-end">
    <div>
      <heroicons-outline-trending-down  />
      <div class="ml-1">{{ value }} {{ percentage? '%': '' }}</div>
    </div>
  </div>
</template>

<script>
export default{
  props:{
    isUp:{
      type: Boolean, default: true
    },
    value: [Number,String],
    percentage:{
      type: Boolean, default: true
    }
  }
}
</script>