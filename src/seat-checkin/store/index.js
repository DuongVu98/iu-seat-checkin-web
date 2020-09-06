import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

export default {
    state: {
        isLogin: false,
        userAccount: Object,
    },
    mutations,
    actions,
    getters,
};
