import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./vuex";

import 'materialize-css/dist/css/materialize.min.css'

createApp(App).use(store).use(router).mount("#app");
