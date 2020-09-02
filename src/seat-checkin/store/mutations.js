export default {
    doLogin(state) {
        state.isLogin = true;
    },
    doLogout(state){
        state.isLogin = false;
    }
};
