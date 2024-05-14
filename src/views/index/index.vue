<template>
  <div id="index" ref="appRef">
    <a-float-button @click="isShOpen = !isShOpen">
      <template #icon>
        <RightOutlined/>
      </template>
    </a-float-button>
    <div id="shell-container">
      <terminal
          name="ws_sh"
          @exec-cmd="onExecCmd"
          :drag-conf="{width: 1200, height: 1000}"
          v-show="isShOpen"
          title="系统维护终端"
          context="ws"
          :show-header=true
      />
    </div>
    <div class="bg">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else class="host-body">
        <div class="d-flex jc-center">
          <dv-decoration-10 class="dv-dec-10"/>
          <div class="d-flex jc-center">
            <dv-decoration-8 class="dv-dec-8" :color="decorationColors"/>
            <div class="title">
              <span class="title-text">{{ title }}</span>
              <dv-decoration-6
                  class="dv-dec-6"
                  :reverse="true"
                  :color="['#50e3c2', '#67a1e5']"
              />
            </div>
            <dv-decoration-8
                class="dv-dec-8"
                :reverse="true"
                :color="decorationColors"
            />
          </div>
          <dv-decoration-10 class="dv-dec-10-s"/>
        </div>

        <!-- 第二行 -->
        <div class="d-flex jc-between px-2">
          <div class="d-flex aside-width">
            <div class="react-left ml-4 react-l-s">
              <span class="react-before"></span>
              <span class="text">{{ subtitle[0] }}</span>
            </div>
            <div class="react-left ml-3">
              <span class="text">{{ subtitle[1] }}</span>
            </div>
          </div>
          <div class="d-flex aside-width">
            <div class="react-right bg-color-blue mr-3">
              <span class="text fw-b">{{ subtitle[2] }}</span>
            </div>
            <div class="react-right mr-4 react-l-s">
              <span class="react-after"></span>
              <span class="text">
                {{ timeInfo.dateYear }} {{ timeInfo.dateWeek }}
                {{ timeInfo.dateDay }}
              </span>
            </div>
          </div>
        </div>

        <div class="body-box">
          <!-- 第三行数据 -->
          <div class="content-box">
            <div>
              <dv-border-box-12>
                <center-left1/>
              </dv-border-box-12>
            </div>
            <div>
              <dv-border-box-12>
                <center-left2/>
              </dv-border-box-12>
            </div>
            <!-- 中间 -->
            <div>
              <center/>
            </div>
            <!-- 中间 -->
            <!--            <div>-->
            <!--              <center-right1 />-->
            <!--            </div>-->
            <div>
              <dv-border-box-13>
                <center-right/>
              </dv-border-box-13>
            </div>
          </div>

          <!-- 第四行数据 -->
          <div class="bototm-box">
            <dv-border-box-13>
              <bottom-left/>
            </dv-border-box-13>
            <dv-border-box-12>
              <bottom-right/>
            </dv-border-box-12>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js" setup>
import {
  ref,
  reactive,
  onMounted,
  onUnmounted,
} from 'vue'
import {formatTime} from '@/utils'
import {WEEK} from '@/constant/index'
import useDraw from '@/utils/useDraw'
import {title, subtitle} from '@/constant/index'
import CenterLeft1 from '../centerLeft1/index.vue'
import CenterLeft2 from '../centerLeft2/index.vue'
import Center from '../center/index.vue'
import CenterRight from '@/views/centerRight/index.vue'
import BottomLeft from '../bottomLeft/index.vue'
import BottomRight from '../bottomRight/index.vue'
import {RightOutlined} from "@ant-design/icons-vue";
import {WS_BASE} from "@/utils/request";
import {io} from "socket.io-client";
import Terminal, {TerminalApi} from "vue-web-terminal";

const isShOpen = ref(false)
const socket = ref();
const status = ref('disconnected')

// watch(isShOpen, () => {
//   if (isShOpen.value === false) {
//     socket.value.disconnect()
//   }
// })

const onExecCmd = (key, command, success, failed) => {
  if (status.value === 'connected') {
    if (key === 'connect') {
      success({
        type: 'normal',
        class: 'success',
        content: "Connect Normally."
      })
    } else if (key === 'disconnect') {
      socket.value.disconnect()
      success({
        type: 'normal',
        class: 'success',
        content: "Disconnected from Websocket Server."
      })
    } else {
      socket.value.emit(key, command, ack => {
        ack = JSON.parse(ack)
        console.log(ack)
        success(ack)
      })
    }
  } else if (status.value === 'disconnected') {
    if (key === 'connect') {
      console.log('Try to Connect to the server');
      const args = command.split(/\s+/).slice(1);
      if (args.length !== 2) {
        success({
          type: 'normal',
          class: 'error',
          content: "Wrong Format, like 'connect usr psw'."
        })
        return
      }
      socket.value = io(WS_BASE, {
        auth: {
          usr: args[0],
          psw: args[1]
        }
      })
      socket.value.on('connect', () => {
        success({
          type: 'normal',
          class: 'success',
          content: "Connection Established. Welcome."
        })
        status.value = 'connected'
        console.log('Connected to the server');
      });

      socket.value.on('disconnect', (reason) => {
        success({
          type: 'normal',
          class: 'error',
          content: `Disconnected: ${reason}`
        })
        status.value = 'disconnected'
        console.log(`Disconnected: ${reason}`);
      });

      socket.value.on('error', (error) => {
        console.error('Connection Error:', error);
      });

      socket.value.on('reconnect_attempt', () => {
        console.log('Attempting to reconnect...');
      });

      socket.value.on('reconnect_failed', () => {
        console.log('Reconnection failed');
      });
    } else {
      success({
        type: 'normal',
        class: 'info',
        content: "WebSocket Connection Not Established."
      })
    }
  }
}

// * 颜色
const decorationColors = ['#568aea', '#000000']
// * 加载标识
const loading = ref(true)
// * 时间内容
const timeInfo = reactive({
  setInterval: 0,
  dateDay: '',
  dateYear: '',
  dateWeek: ''
})
// * 适配处理
const {appRef, calcRate, windowDraw, unWindowDraw} = useDraw()
// 生命周期
onMounted(() => {
  cancelLoading()
  handleTime()
  // todo 屏幕适应
  windowDraw()
  calcRate()
})

onUnmounted(() => {
  unWindowDraw()
  clearInterval(timeInfo.setInterval)
})

// methods
// todo 处理 loading 展示
const cancelLoading = () => {
  setTimeout(() => {
    loading.value = false
  }, 500)
}

// todo 处理时间监听
const handleTime = () => {
  timeInfo.setInterval = setInterval(() => {
    const date = new Date()
    timeInfo.dateDay = formatTime(date, 'HH: mm: ss')
    timeInfo.dateYear = formatTime(date, 'yyyy-MM-dd')
    timeInfo.dateWeek = WEEK[date.getDay()]
  }, 1000)
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/index.scss';
</style>
