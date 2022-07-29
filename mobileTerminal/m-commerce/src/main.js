import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 导入normalize 消除不同浏览器对HTML标签默认样式的差异，统一设置默认样式
import 'normalize.css/normalize.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
