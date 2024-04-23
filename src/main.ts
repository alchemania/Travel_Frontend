import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import DataVVue3 from '@kjgl77/datav-vue3'
// 引入全局css
import './assets/scss/style.scss';
// 引入图表（所有图标见 icon 目录下的 demo_index.html）
import './assets/icon/iconfont.css'
// 引入 全局注册组件
import PublicComponent from '@/components/componentInstall';
// // 引入element-plus
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// //引入vue-pro-table
// import Vue3ProTable from "vue3-pro-table";

const app = createApp(App)
app.use(PublicComponent)
app.use(DataVVue3)
// app.use(store)
app.use(router)
// app.use(ElementPlus)
// app.use(Vue3ProTable)
app.mount('#app')
