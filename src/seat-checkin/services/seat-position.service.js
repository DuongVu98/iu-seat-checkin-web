export default {
    async dataToSeatView(seatsData, seatsView) {
        await seatsData.forEach(async seatData => {
            let position = seatData.row * 14 - (14 - seatData.column) - 1;
            seatsView[position].id = seatData.id;
            seatsView[position].delegateCode = seatData.delegateCode;
            seatsView[position].occupied = seatData.occupied;
        });

        return seatsView;
    },
    async asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    },
    async transformSeatsArray(seatsView, toSeatsViews, callback) {
        await this.asyncForEach(seatsView, async seat => {
            await this.positionToData(seat.index).then(async posData => {
                if (posData.column <= 7) {
                    toSeatsViews.leftSeats.push(seat);
                } else if (posData.column > 7) {
                    await toSeatsViews.rightSeats.push(seat);
                }
            });
        });
        await callback(toSeatsViews);
    },

    async dataToSeparatedViews(seatsData, separatedViews) {
        seatsData.forEach(async seatData => {
            let position = seatData.row * 14 - (14 - seatData.column) - 1;
            if (seatData.column <= 7) {
                separatedViews.leftSeats[position].id = seatData.id;
                separatedViews.leftSeats[position].delegateCode = seatData.delegateCode;
                separatedViews.leftSeats[position].index = position;
                separatedViews.leftSeats[position].occupied = seatData.occupied;
            } else if (seatData.column > 7) {
                separatedViews.rightSeats[position].id = seatData.id;
                separatedViews.rightSeats[position].delegateCode = seatData.delegateCode;
                separatedViews.rightSeats[position].index = position;
                separatedViews.rightSeats[position].occupied = seatData.occupied;
            }
        });
        return separatedViews;
    },
    //wrong approach
    async dataToSeatViewTest(seatsData, seatsView) {
        await seatsData.forEach(async seatData => {
            if (seatData.column <= 7) {
                let position = (await seatData.row) * 14 - (14 - seatData.column) - 1;

                //test
                console.log(position);
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
        return await {
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
};
