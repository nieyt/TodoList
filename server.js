const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
let port = 8080;

let config = require('./webpack.config.dev');
config.entry.unshift("webpack-dev-server/client?http://localhost:8080/");

const compiler = webpack(config);

const server = new WebpackDevServer(compiler, config.devServer);

server.listen(port, function() {
	console.log(`正常打开${port}端口`)
});
