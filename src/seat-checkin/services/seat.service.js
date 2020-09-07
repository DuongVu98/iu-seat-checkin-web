import axios from "axios";

const backendServer = process.env.VUE_APP_SERVER;

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    user: JSON.parse(localStorage.getItem("vuex")).seatCheckinState.userAccount.id,
};

const requestInstance = axios.create({
    headers: {
        get: headers,
        post: headers,
    },
});

export default {
    getAllSeat() {
        return requestInstance.get(`${backendServer}/viewer/all-seats`);
    },
    addOccupiedSeat(seat) {
        return requestInstance.post(`${backendServer}/admin/add-seat`, seat);
    },
    updateSeatCode(seatData) {
        return requestInstance.post(`${backendServer}/admin/update-seat`, seatData);
    },
    deleteSeatCode(seatId) {
        return requestInstance.get(`${backendServer}/admin/delete-seat/${seatId}`);
    },
    updateSeatOccupied(updateData) {
        return requestInstance.post(`${backendServer}/admin/set-occupied`, updateData);
    },
};
