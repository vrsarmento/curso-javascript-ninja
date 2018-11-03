(function(DOM) {
  'use strict';

  /*
  Vamos estruturar um pequeno app utilizando módulos.
  Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
  A primeira etapa vai ser o cadastro de veículos, que deverá funcionar da
  seguinte forma:
  - No início do arquivo, deverá ter as informações da sua empresa - nome e
  telefone (já vamos ver como isso vai ser feito)
  - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
  um formulário para cadastro do carro, com os seguintes campos:
    - Imagem do carro (deverá aceitar uma URL)
    - Marca / Modelo
    - Ano
    - Placa
    - Cor
    - e um botão "Cadastrar"

  Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
  carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
  aparecer no final da tabela.

  Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
  empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
  Dê um nome para a empresa e um telefone fictício, preechendo essas informações
  no arquivo company.json que já está criado.

  Essas informações devem ser adicionadas no HTML via Ajax.

  Parte técnica:
  Separe o nosso módulo de DOM criado nas últimas aulas em
  um arquivo DOM.js.

  E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
  que será nomeado de "app".
  */

  function app(){

    var $company_name = new DOM('[data-js="company_name"]');
    var $company_phone = new DOM('[data-js="company_phone"]');
    var $alert = new DOM('[data-js="alert"]');

    var $car_image = DOM('[data-js="car_image"]');
    var $car_model = DOM('[data-js="car_model"');
    var $car_year = DOM('[data-js="car_year');
    var $car_license = DOM('[data-js="car_license');
    var $car_color = DOM('[data-js="car_color');

    var car = {
      image : '',
      model : '',
      year : '',
      license : '',
      color: '',
    };
    var cars_list = [];
    
    function initEvents(){
      DOM('[data-js="form"]').on('submit', handleFormSubmit);
    }

    function getCompanyInfo(){
      var ajax = new XMLHttpRequest();
      ajax.open('GET', 'company.json');
      ajax.send();
      ajax.addEventListener('readystatechange', handleReadyStateChange);
    }

    function handleReadyStateChange(){
      if(isRequestOk.call(this)){
        var data = parseData.call(this);
        $company_name.get().textContent = data.name;
        $company_phone.get().textContent = data.phone;
      }
    }

    function isRequestOk(){
			return this.readyState === 4 && this.status === 200;
    }
    
    function parseData(){
			var result;
			try{
				result = JSON.parse(this.responseText);
			}catch(e){
				result = null;
			}
			return result;
		}

    function handleFormSubmit(e){
      e.preventDefault();
      hideAlert();
      if(hasEmptyField()){
        getMessage('empty');
        return;
      }
      if(!isValidUrl(DOM('[data-js="car_image"]').get().value)){
        getMessage('invalid_url');
        DOM('[data-js="car_image"]').get().focus();
        return;
      }
      if(!areAllNumberFields()){
        getMessage('not_number');
        return;
      }
      fillCarObject();
      updateTableCars();
    }

    function fillCarObject(){
      car.image = $car_image.get().value;
      car.model = $car_model.get().value;
      car.year = $car_year.get().value;
      car.license = $car_license.get().value;
      car.color = $car_color.get().value;
      cars_list.push(car);
    }

    function updateTableCars(){
      var $table_body = DOM('[data-js="table_body"]');
      var $fragment = document.createDocumentFragment();
      var $tr;
      cars_list.forEach(function(item, index){
        $tr = document.createElement('tr');
        var $th = document.createElement('th');
        var $img = document.createElement('img');
        $tr.appendChild($th)
        $th.textContent = index+1;
        var keys = Object.keys(item);
        keys.map(function(prop){
          if(prop === 'image'){
            $img.setAttribute('src', car[prop]);
            var $td = document.createElement('td');
            $td.appendChild($img);
          }else{
            var $td = document.createElement('td');
            $td.textContent = car[prop];
          }
          $tr.appendChild($td);
        });
      });

      $table_body.get().appendChild($fragment.appendChild($tr));
    }

    function hasEmptyField(){
      var $required = DOM('[data-required="1"]');
      return $required.some(function(element){
        return element.value === '';
      });
    }

    function areAllNumberFields(){
      var $number = DOM('[data-number="1"]');
      return $number.every(function(element){
        return !isNaN(element.value);
      });
    }

    function isValidUrl(url){
      var urlRegex = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm);
      return urlRegex.test(url);
    }

    function getMessage(type){
			var messages = {
				empty: 'Preencha todos os campos obrigatórios.',
        invalid_url: 'Preencha o campo com uma URL válida.',
        not_number: 'Preencha os campos indicados somente com números.'
      };
      $alert.get().textContent = messages[type];
      showAlert();
    }
    
    function showAlert(){
      $alert.get().style.display = 'block'; 
    }

    function hideAlert(){
      $alert.get().style.display = 'none'; 
    }

    return {
      init: function init(){
        getCompanyInfo();
        initEvents();
      }
    }

  }

  app().init();

})(window.DOM);
