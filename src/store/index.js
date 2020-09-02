import Vue from "vue";
import Vuex from "vuex";

import seatCheckinState from "../seat-checkin/store/index";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: { seatCheckinState },
});
