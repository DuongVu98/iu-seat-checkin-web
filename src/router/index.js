import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../seat-checkin/components/Main.vue";
import Viewer from "../seat-checkin/components/Viewer.vue";
import Admin from "../seat-checkin/components/Admin.vue";
import Login from "../seat-checkin/components/Login.vue";

Vue.use(VueRouter);

// const routes = [
//     {
//         path: "/admin",
//         name: "Admin",
//         component: Admin,
//     },
//     {
//         path: "/login",
//         name: "Login",
//         component: Login,
//     },
//     {
//         path: "/**",
//         name: "Viewer",
//         component: Viewer,
//     },
// ];

const routes = [
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
        ],
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
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
