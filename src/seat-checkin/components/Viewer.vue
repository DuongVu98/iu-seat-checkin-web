<template>
    <div>
        <div class="viewer-main-display">
            <div align="right">
                <NumerialInfo :adminPermission="false" />
            </div>
            <div class="viewer-inline-seats-block">
                <div class="viewer-left-seat-block">
                    <div v-for="seat in leftSeats" :key="seat.id">
                        <Seat
                            v-bind:delegateCode="seat.delegateCode"
                            :occupied="seat.occupied"
                            :adminPermission="false"
                            :seatId="seat.id"
                        />
                    </div>
                </div>
                <div class="viewer-right-seat-block">
                    <div v-for="seat in rightSeats" :key="seat.id">
                        <Seat
                            v-bind:delegateCode="seat.delegateCode"
                            :occupied="seat.occupied"
                            :adminPermission="false"
                            :seatId="seat.id"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Seat from "./Seat.vue";
import NumerialInfo from "./NumerialInfo";

import seatService from "../services/seat.service";
import seatPositionService from "../services/seat-position.service";

export default {
    name: "Viewer",
    components: {
        Seat,
        NumerialInfo,
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
        };
    },
    async created() {
        this.fetchData();
    },
    sockets: {
        fetchApi() {
            this.fetchData();
        },
    },
    methods: {
        async fetchData() {
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
.viewer-main-display {
    margin-left: 7%;
    margin-right: 7%;
}
.viewer-inline-seats-block {
    display: grid;
    grid-template-columns: auto auto;
}
.viewer-left-seat-block {
    margin-right: 100px;
    display: grid;
    grid-template-columns: auto auto auto auto auto auto auto;
}
.viewer-right-seat-block {
    margin-left: 100px;
    display: grid;
    grid-template-columns: auto auto auto auto auto auto auto;
}
</style>
