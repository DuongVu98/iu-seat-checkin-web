<template>
    <div class="seat-box" @click="isComponentModalActive = true">
        <t-card :class="[occupied ? 'occupied-seat' : 'empty-seat']">
            <!-- <t-card variant="danger"> -->
            <div class="flex justify-between inside-seat">
                {{ delegateCode }}
            </div>
        </t-card>
        <CModal
            title="Modal title"
            color="warning"
            :show.sync="isComponentModalActive"
        >
            <SeatCodeInput
                :delegateCode="delegateCode"
                @input-code="addSeat(code)"
            ></SeatCodeInput>
        </CModal>
    </div>
</template>

<script>
import SeatCodeInput from "./SeatCodeInput";

import seatService from "../services/seat.service";

export default {
    name: "Seat",
    components: {
        SeatCodeInput,
    },
    props: {
        delegateCode: String,
        row: Number,
        column: Number,
    },
    data() {
        return {
            isComponentModalActive: false,
        };
    },
    computed: {
        occupied: function() {
            if (this.delegateCode.length > 0) {
                return true;
            } else {
                return false;
            }
        },
        position: function() {
            return {
                row: this.row,
                column: this.column,
            };
        },
    },
    methods: {
        // cardModal: function(props) {
        //     this.$buefy.modal.open({
        //         parent: this,
        //         component: SeatCodeInput,
        //         hasModalCard: true,
        //         customClass: "custom-class custom-class-2",
        //         trapFocus: true,
        //         props: props,
        //         events: {
        //             "input-code": code => {
        //                 this.addSeat(
        //                     this.getThis().position.row,
        //                     this.getThis().position.column,
        //                     code
        //                 );
        //             },
        //         },
        //     });
        // },
        addSeat(delegateCode) {
            console.log(`check row from component --> ${this.row}`);
            seatService.addOccupiedSeat({
                delegateCode: delegateCode,
                row: this.row,
                column: this.column,
            });
            // .then();
        },
        getThis() {
            return this;
        },
    },
};
</script>

<style>
.seat-box {
    display: grid;
    grid-template-columns: auto auto auto auto auto;
}

.occupied-seat {
    background-color: blueviolet;
    color: white;
    text-align: center;
    margin-left: 5px;
    margin-right: 5px;
    margin-bottom: 15px;
    padding: 10px;
    width: 70px;
    height: 50px;
    font-weight: bold;
}
.empty-seat {
    background-color: aquamarine;
    color: white;
    text-align: center;
    margin-left: 5px;
    margin-right: 5px;
    margin-bottom: 15px;
    padding: 10px;
    width: 70px;
    height: 50px;
}
</style>
