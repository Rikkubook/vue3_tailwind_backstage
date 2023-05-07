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
      <Card class="lg:col-span-8 min-w-0" stretch>
        <div class="h-[400px] flex flex-col p-5">
          <h2 class=" text-xl font-semibold tracking-wide text-gray-700">瀏覽人次</h2>
          <div class="flex-grow min-h-0 py-4">
            <canvas ref="lineChartE1"></canvas>
          </div>
        </div>
      </Card>
      <Card class="lg:col-span-4 min-w-0" stretch>
        <div class="h-[400px] flex flex-col p-5">
          <h2 class=" text-xl font-semibold tracking-wide text-gray-700">瀏覽裝置</h2>
          <div class="flex-grow min-h-0 py-4">
            <canvas ref="barChartE1"></canvas>
          </div>
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

export default {
  setup(){
    const lineChartE1 = ref(null)
    const barChartE1 = ref(null)

    onMounted(()=> {
      new Chart(lineChartE1.value,{
        type: 'line',
        data: {
          labels: ['6/21(一)', '6/22(二)','6/23(三)', '6/24(四)', '6/25(五)', '6/26(六)', '6/27(日)'],
          datasets: [
            {
              label: '6/21 - 6/27',
              data: [3, 10, 5, 2, 20, 30, 45],
              borderColor: '#7C3AED', // violet-600
              backgroundColor: '#7C3AED', // violet-600
              tension: 0.4
            },
            {
              label: '6/14 - 6/20',
              data: [1, 2, 8, 5, 10, 24, 32],
              borderColor: '#C4B5FD', // violet-200
              backgroundColor: '#C4B5FD', // violet-600
              tension: 0.4
            },
          ]
        },
        options:{
          interaction:{
            mode: 'index', // 同時顯示兩個點
            intersect: false, // 游標中間亦可顯示
          },
          responsive: true,
          maintainAspectRatio: false, // 不依據調表固定比
          plugins:{
            legend:{ // 小標
              align: 'end',
              position: 'bottom'
            }
          },
          scales:{
            x: {
              grid: {
                display: false
              }
            },
            y: {
              grid: {
                borderDash: [3],
                drawBorder: false
              }
            }
          }
        }
      })
      new Chart(barChartE1.value,{
        type: 'bar',
        data: {
          labels: ['(一)', '(二)','(三)', '(四)', '(五)', '(六)', '(日)'],
          datasets: [
            {
              label: '電腦',
              data: [3, 10, 5, 2, 20, 30, 45],
              borderColor: '#7C3AED', // violet-600
              backgroundColor: '#7C3AED', // violet-600
            },
            {
              label: '手機',
              data: [1, 2, 8, 5, 10, 24, 32],
              borderColor: '#C4B5FD', // violet-200
              backgroundColor: '#C4B5FD', // violet-600
            },
          ]
        },
        options:{
          interaction:{
            mode: 'index', // 同時顯示兩個點
            intersect: false, // 游標中間亦可顯示
          },
          responsive: true,
          maintainAspectRatio: false, // 不依據調表固定比
          plugins:{
            legend:{ // 小標
              align: 'end',
              position: 'bottom'
            }
          },
          scales:{
            x: {
              grid: {
                display: false
              }
            },
            y: {
              grid: {
                borderDash: [3],
                drawBorder: false
              }
            }
          }
        }
      })
    })

    return { lineChartE1, barChartE1 }
  }
}
</script>