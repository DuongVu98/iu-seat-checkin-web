<template>
    <div class="seat-box" @click="isComponentModalActive = true">
        <v-dialog v-model="isComponentModalActive" width="500">
            <v-card-title class="headline grey lighten-2">
                Seat occupied
            </v-card-title>
            <template v-slot:activator="{ on, attrs }">
                <t-card
                    :class="[occupied ? 'occupied-seat' : 'empty-seat']"
                    v-bind="attrs"
                    v-on="on"
                >
                    <div class="flex justify-between inside-seat">
                        {{ delegateCode }}
                    </div>
                </t-card>
            </template>

            <v-card>
                <v-card-text>
                    <SeatCodeInput
                        :delegateCode="delegateCode"
                        @close-modal="isComponentModalActive = false"
                        @input-code="addSeat"
                    ></SeatCodeInput>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import SeatCodeInput from "./SeatCodeInput";

import seatService from "../services/seat.service";
import seatPositionService from "../services/seat-position.service";

export default {
    name: "Seat",
    components: {
        SeatCodeInput,
    },
    props: {
        delegateCode: String,
        index: Number,
        row: Number,
        column: Number,
    },
    data() {
        return {
            isComponentModalActive: false,
            seatRow: 123,
            seatColumn: 123,
        };
    },
    async created() {
        await seatPositionService
            .positionToData(this.$props.index + 1)
            .then(data => {
                this.seatRow = data.row;
                this.seatColumn = data.column;
            });
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
                row: Math.ceil((this.index + 1) / 14),
                column: (this.index + 1) % 14 == 0 ? 14 : (this.index + 1) % 14,
            };
        },
    },
    methods: {
        addSeat(delegateCode) {
            seatService
                .addOccupiedSeat({
                    delegateCode: delegateCode,
                    row: this.seatRow,
                    column: this.seatColumn,
                })
                .then();
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
