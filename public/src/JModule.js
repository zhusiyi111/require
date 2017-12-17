	var J_Module = {};
	J_Module.module = {};


	J_Module.define = function(name,value){
		J_Module.module[name] = value();
	}

	J_Module.use = function(name){
		return new Promise((resolve,reject)=>{

			if(J_Module.module[name]){
				resolve(J_Module.module[name]);
			}else{
				J_Module.load(name).then(function(){
					resolve(J_Module.module[name])
				})
			}

		})	
	}

	J_Module.syncUse = function(name){
		if(J_Module.module[name]){
			return J_Module.module[name]
		}else{
			console.warn(name+'还没被加载')
			return;
		}	
	}

	J_Module.load = function(module){
		return new Promise((resolve,reject)=>{
			if(typeof module === 'string'){

				if(!J_Module.module[module]){
					let require = J_Module.getRequire(module);
					require = require
					.filter(function(item){
						return !J_Module.module[item];
					})
					.map(function(item){
						return item+'.js'
					})
					.join(',');
					getScript('http://localhost:3001/dist/??'+require).then(function(){
						resolve();
					})
				}else{
					resolve(J_Module.module[module]);
				}

				
			}else if(Array.isArray(module)){
				var path = 'http://localhost:3001/dist/??';
				var arr = module.map( (item)=>{
					if(!J_Module.module[item]){
						return item + '.js'
					}else{
						return '';
					}
				}).filter((v)=>{
					return v!=='';
				});
				if(!arr.length){
					resolve();
				}else{
					path += arr.join(',');
					getScript(path).then(()=>{
						resolve();
					})	
				}
				
			}
		})

		function getScript(path){
			return new Promise( (resolve,reject)=>{
				var script = document.createElement('script');
				script.src = path;
				script.onload = function(){
					resolve();
				}
				document.querySelector('head').appendChild(script);
			})
		}
		
	}

	J_Module.getRequire = function(module,result=[]){
		if(!result.includes(module)){
			J_Module.requireMap[module].forEach((item)=>{
				J_Module.getRequire(item,result);
			})
			result.push(module);
		}
		return result;
	}



	window.J_Module = J_Module;
