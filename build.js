const path = require('path');
const webpack=require('webpack');
const WebpackDevServer = require("webpack-dev-server");
const root = __dirname;
const foldName=process.argv[2];
let config = {
  // 入口文件
  entry: path.join(root,foldName,'/src/index.js'),
  // 出口文件
  output: {
    filename: 'bundle.js',
    path: path.join(root,foldName, '/dest/')
  },
  // loaders
  module: {
    rules: [
      {test: /\.jsx?$/, use: ['babel-loader'], exclude: /node_modules/}
    ]
  }
}

webpack(config,()=>{
  console.log("编译完成");
});