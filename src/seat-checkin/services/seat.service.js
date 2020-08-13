import axios from "axios";

const backendServer = "http://localhost:3000";

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
        // console.log(`check row from service --> ${seat.row}`);
        return axios.post(`${backendServer}/admin/add-seat`, seat);
    },
    updateSeatCode(seatData) {
        return axios.post(`${backendServer}/admin/update-seat`, seatData);
    },
    deleteSeatCode(seatId) {
        return axios.get(`${backendServer}/admin/delete-seat/${seatId}`);
    },
};
