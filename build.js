const path = require('path')
const root = __dirname
const HtmlWebpackPlugin = require('html-webpack-plugin')
const folderName=process.argv[2]
const webpack = require('webpack')

let SRC_PATH = path.resolve(root,folderName,'./src/index.js');
let BUILD_PATH = path.resolve(root,folderName, 'dest');

let config = {
  entry: SRC_PATH
  ,output: {
    filename: 'index.js'
    ,path: BUILD_PATH
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
}

webpack(config).run((err,stats)=>{
  if(err) {
    console.log(err,stats);
    return;
  }
  console.log('编译完成')
});
