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
      <div class="d-flex jc-center">
        <div class="content-box">
          <div id="he-plugin-standard"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeatherPlugin',
  data() {
    return {
      widgetConfig: {
        layout: '2',
        width: '280',
        height: 350,
        background: '4',
        dataColor: 'FFFFFF',
        language: 'zh',
        aqiColor: 'FFFFFF',
        borderRadius: '10',
        backgroundColor: "#0f1428",
        city: 'CN101020100',
        key: 'b11144bd5a14416085db59161cdbfa6e'
      }
    }
  },
  mounted() {
    const script = document.createElement('script');
    script.setAttribute('src', 'https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0');
    script.onload = () => {
      window.WIDGET = {
        CONFIG: this.widgetConfig
      };
    };
    document.body.appendChild(script);
  }
}
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