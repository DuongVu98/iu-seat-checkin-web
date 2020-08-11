const path = require("path");
// const { join } = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

const _root = path.resolve(__dirname, "..");

const isDev = process.env.NODE_ENV === "development";

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);

    return path.join.apply(path, [_root].concat(args));
}

module.exports = {
    mode: "development",
    entry: {
        main: path.resolve(__dirname, "src/main.js"),
    },
    resolve: {
        extensions: [".js", ".vue"],
        alias: {
            vue$: isDev
                ? "vue/dist/vue.runtime.js"
                : "vue/dist/vue.runtime.min.js",
            "@": root("src"),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"],
                },
            },
            {
                test: /.vue$/,
                loader: "vue-loader",
            },
            {
                test: /\.css$/,
                use: ["vue-style-loader", "css-loader"],
            },
            {
                test: /\.(scss)$/,
                use: [
                    {
                        loader: "style-loader", // inject CSS to page
                    },
                    {
                        loader: "css-loader", // translates CSS into CommonJS modules
                    },
                    {
                        loader: "sass-loader", // compiles Sass to CSS
                    },
                    {
                        loader: "postcss-loader", // Run postcss actions
                        options: {
                            plugins: [
                                function() {
                                    // postcss plugins, can be exported to postcss.config.js
                                    return require("autoprefixer");
                                },
                                function() {
                                    return require("tailwindcss");
                                },
                            ],
                        },
                    },
                ],
            },
        ],
    },
    plugins: [new VueLoaderPlugin()],
};
