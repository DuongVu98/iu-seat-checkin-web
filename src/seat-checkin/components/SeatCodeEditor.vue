<template>
    <div>
        <div class="editor-inline-seats-block">
            <div class="editor-left-seat-block">
                <div v-for="seat in leftSeats" :key="seat.id">
                    <EditableSeat
                        v-bind:delegateCode="seat.delegateCode"
                        :seatId="seat.id"
                        :index="seat.index"
                        :adminPermission="true"
                        @reload="fetchData()"
                    />
                </div>
            </div>
            <div class="editor-right-seat-block">
                <div v-for="seat in rightSeats" :key="seat.id">
                    <EditableSeat
                        v-bind:delegateCode="seat.delegateCode"
                        :seatId="seat.id"
                        :index="seat.index"
                        :adminPermission="true"
                        @reload="fetchData()"
                    />
                </div>
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
            separatedSeats: {
                leftSeats: [],
                rightSeats: [],
            },
            leftSeats: [],
            rightSeats: [],
            seatList: [],
            isComponentModalActive: false,
            dialog: false,
        };
    },
    async created() {
        this.fetchData();
    },
    methods: {
        fetchData: async function() {
            this.separatedSeats.rightSeats = await [];
            this.separatedSeats.leftSeats = await [];
            this.seats = await [];

            for (let i = 0; i < 77 * 2; i++) {
                await this.seats.push({ id: `${i}`, delegateCode: "", index: i });
            }

            await seatService.getAllSeat().then(seatsList => {
                this.seatList = seatsList.data;
            });
            await seatPositionService.dataToSeatView(this.seatList, this.seats).then(seatsView => {
                this.seats = seatsView;
            });

            await seatPositionService.transformSeatsArray(this.seats, this.separatedSeats, async result => {
                this.separatedSeats = await result;
                this.leftSeats = this.separatedSeats.leftSeats;
                this.rightSeats = this.separatedSeats.rightSeats;
            });
        },
    },
};
</script>

<style>
.editor-inline-seats-block {
    margin-left: 5%;
    margin-right: 5%;
    display: grid;
    grid-template-columns: auto auto;
}
.editor-left-seat-block {
    margin-right: 5%;
    display: grid;
    grid-template-columns: auto auto auto auto auto auto auto;
}
.editor-right-seat-block {
    margin-left: 5%;
    display: grid;
    grid-template-columns: auto auto auto auto auto auto auto;
}
</style>
