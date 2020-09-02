<template>
    <div class="wrapper">
        <div class="login-page-background"></div>
        <div class="login-main-component">
            <v-card shaped class="rounded-xl page-card" elevation="24">
                <div class="inside-card">
                    <v-row style="height: 100%;">
                        <v-col cols="6">
                            <div class="both-sides">
                                <div class="logo-block">
                                    <img src="@/assets/images/single-logo.png" alt="" />
                                </div>
                            </div>
                        </v-col>
                        <v-col cols="6">
                            <div class="both-sides">
                                <div class="login-block">
                                    <v-card class="rounded-lg" :loading="cardLoading">
                                        <v-toolbar color="primary" dark flat>
                                            <v-toolbar-title>Admin login</v-toolbar-title>
                                        </v-toolbar>
                                        <v-card-text>
                                            <div class="main-form">
                                                <v-form>
                                                    <v-text-field
                                                        label="Username"
                                                        class="input-group--focused"
                                                        v-model="username"
                                                        prepend-icon="mdi-account"
                                                        :error="inValidInput"
                                                        :rules="[rules.required]"
                                                        @focus="resetInputValidState()"
                                                        outlined
                                                        rounded
                                                        required
                                                    ></v-text-field>
                                                    <v-text-field
                                                        :append-icon="hidePassword ? 'mdi-eye' : 'mdi-eye-off'"
                                                        :type="hidePassword ? 'password' : 'text'"
                                                        label="Password"
                                                        class="input-group--focused"
                                                        v-model="password"
                                                        prepend-icon="mdi-lock"
                                                        :error="inValidInput"
                                                        :rules="[rules.required]"
                                                        @focus="resetInputValidState()"
                                                        outlined
                                                        rounded
                                                        required
                                                        @click:append="hidePassword = !hidePassword"
                                                    ></v-text-field>
                                                    <v-btn
                                                        :disabled="!valid"
                                                        color="success"
                                                        class="mr-4"
                                                        :loading="cardLoading"
                                                        @click="doLogin()"
                                                        >Login</v-btn
                                                    >
                                                </v-form>
                                            </div>
                                        </v-card-text>
                                    </v-card>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </div>
            </v-card>
        </div>
        <v-snackbar
            v-model="alert"
            :timeout="3000"
            color="deep-orange accent-4"
            absolute
            text
            rounded="pill"
            elevation="24"
        >
            {{ alertMessge }}
            <template v-slot:action="{ attrs }">
                <v-btn icon color="deep-orange accent-4" text v-bind="attrs" @click="alert = false">
                    <v-icon>fas fa-times-circle</v-icon>
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>
<script>
import authService from "../services/auth.service";
export default {
    name: "Login",
    data() {
        return {
            username: "",
            password: "",
            hidePassword: true,
            valid: true,
            inValidInput: false,
            rules: {
                required: value => !!value || "Required.",
            },
            alert: false,
            alertMessge: "Invalid username or password",
            cardLoading: false,
        };
    },
    async created() {
        let isLogin = await this.$store.getters.isLogin;
        if (isLogin == true) {
            this.$router.push("/admin");
        }
    },
    methods: {
        async doLogin() {
            this.cardLoading = true;
            let authentication = await authService.authenticate(this.username, this.password)
            if (authentication == true) {
                console.log("correct");
                this.$store.dispatch("doLogin");
                this.$router.push("/admin");
            } else {
                this.inValidInput = true;
                this.alert = true;
            }
            this.cardLoading = false;
        },
        resetInputValidState() {
            this.inValidInput = false;
        },
    },
};
</script>
<style>
.wrapper {
    height: 100%;
}
.login-page-background {
    background: url("../../assets/images/login-background.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    /* filter: blur(8px);
    -webkit-filter: blur(8px); */
}
.login-main-component {
    height: 70%;
    width: 70%;

    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.page-card {
    height: 100%;
}
.inside-card {
    background: url("../../assets/images/login-foreground.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
}
.both-sides {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
.logo-block {
    width: 400px;
}
.login-block {
    width: 440px;
}
.invalid-input-alert {
    position: absolute;
    /* top: 50%;
    left: 50%; */
    /* transform: translate(-50%, -50%); */
}
</style>
