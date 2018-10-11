(function(win, doc){
  'use strict';

  /*
  Vamos desenvolver mais um projeto. A ideia é fazer uma mini-calculadora.
  As regras são:

  - Deve ter somente 1 input, mas não deve ser possível entrar dados nesse input
  diretamente;
  - O input deve iniciar com valor zero;
  - Deve haver 10 botões para os números de 0 a 9. Cada botão deve ser um número;
  - Deve haver 4 botões para as operações principais: soma (+), subtração(-),
  multiplicação(x) e divisão(÷);
  - Deve haver um botão de "igual" (=) que irá calcular os valores e um botão "CE"
  que irá limpar o input, deixando-o com valor 0;

  - A cada número pressionado, o input deve atualizar concatenando cada valor
  digitado, como em uma calculadora real;
  - Ao pressionar um botão com uma das 4 operações, deve aparecer o símbolo da
  operação no input. Se o último caractere no input já for um símbolo de alguma
  operação, esse caractere deve ser substituído pelo último pressionado.
  Exemplo:
  - Se o input tem os valores: "1+2+", e for pressionado o botão de
  multiplicação (x), então no input deve aparecer "1+2x".
  - Ao pressionar o botão de igual, o resultado do cálculo deve ser mostrado no
  input;
  - Ao pressionar o botão "CE", o input deve ficar zerado.
  */

  var $input = doc.querySelector('[data-js="result"]');
  var $buttonsNumbers = doc.querySelectorAll('[data-js="button-number"]'); 
  var $buttonsOperations = doc.querySelectorAll('[data-js="button-operation"]');
  var $buttonEqual = doc.querySelector('[data-js="button-equal"]'); 
  var $buttonCE = doc.querySelector('[data-js="button-ce"]');
  var $originalOperation = doc.querySelector('span');
  var action = -1;
  var comma = false;
  var result;

  Array.prototype.forEach.call($buttonsNumbers, function( button ) {
    button.addEventListener('click', handleClickNumber, false);
  });
  Array.prototype.forEach.call($buttonsOperations, function( button ){
    button.addEventListener('click', handleClickOperation, false);
  });
  $buttonCE.addEventListener('click', handleClickCE, false);
  $buttonEqual.addEventListener('click', handleClickEqual, false);

  function handleClickNumber(){
    //Se for a primeira ação, retira 0 (valor inicial) do input
    if( action === -1 )
        $input.value = '';

    addValueToInput( this );
  }

  function handleClickOperation(){
    comma = false;
    addValueToInput( this );
  }

  function handleClickCE(){
    $input.value = 0;
    action = -1;
    result = '';
    comma = false;
    clearOriginalOperation();
  }

  function handleClickEqual(){
    comma = false;
    addValueToInput( this );
    $originalOperation.innerHTML = $input.value;
    $input.classList.add('result');

    result = $input.value;

    while( result.match(/\d+[*/]\d+/) ){

      var priorityOperation = result.match(/[\d.]+[\*\/][\d.]+/);
      result = result.replace(/[\d.]+[\*\/][\d.]+/, 
        resolveOperation( priorityOperation.join() )
      );

    }

    if( result.match(/[+-]/) )
      result = resolveOperation( result );

    $input.value = removeLastItemIfItIsAnOperator( result ) ;

  }

  function resolveOperation( operation ){
    operation = operation.match(/[\d.]+[+\*\/-]?/g);
    console.log(operation);
    return operation.reduce(function( accumulated, actual ) {
      var firstValue = +accumulated.slice(0, -1);
      var operator = accumulated.split('').pop();
      var lastValue = +removeLastItemIfItIsAnOperator(actual);
      var lastOperator = isLastItemAnOperator(actual) ? actual.split('').pop() : '';
      switch(operator){
        case '+':
          return (firstValue + lastValue) + lastOperator;
        case '-':
          return (firstValue - lastValue) + lastOperator;
        case '*':
          return (firstValue * lastValue) + lastOperator;
        case '/':
          return (firstValue / lastValue) + lastOperator;
      }
    });
  }

  function addValueToInput( button ) {
    if( isNaN( button.value ) ){
      $input.value = removeLastItemIfItIsAnOperator( $input.value );
    }
    if( button.value === '.' ){
      if( comma === true )
        return;
      comma = true;
    }

    clearOriginalOperation();
    action = button.value;
    $input.value = $input.value + button.value;     
  }

  function removeLastItemIfItIsAnOperator( number ){
		if(isLastItemAnOperator(number)){
			return number.slice(0, -1);
		}
		return number;
	}

	function isLastItemAnOperator( number ){
		var operations = ['+', '-', '*', '/', '='];
		var lastItem = number.split('').pop();
		return operations.some(function( operator ){
			return operator === lastItem;
		});
  }

  function clearOriginalOperation(){
    $originalOperation.innerHTML = '';
    $input.classList.remove('result');
  }

})(window, document);
