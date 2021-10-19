import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import anfoUI from '../index'

let app = createApp(App)
app.use(router)
app.use(anfoUI, {
    loadingIcon: <div>loading</div>,
    listPagination: <hello>jjjs</hello>,
})
app.mount('#app')
