<template>
    <div class="inline-seats-block">
        <div class="left-seat-block">
            <div v-for="seat in seats.leftSeats" :key="seat.id">
                <Seat v-bind:delegateCode="seat.delegateCode" :occupied="seat.occupied" :adminPermission="false" />
            </div>
        </div>
        <div class="right-seat-block">
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
            let column = await ((i + 1) % 14 == 0 ? 14 : (i + 1) % 14);
            if (column <= 7) {
                await this.seats.leftSeats.push({
                    id: `${i}`,
                    delegateCode: "",
                });
            } else if (column > 7) {
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
.inline-seats-block {
    display: grid;
    grid-template-columns: auto auto;
}
.left-seat-block {
    margin-right: 100px;
    display: grid;
    grid-template-columns: auto auto auto auto auto auto auto;
}
.right-seat-block {
    margin-left: 100px;
    display: grid;
    grid-template-columns: auto auto auto auto auto auto auto;
}
</style>
