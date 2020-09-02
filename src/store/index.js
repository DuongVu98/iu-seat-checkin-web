import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import seatCheckinState from "../seat-checkin/store/index";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
});

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: { seatCheckinState },
    plugins: [vuexLocal.plugin],
});
