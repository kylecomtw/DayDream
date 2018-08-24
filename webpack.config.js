const path = require('path');
module.exports = {
  mode: "development",
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8099
  }
}