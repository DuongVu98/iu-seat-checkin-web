const constUsername = "admin";
const constPassword = "dhquocte";
export default {
    authenticate(username, password) {
        return username === constUsername && password === constPassword ? true : false;
    },
};
