import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../seat-checkin/components/Main.vue";
import Viewer from "../seat-checkin/components/Viewer.vue";
import Admin from "../seat-checkin/components/Admin.vue";
import Login from "../seat-checkin/components/Login.vue";
import NotFound from "../seat-checkin/components/NotFound.vue";
Vue.use(VueRouter);

const routes = [
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/",
        component: Main,
        children: [
            {
                path: "/admin",
                name: "Admin",
                component: Admin,
            },
            {
                path: "/login",
                name: "Login",
                component: Login,
            },
            {
                path: "/viewer",
                name: "Viewer",
                component: Viewer,
            },
            {
                path: "/",
                name: "Viewer",
                component: Viewer,
            },
        ],
    },
    {
        path: "/**",
        name: "NotFound",
        component: NotFound,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
