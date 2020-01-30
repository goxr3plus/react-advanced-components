var path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve("build"),
    filename: "index.js",
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "react",
              ["env", { targets: { browsers: ["last 2 versions"] } }]
            ],
            plugins: [
              "transform-object-rest-spread",
              "transform-class-properties",
              "syntax-decorators",
              "transform-decorators-legacy"
            ]
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.(scss|css)$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader", options: { sourceMap: true } },
          { loader: "sass-loader", options: { sourceMap: true } }
        ]
      }
    ]
  },
  externals: {
    react: "commonjs react"
  }
};
