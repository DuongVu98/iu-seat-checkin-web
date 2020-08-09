<template>
    <div>
        <div class="seat-block">
            <div
                v-for="seat in seats"
                :key="seat.id"
                @click="openInputModal({ delegateCode: seat.delegateCode })"
            >
                <Seat v-bind:delegateCode="seat.delegateCode" />
            </div>
        </div>
    </div>
</template>

<script>
import Seat from "./Seat.vue";
import SeatCodeInput from "./SeatCodeInput";

import seatService from "../services/seat.service";

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

        for (let i = 0; i < this.seatList.length; i++) {
            this.seats[i].id = this.seatList[i].id;
            this.seats[i].delegateCode = this.seatList[i].delegateCode;
        }
    },
    methods: {
        openInputModal(props) {
            this.$buefy.modal.open({
                parent: this,
                component: SeatCodeInput,
                hasModalCard: true,
                customClass: "custom-class custom-class-2",
                trapFocus: true,
                props: props,
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
