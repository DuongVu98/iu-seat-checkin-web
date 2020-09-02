import Vue from "vue";
import Vuetify from "vuetify";
import colors from "vuetify/lib/util/colors";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

const opts = {
    customProperties: true,
    // theme: {
    //     themes: {
    //         light: {
    //             primary: colors.purple,
    //             secondary: colors.grey.darken1,
    //             accent: colors.shades.black,
    //             error: colors.red.accent3,
    //         },
    //         dark: {
    //             primary: colors.blue.lighten3,
    //         },
    //     },
    // },
};

export default new Vuetify(opts);
