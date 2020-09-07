import axios from "axios";
import store from "../../store/index";

const backendServer = process.env.VUE_APP_SERVER;

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    user: store.getters.userAccount.id,
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
