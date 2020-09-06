<template>
    <div class="seat-box" @click="setOccupied()">
        <t-card :class="[seatOccupied ? 'occupied-seat' : 'empty-seat']" variant="appSeat">
            <div class="inside-seat">
                {{ delegateCode }}
            </div>
        </t-card>
    </div>
</template>
<script src="/socket.io/socket.io.js"></script>
<script>
import seatPositionService from "../services/seat-position.service";
import seatApiService from "../services/seat.service";

export default {
    name: "Seat",
    components: {},
    props: {
        delegateCode: String,
        index: Number,
        seatId: String,
        adminPermission: Boolean,
        occupied: Boolean,
    },
    data() {
        return {
            seatRow: 123,
            seatColumn: 123,
        };
    },
    async created() {
        await seatPositionService.positionToData(this.$props.index).then(data => {
            this.seatRow = data.row;
            this.seatColumn = data.column;
        });
    },
    sockets: {
        toggleSeatOccupied(payload) {
            if (this.delegateCode != "" && this.adminPermission == false) {
                if (this.seatId == payload.id) {
                    this.seatOccupied = !this.seatOccupied;
                }
            }
        },
    },
    computed: {
        position: function() {
            return {
                row: Math.ceil((this.index + 1) / 14),
                column: (this.index + 1) % 14 == 0 ? 14 : (this.index + 1) % 14,
            };
        },
        seatOccupied: {
            get() {
                return this.occupied;
            },
            set(occupied) {
                this.occupied = occupied;
            },
        },
    },
    methods: {
        reloadEvent() {
            this.$emit("reload");
        },
        async setOccupied() {
            if (this.delegateCode != "" && this.adminPermission) {
                this.seatOccupied = await !this.seatOccupied;
                seatApiService.updateSeatOccupied({
                    id: this.seatId,
                    occupied: this.seatOccupied,
                });

                this.$socket.emit("toggleSeatOccupied", {
                    id: this.seatId,
                    occupied: this.seatOccupied,
                });
            }
        },
    },
};
</script>

<style>
.occupied-seat {
    background-color: #f0932b;
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
.occupied-seat:hover {
    background-color: #ffc88a;
}
.empty-seat {
    background-color: #dadada;
    color: black;
    font-weight: bold;
    text-align: center;
    margin-left: 5px;
    margin-right: 5px;
    margin-bottom: 15px;
    padding: 10px;
    width: 70px;
    height: 50px;
}
.empty-seat:hover {
    background-color: #ffc88a;
}
.inside-seat {
    text-align: center;
}
</style>
