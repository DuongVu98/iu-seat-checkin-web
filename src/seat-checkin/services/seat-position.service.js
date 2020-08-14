export default {
    async dataToSeatView(seatsData, seatsView) {
        await seatsData.forEach(async seatData => {
            let position =
                (await seatData.row) * 14 - (14 - seatData.column) - 1;
            seatsView[position].id = seatData.id;
            seatsView[position].delegateCode = seatData.delegateCode;
            seatsView[position].index = position;
            seatsView[position].occupied = seatData.occupied;
        });

        return seatsView;
    },
    async dataToPosition(seatData) {
        return seatData.row * 14 - (14 - seatData.column) - 1;
    },
    async positionToData(index) {
        return {
            row: Math.ceil(index / 14),
            column: index % 14 == 0 ? 14 : index % 14,
        };
    },
    async seatViewToData(seatViewPosition) {
        let column = seatViewPosition % 14;
        let row = Math.ceil(seatViewPosition / 14);

        return {
            row,
            column,
        };
    },
};
