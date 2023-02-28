<template>
  <div class="flex min-h-screen">
    <!-- begin::左側選單區域 -->
    <div class="flex flex-col justify-between bg-violet-600 text-white w-64">
      <!-- begin::上方列表 -->
      <div>
        <!-- begin::Logo區域 -->
        <div class="flex justify-center items-center h-16">
          <heroicons-outline-clipboard-list class="w-10 h-10 mr-2"/>
          <span class="text-lg font-medium">RikkuPress</span>
        </div>
        <!-- end::Logo區域 -->
        <!-- begin::路由列表區域 -->
        <ul>
          <li>
            <router-link class="flex items-center px-5 py-3 text-white" to="/home">
              <heroicons-outline-home class="w-5 h-5 mr-2"/>
              首頁
            </router-link>
          </li>
          <li>
            <router-link class="flex items-center px-5 py-3 text-violet-400 hover:text-white" to="/home">
              <heroicons-outline-document-text class="w-5 h-5 mr-2"/>
              文章
            </router-link>
          </li>
          <li>
            <router-link class="flex items-center px-5 py-3 text-violet-400 hover:text-white" to="/home">
              <heroicons-outline-user class="w-5 h-5 mr-2"/>
              個人資料
            </router-link>
          </li>
        </ul>
        <!-- end::路由列表區域 -->
      </div>
      <!-- end::上方列表 -->
      <!-- begin::下方列表 -->
      <div class="flex justify-between items-center border-t border-violet-400">
        <div class="flex items-center">
          <img class="w-8 h-8 rounded-full mr-2" src="https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&quality=85&auto=format&fit=max&s=a52bbe202f57ac0f5ff7f47166906403" alt="">
          <p class="font-medium tracking-wide">Rikku</p>
        </div>

      </div>
      <!-- end::下方列表 -->
    </div>
    <!-- end::左側選單區域 -->
    <div class=" flex-grow bg-gray-400">右側布局區</div>
  </div>
</template>

<script>
export default {
  setup () {
    

    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>