import { defineComponent, watch, ref } from 'vue'
import * as echarts from 'echarts'

const PropsType = {
  cdata: {
    type: Object,
    require: true
  }
} as const

export default defineComponent({
  props: PropsType,
  setup(props) {
    const chartRef = ref()
    let options = {}

    watch(
      () => props.cdata,
      val => {
        const series = [
          {
            name: '外国游客',
            type: 'line',
            smooth: true,
            showAllSymbol: 'auto',
            symbol: 'emptyCircle',
            yAxisIndex: 1,
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: '#F02FC2'
              }
            },
            data: val.frn,
            emphasis: {
              focus: 'series'
            }
          },
          {
            name: '港澳游客',
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#956FD4' },
                  { offset: 1, color: '#3EACE5' }
                ])
              }
            },
            data: val.hk_mw,
            emphasis: {
              focus: 'series'
            }
          },
          {
            name: '台湾省游客',
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#618c63' },
                  { offset: 1, color: '#88f28d' }
                ])
              }
            },
            z: -12,
            data: val.tw,
            emphasis: {
              focus: 'series'
            }
          }
        ];

        options = {
          tooltip: {
            show: true,
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
              label: {
                show: true,
                backgroundColor: '#7B7DDC'
              }
            }
          },
          legend: {
            show: true,
            selected: {
              '外国游客': true, 
              '港澳游客': true,
              '台湾省游客': true
            },
            data: series.map(item => item.name)
          },
          grid: {
            x: '8%',
            width: '88%',
            top: '5%',
            bottom: '7%'
          },
          xAxis: {
            data: val.timeline,
            axisLine: {
              lineStyle: {
                color: '#B4B4B4'
              }
            },
            axisTick: {
              show: false
            }
          },
          yAxis: [
            {
              splitLine: { show: false },
              axisLine: {
                lineStyle: {
                  color: '#B4B4B4'
                }
              },
              axisLabel: {
                formatter: '{value} '
              }
            },
            {
              splitLine: { show: false },
              axisLine: {
                lineStyle: {
                  color: '#B4B4B4'
                }
              },
              axisLabel: {
                formatter: '{value} '
              }
            }
          ],
          series
        };

        if (chartRef.value) {
          chartRef.value.initChart(options)
        }
      },
      {
        immediate: true,
        deep: true
      }
    )

    return () => {
      const height = '450px'
      const width = '100%'

      return (
        <div>
          <echart ref={chartRef} height={height} width={width} />
        </div>
      )
    }
  }
})
