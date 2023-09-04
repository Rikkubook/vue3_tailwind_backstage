import { Chart } from 'chart.js'
import { unref } from 'vue'
import { useTheme } from './useTheme'


export function useLineChart(target, labels, datasets, options){
  const el = unref(target) //會自己解 .value

  const { isDark } = useTheme()

  return new Chart(el,{
    type: 'line',
    data: {
      labels,
      datasets: datasets.map( dataset => { // map 內容
        return {
          label: dataset.label,
          data: dataset.data,
          borderColor: dataset.color,
          backgroundColor: dataset.color,
          tension: 0.4
        }
      })
    },
    options: Object.assign({ // 如果有增添選項
      interaction:{
        mode: 'index', // 同時顯示兩個點
        intersect: false, // 游標中間亦可顯示
      },
      responsive: true,
      maintainAspectRatio: false, // 不依據調表固定比
      plugins:{
        legend:{ // 小標
          align: 'end',
          position: 'bottom',
          labels:{
            color: isDark? 'white': Chart.defaults.color,
          }
        }
      },
      scales:{
        x: {
          grid: {
            display: false
          },
          ticks:{
            color:  isDark? 'white': Chart.defaults.color,
          }
        },
        y: {
          grid: {
            borderDash: [3],
            drawBorder: false
          },
          ticks:{
            color:  isDark? 'white': Chart.defaults.color,
          }
        }
      }
    })
  })
}

export function useBarChart(target, labels, datasets, options){
  const el = unref(target) //會自己解 .value
  const { isDark } = useTheme()

  return new Chart(el,{
    type: 'bar',
    data: {
      labels,
      datasets: datasets.map( dataset => { // map 內容
        return {
          label: dataset.label,
          data: dataset.data,
          borderColor: dataset.color,
          backgroundColor: dataset.color,
          barThickness: 8,
        }
      })
    },
    options: Object.assign({ // 如果有增添選項
      interaction:{
        mode: 'index', // 同時顯示兩個點
        intersect: false, // 游標中間亦可顯示
      },
      responsive: true,
      maintainAspectRatio: false, // 不依據調表固定比
      plugins:{
        legend:{ // 小標
          align: 'end',
          position: 'bottom',
          labels:{
            color: isDark? 'white': Chart.defaults.color,
          }
        }
      },
      scales:{
        x: {
          grid: {
            display: false
          },
          ticks:{
            color: isDark? 'white': Chart.defaults.color,
          }
        },
        y: {
          grid: {
            borderDash: [3],
            drawBorder: false
          },
          ticks:{
            color: isDark? 'white': Chart.defaults.color,
          }
        }
      }
    })
  })
}