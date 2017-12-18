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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ 2:
/***/ (function(module, exports) {


	/*moduleName:*/
	/*require:*/
	


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


/***/ })

/******/ });
//# sourceMappingURL=index.js.map