import './assets/main.scss'
import store from './store'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import BaseModal from "./components/commons/BaseModal.vue"
import BaseTooltip from "./components/commons/BaseTooltip.vue"
import Loader from "./components/commons/Loader.vue"

import { BiStarFill, BiCartCheckFill, BiHeart, BiHeartFill, BiSearch, MdClearRound, IoTrashBin, BiArrowRight, BiCartX, BiCart, RiAlarmWarningLine, IoHeartDislikeOutline, BiCartPlus   } from "oh-vue-icons/icons";
addIcons(BiStarFill, BiCartCheckFill, BiHeart, BiHeartFill, BiSearch, MdClearRound, IoTrashBin, BiArrowRight, BiCartX, BiCart, RiAlarmWarningLine,  IoHeartDislikeOutline, BiCartPlus  );

const app = createApp(App)

app.use(store)
app.use(router)
app.component("BaseModal", BaseModal);
app.component("BaseTooltip", BaseTooltip);
app.component("Loader", Loader);
app.component("v-icon", OhVueIcon);

app.mount('#app')
