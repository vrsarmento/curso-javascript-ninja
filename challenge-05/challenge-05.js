/*
Crie uma variável qualquer, que receba um array com alguns valores aleatórios
- ao menos 5 - (fica por sua conta os valores do array).
*/
var random = [ 'Victor', 'Rocha', 1983, true, [ 2, 25, 33, 101] ];

/*
Crie uma função que receba um array como parâmetro, e retorne esse array.
*/
function retornaArray(arr){
    return arr;
}

/*
Imprima o segundo índice do array retornado pela função criada acima.
*/
console.log( retornaArray(random)[1] );

/*
Crie uma função que receba dois parâmetros: o primeiro, um array de valores; e o
segundo, um número. A função deve retornar o valor de um índice do array que foi passado
no primeiro parâmetro. O índice usado para retornar o valor, deve ser o número passado no
segundo parâmetro.
*/
function doisParametros(arr, index){
    return arr[index];
}

/*
Declare uma variável que recebe um array com 5 valores, de tipos diferentes.
*/
var cinco = [ 
    'String', 
    1000, 
    true, 
    [ 1, 2, 3 ], 
    {
        prop1: 'Propriedade 1', 
        prop2: 'Propriedade 2', 
        prop3: 3
    } 
];

/*
Invoque a função criada acima, fazendo-a retornar todos os valores do último
array criado.
*/
console.log( doisParametros(cinco, 0) );
console.log( doisParametros(cinco, 1) );
console.log( doisParametros(cinco, 2) );
console.log( doisParametros(cinco, 3) );
console.log( doisParametros(cinco, 4) );

/*
Crie uma função chamada `book`, que recebe um parâmetro, que será o nome do
livro. Dentro dessa função, declare uma variável que recebe um objeto com as
seguintes características:
- esse objeto irá receber 3 propriedades, que serão nomes de livros;
- cada uma dessas propriedades será um novo objeto, que terá outras 3
propriedades:
    - `quantidadePaginas` - Number (quantidade de páginas)
    - `autor` - String
    - `editora` - String
- A função deve retornar o objeto referente ao livro passado por parâmetro.
- Se o parâmetro não for passado, a função deve retornar o objeto com todos
os livros.
*/
function book( bookName ){
    var bookList = {
        'Livro1': {
            quantidadePaginas: 500,
            autor: 'Fiodor Dostoievski',
            editora: 'Ática'
        },
        'Livro2': {
            quantidadePaginas: 766,
            autor: 'Neil Gaiman',
            editora: '3 Letras'
        },
        'Livro3': {
            quantidadePaginas: 230,
            autor: 'George R. R. Martin',
            editora: 'Globo'
        }
    }

    return !bookName ? bookList : bookList[ bookName ];
}

/*
Usando a função criada acima, imprima o objeto com todos os livros.
*/
console.log( book() );

/*
Ainda com a função acima, imprima a quantidade de páginas de um livro qualquer,
usando a frase:
"O livro [NOME_DO_LIVRO] tem [X] páginas!"
*/
console.log( "O livro Livro1 tem " + book("Livro1").quantidadePaginas + " páginas!" );

/*
Ainda com a função acima, imprima o nome do autor de um livro qualquer, usando
a frase:
"O autor do livro [NOME_DO_LIVRO] é [AUTOR]."
*/
console.log( "O autor do livro Livro2 é " + book("Livro2").autor + "." );

/*
Ainda com a função acima, imprima o nome da editora de um livro qualquer, usando
a frase:
"O livro [NOME_DO_LIVRO] foi publicado pela editora [NOME_DA_EDITORA]."
*/
console.log( "O livro Livro3 foi publicado pela editora " + book("Livro3").editora + "." );
