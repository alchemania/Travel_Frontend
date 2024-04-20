<template>
  <div class="centerRight2">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <i class="iconfont icon-vector"/>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">各国旅游人数榜</span>
        </div>
      </div>
      <div class="d-flex mt-1 jc-center body-box">
        <dv-scroll-board class="dv-scr-board" :config="config"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive, onBeforeMount} from 'vue'
import axios from "axios";
import {api_country_rate} from "@/utils/request";

const config = reactive({
  header: ['国家', '今年人数(万)', '同比增长', '总人数(万)'],
  data: [],
  rowNum: 7, //表格行数
  headerHeight: 35,
  headerBGC: '#0f1325', //表头
  oddRowBGC: '#0f1325', //奇数行
  evenRowBGC: '#171c33', //偶数行
  index: true,
  columnWidth: [50],
  align: ['center']
})

onBeforeMount(() => {
  axios.get(api_country_rate).then(res => {
    let data = []
    let raw_data = res.data
    for (let ele in raw_data) {
      var cur_per = raw_data[ele].cur_per
      if (cur_per > 0) {
        var style_tag = `<span class='colorGrass'>↑${cur_per}%</span>`
      } else {
        var style_tag = `<span class='colorRed'>↓${Math.abs(cur_per)}%</span>`
      }
      data.push([
        raw_data[ele].country,
        raw_data[ele].cur_num,
        style_tag,
        raw_data[ele].all_num,
      ])
    }
    config.data = data
  })
})
</script>

<style lang="scss" scoped>
$box-height: 410px;
$box-width: 600px;
.centerRight2 {
  padding: 16px;
  padding-top: 20px;
  height: $box-height;
  width: $box-width;
  border-radius: 5px;
  position: absolute;

  .bg-color-black {
    height: $box-height - 30px;
    border-radius: 10px;
  }

  .text {
    color: #c3cbde;
    font-size: 16px;
  }

  .body-box {
    border-radius: 10px;
    overflow: hidden;

    .dv-scr-board {
      height: 340px;
    }
  }
}
</style>
