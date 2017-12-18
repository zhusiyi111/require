

J_Module.define('a',['b','c'],function(){

	var b = J_Module.require('b'),
		c = J_Module.require('c');
	

	c();

	function a(){

		b();

		console.log('我是a');
	}
	return a;
})



