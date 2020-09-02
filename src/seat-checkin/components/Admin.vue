<template>
    <div>
        <Sidebar @code-editor="codeEditor = true" @logout="doLogout()" />
        <div class="admin-editor-block">
            <div class="main-display">
                <div align="right">
                    <NumerialInfo :adminPermission="true" @buttonClicked="codeEditor = true" />
                </div>
                <div class="inline-seats-block">
                    <div class="left-seat-block">
                        <div v-for="seat in leftSeats" :key="seat.id">
                            <Seat
                                v-bind:delegateCode="seat.delegateCode"
                                :seatId="seat.id"
                                :index="seat.index"
                                :occupied="seat.occupied"
                                :adminPermission="true"
                                @reload="fetchData()"
                            />
                        </div>
                    </div>
                    <div class="right-seat-block">
                        <div v-for="seat in rightSeats" :key="seat.id">
                            <Seat
                                v-bind:delegateCode="seat.delegateCode"
                                :seatId="seat.id"
                                :index="seat.index"
                                :occupied="seat.occupied"
                                :adminPermission="true"
                                @reload="fetchData()"
                            />
                        </div>
                    </div>
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
import NumerialInfo from "./NumerialInfo";
import Sidebar from "./Sidebar";

import seatService from "../services/seat.service";
import seatPositionService from "../services/seat-position.service";

export default {
    name: "Admin",
    components: {
        Seat,
        SeatCodeEditor,
        NumerialInfo,
        Sidebar,
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
            codeEditor: false,
        };
    },
    async created() {
        let isLogin = await this.$store.getters.isLogin;
        if (isLogin == false) {
            this.$router.push("/login");
        } else {
            this.fetchData();
        }
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
        closeEditor() {
            this.codeEditor = false;
            this.fetchData();
        },
        doLogout() {
            this.$store.dispatch("doLogout");
            this.$router.push("/login");
        },
    },
};
</script>

<style>
.admin-editor-block {
    margin-bottom: 100px;
}
.edit-seat-button {
    margin-bottom: 50px;
}
.seat-code-editor {
    width: 1000px;
}

.main-display {
    margin-left: 7%;
    margin-right: 7%;
}
.inline-seats-block {
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
