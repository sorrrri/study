/** @format */

const path = require("path");
const toml = require("toml");
const yaml = require("yamljs");
const json5 = require("json5");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
  console.log("Goal: ", env.goal);
  console.log("Production: ", env.production);

  return {
    mode: "development",
    entry: {
      index: "./src/index.js",
      another: "./src/another-module.js",
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Caching",
      }),
    ],
    devtool: "inline-source-map",
    devServer: {
      static: "./dist",
    },
    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(__dirname, "dist"),
      assetModuleFilename: "assets/[hash]",
      clean: true,
      publicPath: "/",
    },
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/images/[hash][ext][query]",
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/fonts/[hash][ext][query]",
          },
        },
        {
          test: /\.(csv|tsv)$/i,
          use: ["csv-loader"],
        },
        {
          test: /\.xml$/i,
          use: ["xml-loader"],
        },
        {
          test: /\.toml$/i,
          type: "json",
          parser: {
            parse: toml.parse,
          },
        },
        {
          test: /\.yaml$/i,
          type: "json",
          parser: {
            parse: yaml.parse,
          },
        },
        {
          test: /\.json5$/i,
          type: "json",
          parser: {
            parse: json5.parse,
          },
        },
      ],
    },
  }
};
