<template>
    <div class="wrapper">
        <div class="login-page-background"></div>
        <div class="login-main-component">
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
                            <v-card>
                                <v-toolbar color="primary" dark flat>
                                    <v-toolbar-title>Admin login</v-toolbar-title>
                                </v-toolbar>
                                <v-card-text>
                                    <div class="main-form">
                                        <v-form>
                                            <v-text-field
                                                label="Username"
                                                class="input-group--focused"
                                                prepend-icon="mdi-account"
                                                outlined
                                                rounded
                                                required
                                            ></v-text-field>
                                            <v-text-field
                                                :append-icon="hidePassword ? 'mdi-eye' : 'mdi-eye-off'"
                                                :type="hidePassword ? 'text' : 'password'"
                                                label="Password"
                                                class="input-group--focused"
                                                prepend-icon="mdi-lock"
                                                outlined
                                                rounded
                                                required
                                                @click:append="hidePassword = !hidePassword"
                                            ></v-text-field>
                                            <v-btn :disabled="!valid" color="success" class="mr-4">Login</v-btn>
                                        </v-form>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </div>
    </div>
</template>
<script>
export default {
    name: "Login",
    data() {
        return {
            username: "",
            password: "",
            hidePassword: true,
            valid: true,
        };
    },
};
</script>
<style>
.wrapper {
    height: 100%;
}
.login-page-background {
    background-image: url("https://lh3.googleusercontent.com/proxy/tTk3Z2hVPB2Zzn-qykhqwnY4HUrj12DbJBq_xwWpAjh2HTnazHjl5H2BhQ9ZbHibee8NAqWT-vEP4uRpd44Wz02PxlZkLdckL-dhAovEYroBKFHYlkL--JCnIm2jFJCQtscv4wia-pOX1e6RUmzEm9P0QWk");
    filter: blur(8px);
    -webkit-filter: blur(8px);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
}
.login-main-component {
    background-image: linear-gradient(to bottom right, #153f6f, #0ab0da);
    border: 1px solid #bfbfbf;
    border-radius: 50px;
    box-shadow: 5px 5px 3px #636363;
    height: 80%;
    width: 75%;

    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.both-sides {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
.logo-block {
    width: 555px;
}
.login-block {
    width: 555px;
}
</style>
