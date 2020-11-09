/**
 *
 * Instituto Federal de Educação, Ciência e Tecnologia - IFPE
 * Curso: Sistemas para Internet / Informática para Internet
 * Introdução à Programação Imperativa
 * Professor: Allan Lima - allan.lima@igarassu.ifpe.edu.br
 * Alunos: Weslley Félix, Jhonatas Barros, Ismael Jefté e Juliana Maria
 *
 */
 
const express = require('express');
const session = require('express-session');

const host = 'localhost';
const porta = 3000;
const fs = require('fs');


var app = express();
app.use('/css',express.static('../css'));
app.use('/fonts',express.static('../fonts'));
app.use('/image',express.static('../image'));
app.use(session({ secret: 'XXassasas¨¨$', resave: false, saveUninitialized: true }));

// entre em localhost:3000 para escrever os dados na sessao
app.get('/', function(req, res, next) {
	fs.readFile("../index.html", "UTF-8", (err, date) =>{
		res.send(date);
	});
});
app.get('/sobre', function(req, res, next) {
	fs.readFile("../sobre.html", "UTF-8", (err, date) =>{
		res.send(date);
	});
});
app.get('/ajuda', function(req, res, next) {
	fs.readFile("../ajuda.html", "UTF-8", (err, date) =>{
		res.send(date);
	});
});
// entre em localhost:3000/nome para ver os dados escritos na sessao
app.get('/get/*', function(req, res, next) {
    var arraySessionChanged = req.session.tabuleiro;
	var obj = req.url.split('/');

	var linha = obj[2];
	var coluna = obj[3];
	var linha2 = obj[4];
	var coluna2 = obj[5];

	temp = arraySessionChanged[linha][coluna];
	arraySessionChanged[linha][coluna] = arraySessionChanged[linha2][coluna2];
	arraySessionChanged[linha2][coluna2] = temp;
	temp = null;
	req.session.tabuleiro = arraySessionChanged;
	res.redirect('/jogar')

});
app.get('/jogar', function(req, res, next) {
	// se o array nao estiver na sessao, coloque-o na sessao
	if (req.session.tabuleiro == null) {
		//a[0][0]
		//a[0][1]
		// var array =[
		// 	[							//i		//j								//j											//i
		// 		`<td onclick="changePiece(0, 0)" style="background-position-x:${((0*25/(6-1))*100)}%;background-position-y:${((0*25/(4-1))*100)}%;"></td>`, 
		// 		`<td onclick="changePiece(0, 1)" style="background-position-x:${((1*25/(6-1))*100)}%;background-position-y:${((0*25/(4-1))*100)}%;"></td>`,
		// 		`<td onclick="changePiece(0, 2)" style="background-position-x:${((2*25/(6-1))*100)}%;background-position-y:${((0*25/(4-1))*100)}%;"></td>`,
		// 		`<td onclick="changePiece(0, 3)" style="background-position-x:${((3*25/(6-1))*100)}%;background-position-y:${((0*25/(4-1))*100)}%;"></td>`,
		// 		`<td onclick="changePiece(0, 4)" style="background-position-x:${((4*25/(6-1))*100)}%;background-position-y:${((0*25/(4-1))*100)}%;"></td>`,
		// 		`<td onclick="changePiece(0, 5)" style="background-position-x:${((5*25/(6-1))*100)}%;background-position-y:${((0*25/(4-1))*100)}%;"></td>`
		// 	],
		// 	[
		// 		`<td onclick="changePiece(1, 0)" style="background-position-x:${((0*25/(6-1))*100)}%;background-position-y:${((1*25/(4-1))*100)}%;"></td>`, 
		// 		`<td onclick="changePiece(1, 1)" style="background-position-x:${((1*25/(6-1))*100)}%;background-position-y:${((1*25/(4-1))*100)}%;"></td>`,
		// 		`<td onclick="changePiece(1, 2)" style="background-position-x:${((2*25/(6-1))*100)}%;background-position-y:${((1*25/(4-1))*100)}%;"></td>`,
		// 		`<td onclick="changePiece(1, 3)" style="background-position-x:${((3*25/(6-1))*100)}%;background-position-y:${((1*25/(4-1))*100)}%;"></td>`,
		// 		`<td onclick="changePiece(1, 4)" style="background-position-x:${((4*25/(6-1))*100)}%;background-position-y:${((1*25/(4-1))*100)}%;"></td>`,	
		// 		`<td onclick="changePiece(1, 5)" style="background-position-x:${((5*25/(6-1))*100)}%;background-position-y:${((1*25/(4-1))*100)}%;"></td>`	
		// 	],
		// 	[
		// 		`<td onclick="changePiece(2, 0)" style="background-position-x:${((0*25/(6-1))*100)}%;background-position-y:${((2*25/(4-1))*100)}%;"></td>`, 
		// 		`<td onclick="changePiece(2, 1)" style="background-position-x:${((1*25/(6-1))*100)}%;background-position-y:${((2*25/(4-1))*100)}%;"></td>`,
		// 		`<td onclick="changePiece(2, 2)" style="background-position-x:${((2*25/(6-1))*100)}%;background-position-y:${((2*25/(4-1))*100)}%;"></td>`,
		// 		`<td onclick="changePiece(2, 3)" style="background-position-x:${((3*25/(6-1))*100)}%;background-position-y:${((2*25/(4-1))*100)}%;"></td>`,
		// 		`<td onclick="changePiece(2, 4)" style="background-position-x:${((4*25/(6-1))*100)}%;background-position-y:${((2*25/(4-1))*100)}%;"></td>`,	
		// 		`<td onclick="changePiece(2, 5)" style="background-position-x:${((5*25/(6-1))*100)}%;background-position-y:${((2*25/(4-1))*100)}%;"></td>`	
		// 	],
		// 	[
		// 		`<td onclick="changePiece(3, 0)" style="background-position-x:${((0*25/(6-1))*100)}%;background-position-y:${((3*25/(4-1))*100)}%;"></td>`, 
		// 		`<td onclick="changePiece(3, 1)" style="background-position-x:${((1*25/(6-1))*100)}%;background-position-y:${((3*25/(4-1))*100)}%;"></td>`,
		// 		`<td onclick="changePiece(3, 2)" style="background-position-x:${((2*25/(6-1))*100)}%;background-position-y:${((3*25/(4-1))*100)}%;"></td>`,
		// 		`<td onclick="changePiece(3, 3)" style="background-position-x:${((3*25/(6-1))*100)}%;background-position-y:${((3*25/(4-1))*100)}%;"></td>`,
		// 		`<td onclick="changePiece(3, 4)" style="background-position-x:${((4*25/(6-1))*100)}%;background-position-y:${((3*25/(4-1))*100)}%;"></td>`,	
		// 		`<td onclick="changePiece(3, 5)" style="background-position-x:${((5*25/(6-1))*100)}%;background-position-y:${((3*25/(4-1))*100)}%;"></td>`	
		// 	]
		// ];
		
		function shuffle(array) {
			var currentIndex = array.length, temporaryValue, randomIndex;
		  
			// While there remain elements to shuffle...
			while (0 !== currentIndex) {
		  
			  // Pick a remaining element...
			  randomIndex = Math.floor(Math.random() * currentIndex);
			  currentIndex -= 1;
		  
			  // And swap it with the current element.
			  temporaryValue = array[currentIndex];
			  array[currentIndex] = array[randomIndex];
			  array[randomIndex] = temporaryValue;
			}
		  
			return array;
		  }
		  		var array = new Array();
		var arrayVictory = new Array();
		for (let i = 0; i < 4; i++) {
			array[i] = new Array();
			arrayVictory[i] = new Array();
			for (let j = 0; j < 6; j++) {
				array[i][j] = {value: i+'-'+j , style: `background-position-x:${((j*25/(6-1))*100)}%;background-position-y:${((i*25/(4-1))*100)}%;`};
				arrayVictory[i][j] = `${i}-${j}`;
			}
			
		}
		console.log("inicializou a sessao");
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
			returnTable +=  `<td onclick="changePiece(${i}, ${j})" style="${arraySession[i][j].style}"></td>`
		}
		returnTable += "</tr>" 
	}
	for (let i = 0; i < arraySessionVictory.length; i++) {
		for (let j = 0; j < arraySessionVictory[i].length; j++) {
			if(arraySession[i][j].value === arraySessionVictory[i][j]){
				cont++;
				
			}
		}		
	}
	var returnWin = "<div id='win'></div>";
	fs.readFile("../jogar.html", "UTF-8", (err, date) =>{
		if(cont === 24){
			var replaced = date.replace('__Teste__', returnWin).replace('__Win__', " ");
		}else{
			var replaced = date.replace('__Teste__', returnTable).replace('__Win__', " ");
		}
		res.statusCode = 200;

		res.send(replaced);
	});
});

app.listen(3000, () => {
  console.log('Escutando localhost:3000');
})