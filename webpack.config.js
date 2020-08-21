const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const _root = path.resolve(__dirname, ".");

const isDev = process.env.NODE_ENV === "development";

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);

    const newPath = path.join.apply(path, [_root].concat(args));
    console.log(`New Path --> ${newPath}`);
    return newPath;
}

module.exports = {
    mode: "development",
    entry: {
        main: path.resolve(__dirname, "src/main.js"),
    },
    output: {
        library: "myLib",
        libraryTarget: "umd",
        filename: "myLib.js",
        globalObject: "this",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/dist/",
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
                use: [
                    "vue-style-loader",
                    "css-loader",
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
            {
                test: /\.s(c|a)ss$/,
                use: [
                    {
                        loader: "vue-style-loader", // inject CSS to page
                    },
                    {
                        loader: "css-loader", // translates CSS into CommonJS modules
                    },
                    {
                        loader: "sass-loader", // compiles Sass to CSS
                        options: {
                            implementation: require("sass"),
                            sassOptions: {
                                fiber: require("fibers"),
                                indentedSyntax: true, // optional
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|ico)$/i,
                use: [
                    {
                        loader: "url-loader",
                    },
                    {
                        loader: "file-loader",
                    },
                ],
            },
        ],
    },
    plugins: [new VueLoaderPlugin()],
};
