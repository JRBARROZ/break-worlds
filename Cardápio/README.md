# Game Menu Puzzle - Break-Worlds


 <!DOCTYPE html>

<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8" />
    <title>Menu com canvas e JS</title>

    <style>
        body
        {
            margin:0;
            overflow:hidden;
        }
    </style>
    <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
    <script>
        $(function () {
		//o restante do código ficará aqui
        });
    </script>
</head>
<body>
    <canvas id="canvasMenu"></canvas>
</body>
</html>
 function atualizarPlanoDeFundo() {
    largura = window.innerWidth;
    altura = window.innerHeight;
    canvas.setAttribute("width", largura);
    canvas.setAttribute("height", altura);
    var img = new Image();
    img.src = "bg.jpg";
    ctx.drawImage(img, 0, 0);
}
 function desenharBaseMenu() {
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    var x = parseInt((largura / 2) - (larguraMenu / 2));
    var y = parseInt((altura / 2) - (alturaMenu / 2));
    ctx.fillRect(x, y, larguraMenu, alturaMenu);  

 function desenharItensMenu() {
    var x = parseInt((largura / 2) - (larguraMenu / 2));
    var y = parseInt((altura / 2) - (alturaMenu / 2));
    var img;

    img = new Image();
    img.src = "iniciar_1.png";
    ctx.drawImage(img, x, y);

    img = new Image();
    img.src = "opcoes_1.png";
    ctx.drawImage(img, x, y + 100);

    img = new Image();
    img.src = "sair_1.png";
    ctx.drawImage(img, x, y + 200);
}
 function desenharMenu() {
    atualizarPlanoDeFundo();
    desenharBaseMenu();
    desenharItensMenu();
}
 var largura;
var altura;
var larguraMenu = 1004;
var alturaMenu = 591;

var canvas = document.getElementById("canvasMenu");
var ctx = canvas.getContext("2d")

