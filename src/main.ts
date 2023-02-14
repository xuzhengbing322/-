import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 引用和注册全局组件TypeNav
import TypeNav from '@/components/TypeNav/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import { createPinia } from 'pinia'

//引入MockServer.js----mock数据
import "@/mock/mockServe";
// 引入swiper样式
// import "swiper/css/swiper.css"
import "swiper/css"

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)


createApp(App).use(router).use(pinia).component('TypeNav', TypeNav).component('Pagination', Pagination).mount('#app')
