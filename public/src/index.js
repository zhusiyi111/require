


function getRequireList(){
	return new Promise((resolve,reject)=>{
		$.ajax({
			url:'http://localhost:3001/dist/requireList.html',
			success:resolve
		})
	})
}




$('.getRquire').click(function(){
	var arr = $('.moduleName').val();
	arr = arr.split(',');

	getRequireList().then(function(data){
		var map = JSON.parse(data);

		console.log(map);

		var result = getModules(arr,map);
		result = result.map((v)=>{
			return v+'.js'
		})
		result = result.join(',');
		var html = `
		<script src="http://localhost:3001/dist/??${result}"></script>
		`
		$('.require').val(html);
		
	})





})



function getModules(modules,requireMap){

	var result = [];
	modules.forEach((module)=>{
		getRequire(module,result,requireMap);
	})
	return result;
}


function getRequire(module,result,requireMap){
	if(!result.includes(module)){
		requireMap[module].forEach((item)=>{
			getRequire(item,result,requireMap);
		})
		result.push(module);
	}
}
