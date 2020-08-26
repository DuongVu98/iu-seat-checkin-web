<template>
    <v-app>
        <div class="logo-image">
            <img src="@/assets/images/vnsiu_logo.png" width="150px" alt="" />
        </div>
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: "App",

    components: {},

    data: () => ({
        //
    }),
};
</script>

<style>
.logo-image {
    margin-right: auto;
    margin-left: auto;
    margin-top: 100px;
}
</style>
