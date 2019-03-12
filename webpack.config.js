const path = require("path");
const webpack = require("webpack");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const environment = process.env.NODE_ENV;

let config = {
  mode: environment,
  entry: ["@babel/polyfill", "./index.js"],
  output: {
    publicPath: "/",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.sass$/,
        use: [
          "css-hot-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.svg/,
        use: {
          loader: "svg-url-loader",
          options: {}
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: "file-loader?name=./assets/fonts/webfonts/[name].[ext]"
          }
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "main.css",
      chunkFilename: "[id].css"
    })
  ]
};

if (environment === "development") {
  config.entry = [
    "webpack-hot-middleware/client?localhost:3000",
    "@babel/polyfill",
    "./index.js"
  ];

  config.output.publicPath = "/dist/";

  config.plugins.push(new webpack.NamedModulesPlugin());

  config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());

  config.plugins.push(new webpack.HotModuleReplacementPlugin());

  config.plugins.push(new webpack.NoEmitOnErrorsPlugin());

  config.watch = true;
} else if (environment === "production") {
  config.plugins.push(
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/,
      cssProcessorOptions: { discardComments: { removeAll: true } }
    })
  );
  config.plugins.push(
    new CompressionPlugin({
      test: /\.(html|css)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  );

  config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
