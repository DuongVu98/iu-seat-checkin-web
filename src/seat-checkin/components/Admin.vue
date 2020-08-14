<template>
    <div>
        <div class="admin-editor-block ">
            <b-button
                class="edit-seat-button"
                type="is-success"
                rounded
                @click="codeEditor = true"
                >Code editor</b-button
            >
            <div class="admin-seat-block">
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
        </div>
        <v-dialog v-model="codeEditor" width="1000">
            <div>
                <v-card>
                    <v-card-title class="headline grey lighten-2">
                        Seat code editor
                    </v-card-title>
                    <SeatCodeEditor />
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <b-button type="is-info" outlined @click="closeEditor()"
                            >Save</b-button
                        >
                    </v-card-actions>
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
        closeEditor() {
            this.codeEditor = false;
            this.fetchData();
        },
    },
};
</script>

<style>
.admin-editor-block {
    margin-left: 200px;
    margin-right: 200px;
    margin-bottom: 100px;
}
.admin-seat-block {
    display: grid;
    grid-template-columns: auto auto auto auto auto auto auto auto auto auto auto auto auto auto;
}
.edit-seat-button {
    margin-bottom: 50px;
}
.seat-code-editor {
    width: 1000px;
}
</style>
