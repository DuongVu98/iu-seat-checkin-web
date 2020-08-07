import Vue from "vue";
import VueRouter from "vue-router";
import Viewer from "../seat-checkin/components/Viewer.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/**",
        name: "Viewer",
        component: Viewer,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
