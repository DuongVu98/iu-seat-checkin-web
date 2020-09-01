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
                            <v-list-item-title>Menu</v-list-item-title>
                            <v-list-item-subtitle>Subtext</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item v-for="item in items" :key="item.title" link @click="test()">
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>{{ item.title }} </v-list-item-title>
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
                { title: "Viewer", icon: "mdi-view-dashboard" },
                { title: "Code editor", icon: "mdi-image" },
                { title: "Logout", icon: "mdi-help-box" },
            ],
        };
    },
    computed: {
        bg() {
            return "https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg";
        },
    },
    methods: {
        test() {
            this.$router.push("/");
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
