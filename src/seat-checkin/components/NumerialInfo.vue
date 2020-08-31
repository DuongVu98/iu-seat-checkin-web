<template>
    <div class="info-block">
        <v-card shaped="true" max-width="350">
            <v-card-text class="text--primary">
                <div class="info-text">
                    <div>Số lượng đại biểu: {{ delegatesAmount }}</div>
                    <div>Số lượng có mặt: {{ occupiedAmount }}</div>
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>
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
    created() {
        numerialInfoService.getNumerialInformation().then(res => {
            this.delegatesAmount = res.data.delegatesAmount;
            this.occupiedAmount = res.data.occupiedAmount;
        });
    },
};
</script>
<style>
.info-block {
    margin: 20px;
}
.info-text {
    display: grid;
    grid-template-columns: auto auto auto;
}
</style>
