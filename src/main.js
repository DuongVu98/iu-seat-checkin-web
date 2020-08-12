import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./assets/styles/main.css";
import "./plugins/vue-tailwind";
import "./plugins/buefy";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
}).$mount("#app");
