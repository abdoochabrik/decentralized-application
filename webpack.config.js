const path = require('path')
const webpack = require('webpack')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = {

  entry: [
    path.join(__dirname, 'src/js', 'index.js'),
    path.join(__dirname, 'src/css', 'index.css'),
  ], // Our frontend will be inside the src folder
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'build.js', // The final file will be created in dist/build.js
  },
  module: {
    rules: [
      {
        test: /\.css$/, // To load the css in react
        use: ['style-loader', 'css-loader'],
        include: /src/,
      },
      {
        test: /\.jsx?$/, // To load the js and jsx files
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/env', '@babel/preset-react'],
          
        },
      },
    ],
  },
  resolve: {
    fallback: {
      assert: require.resolve('assert'),
      crypto: require.resolve('crypto-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer'),
    },
  },
  plugins: [
    // Work around for Buffer is undefined:
    // https://github.com/webpack/changelog-v5/issues/10
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new NodePolyfillPlugin(),
  ],
}
