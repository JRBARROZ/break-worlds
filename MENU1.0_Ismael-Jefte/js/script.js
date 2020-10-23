(function () {

    var partes = [];

    function inicio() { // Função responsavel por varrer o documento html e pegar as peças que estão e colocra as referencias dessas peças em nossa Array.
        for (var i = 1; i < 2; i++) { // Varrendo todas as peças do nosso html
            var peca = document.querySelector("#menu1"); // Seleciona os elementos (document.querySelector), nesse caso é id (#num_1...#num_8)
            peca.style.background = "url('img/menu1.png')";
            partes.push(peca); //Coloca o elemento peça e coloca dentro do Array
        }
        //partes.push(null);     // Para que o ultimo indice seja nulo
        //desenhar();
    }
    inicio(); // Chamando função inicio
}());