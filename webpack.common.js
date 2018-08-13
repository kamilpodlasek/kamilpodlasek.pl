const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader", options: { hmr: true } },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/preset-env"] }
        }
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, "dist")
  },
  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })]
};
