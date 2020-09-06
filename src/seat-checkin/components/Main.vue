<template>
    <v-app>
        <div class="whole-app">
            <div class="logo-image">
                <v-row :align="alignment" :justify="justify">
                    <img src="@/assets/images/logo.png" width="150px" alt="" style="width:750px" />
                </v-row>
            </div>
            <div class="divider">
                <v-row :justify="justify">
                    <v-card outlined tile style="width: 97%;"></v-card>
                </v-row>
            </div>
            <div class="room-board">
                <v-row :align="alignment" :justify="justify">
                    <v-card class="room-doors" outlined tile></v-card>
                    <v-card class="room-main-board" outlined tile></v-card>
                    <v-card class="room-doors" outlined tile></v-card>
                </v-row>
            </div>
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
    height: 15px;
    width: 35%;
    margin-right: 20%;
    margin-left: 20%;
    background-color: #dadada;
}

.room-doors {
    height: 15px;
    width: 3%;
    background-color: #dadada;
}
</style>
