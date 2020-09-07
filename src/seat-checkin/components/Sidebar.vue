<template>
    <div>
        <div class="side-nav">
            <v-navigation-drawer expand-on-hover="true" :mini-variant="false" :src="bg" dark>
                <v-list dense nav class="py-0">
                    <v-list-item two-line :class="miniVariant && 'px-0'">
                        <v-list-item-avatar>
                            <img src="@/assets/images/single-logo.png" />
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>Admin Directions</v-list-item-title>
                            <!-- <v-list-item-subtitle>Subtext</v-list-item-subtitle> -->
                        </v-list-item-content>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item v-for="item in items" :key="item.title" link @click="test(item.action)">
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
        </div>
    </div>
</template>
<script>
export default {
    name: "Sidebar",
    data() {
        return {
            items: [
                { title: "Viewer", icon: "mdi-view-dashboard", action: { path: "/viewer" } },
                { title: "Code editor", icon: "fas fa-pen-square", action: { event: "code-editor" } },
                { title: "Logout", icon: "fas fa-sign-out-alt", action: { event: "logout" } },
            ],
        };
    },
    computed: {
        bg() {
            return "https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg";
        },
    },
    methods: {
        test(action) {
            if (action.path) {
                this.$router.push(action.path);
            } else if (action.event) {
                this.$emit(action.event);
            }
        },
    },
};
</script>
<style>
.side-nav {
    position: fixed;
    height: 100vh;
    left: 0px;
    top: 0px;
}
</style>
