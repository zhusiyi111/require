/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:3001/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

var require;
	/*moduleName:*/
	/*require:*/
		var J_Module = {};
	J_Module.module = {};


	J_Module.define = function(name,require,value){
		J_Module.module[name] = value();
	}

	J_Module.includes = function(name){
		if(J_Module.module[name]){
			return true;
		}else{
			return false;
		}
	}

	J_Module.require = function(name){
		var module = J_Module.module[name];
		if(module){
			return module;
		}else{
			console.warn(name+'还未加载')
			return;
		}
		 
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


/***/ })

/******/ });
//# sourceMappingURL=JModule.js.map