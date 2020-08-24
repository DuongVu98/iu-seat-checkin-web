<template>
    <div>
        <div class="admin-editor-block ">
            <b-button class="edit-seat-button" type="is-success" rounded @click="codeEditor = true"
                >Code editor</b-button
            >
            <!-- <div class="admin-seat-block">
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
            </div> -->
        </div>

        <div class="inline-seats-block">
            <div class="left-seat-block">
                <div v-for="seat in seats.leftSeats" :key="seat.id">
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
            <div class="right-seat-block">
                <div v-for="seat in seats.rightSeats" :key="seat.id">
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
                        <b-button type="is-info" outlined @click="closeEditor()">Save</b-button>
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
            seats: {
                rightSeats: [],
                leftSeats: [],
            },
            seatList: [],
            isComponentModalActive: false,
            dialog: false,
            codeEditor: false,
        };
    },
    async created() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            this.seats.rightSeats = await [];
            this.seats.leftSeats = await [];
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

.inline-seats-block {
    margin-left: 7%;
    margin-right: 7%;
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
