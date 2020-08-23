<template>
    <div>
        <div class="left-seat-block">
            <div v-for="seat in seats.leftSeats" :key="seat.id">
                <Seat v-bind:delegateCode="seat.delegateCode" :occupied="seat.occupied" :adminPermission="false" />
            </div>
        </div>
        <div class="left-seat-block">
            <div v-for="seat in seats.rightSeats" :key="seat.id">
                <Seat v-bind:delegateCode="seat.delegateCode" :occupied="seat.occupied" :adminPermission="false" />
            </div>
        </div>
    </div>
</template>

<script>
import Seat from "./Seat.vue";

import seatService from "../services/seat.service";
import seatPositionService from "../services/seat-position.service";

export default {
    name: "Viewer",
    components: {
        Seat,
    },
    data() {
        return {
            seats: {
                rightSeats: [],
                leftSeats: [],
            },
            seatList: [],
        };
    },
    async mounted() {
        for (let i = 0; i < 77 * 2; i++) {
            if ((i + 1) % 14 == 0 ? 14 : (i + 1) % 14 <= 7) {
                await this.seats.leftSeats.push({
                    id: `${i}`,
                    delegateCode: "",
                });
            } else {
                await this.seats.rightSeats.push({
                    id: `${i}`,
                    delegateCode: "",
                });
            }
        }

        await seatService.getAllSeat().then(seatsList => {
            this.seatList = seatsList.data;
        });
        await seatPositionService.dataToSeatViewTest(this.seatList, this.seats).then(seatsView => {
            this.seats = seatsView;
        });
    },
};
</script>

<style>
.seat-block {
    margin-left: 200px;
    margin-right: 200px;
    display: grid;
    grid-template-columns: auto auto auto auto auto auto auto auto auto auto auto auto auto auto;
}
.left-seat-block {
    margin-left: 200px;
    margin-right: 200px;
    display: grid;
    grid-template-columns: auto auto auto auto auto auto auto;
}
</style>
