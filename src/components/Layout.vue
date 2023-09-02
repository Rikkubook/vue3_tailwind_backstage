<template>
  <div class="flex flex-col sm:flex-row">
    <!-- begin::左側選單區域 -->
    <div class="relative z-20 flex flex-shrink-0 flex-col justify-between  bg-violet-600 indigo:bg-indigo-600 text-white w-full sm:w-64 sm:fixed sm-inset-y-0 sm:min-h-screen ">
      <!-- begin::Logo區域 -->
      <div class="flex  justify-between items-center sm:justify-center h-16 px-4">
        <div class="flex justify-center items-center h-16">
          <heroicons-outline-clipboard-list class="w-10 h-10 mr-2"/>
          <span class="text-xl font-medium">RikkuPress</span>
        </div>
        <button @click="toggleMenu()" type="button" class="flex sm:hidden justify-center items-center w-7 h-7 hover:bg-violet-400 indigo:hover:bg-indigo-400  trans-colors duration-100 rounded">
          <heroicons-outline-menu class="w-4 h-4 "></heroicons-outline-menu>
        </button>
      </div>

      <!-- end::Logo區域 -->
      <!-- begin::列表 -->
      <div :class="showMenu? '': 'hidden' " class="flex-grow sm:flex flex-col justify-between">
        <!-- begin::路由列表區域 -->
        <ul>
          <li v-for="item in menuItems" :key="item.to">
            <RouterLink
              :to="item.to"
              :class="isActive(item.to)? 'text-white': 'text-violet-400 indigo:text-indigo-400 hover:text-white'"
              class="flex items-center px-4 sm:px-5 py-3 "
            >
              <component :is="item.icon" class="w-5 h-5 mr-2"></component>
              {{ item.text }}
            </RouterLink>
          </li>
        </ul>
        <!-- end::路由列表區域 -->
        <!-- begin::下方列表 手機版 -->
        <div class="sm:hidden border-t border-violet-400 indigo:border-indigo-400 mt-2 py-1">
          <div class="flex justify-between items-center px-5 py-4">
            <div class="flex items-center">
              <img class="w-8 h-8 rounded-full mr-2" src="https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&quality=85&auto=format&fit=max&s=a52bbe202f57ac0f5ff7f47166906403" alt="">
              <p class="font-medium tracking-wide">Rikku</p>
            </div>
          </div>
          <ul>
            <template
              v-for="item in userMenuItems"
              :key="userMenuItems.text"
            >
              <li v-if="item.mobile">
                <component
                  :is="item.tag" 
                  :to="item.to" 
                  class="flex items-center w-full px-4 py-3 text-violet-400 indigo:text-indigo-400 hover:text-white"
                  @click="item.onClick"
                >
                {{  item.text }}
                </component>
              </li>
            </template>


          </ul>
        </div>
        <!-- end::下方列表 手機版-->
        <!-- begin::下方列表 電腦版 -->
        <div class="hidden sm:flex justify-between items-center border-t border-violet-400 indigo:border-indigo-400 px-5 py-4">
          <div class="flex items-center">
            <img class="w-8 h-8 rounded-full mr-2" src="https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&quality=85&auto=format&fit=max&s=a52bbe202f57ac0f5ff7f47166906403" alt="">
            <p class="font-medium tracking-wide">Rikku</p>
          </div>
          <Menu as="div" class="relative">
            <MenuButton type="button" class="flex justify-center items-center w-7 h-7 hover:bg-violet-400 indigo:hover:bg-indigo-400  trans-colors duration-100 rounded">
              <heroicons-outline-dots-vertical class="w-4 h-4 "></heroicons-outline-dots-vertical>
            </MenuButton>
            <TransitionZoom
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
            <MenuItems class="absolute flex flex-col w-32 bottom-0 left-full ml-2 bg-white rounded-md shadow-lg overflow-hidden origin-bottom-left">
              <MenuItem
                v-slot="{ active }"
                v-for="item in userMenuItems"
                :key="userMenuItems.text"
              >
                <component
                  :is="item.tag" 
                  :to="item.to" 
                  class="text-gray-700 text-left text-base font-normal px-3 py-2"
                  :class="active? 'bg-gray-100': ''"
                  @click="item.onClick"
                >
                  {{  item.text }}
                </component>
              </MenuItem>
            </MenuItems>
          </TransitionZoom>
          </Menu>
        </div>
        <!-- end::下方列表 電腦版-->
      </div>
      <!-- end::列表 -->

    </div>
    <!-- end::左側選單區域 -->
    <div class="relative z-10 flex-grow min-w-0 bg-gray-50 sm:pl-64">
      <div class="p-6 sm:px-10 sm:py-8">
        <slot></slot>
      </div>

    </div>
  </div>
</template>

<script>
import {ref, computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import heroiconsOutlineHome from '~icons/heroicons-outline/home'
import heroiconsOutlineDocumentText from '~icons/heroicons-outline/document-text'
import heroiconsOutlineUser from '~icons/heroicons-outline/user'

export default {
  components:{
    heroiconsOutlineHome,
    heroiconsOutlineDocumentText,
    heroiconsOutlineUser
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const showMenu = ref(false)
    const toggleMenu = ()=>  showMenu.value = !showMenu.value
    const menuItems = [
      {to: '/', text:'首頁', icon: 'heroicons-outline-home'},
      {to: '/posts', text:'文章', icon: 'heroicons-outline-document-text'},
      {to: '/setting', text:'個人資料', icon: 'heroicons-outline-user'},
    ]
    const userMenuItems = [
      {tag: 'RouterLink',to: '/setting', text: '個人資料'},
      {tag: 'button', text: '登出' , mobile:true, onClick: ()=>{
        router.push('/login')
      }}
    ]

    const path = route.path // 取路由 
    const activeItem = computed(()=> // 為了防止 posts//01000 一樣亮燈，且不吃到首頁用反轉取得
      [...menuItems].reverse().find(item => path.startsWith(item.to))
    )
    const isActive = (to) => {
      return to === activeItem.value.to
    }
    return {showMenu, toggleMenu, menuItems, isActive, userMenuItems}
  }
}
</script>

<style lang="scss" scoped>

</style>