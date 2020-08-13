<template>
    <div>
        <div class="seat-block">
            <div v-for="(seat, index) in seats" :key="seat.id">
                <Seat
                    v-bind:delegateCode="seat.delegateCode"
                    :seatId="seat.id"
                    :index="index"
                    :adminPermission="true"
                    @reload="fetchData()"
                />
            </div>
        </div>
    </div>
</template>

<script>
import Seat from "./Seat.vue";

import seatService from "../services/seat.service";
import seatPositionService from "../services/seat-position.service";

export default {
    name: "Admin",
    components: {
        Seat,
    },
    data() {
        return {
            seats: [],
            seatList: [],
            isComponentModalActive: false,
            dialog: false,
        };
    },
    async created() {
        for (let i = 0; i < 77 * 2; i++) {
            await this.seats.push({ id: `${i}`, delegateCode: "" });
        }

        await seatService.getAllSeat().then(seatsList => {
            this.seatList = seatsList.data;
        });
        await seatPositionService
            .dataToSeatView(this.seatList, this.seats)
            .then(seatsView => {
                this.seats = seatsView;
            });
    },
    methods: {
        async fetchData() {
            this.seats = await [];
            for (let i = 0; i < 77 * 2; i++) {
                await this.seats.push({ id: `${i}`, delegateCode: "" });
            }

            await seatService.getAllSeat().then(seatsList => {
                this.seatList = seatsList.data;
            });
            await seatPositionService
                .dataToSeatView(this.seatList, this.seats)
                .then(seatsView => {
                    this.seats = seatsView;
                });
        },
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
