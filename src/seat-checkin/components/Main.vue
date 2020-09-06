<template>
    <v-app>
        <div class="whole-app">
            <div class="logo-image">
                <v-row :align="alignment" :justify="justify">
                    <img src="@/assets/images/logo.png" width="150px" alt="" style="width:750px" />
                </v-row>
            </div>
            <!-- <div class="room-board">
                <v-row :align="alignment" :justify="justify" style="height: 150px;">
                    <v-card class="ma-3 pa-6 room-doors" outlined tile></v-card>
                    <v-card class="pa-6 room-main-board" outlined tile></v-card>
                    <v-card class="ma-3 pa-6 room-doors" outlined tile></v-card>
                </v-row>
            </div> -->
            <v-main>
                <router-view />
            </v-main>
        </div>
    </v-app>
</template>

<script>
export default {
    name: "Main",
    data: () => {
        return {
            alignment: "center",
            justify: "center",
        };
    },
    created() {
        document.title = "Điểm danh đại biểu";
    },
};
</script>

<style>
.whole-app {
    background-image: linear-gradient(to bottom right, #153f6f, #0ab0da);
    height: 100%;
}
.room-board {
    margin-bottom: 40px;
}
.room-main-board {
    height: 120px;
    width: 300px;
    margin-right: 30%;
    margin-left: 30%;
    background-color: #dadada;
}

.room-doors {
    height: 80px;
    background-color: #dadada;
}
</style>
