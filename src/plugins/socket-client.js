import Vue from "vue";
import VueSocketIO from "vue-socket.io";

const wsServerLocation = process.env.VUE_APP_WS_SERVER;

Vue.use(
    new VueSocketIO({
        debug: true,
        connection: `${wsServerLocation}`,
        options: { useConnectionNamespace: true },
    })
);
