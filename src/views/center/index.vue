<template>
    <div class="center">
        <div class="up">
            <div class="bg-color-black item" v-for="item in titleItem" :key="item.title">
                <p class="ml-3 colorBlue fw-b">{{ item.title }}</p>
                <div>
                    <dv-digital-flop class="dv-dig-flop ml-1 mt-1 pl-3" :config="item.config"/>
                </div>
            </div>
        </div>
        <div class="down">
            <div class="ranking bg-color-black">
                <div class="d11-content">
                    <dv-decoration-11 class="d11">
                        <div color-green font-600 bg="~ dark/0">
                            本年预计同比增长
                        </div>
                    </dv-decoration-11>
                    <dv-decoration-11 class="d11">
                        <div color-green font-600 bg="~ dark/0">
                            本月同比增长
                        </div>
                    </dv-decoration-11>
                </div>
                <div class="water-wrapper">
                    <dv-water-level-pond class="water-pond" :config=poolData.leftpool></dv-water-level-pond>
                    <dv-water-level-pond class="water-pond" :config=poolData.rightpool></dv-water-level-pond>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {onBeforeMount, reactive, onMounted} from 'vue'
import axios from "axios";
import {api_hotel_rate, api_nmainland_sum, api_nmainland_per} from "@/utils/request";


// 下层数据
const titleData = [
    {
        number: 102000,
        text: '本年累计游客数'
    },
    {
        number: 18,
        text: '本月累计游客数'
    },
    {
        number: 34.2,
        text: '星级酒店预计空置率%'
    },
]
const titleItem = reactive([])
const poolData = reactive({
    "leftpool": {data: [-0.1], shape: 'rect'},
    "rightpool": {data: [3.2], shape: 'rect'}
})
// 初始化数据
onMounted(async () => {
    titleData[0].number = (await axios.post(api_nmainland_sum(new Date().getFullYear(), null))).data['sum']
    titleData[1].number = (await axios.post(api_nmainland_sum(new Date().getFullYear(), new Date().getMonth() + 1))).data['sum']
    titleData[2].number = 100 - (await axios.post(api_hotel_rate)).data['per']
    poolData.leftpool.data = [(await axios.post(api_nmainland_per(new Date().getFullYear(), null))).data['per']]
    poolData.rightpool.data = [(await axios.post(api_nmainland_per(new Date().getFullYear(), new Date().getMonth() + 1))).data['per']]
    console.log(poolData)
    setData()
})

const water = reactive({
    data: [24, 45],
    shape: 'roundRect',
    formatter: '{value}%',
    waveNum: 3
})

// 设置数据
const setData = () => {
    titleData.map(e => {
        titleItem.push({
            title: e.text,
            config: {
                number: [e.number],
                toFixed: 1,
                textAlign: 'left',
                content: '{nt}',
                style: {
                    fontSize: 26
                }
            }
        })
    })
}

</script>

<style lang="scss" scoped>
.center {
  display: flex;
  flex-direction: column;

  .up {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .item {
      border-radius: 6px;
      padding-top: 8px;
      margin-top: 8px;
      width: 32%;
      height: 70px;

      .dv-dig-flop {
        width: 150px;
        height: 30px;
      }
    }
  }

  .down {
    padding: 6px 4px;
    padding-bottom: 0;
    width: 100%;
    display: flex;
    height: 330px;
    justify-content: space-between;

    .bg-color-black {
      border-radius: 5px;
      width: 100%;
    }

    .d11-content {
      display: flex;
      margin: 0 auto;
      bottom: 0;
      padding-top: 30px;

      .d11 {
        width: 300px;
        height: 60px
      }
    }

    .water-wrapper {
      display: flex;
      margin: 10 auto;
      bottom: 0;
      padding-top: 30px;

      .water-pond {
        width: 300px;
        height: 200px;
        padding: 5px
      }
    }
  }
}
</style>
