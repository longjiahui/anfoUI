import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import anfoUI from '../../dist/anfoUI.common'
import '../../dist/anfoUI.css'

let app = createApp(App)
app.use(router)
app.use(anfoUI)

app.mount('#app')
