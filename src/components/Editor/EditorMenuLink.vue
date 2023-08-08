<template>
  <div class="relative">
    <button
      class="mr-1 w-7 h-7 p-1 rounded"
      :class="isActive()? 'bg-violet-500 text-white':'hover:bg-violet-500 hover:text-white'"
      @click="action"
      :title="title"
    >
      <RemixIcon :icon="icon"/>
    </button>
    <div class="mt-1.5 absolute top-full left-[-103px] md:left-auto flex items-center w-[300px] p-2 bg-white border border-gray-200 rounded shadow-md">
      <input type="text" class="form-input text-sm px-2 py-1" placeholder="連結...">
      <button
        type="button"
        title="插入連結"
        class="ml-1 w-7 h-7 p-1 flex-shrink-0 rounded hover:bg-violet-500 hover:text-white"
      >
        <RemixIcon icon="check-line"/>
      </button>
      <button
        type="button"
        title="取消連結"
        class="ml-1 w-7 h-7 p-1 flex-shrink-0 rounded hover:bg-violet-500 hover:text-white"
      >
        <RemixIcon icon="link-unlink"/>
      </button>
      <button
        type="button"
        title="瀏覽網頁"
        class="ml-1 w-7 h-7 p-1 flex-shrink-0 rounded hover:bg-violet-500 hover:text-white"
      >
        <RemixIcon icon="external-link-line"/>
      </button>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },

    action: {
      type: Function,
      required: true,
    },

    isActive: {
      type: Function,
      default: ()=> false,
    },
  }
}
</script>
