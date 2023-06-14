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
          <h2 class=" text-xl font-semibold tracking-wide text-gray-700">瀏覽人次</h2>
          <div class="flex-grow min-h-0 py-4">
            <canvas ref="lineChartE1"></canvas>
          </div>
        </div>
      </Card>
      <Card class="col-span-12 lg:col-span-4 min-w-0" stretch>
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
import { useLineChart, useBarChart } from '@/composables/useChart'

export default {
  setup(){
    const lineChartE1 = ref(null)
    const barChartE1 = ref(null)

    onMounted(()=> {
      const lineDate = ['6/21(一)', '6/22(二)','6/23(三)', '6/24(四)', '6/25(五)', '6/26(六)', '6/27(日)']
      const lineDatasets = [
      {
          label: '6/21 - 6/27',
          data: [3, 10, 5, 2, 20, 30, 45],
          color: '#7C3AED', // violet-600
        },
        {
          label: '6/14 - 6/20',
          data: [1, 2, 8, 5, 10, 24, 32],
          color: '#C4B5FD', // violet-300
        }
      ]
      useLineChart(lineChartE1, lineDate, lineDatasets)

      const barDate = ['(一)', '(二)','(三)', '(四)', '(五)', '(六)', '(日)']
      const barDatasets = [
        {
          label: '電腦',
          data: [3, 10, 5, 2, 20, 30, 45],
          color: '#7C3AED', // violet-600
        },
        {
          label: '手機',
          data: [1, 2, 8, 5, 10, 24, 32],
          color: '#C4B5FD', // violet-200
        },
      ]
      useBarChart(barChartE1, barDate, barDatasets )
    })

    return { lineChartE1, barChartE1 }
  }
}
</script>