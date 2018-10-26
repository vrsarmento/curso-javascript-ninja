//Resolução do instrutor
(function(DOM){
	'use strict';

	function app(){
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

		return {
			getMessage: getMessage,
			clearCEP: clearCEP
		}

	}

	window.app = app;
	//window.app = app(); para acesso somente às funções do retorno
	app();

})(window.DOM);