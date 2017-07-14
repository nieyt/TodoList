const path = require('path')
const root = __dirname
// const foldName=process.argv[1];
console.log(root)
module.exports = {
  // 入口文件
  entry: path.join(root,'react', '/src/index.js'),
  // entry: './react/src/index.js',
  // 出口文件
  output: {
    filename: 'bundle.js',
    path: path.join(root, 'dist')
  },
  // loaders
  module: {
    rules: [
      {test: /\.jsx?$/, use: ['babel-loader'], exclude: /node_modules/}
    ]
  }
}