<template>
    <div>
        <div class="side-nav">
            <v-navigation-drawer expand-on-hover="true" :mini-variant="miniVariant" :src="bg" dark>
                <v-list dense nav class="py-0">
                    <v-list-item two-line :class="miniVariant && 'px-0'">
                        <v-list-item-avatar>
                            <img src="@/assets/images/single-logo.png" />
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>Application</v-list-item-title>
                            <v-list-item-subtitle>Subtext</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item v-for="item in items" :key="item.title" link>
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
            miniVariant: false,
            expandOnHover: false,
            items: [
                { title: "Dashboard", icon: "mdi-view-dashboard" },
                { title: "Photos", icon: "mdi-image" },
                { title: "About", icon: "mdi-help-box" },
            ],
        };
    },
    computed: {
        bg() {
            return this.background ? "https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg" : undefined;
        },
    },
};
</script>
<style>
.side-nav {
    position: fixed;
    left: 0px;
    top: 0px;
}
</style>
