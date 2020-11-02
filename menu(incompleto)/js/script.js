(function () {

    var partes = [];

    function inicio() { // Função responsavel por varrer o documento html e pegar as peças que estão e colocra as referencias dessas peças em nossa Array.
        for (var i = 1; i < 5; i++) { // Varrendo todas as peças do nosso html
            var peca = document.querySelector("#parte"+ i); // Seleciona os elementos (document.querySelector), nesse caso é id (#num_1...#num_8)         
            
            peca.style.background = "url('img/parte" + i + ".png')"
            partes.push(peca); //Coloca o elemento peça e coloca dentro do Array
        }
       
    }

   
    inicio(); // Chamando função inicio
}());