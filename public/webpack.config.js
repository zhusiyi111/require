
var path = require("path");
var glob = require('glob');
var webpack = require('webpack');

var FileListPlugin = require('./FileListPlugin')

const entryObj = glob.sync('./src/*.js');
const moduleObj = glob.sync('./src/chunk/*.js');

var entry = {};


entryObj.forEach((path,index)=>{
	let name = path.match(/\/([\w]+)\.js$/)[1];
	entry[name] = path;
})
moduleObj.forEach((path,index)=>{
	let name = path.match(/\/([\w]+)\.js$/)[1];
	entry[name] = path;
})


module.exports = {
    entry:entry,
    output:{
    	// library:'zhusiyi',
    	// libraryTarget: 'commonjs',
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
		new FileListPlugin()
	],
	devtool:'cheap-source-map'
}