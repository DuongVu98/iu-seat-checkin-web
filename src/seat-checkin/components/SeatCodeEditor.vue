<template>
    <div>
        <div class="editor-seat-block">
            <div v-for="(seat, index) in seats" :key="seat.id">
                <EditableSeat
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
import EditableSeat from "./EditableSeat.vue";

import seatService from "../services/seat.service";
import seatPositionService from "../services/seat-position.service";

export default {
    name: "SeatCodeEditor",
    components: {
        EditableSeat,
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
        await seatPositionService.dataToSeatView(this.seatList, this.seats).then(seatsView => {
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
            await seatPositionService.dataToSeatView(this.seatList, this.seats).then(seatsView => {
                this.seats = seatsView;
            });
        },
    },
};
</script>

<style>
.editor-seat-block {
    margin-top: 100px;
    margin-left: 50px;
    margin-right: 50px;
    display: grid;
    grid-template-columns: auto auto auto auto auto auto auto auto auto auto auto auto auto auto;
}
</style>
