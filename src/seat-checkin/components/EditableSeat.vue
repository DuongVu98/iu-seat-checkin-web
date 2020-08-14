<template>
    <div class="editor-seat-box" @click="openModal()">
        <t-card
            variant="danger"
            class="p-1 editor-seat"
            v-bind="attrs"
            v-on="on"
        >
            <div class="flex justify-between inside-seat">
                {{ delegateCode }}
            </div>
        </t-card>
        <v-dialog v-model="isComponentModalActive" width="500">
            <v-card-title class="headline grey lighten-2">
                {{ modalLabel }}
            </v-card-title>

            <v-card>
                <v-card-text>
                    <SeatCodeInput
                        :delegateCode="delegateCode"
                        @close-modal="isComponentModalActive = false"
                        @input-code="addSeat"
                        @update-code="updateSeat"
                        @delete="deleteCode()"
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
    name: "EditorSeat",
    components: {
        SeatCodeInput,
    },
    props: {
        delegateCode: String,
        index: Number,
        seatId: String,
        adminPermission: Boolean,
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
        modalLabel: function() {
            return this.delegateCode == ""
                ? "Add occupied seat"
                : "Edit occupied seat";
        },
    },
    methods: {
        openModal() {
            if (this.$props.adminPermission) {
                this.isComponentModalActive = true;
            }
        },
        addSeat(delegateCode) {
            seatService
                .addOccupiedSeat({
                    delegateCode: delegateCode,
                    row: this.seatRow,
                    column: this.seatColumn,
                })
                .then(() => this.reloadEvent());
        },
        updateSeat(delegateCode) {
            seatService
                .updateSeatCode({
                    id: this.$props.seatId,
                    row: this.seatRow,
                    column: this.seatColumn,
                    delegateCode: delegateCode,
                })
                .then(() => this.reloadEvent());
        },
        deleteCode() {
            seatService
                .deleteSeatCode(this.$props.seatId)
                .then(() => this.reloadEvent());
        },
        reloadEvent() {
            this.$emit("reload");
        },
    },
};
</script>

<style>
.editor-seat-box {
    display: grid;
    grid-template-columns: auto auto auto auto auto;
}
.editor-seat {
    width: 50px;
    height: 40px;
    margin-top: 10px;
}
</style>
