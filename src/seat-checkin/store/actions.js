export default {
    doLogin({ commit }) {
        commit("doLogin");
    },
    doLogout({ commit }) {
        commit("doLogout");
    },
    setUserAccount({ commit }, userAccount) {
        commit("setUserAccount", userAccount);
    },
};
