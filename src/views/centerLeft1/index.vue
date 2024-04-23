<template>
  <div class="centreLeft1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
              <span>
                <i class="iconfont icon-tongji4"/>
              </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">上海今日天气</span>
          <dv-decoration-3 class="dv-dec-3"/>
        </div>
      </div>
      <div class="bg-color-black item" v-for="item in upperMiddleConfig" :key="item.title">
        <p class="ml-3 colorBlue fw-b">{{ item.title }}</p>
        <div>
          <dv-digital-flop class="dv-dig-flop" :config="item.config"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js" setup>
import {onMounted, reactive} from "vue";
import axios from "axios";
import {api_sh_data_stats} from "@/utils/request";
import {hot_to_string} from "@/utils";

const upperMiddleConfig = reactive([
  {
    title: '下一个高峰',
    config: {
      toFixed: 0,
      number: [],
      textAlign: 'center',
      content: '{nt}年{nt}月{nt}日',
      style: {
        fontSize: 26
      }
    }
  },
  {
    title: '本年入境游热度',
    config: {
      toFixed: 0,
      textAlign: 'center',
      content: '远高于去年',
      style: {
        fontSize: 26
      }
    }
  },
  {
    title: '本月入境游热度',
    config: {
      toFixed: 1,
      textAlign: 'center',
      content: '高于平时',
      style: {
        fontSize: 26
      }
    }
  }
])


onMounted(async () => {
  axios.get(api_sh_data_stats).then(res => {
    const data = res.data
    const peak_day = new Date(data['peak_day'])
    upperMiddleConfig[0].config.number = [peak_day.getFullYear(), peak_day.getMonth() + 1, peak_day.getDate()]
    upperMiddleConfig[1].config.content = hot_to_string(data['hot_year']) + "去年"
    upperMiddleConfig[2].config.content = hot_to_string(data['hot_month']) + "平时"
  })
})

</script>

<style lang="scss" scoped>
$box-width: 300px;
$box-height: 410px;

.centreLeft1 {
  padding: 16px;
  height: $box-height;
  width: $box-width;
  border-radius: 10px;

  .bg-color-black {
    height: $box-height - 30px;
    border-radius: 10px;
  }

  .text {
    color: #c3cbde;
    font-size: 16px;
  }

  .dv-dec-3 {
    position: relative;
    width: 100px;
    height: 20px;
    top: -3px;
  }

  .item {
    border-radius: 6px;
    padding-top: 8px;
    margin-top: 8px;
    width: 100%;
    height: 26%;

    .dv-dig-flop {
      width: 250px;
      height: 30px;
    }
  }

  .bottom-data {
    .item-box {
      & > div {
        padding-right: 5px;
      }

      font-size: 14px;
      float: right;
      position: relative;
      width: 50%;
      color: #d3d6dd;

      .dv-digital-flop {
        width: 120px;
        height: 30px;
      }

      i {
        font-size: 20px;
        line-height: 30px;
        margin-left: 20px;
      }

      .colorYellow {
        color: yellowgreen;
      }

      p {
        text-align: center;
      }
    }
  }
}
</style>