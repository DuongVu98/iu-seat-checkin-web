<template>
    <div class="info-block">
        <v-card shaped="true" :max-width="[adminPermission ? 520 : 400]" height="65" elevation="10">
            <v-card-text class="text--primary">
                <div :class="[adminPermission ? 'info-and-command-block-admin' : 'info-and-command-block-viewer']">
                    <div class="info-text">
                        Số lượng đại biểu: <span id="delegates-amount">{{ delegatesAmount }}</span>
                    </div>
                    <div class="info-text">
                        Số lượng có mặt: <span id="occupied-amount">{{ occupiedAmount }}</span>
                    </div>
                    <div v-if="adminPermission" class="code-editor-button">
                        <b-button type="is-success" @click="buttonClick()" rounded>
                            Edit code
                        </b-button>
                    </div>
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>
<script src="/socket.io/socket.io.js"></script>
<script>
import numerialInfoService from "../services/numerial-info.service";

export default {
    name: "NumerialInfo",
    data() {
        return {
            delegatesAmount: null,
            occupiedAmount: null,
        };
    },
    props: {
        adminPermission: Boolean,
    },
    created() {
        this.fetchData();
    },
    sockets: {
        toggleSeatOccupied(payload) {
            this.fetchData();
        },
        fetchApi() {
            this.fetchData();
        },
    },
    methods: {
        fetchData() {
            numerialInfoService.getNumerialInformation().then(res => {
                this.delegatesAmount = res.data.delegatesAmount;
                this.occupiedAmount = res.data.occupiedAmount;
            });
        },
        buttonClick() {
            this.$emit("buttonClicked");
        },
    },
};
</script>
<style>
.info-block {
    margin: 20px;
}
.info-and-command-block-admin {
    display: grid;
    grid-template-columns: auto auto auto;
    align-items: center;
}
.info-and-command-block-viewer {
    display: grid;
    grid-template-columns: auto auto auto;
    align-items: center;
}
.info-text {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-size: 16px;
    font-weight: bold;
}

.code-editor-button {
    font-weight: bold;
}
#occupied-amount {
    color: #f0932b;
}
</style>
