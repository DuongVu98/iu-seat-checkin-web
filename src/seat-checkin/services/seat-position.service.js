export default {
    async dataToSeatView(seatsData, seatsView) {
        await seatsData.forEach(async seatData => {
            let position = (await seatData.row) * 14 - (14 - seatData.column) - 1;
            seatsView[position].id = seatData.id;
            seatsView[position].delegateCode = seatData.delegateCode;
            seatsView[position].index = position;
            seatsView[position].occupied = seatData.occupied;
        });

        return seatsView;
    },
    async dataToSeatViewTest(seatsData, seatsView) {
        await seatsData.forEach(async seatData => {
            if (seatData.column <= 7) {
                let position = (await seatData.row) * 14 - (14 - seatData.column) - 1;
                seatsView.leftSeats[position].id = seatData.id;
                seatsView.leftSeats[position].delegateCode = seatData.delegateCode;
                seatsView.leftSeats[position].index = position;
                seatsView.leftSeats[position].occupied = seatData.occupied;
            } else if (seatData.column > 7) {
                let position = (await seatData.row) * 14 - (14 - seatData.column) - 1;
                seatsView.rightSeats[position].id = seatData.id;
                seatsView.rightSeats[position].delegateCode = seatData.delegateCode;
                seatsView.rightSeats[position].index = position;
                seatsView.rightSeats[position].occupied = seatData.occupied;
            }
        });

        return seatsView;
    },
    async dataToPosition(seatData) {
        return seatData.row * 14 - (14 - seatData.column) - 1;
    },
    async positionToData(index) {
        return {
            row: Math.ceil((index + 1) / 14),
            column: (index + 1) % 14 == 0 ? 14 : (index + 1) % 14,
        };
    },
    async seatViewToData(seatViewPosition) {
        if (seatViewPosition) {
            let column = seatViewPosition % 14;
            let row = Math.ceil(seatViewPosition / 14);

            return {
                row,
                column,
            };
        }
    },
    async separateSeat(seatsView) {
        const leftSeats = [];
        const rightSeats = [];
        await seatsView.forEach(async seatView => {
            console.log(seatView.index);
            let column = (seatView.index + 1) % 14 == 0 ? 14 : (seatView.index + 1) % 14;
            if (column <= 7) {
                console.log(`${column} - left`);
                leftSeats.push(seatView);
            } else if (column > 7) {
                console.log(`${column} - right`);
                rightSeats.push(seatView);
            }
        });

        return {
            leftSeats: leftSeats,
            rightSeats: rightSeats,
        };
    },
};
