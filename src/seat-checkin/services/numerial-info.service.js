import axios from "axios";

const backendServer = process.env.VUE_APP_SERVER;

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
};

export default {
    getNumerialInformation() {
        return axios.get(`${backendServer}/viewer/numerial-info`, headers);
    },
};
