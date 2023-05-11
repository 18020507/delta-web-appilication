import { createApp } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import axios from "axios";
import {
  faUser,
  faLock,
  faList,
  faClipboardList,
  faHouse,
  faChevronUp,
  faFilter,
  faRightFromBracket,
  faBell,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import VueCharts from "vue-echarts";
import router from "./router";

axios.defaults.baseURL = `${process.env.VUE_APP_BASE_API_URL}`
addAuthHeader()

if (localStorage.getItem('access_token')) {
    axios.defaults.headers['Authorization'] = localStorage.getItem('access_token')
}

library.add(
  faLock,
  faUser,
  faList,
  faClipboardList,
  faHouse,
  faChevronUp,
  faFilter,
  faRightFromBracket,
  faBell,
  faPencil
);
import App from "./App.vue";
import { addAuthHeader } from "./utils/api.util";

const app = createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .component("v-chart", VueCharts);

app.use(router);
app.mount("#app");
