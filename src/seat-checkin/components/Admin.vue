<template>
    <div>
        <div class="seat-block">
            <div v-for="seat in seats" :key="seat.id">
                <Seat
                    v-bind:delegateCode="seat.delegateCode"
                    :row="seat.row"
                    :column="seat.column"
                />
            </div>
        </div>
    </div>
</template>

<script>
import Seat from "./Seat.vue";
// import SeatCodeInput from "./SeatCodeInput";

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
        };
    },
    async mounted() {
        for (let i = 0; i < 77 * 2; i++) {
            await this.seats.push({ id: `${i}`, delegateCode: "" });
        }

        await seatService.getAllSeat().then(seatsList => {
            this.seatList = seatsList.data;
        });
        seatPositionService
            .dataToSeatView(this.seatList, this.seats)
            .then(seatsView => {
                this.seats = seatsView;
            });
    },
    methods: {
        // openInputModal(props) {
        //     this.$buefy.modal.open({
        //         parent: this,
        //         component: SeatCodeInput,
        //         hasModalCard: true,
        //         customClass: "custom-class custom-class-2",
        //         trapFocus: true,
        //         props: props,
        //     });
        // },
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
