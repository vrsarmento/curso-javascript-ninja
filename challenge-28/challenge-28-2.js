//Resolução do instrutor
(function(window, document){
	'use strict';

	function DOM(selector){
    this.element = document.querySelectorAll(selector);
  }

  DOM.prototype.on = function on(event, callback){
    Array.prototype.forEach.call(this.element, function(element){
      element.addEventListener(event, callback, false);
    });
  };

  DOM.prototype.off = function off(event, callback){
    Array.prototype.forEach.call(this.element, function(element){
      element.removeEventListener(event, callback);
    });
  };

  DOM.prototype.get = function get(){
    return this.element;
  };

  DOM.prototype.forEach = function forEach(){
    return Array.prototype.forEach.apply(this.element, arguments);
  };

  DOM.prototype.map = function map(){
    return Array.prototype.map.apply(this.element, arguments);
  };

  DOM.prototype.filter = function filter(){
    return Array.prototype.filter.apply(this.element, arguments);
  };

  DOM.prototype.reduce = function reduce(){
    return Array.prototype.reduce.apply(this.element, arguments);
  };

  DOM.prototype.reduceRight = function reduceRight(){
    return Array.prototype.reduceRight.apply(this.element, arguments);
  };

  DOM.prototype.every = function every(){
    return Array.prototype.every.apply(this.element, arguments);
  };

  DOM.prototype.some = function some(){
    return Array.prototype.some.apply(this.element, arguments);
  };

  DOM.prototype.is = function is(obj){
    return Object.prototype.toString.call(obj);
  };

  DOM.prototype.isArray = function isArray(obj){
    return this.is(obj) === '[object Array]';
  };

  DOM.prototype.isObject = function isObject(obj){
    return this.is(obj) === '[object Object]';
  };

  DOM.prototype.isFunction = function isFunction(obj){
    return this.is(obj) === '[object Function]';
  };

  DOM.prototype.isNumber = function isNumber(obj){
    return this.is(obj) === '[object Number]';
  };

  DOM.prototype.isString = function isString(obj){
    return this.is(obj) === '[object String]';
  };

  DOM.prototype.isBoolean = function isBoolean(obj){
		return this.is(obj) === '[object Boolean]';
  };
	
  DOM.prototype.isNull = function isNull(obj){
		return this.is(obj) === '[object Null]' 
		|| this.is(obj) === '[object Undefined]';
	};
	
	// ------------------------------------------------ //

	var apiURL = 'http://apps.widenet.com.br/busca-cep/api/cep.json?code=';
	var $form = new DOM('[data-js="form"]');
	var $inputCEP = new DOM('[data-js="cep"]');
	var $status = new DOM('[data-js="status"]');
	var $address = new DOM('[data-js="address"]');
	var $district = new DOM('[data-js="district"]');
	var $city = new DOM('[data-js="city"]');
	var $state = new DOM('[data-js="state"]');
	var ajax = new XMLHttpRequest();
	var cleanCEP;

	$form.on('submit', handleSubmitForm);

	function handleSubmitForm(event){
		event.preventDefault();
		cleanCEP = clearCEP($inputCEP.get()[0].value);
		ajax.open('GET', getURL());
		ajax.send();
		getMessage('loading');
		ajax.addEventListener('readystatechange', handleReadyStateChange);
	}

	function handleReadyStateChange(){
		if( isRequestOk() ){
			getMessage('ok');
			fillFormFields();
		}
	}

	function getURL(){
		return apiURL + cleanCEP;
	}

	function clearCEP(cep){
		return cep.replace(/\D/g, '').replace(/(\d{5})(\d{3})/g, '$1-$2');
	}

	function isRequestOk(){
		return ajax.readyState === 4 && ajax.status === 200;
	}

	function parseData(){
		var result;
		try{
			result = JSON.parse(ajax.responseText);
		}catch(e){
			result = null;
		}
		return result;
	}

	function fillFormFields(){
		var data = parseData();
		if(data.status === 0){
			getMessage('error');
			data = clearData();
		}
		
		$address.get()[0].value = data.address;
		$district.get()[0].value = data.district;
		$city.get()[0].value = data.city;
		$state.get()[0].value = data.state;
	}

	function clearData(){
		return {
			address: '',
			district: '',
			city: '',
			state: ''
		}
	}

	function getMessage(type){
		var messages = {
			loading: 'Buscando informações para o CEP [CEP]...',
			ok: 'Endereço referente ao CEP [CEP]:',
			error: 'Não encontramos o endereço para o CEP [CEP].'
		};
		$status.get()[0].textContent = messages[type].replace('[CEP]', cleanCEP);
	}



})(window, document);