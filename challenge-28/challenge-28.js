(function(window, document){
  'use strict';

  /*
  No HTML:
  - Crie um formulário com um input de texto que receberá um CEP e um botão
  de submit;
  - Crie uma estrutura HTML para receber informações de endereço:
  "Logradouro, Bairro, Estado, Cidade e CEP." Essas informações serão
  preenchidas com os dados da requisição feita no JS.
  - Crie uma área que receberá mensagens com o status da requisição:
  "Carregando, sucesso ou erro."

  No JS:
  - O CEP pode ser entrado pelo usuário com qualquer tipo de caractere, mas
  deve ser limpo e enviado somente os números para a requisição abaixo;
  - Ao submeter esse formulário, deve ser feito um request Ajax para a URL:
  "http://apps.widenet.com.br/busca-cep/api-de-consulta"
  - Essa requisição trará dados de um CEP em JSON. Preencha campos na tela
  com os dados recebidos.
  - Enquanto os dados são buscados, na área de mensagens de status, deve mostrar
  a mensagem: "Buscando informações para o CEP [CEP]..."
  - Se não houver dados para o CEP entrado, mostrar a mensagem:
  "Não encontramos o endereço para o CEP [CEP]."
  - Se houver endereço para o CEP digitado, mostre a mensagem:
  "Endereço referente ao CEP [CEP]:"
  - Utilize a lib DOM criada anteriormente para facilitar a manipulação e
  adicionar as informações em tela.
  */

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

  // ------------------------------------------------------------ //

  var $cep = new DOM('[data-js="cep"]');
  var $address = new DOM('[data-js="address"]');
  var $city = new DOM('[data-js="city"]');
  var $state = new DOM('[data-js="state"]');
  var $district = new DOM('[data-js="district"]');
  var $submit = new DOM('[data-js="submit"]');
  var $status = new DOM('[data-js="status"]');
  var apiURL = 'http://apps.widenet.com.br/busca-cep/api/cep.json?code=';
  var cepValue = '';
  var response = '';

  $submit.on('click', handleSubmit);

  function handleSubmit(e){
    e.preventDefault();
    cepValue = formatCEP( cleanCEP( $cep.get()[0].value ) );
    executeAjax();
  }

  function executeAjax(){
    var ajax = new XMLHttpRequest();
    try{
      ajax.open('GET', apiURL + cepValue);
      ajax.send();
      ajax.addEventListener('readystatechange', function(){
        if(ajax.readyState === 3){
          $status.get()[0].innerHTML = 'Buscando informações para o CEP ' + cepValue + '...';
        }
        if(ajax.readyState === 4){
          response = JSON.parse(ajax.responseText);
          if(response.status === 0){
            $status.get()[0].innerHTML = 'Não encontramos o endereço para o CEP ' + cepValue + '.';
            return;
          }
          $address.get()[0].value = response.address;
          $district.get()[0].value = response.district;
          $city.get()[0].value = response.city;
          $state.get()[0].value = response.state;
          $status.get()[0].innerHTML = 'Endereço referente ao CEP ' + cepValue + ':';
        }
      }, false);
    }catch(e){
      $status.get()[0].innerHTML = 'Conexão falhou.';
    }
    
  }

  function isAjaxRequisitionOK(){
    return ajax.readyState === 4 && ajax.status === 200;
  }

  function cleanCEP(cep){
    return cep.replace(/\D/g, '');
  }

  function formatCEP(cep){
    return cep.replace(/(\d{2})(\d{3})(\d{3})/g, '$1$2-$3');
  }

  






})(window, document);