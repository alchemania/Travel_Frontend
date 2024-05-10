import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import DataVVue3 from '@kjgl77/datav-vue3'
// 引入全局css
import './assets/scss/style.scss';
// 引入图表（所有图标见 icon 目录下的 demo_index.html）
import './assets/icon/iconfont.css'
// 引入 全局注册组件
import PublicComponent from '@/components/componentInstall';
import Terminal from "vue-web-terminal"
//  引入黑色主题
import 'vue-web-terminal/lib/theme/dark.css'
import Antd from "ant-design-vue"

const app = createApp(App)
app.use(PublicComponent)
app.use(DataVVue3)
app.use(router)
app.use(Antd)
// @ts-ignore
app.use(Terminal)
app.mount('#app')
