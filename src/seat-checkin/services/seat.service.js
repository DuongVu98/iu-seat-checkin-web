import axios from "axios";

const backendServer = process.env.VUE_APP_SERVER;

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
};

export default {
    getAllSeat() {
        return axios.get(`${backendServer}/viewer/all-seats`, headers);
    },
    addOccupiedSeat(seat) {
        return axios.post(`${backendServer}/admin/add-seat`, seat);
    },
    updateSeatCode(seatData) {
        return axios.post(`${backendServer}/admin/update-seat`, seatData);
    },
    deleteSeatCode(seatId) {
        return axios.get(`${backendServer}/admin/delete-seat/${seatId}`);
    },
    updateSeatOccupied(updateData) {
        return axios.post(`${backendServer}/admin/set-occupied`, updateData);
    },
};
