import { createApp, h } from "vue";
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
  faPlus,
  faRotate,
  faEye
} from "@fortawesome/free-solid-svg-icons";
import VueCharts from "vue-echarts";
import router from "./router";

axios.defaults.baseURL = `${process.env.VUE_APP_BASE_API_URL}`;
addAuthHeader();
if (localStorage.getItem("access_token")) {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("access_token")}`;
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
  faPencil,
  faPlus,
  faRotate,
  faEye
);
import App from "./App.vue";
import { addAuthHeader } from "./utils/api.util";

import Notifications from '@kyvg/vue3-notification'

const app = createApp({
  render: () => h(App),
})
  .component("font-awesome-icon", FontAwesomeIcon)
  .component("v-chart", VueCharts);

app.use(router);
app.use(Notifications)
app.mount("#app");
