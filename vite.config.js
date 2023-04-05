import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import path from 'path'
import Components from 'unplugin-vue-components/vite' // 自動引入組件
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { HeadlessUiResolver } from 'unplugin-vue-components/resolvers' //引入 HeadlessUi 的自動引入

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias: {
      '@': path.resolve(__dirname,'src') //改別名路徑
    }
  },
  plugins: [
    Vue(),
    Pages(),
    Components({
      resolvers: [
        HeadlessUiResolver(),
        IconsResolver(
          {
            prefix: false,  // 移除 IHeroiconsOutlineHome 的前贅詞
            enabledCollections: ['heroicons-outline'] // 只引入 heroicons-outline
          }
        )
      ],
    }),
    Icons()], //預設會是src/components
})
