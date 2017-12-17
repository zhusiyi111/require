

J_Module.define('b',function(){

	J_Module.syncUse('c');

	function b(){
		console.log('我是b');
	}
	
	return b;

})



