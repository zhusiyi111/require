

J_Module.define('a',function(){

	var b = J_Module.syncUse('b');
	var c = J_Module.syncUse('c');

	c();
	

	function a(){

		b();

		console.log('我是a');
	}


	return a;


})



