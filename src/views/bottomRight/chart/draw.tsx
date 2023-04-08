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
            name: '星级平均房价',
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#F02FC2'
              }
            },
            data: val.ap,
            emphasis: {
              focus: 'series'
            },
            yAxisIndex: 0 // 将柱形图的y轴索引设置为0
          },
          {
            name: '五星级平均房价',
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#515404'
              }
            },
            data: val.ap5,
            emphasis: {
              focus: 'series'
            },
            yAxisIndex: 0 // 将柱形图的y轴索引设置为0
          },
          {
            name: '星级平均出租率',
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#956FD4' },
                  { offset: 1, color: '#3EACE5' }
                ])
              }
            },
            yAxisIndex: 1, // 将折线图的y轴索引设置为1
            data: val.ar,
            emphasis: {
              focus: 'series'
            }
          },
          {
            name: '五星级平均出租率',
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#618c63' },
                  { offset: 1, color: '#88f28d' }
                ])
              }
            },
            yAxisIndex: 1, // 将折线图的y轴索引设置为1
            z: -12,
            data: val.ar5,
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
              '星级平均房价': true,
              '五星级平均房价': true,
              '星级平均出租率': true,
              '五星级平均出租率': true
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
              type: 'value',
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
              type: 'value',
              splitLine: { show: false },
              axisLine: {
                lineStyle: {
                  color: '#B4B4B4'
                }
              },
              axisLabel: {
                formatter: '{value} '
              },
              gridIndex: 0, // 将折线图的y轴设置在第一个grid上
              splitNumber: 0, // 将折线图的y轴刻度分为3个
              min: -200, // 设置y轴的最小值
              max: 100 ,// 设置y轴的最大值
              axisPointer: {
                label: {
                  show: true,
                  formatter: function (params) {
                    return params.value.toFixed(2);
                  }
                }
              }
            }
          ],
          series: series.reverse() // 调整系列顺序，将折线图放在柱形图前面
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
