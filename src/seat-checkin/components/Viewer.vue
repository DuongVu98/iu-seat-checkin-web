<template>
    <div>
        <div class="seat-block">
            <div v-for="seat in seats" :key="seat.id">
                <Seat v-bind:delegateCode="seat.delegateCode" />
            </div>
        </div>
    </div>
</template>

<script>
import Seat from "./Seat.vue";

import seatService from "../services/seat.service";

export default {
    name: "Viewer",
    components: {
        Seat,
    },
    data() {
        return {
            seats: [],
            seatList: [],
        };
    },
    async created() {
        for (let i = 0; i < 77 * 2; i++) {
            await this.seats.push({ id: `${i}`, delegateCode: "" });
        }

        await seatService.getAllSeat().then(seatsList => {
            this.seatList = seatsList.data;
        });

        for (let i = 0; i < this.seatList.length; i++) {
            this.seats[i].id = this.seatList[i].id;
            this.seats[i].delegateCode = this.seatList[i].delegateCode;
        }
    },
};
</script>

<style>
.seat-block {
    margin-top: 300px;
    margin-left: 200px;
    margin-right: 200px;
    display: grid;
    grid-template-columns: auto auto auto auto auto auto auto auto auto auto auto auto auto auto;
}
</style>
