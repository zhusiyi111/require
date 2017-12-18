

J_Module.define('b',['c'],function(){

	
	function b(){

		J_Module.require('c');

		console.log('我是b');
	}

	return b;
})



