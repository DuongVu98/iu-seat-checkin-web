<template>
    <div class="seat-box">
        <t-card :class="[occupied ? 'occupied-seat' : 'empty-seat']">
            <!-- <t-card variant="danger"> -->
            <div class="flex justify-between inside-seat">
                {{ delegateCode }}
            </div>
        </t-card>
    </div>
</template>

<script>
export default {
    name: "Seat",
    props: {
        delegateCode: String,
    },
    computed: {
        occupied: function() {
            if (this.delegateCode.length > 0) {
                return true;
            } else {
                return false;
            }
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
