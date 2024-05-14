<template>
  <div class="centreLeft1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <i class="iconfont icon-layer-group"/>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">预估本月游客分布</span>
          <dv-decoration-1 class="dv-dec-1"/>
        </div>
      </div>
      <div class="d-flex jc-center">
        <!--              <chart />-->
        <dv-active-ring-chart :config="config" style="width:300px;height:300px"/>

      </div>
    </div>
  </div>
</template>

<script setup lang='js'>
import {onMounted, reactive} from "vue";
import axios from "axios";
import {api_sh_visitors_sumdiv} from "@/utils/request";

const config = reactive({
  radius: '80%',
  activeRadius: '60%',
  data: [
    {
      name: '1',
      value: 55
    },
    {
      name: '2',
      value: 120
    },
    {
      name: '3',
      value: 78
    },
  ],
  lineWidth: '25',
  digitalFlopStyle: {
    fontSize: 20
  },
  digitalFlopToFixed: 2
})

onMounted(() => {
  axios.get(api_sh_visitors_sumdiv(new Date().getFullYear(), new Date().getMonth() + 1)).then((res) => {
    console.log(res)
    config.data = res.data
  })
})
</script>

<style lang="scss" scoped>
.centreLeft1 {
  $box-width: 300px;
  $box-height: 410px;
  padding: 16px;
  height: $box-height;
  min-width: $box-width;
  border-radius: 5px;

  .bg-color-black {
    height: $box-height - 30px;
    border-radius: 10px;
  }

  .text {
    color: #c3cbde;
    font-size: 16px;
  }

  .dv-dec-1 {
    position: relative;
    width: 100px;
    height: 20px;
    top: -3px;
  }

  .chart-box {
    margin-top: 16px;
    width: 170px;
    height: 170px;

    .active-ring-name {
      padding-top: 10px;
    }
  }
}
</style>
