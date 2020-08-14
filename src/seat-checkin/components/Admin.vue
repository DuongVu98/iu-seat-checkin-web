<template>
    <div>
        <b-button type="is-success" rounded @click="codeEditor = true"
            >Code editor</b-button
        >
        <div class="seat-block">
            <div v-for="(seat, index) in seats" :key="seat.id">
                <Seat
                    v-bind:delegateCode="seat.delegateCode"
                    :seatId="seat.id"
                    :index="index"
                    :occupied="seat.occupied"
                    :adminPermission="true"
                    @reload="fetchData()"
                />
            </div>
        </div>
        <v-dialog v-model="codeEditor" width="1000">
            <div>
                <v-card>
                    <SeatCodeEditor />
                </v-card>
            </div>
        </v-dialog>
    </div>
</template>

<script>
import Seat from "./Seat.vue";
import SeatCodeEditor from "./SeatCodeEditor";

import seatService from "../services/seat.service";
import seatPositionService from "../services/seat-position.service";

export default {
    name: "Admin",
    components: {
        Seat,
        SeatCodeEditor,
    },
    data() {
        return {
            seats: [],
            seatList: [],
            isComponentModalActive: false,
            dialog: false,
            codeEditor: false,
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
.seat-code-editor {
    width: 1000px;
}
</style>
