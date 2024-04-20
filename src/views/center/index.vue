<template>
  <div class="center">
    <div class="up">
      <div class="bg-color-black item" v-for="item in upperMiddleConfig" :key="item.title">
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
              本月预计同比增长
            </div>
          </dv-decoration-11>
        </div>
        <div class="water-wrapper">
          <dv-water-level-pond class="water-pond" :config=subMiddleConfig.leftpool></dv-water-level-pond>
          <dv-water-level-pond class="water-pond" :config=subMiddleConfig.rightpool></dv-water-level-pond>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive, onMounted} from 'vue'
import axios from "axios";
import {api_hotel_rate, api_sh_visitors_sum, api_sh_visitors_yoy} from "@/utils/request";


// 下层数据
const upperMiddleConfig = reactive([
  {
    title: '本年累计游客数',
    config: {
      number: [],
      toFixed: 1,
      textAlign: 'left',
      content: '{nt}',
      style: {
        fontSize: 26
      }
    }
  },
  {
    title: '本月累计游客数',
    config: {
      number: [],
      toFixed: 1,
      textAlign: 'left',
      content: '{nt}',
      style: {
        fontSize: 26
      }
    }
  },
  {
    title: '星级酒店预计空置率%',
    config: {
      number: [],
      toFixed: 1,
      textAlign: 'left',
      content: '{nt}',
      style: {
        fontSize: 26
      }
    }
  }
])

const subMiddleConfig = reactive({
  "leftpool": {data: [0.0], shape: 'roundRect'},
  "rightpool": {data: [0.0], shape: 'roundRect'}
})
// 初始化数据
onMounted(async () => {
  await fetch()
})

const fetch = async () => {
  upperMiddleConfig[0].config.number.push((await axios.get(api_sh_visitors_sum(new Date().getFullYear(), null, null))).data['sum'])
  upperMiddleConfig[1].config.number.push((await axios.get(api_sh_visitors_sum(new Date().getFullYear(), new Date().getMonth() + 1, null))).data['sum'])
  upperMiddleConfig[2].config.number.push((await axios.get(api_hotel_rate)).data['per'])
  subMiddleConfig.leftpool.data = [(await axios.get(api_sh_visitors_yoy(new Date().getFullYear(), null, null))).data['per']]
  subMiddleConfig.rightpool.data = [(await axios.get(api_sh_visitors_yoy(new Date().getFullYear(), new Date().getMonth() + 1, null))).data['per']]
  console.log(upperMiddleConfig)
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
      margin: auto;
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
