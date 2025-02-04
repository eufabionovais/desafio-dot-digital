import './assets/main.css'
import store from './store'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import Vuelidate from 'vuelidate';

const app = createApp(App)

app.use(store)
app.use(router)
// app.use(Vuelidate)

app.mount('#app')
