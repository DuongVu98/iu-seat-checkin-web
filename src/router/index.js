import Vue from "vue";
import VueRouter from "vue-router";
import Viewer from "../seat-checkin/components/Viewer.vue";
import Admin from "../seat-checkin/components/Admin.vue";
Vue.use(VueRouter);

const routes = [
    {
        path: "/admin",
        name: "Admin",
        component: Admin,
    },
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
