
var path = require("path");
var glob = require('glob');
var webpack = require('webpack');
var Visualizer = require('webpack-visualizer-plugin');

var FileListPlugin = require('./FileListPlugin')

const entryObj = glob.sync('./src/*.js');

var entry = {};


entryObj.forEach((path,index)=>{
	let name = path.match(/\/([\w]+)\.js$/)[1];
	entry[name] = path;
})


module.exports = {
    entry:entry,
    output:{
    	library:'zhusiyi',
    	libraryTarget: 'var',
	    path:path.resolve(__dirname,"dist"),
	    filename:"[name].js",
	    chunkFilename: "[name].js",
	    publicPath:'http://localhost:3001/dist/'
	},
	module:{
		rules:[
			{
				test:/\.js$/,
				use:['JRequire']
			},
			{
				test:/\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	plugins: [
		new Visualizer({
			filename:'./index.html'
		}),
		new FileListPlugin()
	],
	devtool:'cheap-source-map'
}