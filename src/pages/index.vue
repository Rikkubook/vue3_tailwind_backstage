<template>
  <Layout>
    <div class="mt-6 grid md:grid-cols-12 gap-4">
      <TrendingCard
        class="md:col-span-12 lg:col-span-4"
        icon="eye"
        label="瀏覽人次"
        value="145"
        :is-up="true"
        trending="12"
        stretch
      ></TrendingCard>
      <TrendingCard
        class="md:col-span-12 lg:col-span-4"
        icon="star"
        label="點讚數"
        value="591"
        :is-up="false"
        trending="2"
        stretch
      ></TrendingCard>
      <TrendingCard
        class="md:col-span-12 lg:col-span-4"
        icon="annotation"
        label="留言數"
        value="7"
        :is-up="true"
        trending="53"
        stretch
      ></TrendingCard>
      <Card class="col-span-12 lg:col-span-8 min-w-0" stretch>
        <div class="h-[400px] flex flex-col p-5">
          <h2 class=" text-xl font-semibold tracking-wide text-gray-700 dark:text-gray-100">瀏覽人次</h2>
          <div class="flex-grow min-h-0 py-4">
            <canvas ref="lineChartE1"></canvas>
          </div>
        </div>
      </Card>
      <Card class="col-span-12 lg:col-span-4 min-w-0" stretch>
        <div class="h-[400px] flex flex-col p-5">
          <h2 class=" text-xl font-semibold tracking-wide text-gray-700 dark:text-gray-100">瀏覽裝置</h2>
          <div class="flex-grow min-h-0 py-4">
            <canvas ref="barChartE1"></canvas>
          </div>
        </div>
      </Card>
      <Card class="col-span-12 lg:col-span-8 min-w-0 h-full" stretch>
        <div class="flex justify-between p-5 pb-0">
          <h2 class=" text-xl font-semibold tracking-wide text-gray-700">熱門文章</h2>
          <RouterLink class="link flex items-center font-normal" to="/posts">
            全部文章
            <heroicons-outline:chevron-double-right class="ml-1"/>
          </RouterLink>
        </div>
        <Table
          class="mt-4"
          :columns="postsColumns"
          :data="postsData"
          :show-selection="false"
          :show-actions="false"
          :show-paginator="false"
          >
          <!-- https://vuejs.org/guide/components/slots.html#scoped-slots -->
          <template #column-title="{record, value}">
            <RouterLink :to="`/posts/${record.id}`" class="link font-normal">
              {{  value }}
            </RouterLink>
          </template>
          <template #column-visits="{record, value}">
            <div class="inline-flex items-center font-normal">
              <heroicons-outline-eye class="inline-block w-4 h-4 mr-1" />
              {{ value }} 次
              <Trending
                :is-up="record.visits_trending_is_up"
                :value="record.visits_trending_is_value"
                percentage
                class="ml-2"
              />
            </div>
          </template>
        </Table>
      </Card>
      <Card class="col-span-12 lg:col-span-4 min-w-0 h-full" stretch>
        <div class="p-5">
          <h2 class=" text-xl font-semibold tracking-wide text-gray-700 dark:text-gray-100">最新留言</h2>
          <ul class="mt-4 space-y-4">
            <li class="flex" v-for="comment in comments" :key="comment.id">
              <img class="w-8 h-8 rounded-full" :src="comment.author_avatar" :alt="comment.post_id">
              <div class="mt-1 ml-4 flex-grow">
                <p class="text-gray-800 dark:text-gray-100  font-medium tracking-wide ">{{  comment.author_name }}</p>
                <div class="mt-2 text-gray-500 dark:text-gray-300   test-sm">
                  {{ comment.content }}
                </div>
                <div class="mt-1 py-1.5 px-3 bg-gray-100 dark:bg-gray-600  rounded text-gray-500 dark:text-gray-100  text-sm">
                    留言文章：<RouterLink :to="`/posts/${comment.post_id}`" class="link">{{ comment.post_title }}</RouterLink>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </Card>
    </div>

  </Layout>
</template>

<script>
import { notify,  successNotify, warningNotify, errorNotify} from '@/composables/useNotification'
import {ref, onMounted} from 'vue'
// import { notify } from "@kyvg/vue3-notification";
import { Chart } from 'chart.js'
import { rewriteDefault } from 'vue/compiler-sfc'
import { useLineChart, useBarChart } from '@/composables/useChart'
import { useTheme } from '@/composables/useTheme'

export default {
  setup(){
    const lineChartE1 = ref(null)
    const barChartE1 = ref(null)
    const postsColumns = ref([
        {key:'title', label: '標題'},
        {key:'visits', label: '瀏覽次數'},
        {key:'created_at', label: '建立日期'}
      ])
    const postsData = ref([
      {
        id: 1,
        title: '我的文章1',
        visits: 123,
        visits_trending_is_up: true,
        visits_trending_is_value: 31,
        created_at: '2012/12/03'
      },
      {
        id: 2,
        title: '我的文章2',
        visits: 29,
        visits_trending_is_up: false,
        visits_trending_is_value: -20,
        created_at: '2012/12/03'
      },
      {
        id: 3,
        title: '我的文章3',
        visits: 50,
        visits_trending_is_up: true,
        visits_trending_is_value: 102,
        created_at: '2012/12/03'
      },
      {
        id: 4,
        title: '我的文章4',
        visits: 78,
        visits_trending_is_up: true,
        visits_trending_is_value: 15,
        created_at: '2012/12/03'
      }
    ])
    const comments = ref([
      {
        id:1,
        author_name:"Rikku",
        author_avatar: "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&quality=85&auto=format&fit=max&s=a52bbe202f57ac0f5ff7f47166906403",
        content: "哇～太棒了！",
        post_id: 1,
        post_title: "文章1"
      },
      {
        id:2,
        author_name:"Rikku",
        author_avatar: "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&quality=85&auto=format&fit=max&s=a52bbe202f57ac0f5ff7f47166906403",
        content: "讚喔",
        post_id: 2,
        post_title: "文章2"
      },
      {
        id:3,
        author_name:"Lulu",
        author_avatar: "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&quality=85&auto=format&fit=max&s=a52bbe202f57ac0f5ff7f47166906403",
        content: "哈嚕",
        post_id: 2,
        post_title: "文章2"
      }
    ])
    const {applyColor} = useTheme()

    onMounted(()=> {
      const lineDate = ['6/21(一)', '6/22(二)','6/23(三)', '6/24(四)', '6/25(五)', '6/26(六)', '6/27(日)']
      const lineDatasets = [
      {
          label: '6/21 - 6/27',
          data: [3, 10, 5, 2, 20, 30, 45],
          color: applyColor({violet:'#7C3AED', indigo: '#4f46e5', dark: '#57534e' }), // violet-600
        },
        {
          label: '6/14 - 6/20',
          data: [1, 2, 8, 5, 10, 24, 32],
          color:  applyColor({violet:'#C4B5FD', indigo: '#a5b4fc', dark: '#a8a29e' }), // violet-300
        }
      ]
      useLineChart(lineChartE1, lineDate, lineDatasets)

      const barDate = ['(一)', '(二)','(三)', '(四)', '(五)', '(六)', '(日)']
      const barDatasets = [
        {
          label: '電腦',
          data: [3, 10, 5, 2, 20, 30, 45],
          color: applyColor({violet:'#7C3AED', indigo: '#4f46e5', dark: '#57534e' }), // violet-600
        },
        {
          label: '手機',
          data: [1, 2, 8, 5, 10, 24, 32],
          color: applyColor({violet:'#C4B5FD', indigo: '#a5b4fc', dark: '#a8a29e' }), // violet-200
        },
      ]
      useBarChart(barChartE1, barDate, barDatasets )
    })

    return { lineChartE1, barChartE1, postsColumns, postsData, comments}
  }
}
</script>