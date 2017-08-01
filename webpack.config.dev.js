const path = require('path')
const root = __dirname
const HtmlWebpackPlugin = require('html-webpack-plugin')
const folderName=process.argv[2]

let SRC_PATH = path.resolve(root,folderName,'./src/index.js');
let BUILD_PATH = path.resolve(root,folderName, 'dest');

module.exports = {
  entry: [SRC_PATH]
  ,output: {
    filename: 'index.js'
    ,path: BUILD_PATH
    ,publicPath: '/'
  }
  ,module: {
    loaders: [
      {test: /\.jsx?$/, use: ['babel-loader'], exclude: /node_modules/}
    ]
  }
  ,plugins: [
    new HtmlWebpackPlugin({
      title: `${folderName} demo`
      ,template: path.resolve(root,folderName, 'template.html')
    })
  ]
  ,devServer:{
    inline: true
  }
}
