<template>
  <notifications>
    <template #body="{item, close}">
      <div
        class="relative  mx-4 mb-4 bg-white shadow-lg rounded-lg overflow-hidden"
        :class="`notification-${item.type || 'default'}`"
      >
        <div class="notification-inner flex p-3 border-l-4">
          <heroicons-outline-check-circle v-if="item.type === 'success'" class="notification-icon"></heroicons-outline-check-circle>
          <heroicons-outline:information-circle v-else-if="item.type === 'warn'" class="notification-icon"></heroicons-outline:information-circle>
          <heroicons-outline:x-circle v-else-if="item.type === 'error'" class="notification-icon"></heroicons-outline:x-circle>
          <heroicons-outline:information-circle v-else class="notification-icon"></heroicons-outline:information-circle>

          <div class="ml-2">
            <p class="mt-0.5 text-gray-600 font-normal tracking-wide">
              {{ item.title }}
            </p>
            <p v-if="item.text" class="mt-0.5 text-gray-400 text-sm">
              {{ item.text }}
            </p>
            <button
              class="absolute right-2 w-6 h-6 flex justify-center items-center text-gray-400 hover:text-gray-500 transition-color duration-100"
              :class="item.text? 'top-2': 'top-4'"
              @click="close">
              <heroicons-outline-x class="w-4 h-4"></heroicons-outline-x>
            </button>
          </div>
        </div>
      </div>
    </template>
  </notifications>
</template>

<script>
export default {

}
</script>