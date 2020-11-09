/**
 *
 * Instituto Federal de Educação, Ciência e Tecnologia - IFPE
 * Curso: Sistemas para Internet / Informática para Internet
 * Introdução à Programação Imperativa
 * Professor: Allan Lima - allan.lima@igarassu.ifpe.edu.br
 * Alunos: Weslley Félix, Jhonatas Barros, Ismael Jefté e Juliana Maria
 *
 */

//Inicia requisição no utilizando express e express-session
const express = require('express');
const session = require('express-session');

//Declara host e porta usada no nodemon
const host = 'localhost';
const porta = 3000;
const fs = require('fs');

// Declara variavel global app que sera usada nos get para as requisições
var app = express();
app.use('/css', express.static('../css')); // Usando express para retornar
app.use('/fonts', express.static('../fonts'));
app.use('/image', express.static('../image'));
app.use(session({ secret: 'XXassasas¨¨$', resave: false, saveUninitialized: true }));

// entre em localhost:3000 para escrever os dados na sessao
// Função que trata o get da raiz do servidor 
app.get('/', function (req, res, next) {
	fs.readFile("../index.html", "UTF-8", (err, date) => { //Carrega index.html para seleção dos botões 
		res.send(date);
	});
});
app.get('/sobre', function (req, res, next) {
	fs.readFile("../sobre.html", "UTF-8", (err, date) => { //Direciona sobre.html quando botao menu selecionado
		res.send(date);
	});
});
app.get('/ajuda', function (req, res, next) {
	fs.readFile("../ajuda.html", "UTF-8", (err, date) => { //Direciona ajuda.html quando botao menu selecionado
		res.send(date);
	});
});
app.get('/resetar', function (req, res, next) {
	req.session.destroy();
	res.redirect('/jogar');
});

// Função que trata o get de todos os pedidos que venham ser feitos 
// entre em localhost:3000/ajuda para ver os dados escritos na sessão
app.get('/get/*', function (req, res, next) {
	var arraySessionChanged = req.session.tabuleiro;
	var obj = req.url.split('/');  //divide um objeto do tipo string em um array de strings separados pelo 'separador 
	// especificado' e obedece a um limite --> str.split(separator, limit)
	var linha = obj[2];
	var coluna = obj[3];
	var linha2 = obj[4];
	var coluna2 = obj[5];

	// Desenha matriz [linha][coluna]
	temp = arraySessionChanged[linha][coluna];
	arraySessionChanged[linha][coluna] = arraySessionChanged[linha2][coluna2];
	arraySessionChanged[linha2][coluna2] = temp;
	temp = null;
	req.session.tabuleiro = arraySessionChanged;
	res.redirect('/jogar') // Response para o jogo 

});

// Executa /jogar a partir de /get/*
app.get('/jogar', function (req, res, next) {
	// se o array nao estiver na sessao, coloque-o na sessao
	if (req.session.tabuleiro == null) {

		// Função shuffle embaralha a array
		function shuffle(array) {
			var currentIndex = array.length, temporaryValue, randomIndex;

			// While there remain elements to shuffle...
			while (0 !== currentIndex) {

				// Arredonda e randomiza tabela
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;

				// And swap it with the current element.
				temporaryValue = array[currentIndex];
				array[currentIndex] = array[randomIndex];
				array[randomIndex] = temporaryValue;
			}

			return array;
		}

		// Posição das imagens tabuleiro (matriz 2x2)
		var array = new Array();
		var arrayVictory = new Array();

		for (let i = 0; i < 4; i++) {
			array[i] = new Array();
			arrayVictory[i] = new Array();

			for (let j = 0; j < 6; j++) {
				//Imprime imagem na array ja com as divisões + embaralhada 
				array[i][j] = { value: i + '-' + j, style: `background-position-x:${((j * 25 / (6 - 1)) * 100)}%;background-position-y:${((i * 25 / (4 - 1)) * 100)}%;` };
				arrayVictory[i][j] = `${i}-${j}`;
			}

		}

		//console.log("inicializou a sessao");

		for (let i = 0; i < 4; i++) {
			shuffle(array[i]);
		}

		req.session.tabuleiro = array;
		req.session.tabuleiroVictory = arrayVictory;
	}

	var arraySession = req.session.tabuleiro;
	var arraySessionVictory = req.session.tabuleiroVictory;
	var returnTable = "";
	cont = 0;

	for (var i = 0; i < arraySession.length; i++) {
		returnTable += "<tr>"
		for (var j = 0; j < arraySession[i].length; j++) {
			returnTable += `<td onclick="changePiece(${i}, ${j})" style="${arraySession[i][j].style}"></td>`
		}
		returnTable += "</tr>"
	}

	for (let i = 0; i < arraySessionVictory.length; i++) {
		for (let j = 0; j < arraySessionVictory[i].length; j++) {
			if (arraySession[i][j].value === arraySessionVictory[i][j]) {
				cont++;
			}
		}
	}
	var returnWin = "<div id='win'> Você venceu! Show!! </div>";

	fs.readFile("../jogar.html", "UTF-8", (err, date) => {
		
		if (cont === 24) {
			var replaced = date.replace('__Teste__', returnWin).replace('__Win__', " ");
		} else {
			var replaced = date.replace('__Teste__', returnTable).replace('__Win__', " ");
		}
		
		res.statusCode = 200;

		res.send(replaced);
	});


});

app.listen(3000, () => {
	console.log('Escutando localhost:3000');
})
