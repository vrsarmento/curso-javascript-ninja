(function(){
	'use strict';

	//Copiar arrays sem que seja por referência

	var arr = [1, 2, 3];
	var arr2 = arr;
	//por referencia
	console.log(arr, arr2, arr === arr2);

	arr2 = arr.slice();
	console.log(arr, arr2, arr === arr2);
	//Array.prototype.slice.call(this);


	// -------------------------------- //

	//Saber o tipo de dado real
	console.log(Object.prototype.toString.call(arr));
	console.log(Object.prototype.toString.call(function myFunc(){}));
	console.log(Object.prototype.toString.call({prop: 1, prop: 2}));

	// Object.prototype.toString.call() é o método mais confiável atualmente

	function is(obj){
		return Object.prototype.toString.call(obj);
	}

	function isArray(obj){
		return is(obj) === '[object Array]';
	}

	function isObject(obj){
		return is(obj) === '[object Object]';
	}

	function isFunction(obj){
		return is(obj) === '[object Function]';
	}

	function isNumber(obj){
		return is(obj) === '[object Number]';
	}

	console.log(isNumber(1));
	console.log(isArray([]));
	console.log(isFunction(function(){}));
	console.log(isObject({}));

})();